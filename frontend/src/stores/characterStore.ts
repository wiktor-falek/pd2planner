import { defineStore } from "pinia";
import { ref } from "vue";
import type { CharacterClass } from "../types";
import { skillTreeIcons } from "../data/skillTree";

type SkillTreeState = { [key: string]: { points: number } };

function getCharacterClass(): CharacterClass {
  return (localStorage.getItem("characterClass") as CharacterClass) ?? "amazon";
}

function getCharacterLevel(): number {
  return parseInt((localStorage.getItem("characterLevel") as string) ?? 1);
}

function getDefaultSkillTreeState(
  characterClass: CharacterClass
): SkillTreeState {
  return Object.fromEntries(
    skillTreeIcons[characterClass].map((e) => [e.name, { points: 0 }])
  ) as SkillTreeState;
}

function getSkillTreeState(characterClass: CharacterClass): SkillTreeState {
  const persistedData = localStorage.getItem("skillTreeState");

  if (persistedData !== null) {
    return JSON.parse(persistedData) as SkillTreeState;
  }

  return getDefaultSkillTreeState(characterClass);
}

export const useCharacterStore = defineStore("character", () => {
  function resetSkillTreeState(characterClass: CharacterClass) {
    skillTreeState.value = getDefaultSkillTreeState(characterClass);
    localStorage.removeItem("skillTreeState");
  }

  const characterClass = ref(getCharacterClass());
  const characterLevel = ref(getCharacterLevel());
  const skillTreeState = ref(getSkillTreeState(characterClass.value));

  function setCharacterClass(newCharacterClass: CharacterClass) {
    characterClass.value = newCharacterClass;
    localStorage.setItem("characterClass", characterClass.value);
    resetSkillTreeState(newCharacterClass);
  }

  function setCharacterLevel(newCharacterLevel: number) {
    characterLevel.value = newCharacterLevel;
    localStorage.setItem("characterLevel", characterLevel.value.toString());
  }

  function incrementSkill(name: string) {
    const state = skillTreeState.value[name];
    if (state.points < 20) state.points++;
    localStorage.setItem(
      "skillTreeState",
      JSON.stringify(skillTreeState.value)
    );
  }

  function decrementSkill(name: string) {
    const state = skillTreeState.value[name];
    if (state.points > 0) state.points--;
    localStorage.setItem(
      "skillTreeState",
      JSON.stringify(skillTreeState.value)
    );
  }

  return {
    characterClass,
    setCharacterClass,
    characterLevel,
    setCharacterLevel,
    skillTreeState,
    incrementSkill,
    decrementSkill,
  };
});
