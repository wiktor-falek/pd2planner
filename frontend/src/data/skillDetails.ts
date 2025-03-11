import type { CharacterClass } from "../types";

export interface SkillDetails {
  description: string;
  mechanics: string;
  levelRequirement: number;
  synergies: string;
  requires: string[];
}

export const skillDetails: Record<
  CharacterClass,
  { [skill: string]: SkillDetails }
> = {
  amazon: {
    // Javelin and Spear
    Jab: {
      description:
        " Attacks with a series of rapid thrusts\nusing a javelin or spear class weapon",
      levelRequirement: 1,
      mechanics: "Hits 3 times",
      synergies: "Fend: +18% Damage per Level",
      requires: [],
    },
    "Poison Javelin": {
      description:
        "Magically enhances your javelin\nto leave a trail of poison clouds",
      levelRequirement: 1,
      mechanics: "",
      synergies:
        "Plague Javelin: +24% Poison Damage per Level\nJavelin and Spear Mastery: +24% Poison Damage per Level",
      requires: [],
    },

    "Javelin and Spear Mastery": {
      description:
        " Increases damage and critical hit chance with\njavelin and spear class weapons",
      levelRequirement: 6,
      mechanics: "",
      synergies: "",
      requires: ["Jab"],
    },

    "Power Strike": {
      description:
        "Adds lightning damage to attacks with\njavelin and spear class weapons",
      levelRequirement: 6,
      mechanics: "Casts a small Nova that deals\nLightning Damage in an Area",
      synergies:
        "Lightning Strike: +20% Lightning Damage per Level\nLightning Strike: +20% Nova Lightning Damage per Level\nLightning Bolt: +20% Lightning Damage per Level\nLightning Bolt: +20% Nova Lightning Damage per Level\n",
      requires: ["Jab"],
    },

    "Lightning Bolt": {
      description: " Magically converts your javelin into a bolt of lightning",
      levelRequirement: 12,
      mechanics: "Converts 100% Physical Damage to Elemental Damage ",
      synergies:
        "Power Strike: +14% Lightning Damage per Level\nLightning Fury: +14% Lightning Damage per Level",
      requires: ["Jab", "Poison Javelin", "Power Strike"],
    },

    Fend: {
      description: " Attacks all adjacent targets",
      levelRequirement: 18,
      mechanics:
        "Hits 3 times\nAttack 2: +20% melee splash radius\nAttack 3: +40% melee splash radius",
      synergies: "Jab: +20% Damage per Level",
      requires: ["Jab", "Javelin and Spear Mastery"],
    },

    "Charged Strike": {
      description:
        "Adds lightning damage to javelin and spear class weapons\nand releases charged bolts upon impact",
      levelRequirement: 18,
      mechanics: "",
      synergies:
        "Power Strike: +8% Lightning Damage per Level\nLightning Strike: +8% Lightning Damage per Level",
      requires: ["Jab", "Power Strike"],
    },

    "Plague Javelin": {
      description:
        "Magically enhances your javelin to release\nexpanding clouds of poison upon impact",
      levelRequirement: 18,
      mechanics: "",
      synergies:
        "Poison Javelin: +12% Poison Damage per Level\nJavelin and Spear Mastery: +6% Poison Damage per Level",
      requires: ["Jab", "Poison Javelin", "Power Strike", "Lightning Bolt"],
    },

    "Lightning Strike": {
      description:
        "Adds lightning damage to javelin and spear class weapons\nand releases chain lightning upon impact",
      levelRequirement: 30,
      mechanics: "Range of Chaining: 10.67 yards",
      synergies:
        "Power Strike: +8% Lightning Damage per Level\nCharged Strike: +8% Lightning Damage per Level",
      requires: ["Jab", "Power Strike", "Charged Strike"],
    },

    "Lightning Fury": {
      description:
        "Changes a thrown javelin into a powerful\nbolt of lightning that splits on impact",
      levelRequirement: 30,
      mechanics: "",
      synergies:
        "Power Strike: +3% Lightning Damage per Level\nLightning Bolt: +3% Lightning Damage per Level",
      requires: [
        "Jab",
        "Poison Javelin",
        "Power Strike",
        "Lightning Bolt",
        "Plague Javelin",
      ],
    },

    // Passive and Magic
    "Inner Sight": {
      description:
        "Illuminates nearby enemies\nmaking them easier to hit\n for you and your party",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
    "Critical Strike": {
      description: "Passive - Your attacks have a chance to deal 1.5x damage",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
    Evade: {
      description:
        "Passive - You move faster and have a chance to dodge\na melee or missile attack when walking or running",
      levelRequirement: 6,
      mechanics: "",
      synergies: "",
      requires: [],
    },
    "Slow Movement": {
      description:
        " Illuminates nearby enemies and slows\ntheir ranged attacks and movement",
      levelRequirement: 12,
      mechanics: "",
      synergies: "",
      requires: ["Inner Sight "],
    },
    Pierce: {
      description:
        "Passive - Your missiles have a chance to\npass through enemies that they hit",
      levelRequirement: 12,
      mechanics: "",
      synergies: "",
      requires: ["Critical Strike"],
    },
    Dodge: {
      description:
        "Passive - You recover faster from attacks and have a chance to dodge\na melee or ranged attack when attacking\nor standing still",
      levelRequirement: 18,
      mechanics: "Cooldown: 0.16 seconds",
      synergies: "",
      requires: ["Inner Sight", "Evade", "Slow Movement"],
    },
    Decoy: {
      description:
        "Creates a duplicate of yourself that\nfires arrows at nearby enemies",
      levelRequirement: 18,
      mechanics: "Can summon an additional Decoy\n at base levels 10 and 20",
      synergies:
        "Strafe: +10% Damage per Level\nValkyrie: +10% Damage per Level\nCritical Strike\nPierce\nPenetrate",
      requires: ["Inner Sight", "Slow Movement"],
    },
    Penetrate: {
      description:
        "Passive - Increases your attack rating and lowers target defense",
      levelRequirement: 24,
      mechanics: "Reduces target defense by 2% per base level", // 3% + 2% per base level
      synergies: "",
      requires: ["Critical Strike", "Pierce"],
    },
    Valkyrie: {
      description: "Summons a powerful Valkyrie ally",
      levelRequirement: 30,
      mechanics:
        "Cooldown: 1 second\nCan summon an additional Valkyrie\nat levels 20 and 30\nWears randomly-generated equipment which can\n be viewed by using the inspect hotkey while\n hovering over them with the Unsummon skill ",
      synergies:
        "Decoy: +20% Physical Damage per Level (from Strength)\nPierce: +2% Lightning Resistance Penetration per Level\nPenetrate: +40 Attack Rating per Level\nPower Strike: +20% Lightning Damage per Level\nCritical Strike",
      requires: [],
    },

    // Bow and Crossbow
    "Magic Arrow": {
      description: "Creates a magical arrow or bolt\nthat does extra damage",
      mechanics:
        "Gains an additional arrow every 5 base levels\nChance to Pierce: 100%\n3/4 Weapon Damage",
      levelRequirement: 1,
      synergies:
        "Inner Sight: +20% Magic Damage per Level\nSlow Movement: +20% Magic Damage per Level\nGuided Arrow: +20% Magic Damage per Level",
      requires: [],
    },
    "Cold Arrow": {
      description:
        "Magically enhances your arrows or bolts\nby adding cold damage and a slowing effect\nCold arrows only do half of their regular damage",
      levelRequirement: 1,
      mechanics: "1/2 Weapon Damage\nCold Length: 1/0.4/0.2 seconds",
      synergies:
        "Magic Arrow: +17% Cold Damage per Level\nIce Arrow: +17% Cold Damage per Level",
      requires: ["Magic Arrow"],
    },
    "Multiple Shot": {
      description: "Magically splits one arrow or bolt into many",
      levelRequirement: 6,
      mechanics:
        "Arrows deal 20% reduced damage every time they pierce\nOnly the 3 middle arrows can proc effects",
      synergies: "",
      requires: ["Magic Arrow"],
    },
    "Fire Arrow": {
      description: "Magically enhances your arrows or bolts with fire",
      levelRequirement: 6,
      mechanics:
        "1/2 Weapon Damage\nConverts 50% Physical Damage to Elemental Damage ",
      synergies:
        "Magic Arrow: +18% Fire Damage per Level\nImmolation Arrow: +18% Fire Damage per Level",
      requires: ["Magic Arrow"],
    },
    "Ice Arrow": {
      description:
        "Magically enhances your arrow or bolt\nto freeze your enemies",
      levelRequirement: 12,
      mechanics: "",
      synergies:
        "Magic Arrow: +16% Cold Damage per Level\nCold Arrow: +10% Cold Damage per Level\nFreezing Arrow: +10% Cold Damage per Level\nCold Arrow: +5% Freeze Length per Level\nFreezing Arrow: +5% Freeze Length per Level",
      requires: [],
    },
    "Guided Arrow": {
      description:
        "Enhances your arrows and bolts\nto track your target\nor seek one of its own",
      levelRequirement: 18,
      mechanics: "Always hits\n",
      synergies: "Magic Arrow: +1% Magic Damage Conversion per Two Levels",
      requires: [],
    },
    "Exploding Arrow": {
      description:
        "Enchants an arrow or bolt that explodes on\ncontact, damaging all nearby enemies",
      levelRequirement: 18,
      mechanics: "Radius: 2 yards",
      synergies:
        "Magic Arrow: +18% Fire Damage per Level\nImmolation Arrow: +18% Fire Damage per Level",
      requires: ["Magic Arrow", "Fire Arrow"],
    },
    Strafe: {
      description:
        " Magically splits one arrow into several\nthat target multiple nearby enemies",
      levelRequirement: 24,
      mechanics: "",
      synergies: "Penetrate: +12% Damage per Level",
      requires: ["Magic Arrow", "Multiple Shot", "Guided Arrow"],
    },
    "Freezing Arrow": {
      description:
        "Magically enhances an arrow or bolt\nto freeze entire groups of monsters",
      levelRequirement: 30,
      mechanics: "Freeze Duration: 0.4 seconds",
      synergies:
        "Cold Arrow: +6% Cold Damage per Level\nIce Arrow: +6% Cold Damage per Level",
      requires: ["Magic Arrow", "Cold Arrow", "Ice Arrow"],
    },
    "Immolation Arrow": {
      description:
        "Enhances arrows or bolts to\ncause severe fire damage and\ncreates a pyre upon impact",
      levelRequirement: 30,
      mechanics: "Fire Burning Duration: 2 seconds",
      synergies:
        "Magic Arrow: +5% Average Fire Damage per Level\nExploding Arrow: +5% Fire Damage per Level\nFire Arrow: +5% Fire Damage per Level",
      requires: ["Magic Arrow", "Fire Arrow", "Exploding Arrow"],
    },
  },
  assassin: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
  necromancer: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
  barbarian: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
  paladin: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
  sorceress: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
  druid: {
    "": {
      description: "",
      levelRequirement: 1,
      mechanics: "",
      synergies: "",
      requires: [],
    },
  },
};
