import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { CharacterClass } from "../types";
import { loadFromStorage, saveToStorage } from "../persistence";

export const useCharacterStore = defineStore("character", () => {
	const characterClass = ref<CharacterClass>(loadFromStorage("characterClass", "amazon"));
	const characterLevel = ref<number>(loadFromStorage("characterLevel", 1));

	watch(characterClass, (newClass) => saveToStorage("characterClass", newClass));
	watch(characterLevel, (newLevel) => saveToStorage("characterLevel", newLevel));

	function setCharacterClass(newCharacterClass: CharacterClass) {
		characterClass.value = newCharacterClass;
	}

	function setCharacterLevel(newCharacterLevel: number) {
		const clampedLevel = Math.min(Math.max(newCharacterLevel, 1), 99);
		characterLevel.value = clampedLevel;
	}

	return {
		characterClass,
		setCharacterClass,
		characterLevel,
		setCharacterLevel,
	};
});
