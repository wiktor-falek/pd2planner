import type { CharacterClass } from "../types";

export interface SkillTreeIcon {
  name: string;
  tree: 0 | 1 | 2;
  x: 0 | 1 | 2;
  y: 0 | 1 | 2 | 3 | 4 | 5;
}

export const skillTreeIcons: Record<CharacterClass, Array<SkillTreeIcon>> = {
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

export function getSkillIconSrc(
  characterClass: CharacterClass,
  skill: SkillTreeIcon
) {
  const treeDirectoryNames: Record<CharacterClass, [string, string, string]> = {
    amazon: ["javelin-and-spear", "passive-and-magic", "bow-and-crossbow"],
    assassin: ["martial-arts", "shadow-disciplines", "traps"],
    barbarian: ["combat-masteries", "combat-skills", "warcries"],
    druid: ["elemental", "shape-shifting", "summoning"],
    necromancer: ["curses", "poison-and-bone", "summoning"],
    paladin: ["combat", "defensive-auras", "offensive-auras"],
    sorceress: ["cold", "fire", "lightning"],
  };

  const treeDir = treeDirectoryNames[characterClass][skill.tree];
  return new URL(
    `../assets/skills/${characterClass}/${treeDir}/${skill.name}.png`,
    import.meta.url
  ).href;
}
