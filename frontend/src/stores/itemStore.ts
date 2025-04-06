import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import { createItemCopy } from "../data/items";
import type { ItemBaseType, Slot } from "../types";
import type { Item } from "../data/bases";

type EquippedItems = Record<Slot, { items: Item[]; selected: number }>;

function itemTypeToEquippableSlots(type: ItemBaseType): Slot[] {
	switch (type) {
		case "weapon":
			return ["weapon-1", "weapon-2"];
		case "ring":
			return ["ring-1", "ring-2"];
		default:
			return [type as Slot];
	}
}

function getDefaultEquippedItems(): EquippedItems {
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
	};
}

export const useItemStore = defineStore("items", () => {
	const items = ref<Item[]>(loadFromStorage("items", []));
	const selectedItem = ref<Item | null>(null);
	const equippedItems = ref<EquippedItems>(
		loadFromStorage("equippedItems", getDefaultEquippedItems())
	);

	watch(items, (newItems) => saveToStorage("items", newItems), { deep: true });
	// watch(selectedItem, (newSelectedItem) => saveToStorage("selectedItem", newSelectedItem), {
	// 	deep: true,
	// });
	watch(equippedItems, (newEquippedItems) => saveToStorage("equippedItems", newEquippedItems), {
		deep: true,
	});

	const selectedItemIsAdded = computed(() => {
		if (selectedItem.value === null) return false;
		return items.value.find((i) => i.id === selectedItem.value!.id);
	});

	function selectItem(item: Item | null) {
		selectedItem.value = item;
	}

	function addSelectedItemToBuild() {
		if (selectedItem.value === null) return;

		const itemCopy = createItemCopy(selectedItem.value);
		items.value.push(itemCopy);
		selectedItem.value = itemCopy;

		selectedItem.value.type;

		const slots = itemTypeToEquippableSlots(selectedItem.value.type);

		let wasAlreadySelected = false;
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i]!;

			const isNoneSelected = equippedItems.value[slot].selected === 0;
			const shouldEquip = isNoneSelected && !wasAlreadySelected;

			_equipItem(selectedItem.value, slot, shouldEquip);

			if (shouldEquip) {
				wasAlreadySelected = true;
			}
		}
	}

	function removeSelectedItemFromBuild() {
		if (selectedItem.value === null) return false;

		const index = items.value.findIndex((i) => i.id === selectedItem.value!.id);
		if (index !== -1) items.value.splice(index, 1);

		const slots = itemTypeToEquippableSlots(selectedItem.value.type);
		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i]!;
			_unequipItem(selectedItem.value, slot);
		}

		selectItem(null);
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
		selectItem,
		selectedItemIsAdded,
		addSelectedItemToBuild,
		removeSelectedItemFromBuild,
		equippedItems,
	};
});
