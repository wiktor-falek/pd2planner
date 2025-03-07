import { defineStore } from "pinia";
import { ref } from "vue";
import type { CharacterClass } from "../types";

export const useCharacterStore = defineStore("character", () => {
  const characterClass = ref<CharacterClass>("amazon");
  const characterLevel = ref<number>(1);

  return { characterClass, characterLevel };
});
