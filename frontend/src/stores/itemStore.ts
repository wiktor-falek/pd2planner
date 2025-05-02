import { defineStore } from "pinia";
import { computed, ref, watch, type Ref } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import { createItemCopy } from "../core/items/item";
import type { ItemBaseType, Slot } from "../types";
import type { Item } from "../core/items/item";

export type EquippedItems = Record<Slot, { items: Item[]; selected: number }>;

function itemTypeToEquippableSlots(type: ItemBaseType): Slot[] {
	switch (type) {
		case "quiver":
		case "shield":
			return ["weapon-2"];
		case "ring":
			return ["ring-1", "ring-2"];
		default:
			return [type as Slot];
	}
}

export function getDefaultEquippedItems(): EquippedItems {
	return {
		"weapon-1": { items: [], selected: 0 },
		"weapon-2": { items: [], selected: 0 },
		helmet: { items: [], selected: 0 },
		chest: { items: [], selected: 0 },
		gloves: { items: [], selected: 0 },
		boots: { items: [], selected: 0 },
		amulet: { items: [], selected: 0 },
		"ring-1": { items: [], selected: 0 },
		"ring-2": { items: [], selected: 0 },
		belt: { items: [], selected: 0 },
		charm: { items: [], selected: NaN },
	};
}

export interface GridItem {
	item: Item;
	x: number;
	y: number;
}

export const useItemStore = defineStore("items", () => {
	const items = ref<Item[]>(loadFromStorage("items", []));
	const selectedItem = ref<Item | null>(null);
	const selectedCharm = ref<Item | null>(null);
	// OPTIMIZE: store ids instead of copies
	const equippedItems = ref<EquippedItems>(
		loadFromStorage("equippedItems", getDefaultEquippedItems())
	);
	const equippedCharms = ref<GridItem[]>(loadFromStorage("equippedCharms", []));

	watch(items, (newItems) => saveToStorage("items", newItems), { deep: true });
	watch(equippedItems, (newEquippedItems) => saveToStorage("equippedItems", newEquippedItems), {
		deep: true,
	});
	watch(equippedItems, (newEquippedItems) => saveToStorage("equippedItems", newEquippedItems), {
		deep: true,
	});
	watch(equippedCharms, (newGrid) => saveToStorage("equippedCharms", newGrid), { deep: true });

	const selectedItemIsAdded = computed(() => {
		if (selectedItem.value === null) return false;
		return items.value.find((i) => i.id === selectedItem.value!.id);
	});

	const selectedCharmIsAdded = computed(() => {
		if (selectedCharm.value === null) return false;
		return items.value.find((i) => i.id === selectedCharm.value!.id);
	});

	function selectItem(item: Item | null) {
		selectedItem.value = item;
	}

	function selectCharm(item: Item | null) {
		selectedCharm.value = item;
	}

	function _addSelectedItemToBuild(selectedItemRef: Ref<Item | null>) {
		if (selectedItemRef.value === null) return;

		const itemCopy = createItemCopy(selectedItemRef.value);
		items.value.push(itemCopy);
		selectedItemRef.value = itemCopy;

		const slots = itemTypeToEquippableSlots(selectedItemRef.value.type);

		let wasAlreadySelected = false;
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i]!;

			const isNoneSelected = equippedItems.value[slot].selected === 0;
			const shouldEquip = isNoneSelected && !wasAlreadySelected;

			_equipItem(selectedItemRef.value, slot, shouldEquip);

			if (shouldEquip) {
				wasAlreadySelected = true;
			}
		}
	}

	function addSelectedItemToBuild() {
		_addSelectedItemToBuild(selectedItem);
	}

	function addSelectedCharmToBuild() {
		_addSelectedItemToBuild(selectedCharm);
	}

	function _removeSelectedItemFromBuild(selectedItemRef: Ref<Item | null>) {
		if (selectedItemRef.value === null) return false;

		const index = items.value.findIndex((i) => i.id === selectedItemRef.value!.id);
		if (index !== -1) items.value.splice(index, 1);

		const slots = itemTypeToEquippableSlots(selectedItemRef.value.type);
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i]!;
			_unequipItem(selectedItemRef.value, slot);
		}
	}

	function removeSelectedItemFromBuild() {
		_removeSelectedItemFromBuild(selectedItem);
	}

	function removeSelectedCharmFromBuild() {
		_removeSelectedItemFromBuild(selectedCharm);
	}

	function _equipItem(item: Item, slot: Slot, select: boolean = false) {
		const equippedItemsSlot = equippedItems.value[slot];

		equippedItemsSlot.items.push(item);
		if (select) {
			equippedItemsSlot.selected = equippedItemsSlot.items.length;
		}
	}

	function _unequipItem(item: Item, slot: Slot) {
		const equippedItemsSlot = equippedItems.value[slot];
		const originalSize = equippedItemsSlot.items.length;

		const index = equippedItemsSlot.items.findIndex((i) => i.id === item.id);
		if (index === -1) return;

		equippedItemsSlot.items.splice(index, 1);

		const wasLastItem = equippedItemsSlot.selected === originalSize;
		if (wasLastItem) {
			equippedItemsSlot.selected--;
		}
	}

	return {
		items,
		selectedItem,
		selectedCharm,
		selectItem,
		selectCharm,
		selectedItemIsAdded,
		selectedCharmIsAdded,
		addSelectedItemToBuild,
		addSelectedCharmToBuild,
		removeSelectedItemFromBuild,
		removeSelectedCharmFromBuild,
		equippedItems,
		equippedCharms,
	};
});
