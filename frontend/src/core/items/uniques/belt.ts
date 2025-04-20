import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

// Normal Unique Belts

const Lenymo = baseToUnique(
	bases.belt["Sash"],
	"Lenymo",
	[
		modifiers.fasterCastRate(10),
		modifiers.mana(15),
		modifiers.regenerateMana([20, 30]),
		modifiers.allResist(5),
		modifiers.lightRadius(1),
	],
	{
		requirements: { level: 7 },
	}
);

const Snakecord = baseToUnique(
	bases.belt["Light Belt"],
	"Snakecord",
	[
		modifiers.poisonSkillDamage([4, 6]),
		modifiers.enhancedDefense([20, 30]),
		modifiers.defense(10),
		modifiers.replenishLife([5, 15]),
		modifiers.poisonResist(25),
		modifiers.poisonLengthDurationReduced(50),
	],
	{
		requirements: { level: 12 },
	}
);

const Nightsmoke = baseToUnique(
	bases.belt["Belt"],
	"Nightsmoke",
	[
		modifiers.enhancedDefense([30, 50]),
		modifiers.defense(15),
		modifiers.mana(20),
		modifiers.allResist(10),
		modifiers.flatPhysicalDamageReduced(2),
		modifiers.damageTakenGainedAsMana(50),
	],
	{
		requirements: { level: 20, strength: 25 },
	}
);

const Goldwrap = baseToUnique(
	bases.belt["Heavy Belt"],
	"Goldwrap",
	[
		modifiers.attackSpeed(20),
		modifiers.enhancedDefense([40, 60]),
		modifiers.defense(25),
		modifiers.goldFind([50, 80]),
		modifiers.magicFind([20, 40]),
		modifiers.lightRadius(2),
	],
	{
		requirements: { level: 27, strength: 45 },
	}
);

const Bladebuckle = baseToUnique(
	bases.belt["Plated Belt"],
	"Bladebuckle",
	[
		modifiers.fasterHitRecovery([20, 30]),
		modifiers.enhancedDefense([80, 100]),
		modifiers.defense(30),
		modifiers.strength(5),
		modifiers.dexterity(10),
		modifiers.flatPhysicalDamageReduced([4, 7]),
		modifiers.thorns([420, 480]),
	],
	{
		requirements: { level: 39, strength: 60 },
	}
);

// Exceptional Unique Belts
const StringOfEars = baseToUnique(
	bases.belt["Demonhide Sash"],
	"String of Ears",
	[
		modifiers.lifeStolenPerHit([6, 8]),
		modifiers.enhancedDefense([150, 180]),
		modifiers.defense(15),
		modifiers.physicalDamageReduced([10, 15]),
		modifiers.flatMagicDamageReduced([10, 15]),
		// modifiers.durability(10)
	],
	{
		requirements: { level: 29, strength: 20 },
	}
);

const Razortail = baseToUnique(
	bases.belt["Sharkskin Belt"],
	"Razortail",
	[
		modifiers.chanceToPierce(33),
		modifiers.maximumDamage([10, 20]),
		modifiers.enhancedDefense([120, 150]),
		modifiers.defense(50),
		modifiers.defense([15, 20]),
		modifiers.thornsPerLevel(1),
	],
	{
		requirements: { level: 32, strength: 20 },
	}
);

const GloomsTrap = baseToUnique(
	bases.belt["Mesh Belt"],
	"Gloom's Trap",
	[
		modifiers.fasterCastRate([10, 20]),
		modifiers.manaStolenPerHit(5),
		modifiers.enhancedDefense([120, 150]),
		modifiers.vitality(15),
		modifiers.maximumMana(15),
		modifiers.regenerateMana(15),
		modifiers.lightRadius(-3),
	],
	{
		requirements: { level: 36, strength: 58 },
	}
);

const Snowclash = baseToUnique(
	bases.belt["Battle Belt"],
	"Snowclash",
	[
		modifiers.blizzardWhenStruck(5, [7, 20]),
		modifiers.coldSkills([1, 2]),
		modifiers.addsColdDamage(39, 63),
		modifiers.enhancedDefense([130, 170]),
		modifiers.maxColdResist([5, 8]),
		modifiers.coldResist([30, 45]),
		modifiers.halfFreezeDuration(),
	],
	{
		requirements: { level: 42, strength: 88 },
	}
);

const ThundergodsVigor = baseToUnique(
	bases.belt["War Belt"],
	"Thundergod's Vigor",
	[
		modifiers.fistOfHeavensWhenStruck(5, 17),
		modifiers.lightningSkills(2),
		modifiers.addsLightningDamage(1, [150, 250]),
		modifiers.enhancedDefense([160, 200]),
		modifiers.strength(15),
		modifiers.vitality(15),
		modifiers.maxLightningResist([5, 8]),
	],
	{
		requirements: { level: 47, strength: 110 },
	}
);

// Elite Unique Belts

const ArachnidMesh = baseToUnique(
	bases.belt["Spiderweb Sash"],
	"Arachnid Mesh",
	[
		modifiers.allSkills(1),
		modifiers.fasterCastRate([10, 20]),
		modifiers.slowTarget(20),
		modifiers.enhancedDefense([90, 120]),
		modifiers.maximumMana([5, 10]),
		modifiers.venomSkillCharges(3, 31),
	],
	{
		requirements: { level: 80, strength: 50 },
	}
);

const NosferatusCoil = baseToUnique(
	bases.belt["Vampirefang Belt"],
	"Nosferatu's Coil",
	[
		modifiers.attackSpeed(20),
		modifiers.lifeStolenPerHit([3, 6]),
		modifiers.deadlyStrike(10),
		modifiers.slowTarget(10),
		modifiers.strength([10, 15]),
		modifiers.manaAfterEachKill(2),
	],
	{
		requirements: { level: 51, strength: 50 },
	}
);

const VerdungosHeartyCord = baseToUnique(
	bases.belt["Mithril Coil"],
	"Verdungo's Hearty Cord",
	[
		modifiers.fasterHitRecovery(10),
		modifiers.enhancedDefense([90, 140]),
		modifiers.vitality([30, 40]),
		modifiers.replenishLife([10, 13]),
		// modifiers.stamina([100, 120]),
		modifiers.physicalDamageReduced([10, 15]),
	],
	{
		requirements: { level: 63, strength: 106 },
	}
);

const BandOfSkulls = baseToUnique(
	bases.belt["Troll Belt"],
	"Band of Skulls",
	[
		modifiers.boneArmorWhenStruck(6, 28),
		modifiers.enhancedDefense([100, 150]),
		modifiers.physicalDamageReduced(10),
		modifiers.magicFind([25, 30]),
		modifiers.lightRadius(-4),
		modifiers.socketed(1),
	],
	{
		requirements: { level: 90, strength: 151 },
	}
);

export const belt = {
	Lenymo,
	Snakecord,
	Nightsmoke,
	Goldwrap,
	Bladebuckle,
	StringOfEars,
	Razortail,
	GloomsTrap,
	Snowclash,
	ThundergodsVigor,
	ArachnidMesh,
	NosferatusCoil,
	VerdungosHeartyCord,
	BandOfSkulls,
} as const satisfies Record<string, Item>;
