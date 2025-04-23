import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

// Normal Unique Gloves

const TheHandOfBroc = baseToUnique(
	bases.gloves["Leather Gloves"],
	"The Hand of Broc",
	[
		modifiers.meleeAttacksDealSplashDamage(),
		modifiers.enhancedDamage([20, 30]),
		modifiers.manaStolenPerHit(3),
		modifiers.lifeStolenPerHit(3),
		modifiers.enhancedDefense([10, 20]),
		modifiers.defense(10),
		modifiers.mana(20),
		modifiers.poisonResist(10),
	],
	{
		requirements: { level: 5 },
	}
);

const Bloodfist = baseToUnique(
	bases.gloves["Heavy Gloves"],
	"Bloodfist",
	[
		modifiers.meleeAttacksDealSplashDamage(),
		modifiers.attackSpeed(10),
		modifiers.fasterHitRecovery(30),
		modifiers.maximumDamage([5, 10]),
		modifiers.enhancedDefense([10, 20]),
		modifiers.defense(10),
		modifiers.life(40),
	],
	{
		requirements: { level: 9 },
	}
);

const ChanceGuards = baseToUnique(
	bases.gloves["Chain Gloves"],
	"Chance Guards",
	[
		modifiers.attackRating(25),
		modifiers.enhancedDefense([20, 30]),
		modifiers.defense(15),
		modifiers.manaAfterEachKill([1, 2]),
		modifiers.goldFind(200),
		modifiers.magicFind([25, 40]),
		modifiers.lightRadius(2),
	],
	{
		requirements: { level: 15, strength: 25 },
	}
);

const Magefist = baseToUnique(
	bases.gloves["Light Gauntlets"],
	"Magefist",
	[
		modifiers.fireSkills(1),
		modifiers.fasterCastRate(20),
		modifiers.addsFireDamage(6, 36),
		modifiers.enhancedDefense([20, 30]),
		modifiers.defense(10),
		modifiers.regenerateMana([15, 25]),
	],
	{
		requirements: { level: 23, strength: 45 },
	}
);

const Frostburn = baseToUnique(
	bases.gloves["Gaunlets"],
	"Frostburn",
	[
		modifiers.addsFireDamage(14, 28),
		modifiers.addsColdDamage(6, 22),
		modifiers.enemyFireResistance([5, 10]),
		modifiers.enemyColdResistance([5, 10]),
		modifiers.enhancedDefense([20, 40]),
		modifiers.defense([20, 40]),
		modifiers.maximumMana([15, 25]),
	],
	{
		requirements: { level: 29, strength: 60 },
	}
);

// Exceptional Unique Gloves

const VenomGrip = baseToUnique(
	bases.gloves["Demonhide Gloves"],
	"Venom Grip",
	[
		modifiers.lifeStolenPerHit([2, 4]),
		modifiers.poisonSkillDamage([10, 15]),
		modifiers.crushingBlow([5, 10]),
		modifiers.enhancedDefense([130, 160]),
		modifiers.defense([15, 25]),
		modifiers.maxPoisonResist(5),
		modifiers.poisonResist(30),
	],
	{
		requirements: { level: 29, strength: 20 },
	}
);

const Gravepalm = baseToUnique(
	bases.gloves["Sharkskin Gloves"],
	"Gravepalm",
	[
		modifiers.summoningSkillsNecromancerOnly(1),
		modifiers.damageToUndead([100, 200]),
		modifiers.attackRatingAgainstUndead([100, 200]),
		modifiers.deadlyStrike([10, 15]),
		modifiers.enhancedDefense([140, 180]),
		modifiers.strength(10),
		modifiers.energy(10),
	],
	{
		requirements: { level: 32, strength: 20 },
	}
);

const Ghoulhide = baseToUnique(
	bases.gloves["Heavy Bracers"],
	"Ghoulhide",
	[
		modifiers.attackSpeed(20),
		modifiers.damageToUndeadPerLevel(2),
		modifiers.attackRatingAgainstUndeadPerLevel(8),
		modifiers.manaStolenPerHit([4, 5]),
		modifiers.enhancedDefense([150, 190]),
		modifiers.life([20, 40]),
	],
	{
		requirements: { level: 36, strength: 58 },
	}
);

const LavaGout = baseToUnique(
	bases.gloves["Battle Gauntlets"],
	"Lava Gout",
	[
		modifiers.enchantFireOnStriking(2, 10),
		modifiers.attackSpeed(20),
		modifiers.addsFireDamage(26, 92),
		modifiers.enhancedDefense([150, 200]),
		modifiers.maxFireResist([3, 5]),
		modifiers.fireResist([24, 36]),
		modifiers.halfFreezeDuration(),
		// modifiers.durability(20),
	],
	{
		requirements: { level: 42, strength: 88 },
	}
);

const Hellmouth = baseToUnique(
	bases.gloves["War Gauntlets"],
	"Hellmouth",
	[
		modifiers.moltenBoulderOnStriking(8, 22),
		modifiers.meteorOnStriking(4, 34),
		modifiers.addsFireDamage(30, 144),
		modifiers.enemyFireResistance([5, 10]),
		modifiers.enhancedDefense([150, 200]),
		modifiers.thorns([250, 400]),
		// modifiers.durability(15),
	],
	{
		requirements: { level: 47, strength: 110 },
	}
);

// Elite Unique Gloves

const TitansGrip = baseToUnique(
	bases.gloves["Bramble Mitts"],
	"Titan's Grip",
	[
		modifiers.fasterBlockRate(20),
		modifiers.increasedChanceOfBlocking([15, 20]),
		modifiers.enhancedDefense([140, 185]),
		modifiers.defenseVsMissile(120),
		modifiers.lightningResist([25, 35]),
		modifiers.halfFreezeDuration(),
	],
	{
		requirements: { level: 42, strength: 50 },
	}
);

const DraculsGrasp = baseToUnique(
	bases.gloves["Vampirebone Gloves"],
	"Dracul's Grasp",
	[
		modifiers.attackSpeed(10),
		modifiers.lifeStolenPerHit([8, 12]),
		modifiers.chanceOfOpenWounds(25),
		modifiers.openWoundsDamagePerSeconds([240, 320]),
		modifiers.enhancedDefense([90, 120]),
		modifiers.strength([20, 30]),
		modifiers.lifeAfterEachKill([5, 10]),
	],
	{
		requirements: { level: 76, strength: 50 },
	}
);

const SoulDrainer = baseToUnique(
	bases.gloves["Vambraces"],
	"Soul Drainer",
	[
		modifiers.enemyPhysicalResistance(5),
		modifiers.manaStolenPerHit([2, 3]),
		modifiers.lifeStolenPerHit([2, 3]),
		modifiers.monsterDefensePerHit(50),
		modifiers.enhancedDefense([90, 120]),
		modifiers.drainLife(30),
	],
	{
		requirements: { level: 74, strength: 106 },
	}
);

const Occultist = baseToUnique(
	bases.gloves["Crusader Gauntlets"],
	"Occultist",
	[
		modifiers.fasterCastRate(20),
		modifiers.reducedCurseDuration([25, 35]),
		modifiers.hitBlindsTarget(),
		modifiers.enhancedDefense([80, 100]),
		modifiers.maximumMana([25, 35]),
	],
	{
		requirements: { level: 70, strength: 151 },
	}
);

const Steelrend = baseToUnique(
	bases.gloves["Ogre Gauntlets"],
	"Steelrend",
	[
		modifiers.meleeAttacksDealSplashDamage(),
		modifiers.enhancedDamage([60, 80]),
		modifiers.crushingBlow([10, 20]),
		modifiers.defense([170, 210]),
		modifiers.strength([15, 20]),
		modifiers.thorns(250),
	],
	{
		requirements: { level: 70, strength: 185 },
	}
);

export const gloves = {
	TheHandOfBroc,
	Bloodfist,
	ChanceGuards,
	Magefist,
	Frostburn,
	VenomGrip,
	Gravepalm,
	Ghoulhide,
	LavaGout,
	Hellmouth,
	TitansGrip,
	DraculsGrasp,
	SoulDrainer,
	Occultist,
	Steelrend,
} as const satisfies Record<string, Item>;
