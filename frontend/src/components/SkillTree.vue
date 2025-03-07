<script setup lang="ts">
import { computed } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import type { CharacterClass } from "../types";

const characterStore = useCharacterStore();

const skillTreeSrc = computed(
  () =>
    new URL(
      `../assets/skill-trees/${characterStore.characterClass}.png`,
      import.meta.url
    ).href
);

interface SkillTreeIcon {
  name: string;
  tree: 0 | 1 | 2;
  x: 0 | 1 | 2;
  y: 0 | 1 | 2 | 3 | 4 | 5;
}
const skills: Record<CharacterClass, Array<SkillTreeIcon>> = {
  amazon: [
    // Javelin and Spear skills
    { name: "Jab", tree: 0, x: 0, y: 0 },
    { name: "Poison Javelin", tree: 0, x: 2, y: 0 },
    { name: "Javelin and Spear Mastery", tree: 0, x: 0, y: 1 },
    { name: "Power Strike", tree: 0, x: 1, y: 1 },
    { name: "Lightning Bolt", tree: 0, x: 2, y: 2 },
    { name: "Fend", tree: 0, x: 0, y: 3 },
    { name: "Charged Strike", tree: 0, x: 1, y: 3 },
    { name: "Plague Javelin", tree: 0, x: 2, y: 3 },
    { name: "Lightning Strike", tree: 0, x: 1, y: 5 },
    { name: "Lightning Fury", tree: 0, x: 2, y: 5 },

    // Passive and Magic skills
    { name: "Inner Sight", tree: 1, x: 0, y: 0 },
    { name: "Critical Strike", tree: 1, x: 2, y: 0 },
    { name: "Evade", tree: 1, x: 1, y: 1 },
    { name: "Slow Movement", tree: 1, x: 0, y: 2 },
    { name: "Pierce", tree: 1, x: 2, y: 2 },
    { name: "Decoy", tree: 1, x: 0, y: 3 },
    { name: "Dodge", tree: 1, x: 1, y: 3 },
    { name: "Penetrate", tree: 1, x: 2, y: 4 },
    { name: "Valkyrie", tree: 1, x: 0, y: 5 },

    // Bow and Crossbow skills
    { name: "Magic Arrow", tree: 2, x: 1, y: 0 },
    { name: "Cold Arrow", tree: 2, x: 0, y: 1 },
    { name: "Multiple Shot", tree: 2, x: 1, y: 1 },
    { name: "Fire Arrow", tree: 2, x: 2, y: 1 },
    { name: "Ice Arrow", tree: 2, x: 0, y: 2 },
    { name: "Guided Arrow", tree: 2, x: 1, y: 3 },
    { name: "Exploding Arrow", tree: 2, x: 2, y: 3 },
    { name: "Strafe", tree: 2, x: 1, y: 4 },
    { name: "Freezing Arrow", tree: 2, x: 0, y: 5 },
    { name: "Immolation Arrow", tree: 2, x: 2, y: 5 },
  ],

  assassin: [],
  necromancer: [],
  barbarian: [],
  paladin: [],
  sorceress: [],
  druid: [],
};

const getSkillIconSrc = (skill: SkillTreeIcon) => {
  const treeDirectoryNames: Record<CharacterClass, [string, string, string]> = {
    amazon: ["javelin-and-spear", "passive-and-magic", "bow-and-crossbow"],
    assassin: ["martial-arts", "shadow-disciplines", "traps"],
    barbarian: ["combat-masteries", "combat-skills", "warcries"],
    druid: ["elemental", "shape-shifting", "summoning"],
    necromancer: ["curses", "poison-and-bone", "summoning"],
    paladin: ["combat", "defensive-auras", "offensive-auras"],
    sorceress: ["cold", "fire", "lightning"],
  };

  const className = characterStore.characterClass;
  const treeDir = treeDirectoryNames[className][skill.tree];
  return new URL(
    `../assets/skills/${className}/${treeDir}/${skill.name}.png`,
    import.meta.url
  ).href;
};

function skillPositionStyle(skill: SkillTreeIcon) {
  const treeWidth = 231;
  const skillGapX = 69;
  const skillGapY = 68;
  const x = 14 + skill.tree * treeWidth + skill.x * skillGapX;
  const y = 16 + skill.y * skillGapY;

  return { left: `${x}px`, top: `${y}px` };
}
</script>

<template>
  <div class="skill-tree">
    <img class="skill-tree-image" :src="skillTreeSrc" />
    <img
      v-for="skill in skills[characterStore.characterClass]"
      class="skill-icon"
      :src="getSkillIconSrc(skill)"
      :style="skillPositionStyle(skill)"
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
