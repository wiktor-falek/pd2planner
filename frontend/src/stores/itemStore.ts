import { defineStore } from "pinia";
import { computed, ref, toRaw, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import type { Item, Slot } from "../data/items";

type EquippedItems = Record<Slot, { items: Set<Item>; selected: number }>;
type EquippedItemsWithArrays = Record<Slot, { items: Item[]; selected: number }>;

function getDefaultEquippedItems(): EquippedItemsWithArrays {
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

function equippedItemsSetsToArrays(equippedItems: EquippedItems): EquippedItemsWithArrays {
	const transformed = Object.fromEntries(
		Object.entries(equippedItems).map(([key, data]) => [
			key,
			{ items: [...data.items], selected: data.selected },
		])
	) as EquippedItemsWithArrays;
	return transformed;
}

function equippedItemsArraysToSets(equippedItems: EquippedItemsWithArrays): EquippedItems {
	const transformed = Object.fromEntries(
		Object.entries(equippedItems).map(([key, data]) => [
			key,
			{ items: new Set(data.items), selected: data.selected },
		])
	) as EquippedItems;
	return transformed;
}

export const useItemStore = defineStore("items", () => {
	const items = ref<Set<Item>>(new Set(loadFromStorage("items", [])));
	const selectedItem = ref<Item | null>(null);
	const equippedItems = ref<EquippedItems>(
		equippedItemsArraysToSets(loadFromStorage("equippedItems", getDefaultEquippedItems()))
	);

	watch(items, (newItems) => saveToStorage("items", [...newItems]), { deep: true });
	// watch(selectedItem, (newSelectedItem) => saveToStorage("selectedItem", newSelectedItem), {
	// 	deep: true,
	// });
	watch(
		equippedItems,
		(newEquippedItems) =>
			saveToStorage("equippedItems", equippedItemsSetsToArrays(newEquippedItems)),
		{
			deep: true,
		}
	);

	const selectedItemIsAdded = computed(() => {
		if (selectedItem.value === null) return false;
		return items.value.has(selectedItem.value);
	});

	function selectItem(item: Item | null) {
		selectedItem.value = item;
	}

	function addSelectedItemToBuild() {
		if (selectedItem.value === null) return;

		const newItemReference = structuredClone(toRaw(selectedItem.value));
		items.value.add(newItemReference);
		selectedItem.value = newItemReference;

		const isNoneSelected = equippedItems.value[selectedItem.value.slot].items.size === 0;
		_equipItem(selectedItem.value, isNoneSelected);
	}

	function removeSelectedItemFromBuild() {
		if (selectedItem.value === null) return false;
		items.value.delete(selectedItem.value);
		// selectItem(null);
		_unequipItem(selectedItem.value);
	}

	function _equipItem(item: Item, select: boolean = false) {
		const equippedSlot = equippedItems.value[item.slot];

		equippedSlot.items.add(item);
		if (select) {
			equippedSlot.selected = equippedSlot.items.size;
		}
	}

	function _unequipItem(item: Item) {
		const equippedSlot = equippedItems.value[item.slot];
		const originalSize = equippedSlot.items.size;

		equippedSlot.items.delete(item);

		const wasLastItem = equippedSlot.selected === originalSize;
		if (wasLastItem) {
			equippedSlot.selected--;
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
		// equipItem,
	};
});
