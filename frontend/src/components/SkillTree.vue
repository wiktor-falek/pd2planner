<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import {
  getSkillIconSrc,
  skillTreeIcons,
  type SkillTreeIcon,
} from "../data/skillTrees";
import { type SkillDetails, skillDetails } from "../data/skillDetails";

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

const tooltipData = ref<(SkillDetails & { name: string }) | null>(null);

function displayTooltip(skillName: string) {
  if (tooltipData.value?.name === skillName) return;
  tooltipData.value = {
    name: skillName,
    ...skillDetails[characterStore.characterClass][skillName],
  };
}

function hideTooltip() {
  tooltipData.value = null;
}
</script>

<template>
  <Teleport to="#app">
    <div v-if="tooltipData !== null" class="skill-tooltip" @contextmenu.prevent>
      <p>
        <span class="green">{{ tooltipData.name + "\n" }}</span>
        {{ tooltipData.description + "\n" }}
        <span>Required Level: {{ tooltipData.levelRequirement }}</span>
      </p>
      <p v-if="tooltipData.mechanics.length > 0">{{ tooltipData.mechanics }}</p>
      <div v-if="tooltipData.synergies.length > 0">
        <p class="green">{{ tooltipData.name }} Receives Bonuses From:</p>
        <p>{{ tooltipData.synergies }}</p>
      </div>
    </div>
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
        @mouseenter="displayTooltip(skill.name)"
        @mouseout="hideTooltip"
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

.skill-tooltip {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  left: 0;
  top: 0;
  background-color: rgba(20, 20, 20, 0.85);
  white-space: pre-line;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-family: "ExocetHeavy";
  text-transform: uppercase;
  z-index: 1000;
}

.skill-tooltip p {
  margin: 0;
}

.green {
  color: #42b842;
}
</style>
