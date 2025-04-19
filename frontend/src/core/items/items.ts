import * as modifiers from "./modifiers";
import type { ItemModifier } from "./modifiers";
import { bases } from "./bases";
import type { Item, ItemOptions } from "./bases";
import type { ItemBaseType } from "../../types";
import { toRawDeep } from "../../utils";

export function createItemCopy(item: Item): Item {
	const copy = structuredClone(toRawDeep(item));
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
	bases.helmet["Cap"],
	"Biggin's Bonnet",
	[
		modifiers.hybridEnhancedDamageAttackRating([40, 60], [150, 200]),
		modifiers.enhancedDamage([30, 50]),
		modifiers.attackRating([30, 50]),
		modifiers.defense(14),
		modifiers.life(15),
		modifiers.mana(15),
		modifiers.defense(15),
	],
	{
		requirements: { level: 3 },
	}
);

const Tarnhelm = baseToUnique(
	bases.helmet["Skull Cap"],
	"Tarnhelm",
	[
		modifiers.allSkills(1),
		modifiers.manaAfterEachKill([2, 3]),
		modifiers.goldFind(75),
		modifiers.magicFind([25, 50]),
	],
	{
		requirements: {
			level: 15,
			strength: 15,
		},
	}
);

const CoifOfGlory = baseToUnique(
	bases.helmet["Helm"],
	"Coif of Glory",
	[
		modifiers.hitBlindsTarget(),
		modifiers.defense(10),
		modifiers.defenseVsMissile(100),
		modifiers.lightningResist(15),
		modifiers.lifeAfterEachKill([2, 3]),
		modifiers.thornsLightning(17),
	],
	{
		requirements: {
			level: 14,
			strength: 26,
		},
	}
);

const Duskdeep = baseToUnique(
	bases.helmet["Full Helm"],
	"Duskdeep",
	[
		modifiers.maximumDamage([10, 15]),
		modifiers.enhancedDefense([30, 50]),
		modifiers.defense([10, 20]),
		modifiers.allResist(15),
		modifiers.flatPhysicalDamageReduced(7),
		modifiers.lightRadius(-2),
	],
	{
		requirements: {
			level: 17,
			strength: 41,
		},
	}
);

const TheFaceOfHorror = baseToUnique(
	bases.helmet["Mask"],
	"The Face of Horror",
	[
		modifiers.damageToUndead(50),
		modifiers.chanceToFlee(50),
		modifiers.defense(25),
		modifiers.strength(20),
		modifiers.allResist([15, 20]),
	],
	{
		requirements: {
			level: 20,
			strength: 23,
		},
	}
);

const Wormskull = baseToUnique(
	bases.helmet["Bone Helm"],
	"Wormskull",
	[
		modifiers.poisonAndBoneSkills(1),
		modifiers.necromancerSkills(1),
		modifiers.poisonDamageOverSeconds(60, 2),
		modifiers.lifeStolenPerHit(5),
		modifiers.mana(10),
		modifiers.poisonResist(25),
	],
	{
		requirements: {
			level: 21,
			strength: 25,
		},
	}
);

const Howltusk = baseToUnique(
	bases.helmet["Great Helm"],
	"Howltusk",
	[
		modifiers.howlOnStriking(10, 5),
		modifiers.attackSpeed(20),
		modifiers.enhancedDefense(80),
		modifiers.flatMagicDamageReduced(2),
		modifiers.thorns(30),
		modifiers.damageTakenGainedAsMana(35),
	],
	{
		requirements: {
			level: 25,
			strength: 63,
		},
	}
);

const UndeadCrown = baseToUnique(
	bases.helmet["Crown"],
	"Undead Crown",
	[
		modifiers.damageToUndead(50),
		modifiers.attackRatingAgainstUndead([50, 100]),
		modifiers.lifeStolenPerHit(5),
		modifiers.skeletonMastery([2, 3]),
		modifiers.raiseSkeleton([2, 3]),
		modifiers.defense(40),
		modifiers.poisonResist(50),
		modifiers.halfFreezeDuration(),
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
	bases.helmet["War Hat"],
	"Peasant Crown",
	[
		modifiers.allSkills(1),
		modifiers.fasterRunWalk(20),
		modifiers.enhancedDefense(100),
		modifiers.vitality(20),
		modifiers.energy(20),
		modifiers.replenishLife([6, 12]),
	],
	{
		requirements: {
			level: 28,
			strength: 20,
		},
	}
);

const Rockstopper = baseToUnique(
	bases.helmet["Sallet"],
	"Rockstopper",
	[
		modifiers.fasterHitRecovery(30),
		modifiers.enhancedDefense([160, 220]),
		modifiers.vitality(15),
		modifiers.coldResist([20, 40]),
		modifiers.fireResist([20, 40]),
		modifiers.lightningResist([20, 40]),
		modifiers.physicalDamageReduced(10),
	],
	{
		requirements: {
			level: 31,
			strength: 43,
		},
	}
);

const Stealskull = baseToUnique(
	bases.helmet["Casque"],
	"Stealskull",
	[
		modifiers.attackSpeed(20),
		modifiers.fasterHitRecovery(20),
		modifiers.manaStolenPerHit([3, 5]),
		modifiers.lifeStolenPerHit([3, 5]),
		modifiers.enhancedDefense([200, 240]),
		modifiers.magicFind([30, 50]),
	],
	{
		requirements: {
			level: 35,
			strength: 59,
		},
	}
);

const DarksightHelm = baseToUnique(
	bases.helmet["Basinet"],
	"Darksight Helm",
	[
		modifiers.dimVisionWhenStruck(16, 3),
		modifiers.manaStolenPerHit(5),
		modifiers.hitBlindsTarget(),
		modifiers.defensePerLevel(3),
		modifiers.fireResist([20, 40]),
		modifiers.cannotBeFrozen(),
		modifiers.lightRadius(-4),
		modifiers.cloakOfShadows(1),
	],
	{
		requirements: {
			level: 38,
			strength: 82,
		},
	}
);

const BlackhornsFace = baseToUnique(
	bases.helmet["Death Mask"],
	"Blackhorn's Face",
	[
		modifiers.preventMonsterHeal(),
		modifiers.slowTarget(20),
		modifiers.enhancedDefense([180, 220]),
		modifiers.maxLightningResist(5),
		modifiers.lightningResist([20, 30]),
		modifiers.lightningAbsorb([10, 20]),
		modifiers.thornsLightning([225, 325]),
	],
	{
		requirements: {
			level: 41,
			strength: 55,
		},
	}
);

const VampireGaze = baseToUnique(
	bases.helmet["Grim Helm"],
	"Vampire Gaze",
	[
		modifiers.addsColdDamage(30, 60),
		modifiers.manaStolenPerHit([6, 10]),
		modifiers.lifeStolenPerHit([6, 10]),
		modifiers.enhancedDefense(100),
		modifiers.slowerStaminaDrain(15),
		modifiers.physicalDamageReduced([15, 25]),
		modifiers.flatMagicDamageReduced([10, 15]),
	],
	{
		requirements: {
			level: 41,
			strength: 58,
		},
	}
);

const ValkyrieWing = baseToUnique(
	bases.helmet["Winged Helm"],
	"Valkyrie Wing",
	[
		modifiers.amazonSkills([1, 2]),
		modifiers.fasterRunWalk(30),
		modifiers.fasterHitRecovery(30),
		modifiers.enhancedDamage([40, 60]),
		modifiers.enhancedDefense([150, 200]),
		modifiers.manaAfterEachKill([3, 6]),
	],
	{
		requirements: {
			level: 44,
			strength: 115,
		},
	}
);

const CrownOfThieves = baseToUnique(
	bases.helmet["Grand Crown"],
	"Crown of Thieves",
	[
		modifiers.lifeStolenPerHit([5, 10]),
		modifiers.enhancedDefense([160, 200]),
		modifiers.dexterity(25),
		modifiers.life(50),
		modifiers.fireResist(33),
		modifiers.goldFind([80, 100]),
		modifiers.magicFind([40, 65]),
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
	bases.helmet["Shako"],
	"Harlequin Crest",
	[
		modifiers.allSkills(2),
		modifiers.allAttributes(2),
		modifiers.lifePerLevel(1),
		modifiers.manaPerLevel(1),
		modifiers.physicalDamageReduced([3, 5]),
		modifiers.magicFind([25, 50]),
	],
	{
		requirements: {
			level: 62,
			strength: 50,
		},
	}
);

const SteelShade = baseToUnique(
	bases.helmet["Armet"],
	"Steel Shade",
	[
		modifiers.allSkills(2),
		modifiers.fasterBlockRate(20),
		modifiers.increasedChanceOfBlocking(20),
		modifiers.manaStolenPerHit([4, 8]),
		modifiers.enhancedDefense([100, 130]),
		modifiers.replenishLife([30, 48]),
		modifiers.fireAbsorb([4, 6]),
		modifiers.goldFind([60, 80]),
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
// 		modifiers.allSkills(2),
// 		modifiers.enemyColdResistance([5, 10]),
// 		modifiers.coldSkillDamage([10, 15]),
// 		modifiers.enhancedDefense([90, 120]),
// 		modifiers.dexterity([10, 20]),
// 		modifiers.coldAbsorb([5, 9]),
// 		modifiers.halfFreezeDuration(),
// 		modifiers.requirements(50),
// 	],
// 	{
//      requirements: {
// 		level: 67,
// 		strength: 96,
// }
// 	}
// );

export const uniques = {
	weapon: {},
	shield: {},
	quiver: {},
	helmet: {
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
	chest: {},
	gloves: {},
	boots: {},
	amulet: {},
	ring: {},
	belt: {},
} as const satisfies Record<ItemBaseType, Record<string, Item>>;
