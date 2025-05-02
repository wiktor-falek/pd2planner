import * as modifiers from "../modifiers";
import { bases } from "../bases";
import type { Item } from "../item";
import { baseToUnique } from "../item";

// Normal Unique Boots
const Hotspur = baseToUnique(
	bases.boots["Boots"],
	"Hotspur",
	[
		modifiers.addsFireDamage(3, 6),
		modifiers.enhancedDefense([10, 20]),
		modifiers.defense(6),
		modifiers.life(15),
		modifiers.maxFireResist([4, 6]),
		modifiers.fireResist([20, 30]),
	],
	{
		requirements: { level: 5 },
	}
);

const Gorefoot = baseToUnique(
	bases.boots["Heavy Boots"],
	"Gorefoot",
	[
		modifiers.fasterRunWalk(25),
		modifiers.fasterLeapAndLeapAttackMovementSpeed([20, 30]),
		modifiers.leapSkillBarbarianOnly(2),
		modifiers.manaStolenPerHit([2, 4]),
		modifiers.enhancedDefense([20, 30]),
	],
	{
		requirements: { level: 12, strength: 18 },
	}
);

const TreadsOfCthon = baseToUnique(
	bases.boots["Chain Boots"],
	"Treads of Cthon",
	[
		modifiers.fasterRunWalk(30),
		modifiers.chanceToPierce(20),
		modifiers.enhancedDefense([30, 40]),
		modifiers.defense(12),
		modifiers.defenseVsMissile(50),
		modifiers.life([10, 30]),
		modifiers.slowerStaminaDrain(50),
	],
	{
		requirements: { level: 15, strength: 30 },
	}
);

const GoblinToe = baseToUnique(
	bases.boots["Light Plated Boots"],
	"Goblin Toe",
	[
		modifiers.fasterRunWalk(20),
		modifiers.enhancedDamage([20, 30]),
		modifiers.crushingBlow([15, 25]),
		modifiers.enhancedDefense([50, 60]),
		modifiers.defense(15),
		modifiers.flatPhysicalDamageReduced([3, 5]),
		modifiers.flatMagicDamageReduced([3, 5]),
	],
	{
		requirements: { level: 22, strength: 50 },
	}
);

const Tearhaunch = baseToUnique(
	bases.boots["Greaves"],
	"Tearhaunch",
	[
		modifiers.defensiveAurasSkillsPaladinOnly(2),
		modifiers.fasterRunWalk(20),
		modifiers.vigorSkillPaladinOnly([1, 2]),
		modifiers.enhancedDefense([60, 80]),
		modifiers.defense(35),
		modifiers.strength([5, 10]),
		modifiers.dexterity([5, 10]),
		modifiers.allResist(10),
	],
	{
		requirements: { level: 29, strength: 70 },
	}
);

// Exceptional Unique Boots

const Infernostride = baseToUnique(
	bases.boots["Demonhide Boots"],
	"Infernostride",
	[
		modifiers.blazeWhenStruck(18, 16),
		modifiers.fasterRunWalk(30),
		modifiers.addsFireDamage(24, 66),
		modifiers.enhancedDefense([120, 150]),
		modifiers.defense(15),
		modifiers.maxFireResist(5),
		modifiers.fireResist(30),
		modifiers.goldFind([40, 70]),
		modifiers.lightRadius(2),
	],
	{
		requirements: { level: 29, strength: 20 },
	}
);

const Waterwalk = baseToUnique(
	bases.boots["Sharkskin Boots"],
	"Waterwalk",
	[
		modifiers.fasterRunWalk(30),
		modifiers.fasterBlockRate(20),
		modifiers.enhancedDefense([180, 210]),
		modifiers.dexterity(15),
		modifiers.life([45, 65]),
		// modifiers.stamina(40),
		// modifiers.healStamina(50),
		modifiers.maxFireResist(5),
	],
	{
		requirements: { level: 32, strength: 47 },
	}
);

const Silkweave = baseToUnique(
	bases.boots["Mesh Boots"],
	"Silkweave",
	[
		modifiers.fasterRunWalk(30),
		modifiers.enhancedDefense([150, 190]),
		modifiers.defenseVsMissile(200),
		modifiers.maximumMana([10, 20]),
		modifiers.manaAfterEachKill(5),
	],
	{
		requirements: { level: 36, strength: 65 },
	}
);

const WarTraveler = baseToUnique(
	bases.boots["Battle Boots"],
	"War Traveler",
	[
		modifiers.fasterRunWalk(25),
		modifiers.addsDamage(15, 25),
		modifiers.enhancedDefense([150, 190]),
		modifiers.strength(10),
		modifiers.vitality(10),
		modifiers.slowerStaminaDrain(40),
		modifiers.thorns([5, 10]),
		modifiers.magicFind([30, 50]),
		// modifiers.durability(30),
	],
	{
		requirements: { level: 42, strength: 95 },
	}
);

const GoreRider = baseToUnique(
	bases.boots["War Boots"],
	"Gore Rider",
	[
		modifiers.fasterRunWalk(30),
		modifiers.crushingBlow(15),
		modifiers.deadlyStrike([15, 20]),
		modifiers.chanceOfOpenWounds(10),
		modifiers.openWoundsDamagePerSeconds([140, 200]),
		modifiers.enhancedDefense([160, 200]),
		modifiers.requirements(25),
		// modifiers.durability(10),
	],
	{
		requirements: { level: 47, strength: 94 },
	}
);

// Elite Unique Boots

const MermansSprocket = baseToUnique(
	bases.boots["Wyrmhide Boots"],
	"Merman's Sprocket",
	[
		modifiers.fasterRunWalk(60),
		modifiers.addsColdDamage(40, 80),
		modifiers.defense([50, 100]),
		modifiers.regenerateMana([10, 20]),
		// modifiers.stamina([50, 100]),
		modifiers.slowerStaminaDrain(50),
	],
	{
		requirements: { level: 45, strength: 50 },
	}
);

const SandstormTrek = baseToUnique(
	bases.boots["Scarabshell Boots"],
	"Sandstorm Trek",
	[
		modifiers.fasterRunWalk(30),
		modifiers.fasterHitRecovery(20),
		modifiers.enhancedDefense([140, 170]),
		modifiers.strength([10, 15]),
		modifiers.vitality([10, 15]),
		// modifiers.staminaPerLevel(1),
		modifiers.slowerStaminaDrain(50),
		modifiers.poisonResist([40, 70]),
		modifiers.thorns([480, 540]),
		modifiers.repairsDurabilityInSeconds(1, 10),
	],
	{
		requirements: { level: 64, strength: 91 },
	}
);

const Marrowwalk = baseToUnique(
	bases.boots["Boneweave Boots"],
	"Marrowwalk",
	[
		modifiers.fasterRunWalk(20),
		modifiers.skeletonMasteryNecromancerOnly([1, 2]),
		modifiers.enhancedDefense([170, 200]),
		modifiers.strength([10, 20]),
		modifiers.dexterity(17),
		modifiers.regenerateMana([10, 20]),
		// modifiers.healStamina(10),
		modifiers.cannotBeFrozen(),
	],
	{
		requirements: { level: 66, strength: 118 },
	}
);

const ShadowDancer = baseToUnique(
	bases.boots["Myrmidon Greaves"],
	"Shadow Dancer",
	[
		modifiers.shadowDisciplineSkills([1, 2]),
		modifiers.fasterRunWalk(30),
		modifiers.fasterHitRecovery(30),
		modifiers.enhancedDefense([70, 100]),
		modifiers.dexterity([20, 30]),
		modifiers.curseResistance(10),
		modifiers.requirements(25),
	],
	{
		requirements: { level: 71, strength: 167 },
	}
);

const ItheraelsPath = baseToUnique(
	bases.boots["Mirrored Boots"],
	"Itherael's Path",
	[
		modifiers.fasterRunWalk(20),
		modifiers.fasterCastRate(20),
		modifiers.fasterHitRecovery(20),
		modifiers.defense([40, 60]),
		modifiers.dexterity([10, 15]),
		modifiers.vitality([10, 15]),
	],
	{
		requirements: { level: 85, strength: 163 },
	}
);

export const boots = {
	Hotspur,
	Gorefoot,
	TreadsOfCthon,
	GoblinToe,
	Tearhaunch,
	Infernostride,
	Waterwalk,
	Silkweave,
	WarTraveler,
	GoreRider,
	MermansSprocket,
	SandstormTrek,
	Marrowwalk,
	ShadowDancer,
	ItheraelsPath,
} as const satisfies Record<string, Item>;
