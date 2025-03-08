interface SkillDetail {
  description: string;
  mechanics: string;
  levelRequirement: number;
  synergies: string;
}

export const skillDetails: { [skill: string]: SkillDetail } = {
  "Magic Arrow": {
    description: "Creates a magical arrow or bolt\nthat does extra damage",
    mechanics:
      "Gains an additional arrow every 5 base levels\n3/4 Weapon Damage",
    levelRequirement: 1,
    synergies:
      "Inner Sight: +20% Magic Damage per Level\nSlow Movement: +20% Magic Damage per Level\nGuided Arrow: +20% Magic Damage per Level",
  },
};
