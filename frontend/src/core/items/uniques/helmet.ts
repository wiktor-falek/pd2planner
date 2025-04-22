import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

// Normal Unique Helms

const BigginsBonnet = baseToUnique(
	bases.helmet["Cap"],
	"Biggin's Bonnet",
	[
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
		modifiers.skeletonMasteryNecromancerOnly([2, 3]),
		modifiers.raiseSkeletonNecromancerOnly([2, 3]),
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

const AndarielsVisage = baseToUnique(
	bases.helmet["Demonhead"],
	"Andariel's Visage",
	[
		modifiers.poisonNovaWhenStruck(15, 30),
		modifiers.allSkills(2),
		modifiers.attackSpeed(30),
		modifiers.lifeStolenPerHit([8, 10]),
		modifiers.enhancedDefense([100, 150]),
		modifiers.strength([25, 30]),
		modifiers.maxPoisonResist(8),
		modifiers.fireResist(-20),
		modifiers.poisonResist(70),
		modifiers.venomSkillCharges(3, 20),
	],
	{
		requirements: { level: 83, strength: 102 },
	}
);

const GiantSkull = baseToUnique(
	bases.helmet["Bone Visage"],
	"Giant Skull",
	[
		modifiers.chanceToPierce([25, 35]),
		modifiers.enhancedDamage([60, 80]),
		modifiers.crushingBlow(25),
		modifiers.knockback(),
		modifiers.baseDefense([250, 320]),
		modifiers.strength([25, 35]),
	],
	{
		requirements: { level: 65, strength: 106 },
	}
);

const VeilOfSteel = baseToUnique(
	bases.helmet["Spired Helm"],
	"Veil of Steel",
	[
		modifiers.allSkills(1),
		modifiers.enhancedDamage([40, 80]),
		modifiers.enhancedDefense([160, 220]),
		modifiers.baseDefense(140),
		modifiers.strength(15),
		modifiers.vitality(15),
		modifiers.allResist([25, 40]),
		// modifiers.durability(20)
	],
	{
		requirements: { level: 73, strength: 192 },
	}
);

const NightwingsVeil = baseToUnique(
	bases.helmet["Spired Helm"],
	"Nightwing's Veil",
	[
		modifiers.allSkills(2),
		modifiers.enemyColdResistance([5, 10]),
		modifiers.coldSkillDamage([10, 15]),
		modifiers.enhancedDefense([90, 120]),
		modifiers.dexterity([10, 20]),
		modifiers.coldAbsorb([5, 9]),
		modifiers.halfFreezeDuration(),
		modifiers.requirements(50),
	],
	{
		requirements: {
			level: 67,
			strength: 96,
		},
	}
);

const CrownOfAges = baseToUnique(
	bases.helmet["Corona"],
	"Crown of Ages",
	[
		modifiers.indestructible(),
		modifiers.fasterHitRecovery(30),
		modifiers.reducedCurseDuration(50),
		modifiers.enhancedDefense(50),
		modifiers.baseDefense(150),
		modifiers.allResist([20, 30]),
		modifiers.physicalDamageReduced([10, 15]),
		modifiers.socketed([2, 3]),
	],
	{
		requirements: { level: 82, strength: 174 },
	}
);

const OverlordsHelm = baseToUnique(
	bases.helmet["Giant Conch"],
	"Overlord's Helm",
	[
		modifiers.enemyPhysicalResistance(10),
		modifiers.lifeStolenPerHit([5, 8]),
		modifiers.baseDefense([460, 680]),
		modifiers.strength([20, 30]),
		modifiers.dexterity(15),
		modifiers.vitality(15),
		modifiers.energy(-30),
		modifiers.curseResistance(-30),
	],
	{
		requirements: { level: 85, strength: 142 },
	}
);

const KirasGuardian = baseToUnique(
	bases.helmet["Tiara"],
	"Kira's Guardian",
	[
		modifiers.fasterHitRecovery(20),
		modifiers.enemyColdResistance([10, 15]),
		modifiers.enemyLightningResistance([10, 15]),
		modifiers.enemyFireResistance([10, 15]),
		modifiers.baseDefense([50, 120]),
		modifiers.allResist([25, 40]),
		modifiers.cannotBeFrozen(),
	],
	{
		requirements: { level: 77 },
	}
);

const GriffonsEye = baseToUnique(
	bases.helmet["Diadem"],
	"Griffon's Eye",
	[
		modifiers.allSkills(1),
		modifiers.fasterCastRate(25),
		modifiers.lightningSkillDamage([10, 15]),
		modifiers.enemyLightningResistance([15, 20]),
		modifiers.baseDefense([100, 200]),
	],
	{
		requirements: { level: 76 },
	}
);

export const helmet = {
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
	AndarielsVisage,
	GiantSkull,
	VeilOfSteel,
	NightwingsVeil,
	CrownOfAges,
	OverlordsHelm,
	KirasGuardian,
	GriffonsEye,
} as const satisfies Record<string, Item>;
