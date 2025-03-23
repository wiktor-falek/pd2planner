import { toRaw } from "vue";
import * as modifiers from "./modifiers";
import type { ItemModifier } from "./modifiers";
import { bases } from "./bases";
import type { Item, ItemOptions } from "./bases";

export function createItemCopy(item: Item): Item {
	const copy = structuredClone(toRaw(item));
	copy.id = crypto.randomUUID();
	return copy;
}

function baseToUnique(
	base: Item,
	name: string,
	affixes: ItemModifier[],
	options?: ItemOptions
): Item {
	return { ...base, name, rarity: "unique", affixes, ...options };
}

// Normal Unique Helms

const BigginsBonnet = baseToUnique(
	bases.helmets["Cap"],
	"Biggin's Bonnet",
	[
		modifiers.enhancedDamageModifier([30, 50]),
		modifiers.attackRatingModifier([30, 50]),
		modifiers.defenseModifier(14),
		modifiers.lifeModifier(15),
		modifiers.manaModifier(15),
		modifiers.defenseModifier(15),
	],
	{
		requirements: { level: 3 },
	}
);

const Tarnhelm = baseToUnique(
	bases.helmets["Skull Cap"],
	"Tarnhelm",
	[
		modifiers.allSkillsModifier(1),
		modifiers.manaAfterEachKillModifier([2, 3]),
		modifiers.goldFindModifier(75),
		modifiers.magicFindModifier([25, 50]),
	],
	{
		requirements: {
			level: 15,
			strength: 15,
		},
	}
);

const CoifOfGlory = baseToUnique(
	bases.helmets["Helm"],
	"Coif of Glory",
	[
		modifiers.hitBlindsTargetModifier(),
		modifiers.defenseModifier(10),
		modifiers.defenseVsMissileModifier(100),
		modifiers.lightningResistModifier(15),
		modifiers.lifeAfterEachKillModifier([2, 3]),
		modifiers.thornsLightningModifier(17),
	],
	{
		requirements: {
			level: 14,
			strength: 26,
		},
	}
);

const Duskdeep = baseToUnique(
	bases.helmets["Full Helm"],
	"Duskdeep",
	[
		modifiers.maximumDamageModifier([10, 15]),
		modifiers.enhancedDefenseModifier([30, 50]),
		modifiers.defenseModifier([10, 20]),
		modifiers.allResistModifier(15),
		modifiers.flatPhysicalDamageReducedModifier(7),
		modifiers.lightRadiusModifier(-2),
	],
	{
		requirements: {
			level: 17,
			strength: 41,
		},
	}
);

const TheFaceOfHorror = baseToUnique(
	bases.helmets["Mask"],
	"The Face of Horror",
	[
		modifiers.damageToUndeadModifier(50),
		modifiers.chanceToFleeModifier(50),
		modifiers.defenseModifier(25),
		modifiers.strengthModifier(20),
		modifiers.allResistModifier([15, 20]),
	],
	{
		requirements: {
			level: 20,
			strength: 23,
		},
	}
);

const Wormskull = baseToUnique(
	bases.helmets["Bone Helm"],
	"Wormskull",
	[
		modifiers.poisonAndBoneSkillsModifier(1),
		modifiers.necromancerSkillsModifier(1),
		modifiers.poisonDamageOverTwoSecondsModifier(60),
		modifiers.lifeStolenPerHitModifier(5),
		modifiers.manaModifier(10),
		modifiers.poisonResistModifier(25),
	],
	{
		requirements: {
			level: 21,
			strength: 25,
		},
	}
);

const Howltusk = baseToUnique(
	bases.helmets["Great Helm"],
	"Howltusk",
	[
		modifiers.howlLevelFiveOnStrikingModifier(10),
		modifiers.attackSpeedModifier(20),
		modifiers.enhancedDefenseModifier(80),
		modifiers.flatMagicDamageReducedModifier(2),
		modifiers.thornsModifier(30),
		modifiers.damageTakenGainedAsManaModifier(35),
	],
	{
		requirements: {
			level: 25,
			strength: 63,
		},
	}
);

const UndeadCrown = baseToUnique(
	bases.helmets["Crown"],
	"Undead Crown",
	[
		modifiers.damageToUndeadModifier(50),
		modifiers.attackRatingAgainstUndeadModifier([50, 100]),
		modifiers.lifeStolenPerHitModifier(5),
		modifiers.skeletonMasteryModifier([2, 3]),
		modifiers.raiseSkeletonModifier([2, 3]),
		modifiers.defenseModifier(40),
		modifiers.poisonResistModifier(50),
		modifiers.halfFreezeDurationModifier(),
	],
	{
		requirements: {
			level: 29,
			strength: 55,
		},
	}
);

// Exceptional Helms

const PeasantCrown = baseToUnique(
	bases.helmets["War Hat"],
	"Peasant Crown",
	[
		modifiers.allSkillsModifier(1),
		modifiers.fasterRunWalkModifier(20),
		modifiers.enhancedDefenseModifier(100),
		modifiers.vitalityModifier(20),
		modifiers.energyModifier(20),
		modifiers.replenishLifeModifier([6, 12]),
	],
	{
		requirements: {
			level: 28,
			strength: 20,
		},
	}
);

const Rockstopper = baseToUnique(
	bases.helmets["Sallet"],
	"Rockstopper",
	[
		modifiers.fasterHitRecoveryModifier(30),
		modifiers.enhancedDefenseModifier([160, 220]),
		modifiers.vitalityModifier(15),
		modifiers.coldResistModifier([20, 40]),
		modifiers.fireResistModifier([20, 40]),
		modifiers.lightningResistModifier([20, 40]),
		modifiers.physicalDamageReducedModifier(10),
	],
	{
		requirements: {
			level: 31,
			strength: 43,
		},
	}
);

const Stealskull = baseToUnique(
	bases.helmets["Casque"],
	"Stealskull",
	[
		modifiers.attackSpeedModifier(20),
		modifiers.fasterHitRecoveryModifier(20),
		modifiers.manaStolenPerHitModifier([3, 5]),
		modifiers.lifeStolenPerHitModifier([3, 5]),
		modifiers.enhancedDefenseModifier([200, 240]),
		modifiers.magicFindModifier([30, 50]),
	],
	{
		requirements: {
			level: 35,
			strength: 59,
		},
	}
);

const DarksightHelm = baseToUnique(
	bases.helmets["Basinet"],
	"Darksight Helm",
	[
		modifiers.dimVisionLevelThreeWhenStruckModifier(16),
		modifiers.manaStolenPerHitModifier(5),
		modifiers.hitBlindsTargetModifier(),
		modifiers.defensePerLevelModifier(3),
		modifiers.fireResistModifier([20, 40]),
		modifiers.cannotBeFrozenModifier(),
		modifiers.lightRadiusModifier(-4),
		modifiers.cloakOfShadowsModifier(1),
	],
	{
		requirements: {
			level: 38,
			strength: 82,
		},
	}
);

const BlackhornsFace = baseToUnique(
	bases.helmets["Death Mask"],
	"Blackhorn's Face",
	[
		modifiers.preventMonsterHealModifier(),
		modifiers.slowTargetModifier(20),
		modifiers.enhancedDefenseModifier([180, 220]),
		modifiers.maxLightningResistModifier(5),
		modifiers.lightningResistModifier([20, 30]),
		modifiers.lightningAbsorbModifier([10, 20]),
		modifiers.thornsLightningModifier([225, 325]),
	],
	{
		requirements: {
			level: 41,
			strength: 55,
		},
	}
);

const VampireGaze = baseToUnique(
	bases.helmets["Grim Helm"],
	"Vampire Gaze",
	[
		modifiers.addsColdDamageModifier(30, 60),
		modifiers.manaStolenPerHitModifier([6, 10]),
		modifiers.lifeStolenPerHitModifier([6, 10]),
		modifiers.enhancedDefenseModifier(100),
		modifiers.slowerStaminaDrainModifier(15),
		modifiers.physicalDamageReducedModifier([15, 25]),
		modifiers.flatMagicDamageReducedModifier([10, 15]),
	],
	{
		requirements: {
			level: 41,
			strength: 58,
		},
	}
);

const ValkyrieWing = baseToUnique(
	bases.helmets["Winged Helm"],
	"Valkyrie Wing",
	[
		modifiers.amazonSkillsModifier([1, 2]),
		modifiers.fasterRunWalkModifier(30),
		modifiers.fasterHitRecoveryModifier(30),
		modifiers.enhancedDamageModifier([40, 60]),
		modifiers.enhancedDefenseModifier([150, 200]),
		modifiers.manaAfterEachKillModifier([3, 6]),
	],
	{
		requirements: {
			level: 44,
			strength: 115,
		},
	}
);

const CrownOfThieves = baseToUnique(
	bases.helmets["Grand Crown"],
	"Crown of Thieves",
	[
		modifiers.lifeStolenPerHitModifier([5, 10]),
		modifiers.enhancedDefenseModifier([160, 200]),
		modifiers.dexterityModifier(25),
		modifiers.lifeModifier(50),
		modifiers.fireResistModifier(33),
		modifiers.goldFindModifier([80, 100]),
		modifiers.magicFindModifier([40, 65]),
	],
	{
		requirements: {
			level: 49,
			strength: 103,
		},
	}
);

// Elite Helms
const HarlequinCrest = baseToUnique(
	bases.helmets["Shako"],
	"Harlequin Crest",
	[
		modifiers.allSkillsModifier(2),
		modifiers.allAttributesModifier(2),
		modifiers.lifePerLevelModifier(1),
		modifiers.manaPerLevelModifier(1),
		modifiers.physicalDamageReducedModifier([3, 5]),
		modifiers.magicFindModifier([25, 50]),
	],
	{
		requirements: {
			level: 62,
			strength: 50,
		},
	}
);

const SteelShade = baseToUnique(
	bases.helmets["Armet"],
	"Steel Shade",
	[
		modifiers.allSkillsModifier(2),
		modifiers.fasterBlockRateModifier(20),
		modifiers.increasedChanceOfBlockingModifier(20),
		modifiers.manaStolenPerHitModifier([4, 8]),
		modifiers.enhancedDefenseModifier([100, 130]),
		modifiers.replenishLifeModifier([30, 48]),
		modifiers.fireAbsorbModifier([4, 6]),
		modifiers.goldFindModifier([60, 80]),
	],
	{
		requirements: {
			level: 62,
			strength: 109,
		},
	}
);

// // const AndarielsVisage = baseToUnique(
// // 	"Demonhead",
// // 	"Andariel's Visage",
// // 	[],
// // 	{
//      requirements: {
// // 		level: 83,
// // 		strength: 102,
// }
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// // const Template = baseToUnique(
// // 	"",
// // 	"",
// // 	[
// // 	],
// // 	{
//      requirements: {
// // 		level: 0,
// // 		strength: 0,
// }
// // 		requiredDexterity: 0,
// // 	}
// // );

// const NightwingsVeil = baseToUnique(
// 	"Spired Helm",
// 	"Nightwing's Veil",
// 	[
// 		modifiers.allSkillsModifier(2),
// 		modifiers.enemyColdResistanceModifier([5, 10]),
// 		modifiers.coldSkillDamageModifier([10, 15]),
// 		modifiers.enhancedDefenseModifier([90, 120]),
// 		modifiers.dexterityModifier([10, 20]),
// 		modifiers.coldAbsorbModifier([5, 9]),
// 		modifiers.halfFreezeDurationModifier(),
// 		modifiers.requirementsModifier(50),
// 	],
// 	{
//      requirements: {
// 		level: 67,
// 		strength: 96,
// }
// 	}
// );

export const uniques = {
	helmets: {
		BigginsBonnet,
		Tarnhelm,
		CoifOfGlory,
		Duskdeep,
		TheFaceOfHorror,
		Wormskull,
		Howltusk,
		UndeadCrown,
		PeasantCrown,
		Rockstopper,
		Stealskull,
		DarksightHelm,
		BlackhornsFace,
		VampireGaze,
		ValkyrieWing,
		CrownOfThieves,
		HarlequinCrest,
		SteelShade,
		// NightwingsVeil,
	},
} as const;
