import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToMagic } from "../items";

// Plain Skillers
const AmazonJavelinAndSpearSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Javelin and Spear Skiller",
	[modifiers.amazonJavelinAndSpearSkills(1)]
);

const AmazonPassiveAndMagicSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Passive and Magic Skiller",
	[modifiers.amazonPassiveAndMagicSkills(1)]
);

const AmazonBowAndCrossbowSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Bow and Crossbow Skiller",
	[modifiers.amazonBowAndCrossbowSkills(1)]
);

const AssassinMartialArtsSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Assassin Martial Arts Skiller",
	[modifiers.assassinMartialArtsSkills(1)]
);

const AssassinShadowDisciplinesSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Assassin Shadow Disciplines Skiller",
	[modifiers.assassinShadowDisciplinesSkills(1)]
);

const AssassinTrapsSkiller = baseToMagic(bases.charm["Grand Charm"], "Assassin Traps Skiller", [
	modifiers.assassinTrapsSkills(1),
]);

const NecromancerSummoningSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Summoning Skiller",
	[modifiers.necromancerSummoningSkills(1)]
);

const NecromancerPoisonAndBoneSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Poison and Bone Skiller",
	[modifiers.necromancerPoisonAndBoneSkills(1)]
);

const NecromancerCursesSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Curses Skiller",
	[modifiers.necromancerCursesSkills(1)]
);

const BarbarianWarcriesSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Warcries Skiller",
	[modifiers.barbarianWarcriesSkills(1)]
);

const BarbarianCombatMasteriesSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Combat Masteries Skiller",
	[modifiers.barbarianCombatMasteriesSkills(1)]
);

const BarbarianCombatSkillsSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Combat Skills Skiller",
	[modifiers.barbarianCombatSkillsSkills(1)]
);

const PaladinDefensiveAurasSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Paladin Defensive Auras Skiller",
	[modifiers.paladinDefensiveAurasSkills(1)]
);

const PaladinOffensiveAurasSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Paladin Offensive Auras Skiller",
	[modifiers.paladinOffensiveAurasSkills(1)]
);

const PaladinCombatSkiller = baseToMagic(bases.charm["Grand Charm"], "Paladin Combat Skiller", [
	modifiers.paladinCombatSkills(1),
]);

const SorceressColdSkiller = baseToMagic(bases.charm["Grand Charm"], "Sorceress Cold Skiller", [
	modifiers.sorceressColdSkills(1),
]);

const SorceressLightningSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Sorceress Lightning Skiller",
	[modifiers.sorceressLightningSkills(1)]
);

const SorceressFireSkiller = baseToMagic(bases.charm["Grand Charm"], "Sorceress Fire Skiller", [
	modifiers.sorceressFireSkills(1),
]);

const DruidElementalSkiller = baseToMagic(bases.charm["Grand Charm"], "Druid Elemental Skiller", [
	modifiers.druidElementalSkills(1),
]);

const DruidShapeShiftingSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Druid Shape Shifting Skiller",
	[modifiers.druidShapeShiftingSkills(1)]
);

const DruidSummoningSkiller = baseToMagic(bases.charm["Grand Charm"], "Druid Summoning Skiller", [
	modifiers.druidSummoningSkills(1),
]);

// Life Skillers
const AmazonJavelinAndSpearLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Javelin and Spear Life Skiller",
	[modifiers.amazonJavelinAndSpearSkills(1), modifiers.life([5, 45])]
);

const AmazonPassiveAndMagicLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Passive and Magic Life Skiller",
	[modifiers.amazonPassiveAndMagicSkills(1), modifiers.life([5, 45])]
);

const AmazonBowAndCrossbowLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Amazon Bow and Crossbow Life Skiller",
	[modifiers.amazonBowAndCrossbowSkills(1), modifiers.life([5, 45])]
);

const AssassinMartialArtsLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Assassin Martial Arts Life Skiller",
	[modifiers.assassinMartialArtsSkills(1), modifiers.life([5, 45])]
);

const AssassinShadowDisciplinesLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Assassin Shadow Disciplines Life Skiller",
	[modifiers.assassinShadowDisciplinesSkills(1), modifiers.life([5, 45])]
);

const AssassinTrapsLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Assassin Traps Life Skiller",
	[modifiers.assassinTrapsSkills(1), modifiers.life([5, 45])]
);

const NecromancerSummoningLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Summoning Life Skiller",
	[modifiers.necromancerSummoningSkills(1), modifiers.life([5, 45])]
);

const NecromancerPoisonAndBoneLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Poison and Bone Life Skiller",
	[modifiers.necromancerPoisonAndBoneSkills(1), modifiers.life([5, 45])]
);

const NecromancerCursesLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Necromancer Curses Life Skiller",
	[modifiers.necromancerCursesSkills(1), modifiers.life([5, 45])]
);

const BarbarianWarcriesLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Warcries Life Skiller",
	[modifiers.barbarianWarcriesSkills(1), modifiers.life([5, 45])]
);

const BarbarianCombatMasteriesLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Combat Masteries Life Skiller",
	[modifiers.barbarianCombatMasteriesSkills(1), modifiers.life([5, 45])]
);

const BarbarianCombatSkillsLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Barbarian Combat Skills Life Skiller",
	[modifiers.barbarianCombatSkillsSkills(1), modifiers.life([5, 45])]
);

const PaladinDefensiveAurasLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Paladin Defensive Auras Life Skiller",
	[modifiers.paladinDefensiveAurasSkills(1), modifiers.life([5, 45])]
);

const PaladinOffensiveAurasLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Paladin Offensive Auras Life Skiller",
	[modifiers.paladinOffensiveAurasSkills(1), modifiers.life([5, 45])]
);

const PaladinCombatLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Paladin Combat Life Skiller",
	[modifiers.paladinCombatSkills(1), modifiers.life([5, 45])]
);

const SorceressColdLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Sorceress Cold Life Skiller",
	[modifiers.sorceressColdSkills(1), modifiers.life([5, 45])]
);

const SorceressLightningLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Sorceress Lightning Life Skiller",
	[modifiers.sorceressLightningSkills(1), modifiers.life([5, 45])]
);

const SorceressFireLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Sorceress Fire Life Skiller",
	[modifiers.sorceressFireSkills(1), modifiers.life([5, 45])]
);

const DruidElementalLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Druid Elemental Life Skiller",
	[modifiers.druidElementalSkills(1), modifiers.life([5, 45])]
);

const DruidShapeShiftingLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Druid Shape Shifting Life Skiller",
	[modifiers.druidShapeShiftingSkills(1), modifiers.life([5, 45])]
);

const DruidSummoningLifeSkiller = baseToMagic(
	bases.charm["Grand Charm"],
	"Druid Summoning Life Skiller",
	[modifiers.druidSummoningSkills(1), modifiers.life([5, 45])]
);

export const charm = {
	AmazonJavelinAndSpearSkiller,
	AmazonPassiveAndMagicSkiller,
	AmazonBowAndCrossbowSkiller,
	AssassinMartialArtsSkiller,
	AssassinShadowDisciplinesSkiller,
	AssassinTrapsSkiller,
	NecromancerSummoningSkiller,
	NecromancerPoisonAndBoneSkiller,
	NecromancerCursesSkiller,
	BarbarianWarcriesSkiller,
	BarbarianCombatMasteriesSkiller,
	BarbarianCombatSkillsSkiller,
	PaladinDefensiveAurasSkiller,
	PaladinOffensiveAurasSkiller,
	PaladinCombatSkiller,
	SorceressColdSkiller,
	SorceressLightningSkiller,
	SorceressFireSkiller,
	DruidElementalSkiller,
	DruidShapeShiftingSkiller,
	DruidSummoningSkiller,
	AmazonJavelinAndSpearLifeSkiller,
	AmazonPassiveAndMagicLifeSkiller,
	AmazonBowAndCrossbowLifeSkiller,
	AssassinMartialArtsLifeSkiller,
	AssassinShadowDisciplinesLifeSkiller,
	AssassinTrapsLifeSkiller,
	NecromancerSummoningLifeSkiller,
	NecromancerPoisonAndBoneLifeSkiller,
	NecromancerCursesLifeSkiller,
	BarbarianWarcriesLifeSkiller,
	BarbarianCombatMasteriesLifeSkiller,
	BarbarianCombatSkillsLifeSkiller,
	PaladinDefensiveAurasLifeSkiller,
	PaladinOffensiveAurasLifeSkiller,
	PaladinCombatLifeSkiller,
	SorceressColdLifeSkiller,
	SorceressLightningLifeSkiller,
	SorceressFireLifeSkiller,
	DruidElementalLifeSkiller,
	DruidShapeShiftingLifeSkiller,
	DruidSummoningLifeSkiller,
} as const satisfies Record<string, Item>;
