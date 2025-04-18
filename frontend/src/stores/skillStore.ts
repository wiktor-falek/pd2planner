import { defineStore } from "pinia";
import { useCharacterStore } from "./characterStore";
import { computed, ref, watch } from "vue";
import { loadFromStorage, saveToStorage } from "../persistence";
import { skillTreeIcons } from "../core/skills/skillTrees";
import type { CharacterClass } from "../types";
import { calculateQuestSkillPoints } from "../calculations";

export type SkillTreeState = { [key: string]: { points: number } };

function getDefaultSkillTreeState(characterClass: CharacterClass): SkillTreeState {
	return Object.fromEntries(
		skillTreeIcons[characterClass].map((e) => [e.name, { points: 0 }])
	) as SkillTreeState;
}

export const useSkillStore = defineStore("skills", () => {
	const characterStore = useCharacterStore();

	const skillTreeState = ref<SkillTreeState>(
		loadFromStorage("skillTreeState", getDefaultSkillTreeState(characterStore.characterClass))
	);

	watch(
		() => characterStore.characterClass,
		(newClass) => {
			skillTreeState.value = getDefaultSkillTreeState(newClass);
		}
	);
	watch(skillTreeState, (newState) => saveToStorage("skillTreeState", newState), { deep: true });

	const allocatedSkillPoints = computed(() =>
		Object.values(skillTreeState.value).reduce((prev, curr) => prev + curr.points, 0)
	);

	const unallocatedSkillPoints = computed(() =>
		Math.max(totalSkillPoints.value - allocatedSkillPoints.value, 0)
	);

	const questSkillPoints = computed(() => calculateQuestSkillPoints(characterStore.characterLevel));

	const totalSkillPoints = computed(
		() => questSkillPoints.value + characterStore.characterLevel - 1
	);

	function allocateSkill(name: string, amount: number) {
		const skill = skillTreeState.value[name]!;
		skill.points = Math.min(skill.points + amount, 20);

		while (
			characterStore.characterLevel < 99 &&
			allocatedSkillPoints.value > totalSkillPoints.value
		) {
			characterStore.setCharacterLevel(characterStore.characterLevel + 1);
		}
	}

	function deallocateSkill(name: string, amount: number) {
		const skill = skillTreeState.value[name]!;
		skill.points = Math.max(skill.points - amount, 0);
	}

	return {
		skillTreeState,
		allocatedSkillPoints,
		unallocatedSkillPoints,
		totalSkillPoints,
		allocateSkill,
		deallocateSkill,
	};
});
