import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import { createItemCopy, type Item, type Slot } from "../data/items";

type EquippedItems = Record<Slot, { items: Item[]; selected: number }>;

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

		const isNoneSelected = equippedItems.value[selectedItem.value.slot].items.length === 0;
		_equipItem(selectedItem.value, isNoneSelected);
	}

	function removeSelectedItemFromBuild() {
		if (selectedItem.value === null) return false;

		const index = items.value.findIndex((i) => i.id === selectedItem.value!.id);
		if (index !== -1) items.value.splice(index, 1);

		// selectItem(null);
		_unequipItem(selectedItem.value);
	}

	function _equipItem(item: Item, select: boolean = false) {
		const equippedSlot = equippedItems.value[item.slot];

		equippedSlot.items.push(item);
		if (select) {
			equippedSlot.selected = equippedSlot.items.length;
		}
	}

	function _unequipItem(item: Item) {
		const equippedSlot = equippedItems.value[item.slot];
		const originalSize = equippedSlot.items.length;

		const index = equippedSlot.items.findIndex((i) => i.id === item.id);
		if (index === -1) return;

		equippedSlot.items.splice(index, 1);

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
	};
});
