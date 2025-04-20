import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

const Nagelring = baseToUnique(
	bases.ring["Ring"],
	"Nagelring",
	[
		modifiers.attackRating([50, 75]),
		modifiers.flatMagicDamageReduced(3),
		modifiers.manaAfterEachKill(1),
		modifiers.thorns(3),
		modifiers.magicFind([15, 40]),
	],
	{
		requirements: { level: 7 },
	}
);

const ManaldHeal = baseToUnique(
	bases.ring["Ring"],
	"Manald Heal",
	[
		modifiers.manaStolenPerHit([4, 7]),
		modifiers.life(20),
		modifiers.replenishLife([5, 8]),
		modifiers.regenerateMana(20),
	],
	{
		requirements: { level: 15 },
	}
);

const TheStoneOfJordan = baseToUnique(
	bases.ring["Ring"],
	"The Stone of Jordan",
	[
		modifiers.allSkills(1),
		modifiers.addsLightningDamage(1, 120),
		modifiers.mana([20, 40]),
		modifiers.maximumMana([15, 20]),
	],
	{
		requirements: { level: 29 },
	}
);

const DwarfStar = baseToUnique(
	bases.ring["Ring"],
	"Dwarf Star",
	[
		modifiers.increasedChanceOfBlocking(5),
		modifiers.life([35, 50]),
		// modifiers.stamina([35, 50]),
		modifiers.fireAbsorb([4, 6]),
		modifiers.flatMagicDamageReduced([12, 15]),
		modifiers.goldFind(100),
	],
	{
		requirements: { level: 45 },
	}
);

const RavenFrost = baseToUnique(
	bases.ring["Ring"],
	"Raven Frost",
	[
		modifiers.attackRating([150, 250]),
		modifiers.addsColdDamage(15, 45),
		modifiers.dexterity([15, 20]),
		modifiers.mana(40),
		modifiers.coldAbsorb(5),
		modifiers.cannotBeFrozen(),
	],
	{
		requirements: { level: 45 },
	}
);

const BulKathosWeddingBand = baseToUnique(
	bases.ring["Ring"],
	"Bul-Kathos' Wedding Band",
	[
		modifiers.allSkills(1),
		modifiers.lifeStolenPerHit([3, 5]),
		modifiers.lifePerLevel(0.5),
		// modifiers.stamina(50)
	],
	{
		requirements: { level: 58 },
	}
);

const CarrionWind = baseToUnique(
	bases.ring["Ring"],
	"Carrion Wind",
	[
		modifiers.twisterOnStriking(8, 30),
		modifiers.lifeStolenPerHit([4, 6]),
		modifiers.defenseVsMissile([100, 160]),
		modifiers.poisonResist([40, 55]),
		modifiers.thorns([180, 300]),
		modifiers.poisonCreeperSkillCharges(11, 35),
	],
	{
		requirements: { level: 60 },
	}
);

const NaturesPeace = baseToUnique(
	bases.ring["Ring"],
	"Nature's Peace",
	[
		modifiers.preventMonsterHeal(),
		modifiers.slainMonstersRestinPeace(),
		modifiers.maxPoisonResist([2, 3]),
		modifiers.maxColdResist([2, 3]),
		modifiers.maxLightningResist([2, 3]),
		modifiers.maxFireResist([2, 3]),
		modifiers.flatPhysicalDamageReduced([7, 11]),
		modifiers.oakSageSkillCharges(5, 27),
	],
	{
		requirements: { level: 69 },
	}
);

const WispProjector = baseToUnique(
	bases.ring["Ring"],
	"Wisp Projector",
	[
		modifiers.allSkills(1),
		modifiers.lightningAbsorb([4, 6]),
		modifiers.magicFind([10, 20]),
		modifiers.spiritOfBarbsSkillCharges(7, 11),
		modifiers.heartOfWolverineSkillCharges(5, 13),
	],
	{
		requirements: { level: 76 },
	}
);

const KadalasHeirloomFire = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Fire)",
	[
		modifiers.fireSkills(1),
		modifiers.coldResist([-20, -10]),
		modifiers.fireResist([30, 40]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

const KadalasHeirloomCold = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Cold)",
	[
		modifiers.coldSkills(1),
		modifiers.fireResist([-20, -10]),
		modifiers.coldResist([30, 40]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

const KadalasHeirloomLightning = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Lightning)",
	[
		modifiers.lightningSkills(1),
		modifiers.poisonResist([-20, -10]),
		modifiers.lightningResist([30, 40]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

const KadalasHeirloomPoison = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Poison)",
	[
		modifiers.poisonSkills(1),
		modifiers.lightningResist([-20, -10]),
		modifiers.poisonResist([30, 40]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

const KadalasHeirloomMagic = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Magic)",
	[
		modifiers.magicSkills(1),
		modifiers.allResist([-5, -4]),
		modifiers.flatMagicDamageReduced([9, 10]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

const KadalasHeirloomPhysical = baseToUnique(
	bases.ring["Ring"],
	"Kadala's Heirloom (Physical)",
	[
		modifiers.enhancedDamage(30),
		modifiers.allResist([-5, -4]),
		modifiers.flatPhysicalDamageReduced([9, 10]),
		modifiers.goldFind([30, 60]),
		modifiers.magicFind([15, 25]),
		modifiers.reducedAllVendorPrices([5, 10]),
	],
	{
		requirements: { level: 75 },
	}
);

export const ring = {
	Nagelring,
	ManaldHeal,
	TheStoneOfJordan,
	DwarfStar,
	RavenFrost,
	BulKathosWeddingBand,
	CarrionWind,
	NaturesPeace,
	WispProjector,
	KadalasHeirloomFire,
	KadalasHeirloomCold,
	KadalasHeirloomLightning,
	KadalasHeirloomPoison,
	KadalasHeirloomMagic,
	KadalasHeirloomPhysical,
} as const satisfies Record<string, Item>;
