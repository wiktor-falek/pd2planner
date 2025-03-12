import { defineStore } from "pinia";
import { computed, ref, toRaw, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import type { Item } from "../data/items";

export const useItemStore = defineStore("items", () => {
	const items = ref<Set<Item>>(loadFromStorage("items", new Set()));
	const selectedItem = ref<Item | null>(null);

	watch(items, (newItems) => saveToStorage("items", newItems), { deep: true });
	// watch(selectedItem, (newSelectedItem) => saveToStorage("selectedItem", newSelectedItem), {
	// 	deep: true,
	// });

	const selectedItemIsAdded = computed(() => {
		if (selectedItem.value === null) return false;
		return items.value.has(selectedItem.value);
	});

	function selectItem(item: Item | null) {
		selectedItem.value = item;
	}

	function addSelectedItemToBuild() {
		if (selectedItem.value === null) return;

		const clone = structuredClone(toRaw(selectedItem.value));
		items.value.add(clone);
		selectedItem.value = clone;
	}

	function removeSelectedItemFromBuild() {
		if (selectedItem.value === null) return false;
		items.value.delete(selectedItem.value);
	}

	return {
		items,
		selectedItem,
		selectItem,
		selectedItemIsAdded,
		addSelectedItemToBuild,
		removeSelectedItemFromBuild,
	};
});
