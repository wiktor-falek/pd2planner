<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import {
  getSkillIconSrc,
  skillTreeIcons,
  type SkillTreeIcon,
} from "../data/skillTrees";
import { skillDetails, type SkillDetails } from "../data/skillDetails";

const characterStore = useCharacterStore();

const skillTreeSrc = computed(
  () =>
    new URL(
      `../assets/skill-trees/${characterStore.characterClass}.png`,
      import.meta.url
    ).href
);

function getSkillIconTreeLocation(skill: SkillTreeIcon): [number, number] {
  const treeWidth = 231;
  const skillGapX = 69;
  const skillGapY = 68;
  const x = 14 + skill.tree * treeWidth + skill.x * skillGapX;
  let y = 16 + skill.y * skillGapY;
  if (skill.y >= 4) y += 1;
  return [x, y];
}

function skillContainerStyle(skill: SkillTreeIcon): CSSProperties {
  const [x, y] = getSkillIconTreeLocation(skill);

  return { left: `${x}px`, top: `${y}px`, pointerEvents: "all" };
}

function handleMouseDown(event: MouseEvent, skillName: string) {
  if (event.button === 0) {
    characterStore.incrementSkill(skillName);
  } else if (event.button === 2) {
    characterStore.decrementSkill(skillName);
  }
}

function handleMouseEnter(skillName: string) {

  const skillTreeIcon = skillTreeIcons[characterStore.characterClass].find(e => e.name === skillName);
  if (skillTreeIcon === undefined) {
    throw new Error("Shit hit the fan")
  }

  const [x, y] = getSkillIconTreeLocation(skillTreeIcon);

  setSkillTooltip(skillName, x, y);
}

function handleMouseLeave() {
  setSkillTooltip(null);
}

const skillTooltip = ref<(SkillDetails & { name: string, x: number, y: number }) | null>(null);

function setSkillTooltip(skillName: string | null, x: number | null = null, y: number | null = null) {
  if (skillName === null) {
    skillTooltip.value = null;
    return;
  }

  skillTooltip.value = { name: skillName, x: x ?? 0, y: y ?? 0, ...skillDetails[characterStore.characterClass][skillName] };
}
</script>

<template>
  <div class="skill-tree">
    <img class="skill-tree-image" :src="skillTreeSrc" />

    <div class="skill-tooltip" v-if="skillTooltip !== null">
      <p>
        <span class="green">{{ skillTooltip.name }}</span><br />
        {{ skillDetails[characterStore.characterClass][skillTooltip.name].description }}<br />
        <span>Required Level: {{ skillDetails[characterStore.characterClass][skillTooltip.name].levelRequirement
          }}</span>
      </p>
      <p v-if="skillDetails[characterStore.characterClass][skillTooltip.name].mechanics.length > 0">
        {{ skillDetails[characterStore.characterClass][skillTooltip.name].mechanics }}
      </p>
      <div v-if="skillDetails[characterStore.characterClass][skillTooltip.name].synergies.length > 0">
        <p class="green">{{ skillTooltip.name }} Receives Bonuses From:</p>
        <p>{{ skillDetails[characterStore.characterClass][skillTooltip.name].synergies }}</p>
      </div>
    </div>

    <div v-for="skill in skillTreeIcons[characterStore.characterClass]" :key="skill.name" class="skill-icon-container"
      :style="skillContainerStyle(skill)">
      <div :style="{ opacity: characterStore.skillTreeState[skill.name].points > 0 ? '100' : '0' }">
        <img class="skill-icon" :src="getSkillIconSrc(characterStore.characterClass, skill)"
          @mousedown="handleMouseDown($event, skill.name)" @mouseenter="handleMouseEnter(skill.name)"
          @mouseleave="handleMouseLeave()" />
        <p class="skill-label">
          {{ characterStore.skillTreeState[skill.name].points }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-tree {
  position: relative;
}

.skill-icon-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skill-icon {
  width: 48px;
  height: auto;
  cursor: pointer;
}

.skill-label {
  position: absolute;
  top: 41px;
  left: 41px;
  color: rgb(225, 225, 225);
  font-size: 14px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  user-select: none;
  font-weight: bold;
}

.skill-tooltip {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(20, 20, 20, 0.85);
  padding: 10px;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  z-index: 1000;
  white-space: preserve nowrap;
  pointer-events: none;
}

.skill-tooltip p {
  margin: 0;
}
</style>
