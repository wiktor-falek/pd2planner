import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CharacterClass } from "../types";
import { skillTreeIcons } from "../data/skillTrees";

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

function calculateQuestSkillPoints(characterLevel: number) {
  let points = 0;

  // Normal
  if (characterLevel >= 2) points += 1; // Den
  if (characterLevel >= 14) points += 1; // Radament
  if (characterLevel >= 26) points += 2; // Izual

  // Nightmare
  if (characterLevel >= 36) points += 1; // Den
  if (characterLevel >= 42) points += 1; // Radament
  if (characterLevel >= 54) points += 2; // Izual

  // Hell
  if (characterLevel >= 60) points += 1; // Den
  if (characterLevel >= 62) points += 1; // Radament
  if (characterLevel >= 64) points += 2; // Izual

  return points;
}

export const useCharacterStore = defineStore("character", () => {
  function resetSkillTreeState(characterClass: CharacterClass) {
    skillTreeState.value = getDefaultSkillTreeState(characterClass);
    localStorage.removeItem("skillTreeState");
  }

  const characterClass = ref(getCharacterClass());
  const characterLevel = ref(getCharacterLevel());
  const skillTreeState = ref(getSkillTreeState(characterClass.value));
  const allocatedPointsCount = computed(() =>
    Object.values(skillTreeState.value).reduce(
      (prev, curr) => prev + curr.points,
      0
    )
  );
  const questSkillPointsCount = computed(() =>
    calculateQuestSkillPoints(characterLevel.value)
  );
  const totalPointsCount = computed(
    () => questSkillPointsCount.value + characterLevel.value - 1
  );

  function setCharacterClass(newCharacterClass: CharacterClass) {
    characterClass.value = newCharacterClass;
    localStorage.setItem("characterClass", characterClass.value);
    resetSkillTreeState(newCharacterClass);
  }

  function setCharacterLevel(newCharacterLevel: number) {
    const clampedLevel = Math.min(Math.max(newCharacterLevel, 1), 99);
    characterLevel.value = clampedLevel;
    localStorage.setItem("characterLevel", characterLevel.value.toString());
  }

  function incrementSkill(name: string) {
    const state = skillTreeState.value[name];
    if (state.points >= 20) return;
    state.points++;

    localStorage.setItem(
      "skillTreeState",
      JSON.stringify(skillTreeState.value)
    );

    while (
      characterLevel.value < 99 &&
      allocatedPointsCount.value > totalPointsCount.value
    ) {
      setCharacterLevel(characterLevel.value + 1);
    }
  }

  function decrementSkill(name: string) {
    const state = skillTreeState.value[name];
    if (state.points <= 0) return;
    state.points--;

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
    allocatedPointsCount,
    totalPointsCount,
  };
});
