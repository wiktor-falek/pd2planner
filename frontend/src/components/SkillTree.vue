<script setup lang="ts">
import { computed, reactive, type CSSProperties } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import {
  getSkillIconSrc,
  skillTreeIcons,
  type SkillTreeIcon,
} from "../data/skillTree";

const characterStore = useCharacterStore();

const skillTreeSrc = computed(
  () =>
    new URL(
      `../assets/skill-trees/${characterStore.characterClass}.png`,
      import.meta.url
    ).href
);

// Use reactive to track the state changes
const skillTreeItemsState = reactive<{ [key: string]: { points: number } }>(
  Object.fromEntries(
    skillTreeIcons[characterStore.characterClass].map((e) => [
      e.name,
      { points: 0 },
    ])
  )
);

function skillStyle(skill: SkillTreeIcon): CSSProperties {
  const treeWidth = 231;
  const skillGapX = 69;
  const skillGapY = 68;
  const x = 14 + skill.tree * treeWidth + skill.x * skillGapX;
  const y = 16 + skill.y * skillGapY;

  const opacity = skillTreeItemsState[skill.name].points > 0 ? "100" : "0";

  return { left: `${x}px`, top: `${y}px`, opacity };
}

function incrementSkill(name: string) {
  const state = skillTreeItemsState[name];
  if (state.points < 20) state.points++;
}

function decrementSkill(name: string) {
  const state = skillTreeItemsState[name];
  if (state.points > 0) state.points--;
}

function handleMouseDown(event: MouseEvent, skillName: string) {
  if (event.button === 0) {
    incrementSkill(skillName);
  } else if (event.button === 2) {
    decrementSkill(skillName);
  }
}
</script>

<template>
  <div class="skill-tree">
    <img class="skill-tree-image" :src="skillTreeSrc" />

    <img
      v-for="skill in skillTreeIcons[characterStore.characterClass]"
      class="skill-icon"
      :src="getSkillIconSrc(characterStore.characterClass, skill)"
      :style="skillStyle(skill)"
      @mousedown="handleMouseDown($event, skill.name)"
    />
  </div>
</template>

<style scoped>
.skill-tree {
  position: relative;
}

.skill-icon {
  position: absolute;
  width: 48px;
  height: auto;
}
</style>
