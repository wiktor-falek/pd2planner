import * as modifiers from "../modifiers";
import { bases } from "../bases";
import type { Item } from "../item";
import { baseToUnique } from "../item";

// Normal Unique Chests
const Greyform = baseToUnique(
	bases.chest["Quilted Armor"],
	"Greyform",
	[
		modifiers.lifeStolenPerHit(5),
		modifiers.defense(20),
		modifiers.dexterity(10),
		modifiers.coldResist(20),
		modifiers.fireResist(20),
		modifiers.flatMagicDamageReduced(3),
	],
	{
		requirements: { level: 7, strength: 12 },
	}
);

const BlinkbatsForm = baseToUnique(
	bases.chest["Leather Armor"],
	"Blinkbat's Form",
	[
		modifiers.fasterRunWalk(20),
		modifiers.fasterHitRecovery(40),
		modifiers.addsFireDamage(10, 15),
		modifiers.defense(25),
		modifiers.defenseVsMissile(50),
	],
	{
		requirements: { level: 12, strength: 15 },
	}
);

const TheCenturion = baseToUnique(
	bases.chest["Hard Leather Armor"],
	"The Centurion",
	[
		modifiers.increasedChanceOfBlocking(20),
		modifiers.enhancedDamage(30),
		modifiers.attackRating(50),
		modifiers.defense(30),
		modifiers.life(15),
		modifiers.replenishLife([5, 15]),
		modifiers.mana(15),
		modifiers.flatPhysicalDamageReduced(2),
	],
	{
		requirements: { level: 14, strength: 20 },
	}
);

const Twitchthroe = baseToUnique(
	bases.chest["Studded Leather"],
	"Twitchthroe",
	[
		modifiers.attackSpeed([20, 40]),
		modifiers.fasterHitRecovery(20),
		modifiers.increasedChanceOfBlocking(25),
		modifiers.defense(25),
		modifiers.strength(10),
		modifiers.dexterity(10),
	],
	{
		requirements: { level: 16, strength: 27 },
	}
);

const Darkglow = baseToUnique(
	bases.chest["Ring Mail"],
	"Darkglow",
	[
		modifiers.attackRating([60, 120]),
		modifiers.enhancedDefense([70, 100]),
		modifiers.defenseVsMissile(50),
		modifiers.maxPoisonResist([2, 5]),
		modifiers.maxColdResist([2, 5]),
		modifiers.maxLightningResist([2, 5]),
		modifiers.maxFireResist([2, 5]),
		modifiers.allResist([10, 15]),
		modifiers.lightRadius(3),
	],
	{
		requirements: { level: 14, strength: 36 },
	}
);

const Hawkmail = baseToUnique(
	bases.chest["Scale Mail"],
	"Hawkmail",
	[
		modifiers.fasterRunWalk(25),
		modifiers.ravenSkill([2, 3]),
		modifiers.enhancedDefense([80, 100]),
		modifiers.maxColdResist(5),
		modifiers.coldResist([15, 30]),
		modifiers.cannotBeFrozen(),
	],
	{
		requirements: { level: 15, strength: 44 },
	}
);

const SparkingMail = baseToUnique(
	bases.chest["Chain Mail"],
	"Sparking Mail",
	[
		modifiers.addsLightningDamage(1, 45),
		modifiers.lightningSkillDamage([5, 10]),
		modifiers.enhancedDefense([75, 85]),
		modifiers.lightningResist(30),
		modifiers.thorns([20, 28]),
	],
	{
		requirements: { level: 17, strength: 48 },
	}
);

const VenomWard = baseToUnique(
	bases.chest["Breast Plate"],
	"Venom Ward",
	[
		modifiers.enemyPoisonResistance([6, 12]),
		modifiers.enhancedDefense([60, 100]),
		modifiers.maxPoisonResist([5, 8]),
		modifiers.poisonLengthDurationReduced(50),
		modifiers.lightRadius(2),
	],
	{
		requirements: { level: 20, strength: 30 },
	}
);

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// const Chest = baseToUnique(
//     bases.chest[],
//     "Chest",
//     [

//     ],
//     {
//         requirements: { level: 0, strength: 0 },
//     }
// );

// Exceptional Unique Chests
// Elite Unique Chests

export const chest = {} as const satisfies Record<string, Item>;
