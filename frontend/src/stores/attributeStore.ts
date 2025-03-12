import { defineStore } from "pinia";
import { useCharacterStore } from "./characterStore";
import { computed, ref, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import { calculateQuestAttributePoints } from "../calculations";
import type { Attribute, Attributes } from "../types";

function getDefaultAttributes(): Attributes {
	return {
		strength: 0,
		dexterity: 0,
		vitality: 0,
		energy: 0,
	};
}

export const useAttributeStore = defineStore("attributes", () => {
	const characterStore = useCharacterStore();

	const attributes = ref(loadFromStorage<Attributes>("attributes", getDefaultAttributes()));

	const allocatedAttributePoints = computed(
		() =>
			attributes.value.strength +
			attributes.value.dexterity +
			attributes.value.vitality +
			attributes.value.energy
	);

	const questAttributePoints = computed(() =>
		calculateQuestAttributePoints(characterStore.characterLevel)
	);

	const totalAttributePoints = computed(
		() => questAttributePoints.value + (characterStore.characterLevel - 1) * 5
	);

	const unallocatedAttributePoints = computed(() =>
		Math.max(totalAttributePoints.value - allocatedAttributePoints.value, 0)
	);

	watch(attributes, (newAttributes) => saveToStorage("attributes", newAttributes), { deep: true });

	function allocateAttribute(attribute: Attribute, amount: number) {
		const actualAmount = Math.max(Math.min(amount, unallocatedAttributePoints.value), 0);
		attributes.value[attribute] += actualAmount;
	}

	function deallocateAttribute(attribute: Attribute, amount: number) {
		attributes.value[attribute] = Math.max(attributes.value[attribute] - amount, 0);
	}

	return {
		attributes,
		allocatedAttributePoints,
		unallocatedAttributePoints,
		totalAttributePoints,
		allocateAttribute,
		deallocateAttribute,
	};
});
