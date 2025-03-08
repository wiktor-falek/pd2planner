import type { CharacterClass } from "../types";

export interface SkillTreeIcon {
  name: string;
  tree: 0 | 1 | 2;
  x: 0 | 1 | 2;
  y: 0 | 1 | 2 | 3 | 4 | 5;
}

export const skillTreeIcons: Record<CharacterClass, Array<SkillTreeIcon>> = {
  amazon: [
    // Javelin and Spear
    { tree: 0, x: 0, y: 0, name: "Jab" },
    { tree: 0, x: 2, y: 0, name: "Poison Javelin" },
    { tree: 0, x: 0, y: 1, name: "Javelin and Spear Mastery" },
    { tree: 0, x: 1, y: 1, name: "Power Strike" },
    { tree: 0, x: 2, y: 2, name: "Lightning Bolt" },
    { tree: 0, x: 0, y: 3, name: "Fend" },
    { tree: 0, x: 1, y: 3, name: "Charged Strike" },
    { tree: 0, x: 2, y: 3, name: "Plague Javelin" },
    { tree: 0, x: 1, y: 5, name: "Lightning Strike" },
    { tree: 0, x: 2, y: 5, name: "Lightning Fury" },

    // Passive and Magic
    { tree: 1, x: 0, y: 0, name: "Inner Sight" },
    { tree: 1, x: 2, y: 0, name: "Critical Strike" },
    { tree: 1, x: 1, y: 1, name: "Evade" },
    { tree: 1, x: 0, y: 2, name: "Slow Movement" },
    { tree: 1, x: 2, y: 2, name: "Pierce" },
    { tree: 1, x: 0, y: 3, name: "Decoy" },
    { tree: 1, x: 1, y: 3, name: "Dodge" },
    { tree: 1, x: 2, y: 4, name: "Penetrate" },
    { tree: 1, x: 0, y: 5, name: "Valkyrie" },

    // Bow and Crossbow
    { tree: 2, x: 1, y: 0, name: "Magic Arrow" },
    { tree: 2, x: 0, y: 1, name: "Cold Arrow" },
    { tree: 2, x: 1, y: 1, name: "Multiple Shot" },
    { tree: 2, x: 2, y: 1, name: "Fire Arrow" },
    { tree: 2, x: 0, y: 2, name: "Ice Arrow" },
    { tree: 2, x: 1, y: 3, name: "Guided Arrow" },
    { tree: 2, x: 2, y: 3, name: "Exploding Arrow" },
    { tree: 2, x: 1, y: 4, name: "Strafe" },
    { tree: 2, x: 0, y: 5, name: "Freezing Arrow" },
    { tree: 2, x: 2, y: 5, name: "Immolation Arrow" },
  ],

  assassin: [
    // Martial Arts
    { tree: 0, x: 1, y: 0, name: "Tiger Strike" },
    { tree: 0, x: 2, y: 0, name: "Dragon Talon" },
    { tree: 0, x: 0, y: 1, name: "Fists of Fire" },
    { tree: 0, x: 2, y: 1, name: "Dragon Claw" },
    { tree: 0, x: 1, y: 2, name: "Cobra Strike" },
    { tree: 0, x: 0, y: 3, name: "Claws of Thunder" },
    { tree: 0, x: 2, y: 3, name: "Dragon Tail" },
    { tree: 0, x: 0, y: 4, name: "Blades of Ice" },
    { tree: 0, x: 2, y: 4, name: "Dragon Flight" },
    { tree: 0, x: 1, y: 5, name: "Phoenix Strike" },

    // Shadow Disciplines
    { tree: 1, x: 1, y: 0, name: "Claw and Dagger Mastery" },
    { tree: 1, x: 2, y: 0, name: "Psychic Hammer" },
    { tree: 1, x: 0, y: 1, name: "Burst of Speed" },
    { tree: 1, x: 1, y: 2, name: "Weapon Block" },
    { tree: 1, x: 2, y: 2, name: "Cloak of Shadows" },
    { tree: 1, x: 0, y: 3, name: "Fade" },
    { tree: 1, x: 1, y: 3, name: "Shadow Warrior" },
    { tree: 1, x: 2, y: 3, name: "Mind Blast" },
    { tree: 1, x: 0, y: 5, name: "Venom" },
    { tree: 1, x: 1, y: 5, name: "Shadow Master" },

    // Traps skills
    { tree: 2, x: 1, y: 0, name: "Fire Blast" },
    { tree: 2, x: 0, y: 1, name: "Shock Web" },
    { tree: 2, x: 2, y: 1, name: "Blade Sentinel" },
    { tree: 2, x: 0, y: 2, name: "Charged Bolt Sentry" },
    { tree: 2, x: 1, y: 2, name: "Wake of Fire" },
    { tree: 2, x: 2, y: 3, name: "Blade Fury" },
    { tree: 2, x: 0, y: 4, name: "Lightning Sentry" },
    { tree: 2, x: 1, y: 4, name: "Wake of Inferno" },
    { tree: 2, x: 2, y: 4, name: "Blade Shield" },
    { tree: 2, x: 0, y: 5, name: "Chain Lightning Sentry" },
    { tree: 2, x: 1, y: 5, name: "Death Sentry" },
  ],
  necromancer: [
    // Summoning Spells
    { tree: 0, x: 0, y: 0, name: "Skeleton Mastery" },
    { tree: 0, x: 2, y: 0, name: "Raise Skeleton Warrior" },
    { tree: 0, x: 1, y: 1, name: "Clay Golem" },
    { tree: 0, x: 0, y: 2, name: "Golem Mastery" },
    { tree: 0, x: 2, y: 2, name: "Raise Skeletal Mage" },
    { tree: 0, x: 1, y: 3, name: "Blood Golem" },
    { tree: 0, x: 0, y: 4, name: "Blood Warp" },
    { tree: 0, x: 1, y: 4, name: "Iron Golem" },
    { tree: 0, x: 2, y: 4, name: "Raise Skeleton Archer" },
    { tree: 0, x: 1, y: 5, name: "Fire Golem" },
    { tree: 0, x: 2, y: 5, name: "Revive" },

    // Poison and Bone Spells
    { tree: 1, x: 0, y: 0, name: "Poison Strike" },
    { tree: 1, x: 1, y: 0, name: "Teeth" },
    { tree: 1, x: 0, y: 1, name: "Corpse Explosion" },
    { tree: 1, x: 2, y: 1, name: "Bone Armor" },
    { tree: 1, x: 0, y: 2, name: "Desecrate" },
    { tree: 1, x: 2, y: 2, name: "Bone Wall" },
    { tree: 1, x: 1, y: 3, name: "Bone Spear" },
    { tree: 1, x: 2, y: 4, name: "Bone Prison" },
    { tree: 1, x: 0, y: 5, name: "Poison Nova" },
    { tree: 1, x: 1, y: 5, name: "Bone Spirit" },

    // Curses
    { tree: 2, x: 1, y: 0, name: "Amplify Damage" },
    { tree: 2, x: 2, y: 0, name: "Curse Mastery" },
    { tree: 2, x: 0, y: 1, name: "Dark Pact" },
    { tree: 2, x: 2, y: 1, name: "Dim Vision" },
    { tree: 2, x: 0, y: 2, name: "Iron Maiden" },
    { tree: 2, x: 1, y: 2, name: "Life Tap" },
    { tree: 2, x: 2, y: 2, name: "Terror" },
    { tree: 2, x: 1, y: 3, name: "Weaken" },
    { tree: 2, x: 2, y: 3, name: "Confuse" },
    { tree: 2, x: 0, y: 4, name: "Decrepify" },
    { tree: 2, x: 2, y: 4, name: "Attract" },
    { tree: 2, x: 1, y: 5, name: "Lower Resist" },
  ],
  barbarian: [
    // Warcries
    { tree: 0, x: 0, y: 0, name: "Howl" },
    { tree: 0, x: 2, y: 0, name: "Find Potion" },
    { tree: 0, x: 0, y: 1, name: "Shout" },
    { tree: 0, x: 1, y: 1, name: "War Cry" },
    { tree: 0, x: 2, y: 2, name: "Find Item" },
    { tree: 0, x: 1, y: 3, name: "Taunt" },
    { tree: 0, x: 0, y: 4, name: "Battle Orders" },
    { tree: 0, x: 2, y: 4, name: "Grim Ward" },
    { tree: 0, x: 0, y: 5, name: "Battle Command" },
    { tree: 0, x: 1, y: 5, name: "Battle Cry" },

    // Combat Masteries
    { tree: 1, x: 0, y: 0, name: "General Mastery" },
    { tree: 1, x: 2, y: 0, name: "Throwing Mastery" },
    { tree: 1, x: 1, y: 1, name: "Polearm and Spear Mastery" },
    { tree: 1, x: 0, y: 2, name: "Combat Reflexes" },
    { tree: 1, x: 2, y: 3, name: "Iron Skin" },
    { tree: 1, x: 0, y: 4, name: "Increased Speed" },
    { tree: 1, x: 1, y: 5, name: "Natural Resistance" },
    { tree: 1, x: 2, y: 5, name: "Deep Wounds" },

    // Combat Skills
    { tree: 2, x: 0, y: 0, name: "Bash" },
    { tree: 2, x: 1, y: 0, name: "Double Swing" },
    { tree: 2, x: 0, y: 1, name: "Stun" },
    { tree: 2, x: 2, y: 1, name: "Frenzy" },
    { tree: 2, x: 0, y: 2, name: "Concentrate" },
    { tree: 2, x: 1, y: 2, name: "Double Throw" },
    { tree: 2, x: 2, y: 2, name: "Leap" },
    { tree: 2, x: 0, y: 4, name: "Leap Attack" },
    { tree: 2, x: 1, y: 4, name: "Berserk" },
    { tree: 2, x: 1, y: 5, name: "Whirlwind" },
  ],
  paladin: [
    // Defensive Auras
    { tree: 0, x: 0, y: 0, name: "Prayer" },
    { tree: 0, x: 2, y: 0, name: "Resist Fire" },
    { tree: 0, x: 1, y: 1, name: "Defiance" },
    { tree: 0, x: 2, y: 1, name: "Resist Cold" },
    { tree: 0, x: 0, y: 2, name: "Cleansing" },
    { tree: 0, x: 2, y: 2, name: "Resist Lightning" },
    { tree: 0, x: 1, y: 3, name: "Vigor" },
    { tree: 0, x: 0, y: 4, name: "Meditation" },
    { tree: 0, x: 1, y: 5, name: "Redemption" },
    { tree: 0, x: 2, y: 5, name: "Salvation" },

    // Offensive Auras
    { tree: 1, x: 0, y: 0, name: "Might" },
    { tree: 1, x: 1, y: 1, name: "Holy Fire" },
    { tree: 1, x: 2, y: 1, name: "Thorns" },
    { tree: 1, x: 0, y: 2, name: "Blessed Aim" },
    { tree: 1, x: 0, y: 3, name: "Concentration" },
    { tree: 1, x: 1, y: 3, name: "Holy Freeze" },
    { tree: 1, x: 1, y: 4, name: "Holy Shock" },
    { tree: 1, x: 2, y: 4, name: "Sanctuary" },
    { tree: 1, x: 0, y: 5, name: "Fanaticism" },
    { tree: 1, x: 2, y: 5, name: "Conviction" },

    // Combat Skills
    { tree: 2, x: 0, y: 0, name: "Sacrifice" },
    { tree: 2, x: 1, y: 0, name: "Holy Bolt" },
    { tree: 2, x: 2, y: 0, name: "Smite" },
    { tree: 2, x: 0, y: 1, name: "Zeal" },
    { tree: 2, x: 1, y: 2, name: "Holy Light" },
    { tree: 2, x: 2, y: 2, name: "Charge" },
    { tree: 2, x: 0, y: 3, name: "Vengeance" },
    { tree: 2, x: 1, y: 3, name: "Blessed Hammer" },
    { tree: 2, x: 2, y: 3, name: "Holy Sword" },
    { tree: 2, x: 0, y: 4, name: "Joust" },
    { tree: 2, x: 1, y: 4, name: "Fist of the Heavens" },
    { tree: 2, x: 2, y: 4, name: "Holy Shield" },
    { tree: 2, x: 1, y: 5, name: "Holy Nova" },
  ],

  sorceress: [
    // Cold Spells
    { tree: 0, x: 1, y: 0, name: "Ice Bolt" },
    { tree: 0, x: 2, y: 0, name: "Cold Enchant" },
    { tree: 0, x: 0, y: 1, name: "Frost Nova" },
    { tree: 0, x: 1, y: 1, name: "Ice Blast" },
    { tree: 0, x: 2, y: 2, name: "Shiver Armor" },
    { tree: 0, x: 1, y: 3, name: "Glacial Spike" },
    { tree: 0, x: 0, y: 4, name: "Blizzard" },
    { tree: 0, x: 1, y: 4, name: "Ice Barrage" },
    { tree: 0, x: 2, y: 4, name: "Chilling Armor" },
    { tree: 0, x: 0, y: 5, name: "Frozen Orb" },
    { tree: 0, x: 1, y: 5, name: "Cold Mastery" },

    // Lightning Spells
    { tree: 1, x: 0, y: 0, name: "Static Field" },
    { tree: 1, x: 1, y: 0, name: "Charged Bolt" },
    { tree: 1, x: 2, y: 0, name: "Telekinesis" },
    { tree: 1, x: 0, y: 2, name: "Nova" },
    { tree: 1, x: 1, y: 2, name: "Lightning" },
    { tree: 1, x: 2, y: 3, name: "Teleport" },
    { tree: 1, x: 0, y: 4, name: "Thunder Storm" },
    { tree: 1, x: 1, y: 4, name: "Chain Lightning" },
    { tree: 1, x: 1, y: 5, name: "Lightning Mastery" },
    { tree: 1, x: 2, y: 5, name: "Energy Shield" },

    // Fire Spells
    { tree: 2, x: 0, y: 0, name: "Inferno" },
    { tree: 2, x: 1, y: 0, name: "Fire Bolt" },
    { tree: 2, x: 2, y: 0, name: "Warmth" },
    { tree: 2, x: 0, y: 1, name: "Blaze" },
    { tree: 2, x: 0, y: 2, name: "Fire Wall" },
    { tree: 2, x: 1, y: 2, name: "Fire Ball" },
    { tree: 2, x: 2, y: 2, name: "Lesser Hydra" },
    { tree: 2, x: 2, y: 3, name: "Enchant Fire" },
    { tree: 2, x: 0, y: 4, name: "Meteor" },
    { tree: 2, x: 1, y: 4, name: "Combustion" },
    { tree: 2, x: 1, y: 5, name: "Fire Mastery" },
    { tree: 2, x: 2, y: 5, name: "Hydra" },
  ],

  druid: [
    // Elemental Skills
    { tree: 0, x: 0, y: 0, name: "Firestorm" },
    { tree: 0, x: 2, y: 0, name: "Arctic Blast" },
    { tree: 0, x: 0, y: 1, name: "Molten Boulder" },
    { tree: 0, x: 2, y: 1, name: "Cyclone Armor" },
    { tree: 0, x: 0, y: 2, name: "Fissure" },
    { tree: 0, x: 1, y: 2, name: "Twister" },
    { tree: 0, x: 2, y: 3, name: "Gust" },
    { tree: 0, x: 0, y: 4, name: "Volcano" },
    { tree: 0, x: 1, y: 4, name: "Tornado" },
    { tree: 0, x: 0, y: 5, name: "Armageddon" },
    { tree: 0, x: 1, y: 5, name: "Hurricane" },

    // Shape Shifting Skills
    { tree: 1, x: 0, y: 0, name: "Werewolf" },
    { tree: 1, x: 1, y: 0, name: "Lycanthropy" },
    { tree: 1, x: 2, y: 0, name: "Werebear" },
    { tree: 1, x: 0, y: 1, name: "Feral Rage" },
    { tree: 1, x: 2, y: 1, name: "Maul" },
    { tree: 1, x: 1, y: 2, name: "Hunger" },
    { tree: 1, x: 0, y: 3, name: "Rabies" },
    { tree: 1, x: 2, y: 3, name: "Shock Wave" },
    { tree: 1, x: 1, y: 4, name: "Fire Claws" },
    { tree: 1, x: 0, y: 5, name: "Fury" },

    // Summoning Skills
    { tree: 2, x: 1, y: 0, name: "Raven" },
    { tree: 2, x: 2, y: 0, name: "Poison Creeper" },
    { tree: 2, x: 0, y: 1, name: "Heart of Wolverine" },
    { tree: 2, x: 1, y: 2, name: "Summon Spirit Wolf" },
    { tree: 2, x: 2, y: 2, name: "Carrion Vine" },
    { tree: 2, x: 0, y: 3, name: "Spirit of Barbs" },
    { tree: 2, x: 1, y: 4, name: "Summon Dire Wolf" },
    { tree: 2, x: 2, y: 4, name: "Solar Creeper" },
    { tree: 2, x: 0, y: 5, name: "Oak Sage" },
    { tree: 2, x: 1, y: 5, name: "Summon Grizzly" },
  ],
};

export function getSkillIconSrc(
  characterClass: CharacterClass,
  skill: SkillTreeIcon
) {
  const treeDirectoryNames: Record<CharacterClass, [string, string, string]> = {
    amazon: ["javelin-and-spear", "passive-and-magic", "bow-and-crossbow"],
    assassin: ["martial-arts", "shadow-disciplines", "traps"],
    necromancer: ["summoning", "poison-and-bone", "curses"],
    barbarian: ["warcries", "combat-masteries", "combat-skills"],
    paladin: ["defensive-auras", "offensive-auras", "combat"],
    druid: ["elemental", "shape-shifting", "summoning"],
    sorceress: ["cold", "lightning", "fire"],
  };

  const treeDir = treeDirectoryNames[characterClass][skill.tree];
  return new URL(
    `../assets/skills/${characterClass}/${treeDir}/${skill.name}.png`,
    import.meta.url
  ).href;
}
