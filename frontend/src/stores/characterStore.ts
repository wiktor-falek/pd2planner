import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CharacterClass } from "../types";
import { skillTreeIcons } from "../data/skillTrees";

export type SkillTreeState = { [key: string]: { points: number } };
export type Attributes = {
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
};
export type Attribute = "strength" | "dexterity" | "vitality" | "energy";

function getCharacterClass(): CharacterClass {
  return (localStorage.getItem("characterClass") as CharacterClass) ?? "amazon";
}

function getCharacterLevel(): number {
  return parseInt((localStorage.getItem("characterLevel") as string) ?? 1);
}

function getCharacterAttributes(): Attributes {
  const persisted = localStorage.getItem("characterAttributes");

  if (persisted !== null) {
    return JSON.parse(persisted);
  }

  return {
    strength: 0,
    dexterity: 0,
    vitality: 0,
    energy: 0,
  };
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

function calculateQuestAttributePoints(characterLevel: number) {
  let attributes = 0;

  if (characterLevel >= 24) attributes += 5;
  if (characterLevel >= 52) attributes += 5;
  if (characterLevel >= 64) attributes += 5;

  return attributes;
}

export const useCharacterStore = defineStore("character", () => {
  function resetSkillTreeState(characterClass: CharacterClass) {
    skillTreeState.value = getDefaultSkillTreeState(characterClass);
    localStorage.removeItem("skillTreeState");
  }

  const characterClass = ref(getCharacterClass());
  const characterLevel = ref(getCharacterLevel());
  const attributes = ref(getCharacterAttributes());
  const skillTreeState = ref(getSkillTreeState(characterClass.value));
  const allocatedSkillPoints = computed(() =>
    Object.values(skillTreeState.value).reduce(
      (prev, curr) => prev + curr.points,
      0
    )
  );
  const questSkillPointsCount = computed(() =>
    calculateQuestSkillPoints(characterLevel.value)
  );
  const totalSkillPoints = computed(
    () => questSkillPointsCount.value + characterLevel.value - 1
  );
  const questAttributePoints = computed(() =>
    calculateQuestAttributePoints(characterLevel.value)
  );
  const totalAttributePoints = computed(
    () => questAttributePoints.value + (characterLevel.value - 1) * 5
  );
  const allocatedAttributePoints = computed(
    () =>
      attributes.value.strength +
      attributes.value.dexterity +
      attributes.value.vitality +
      attributes.value.energy
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
      allocatedSkillPoints.value > totalSkillPoints.value
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

  function allocateAttribute(attribute: Attribute, amount: number) {
    const unallocatedPoints =
      totalAttributePoints.value - allocatedAttributePoints.value;
    const actualAmount = Math.max(Math.min(amount, unallocatedPoints), 0);

    attributes.value[attribute] += actualAmount;

    localStorage.setItem(
      "characterAttributes",
      JSON.stringify(attributes.value)
    );
  }

  function deallocateAttribute(attribute: Attribute, amount: number) {
    attributes.value[attribute] = Math.max(
      attributes.value[attribute] - amount,
      0
    );
    localStorage.setItem(
      "characterAttributes",
      JSON.stringify(attributes.value)
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
    allocatedSkillPoints,
    totalSkillPoints,
    attributes,
    allocatedAttributePoints,
    totalAttributePoints,
    allocateAttribute,
    deallocateAttribute,
  };
});
