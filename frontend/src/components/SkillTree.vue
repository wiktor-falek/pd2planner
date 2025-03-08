<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import {
  getSkillIconSrc,
  skillTreeIcons,
  type SkillTreeIcon,
} from "../data/skillTrees";

const characterStore = useCharacterStore();

const skillTreeSrc = computed(
  () =>
    new URL(
      `../assets/skill-trees/${characterStore.characterClass}.png`,
      import.meta.url
    ).href
);

function skillStyle(skill: SkillTreeIcon): CSSProperties {
  const treeWidth = 231;
  const skillGapX = 69;
  const skillGapY = 68;
  const x = 14 + skill.tree * treeWidth + skill.x * skillGapX;
  let y = 16 + skill.y * skillGapY;
  if (skill.y >= 4) y += 1; // why are you like this ._.

  const opacity =
    characterStore.skillTreeState[skill.name].points > 0 ? "100" : "0";

  return { left: `${x}px`, top: `${y}px`, opacity };
}

function handleMouseDown(event: MouseEvent, skillName: string) {
  if (event.button === 0) {
    characterStore.incrementSkill(skillName);
  } else if (event.button === 2) {
    characterStore.decrementSkill(skillName);
  }
}

const tooltipData = ref();

function displayTooltip(skillName: string) {
  console.log(skillName);
  tooltipData = skillDetails;
}

function hideTooltip() {}
</script>

<template>
  <Teleport to="body">
    <div class="skillTooltip"></div>
  </Teleport>

  <div class="skill-tree">
    <img class="skill-tree-image" :src="skillTreeSrc" />

    <div
      v-for="skill in skillTreeIcons[characterStore.characterClass]"
      :key="skill.name"
      class="skill-icon-container"
      :style="skillStyle(skill)"
    >
      <img
        class="skill-icon"
        :src="getSkillIconSrc(characterStore.characterClass, skill)"
        @mousedown="handleMouseDown($event, skill.name)"
        @mouseover="displayTooltip(skill.name)"
        @mouseleave="hideTooltip"
      />
      <p class="skill-label">
        {{ characterStore.skillTreeState[skill.name].points }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.skill-tree {
  position: relative;
}

.skill-icon-container {
  position: absolute;
}

.skill-icon {
  width: 48px;
  height: auto;
}

.skill-label {
  position: absolute;
  top: 30px;
  left: 40px;
  color: rgb(225, 225, 225);
  font-size: 12px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  user-select: none;
  font-weight: bold;
}
</style>
