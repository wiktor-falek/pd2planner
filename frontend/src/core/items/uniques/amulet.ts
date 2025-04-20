import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

const NokozanRelic = baseToUnique(
	bases.amulet["Amulet"],
	"Nokozan Relic",
	[
		modifiers.fasterHitRecovery([20, 30]),
		modifiers.addsFireDamage([3, 6], [7, 12]),
		modifiers.maxFireResist([4, 8]),
		modifiers.fireResist([20, 35]),
		modifiers.lightRadius(3),
	],
	{
		requirements: { level: 10 },
	}
);

const TheEyeOfEtlich = baseToUnique(
	bases.amulet["Amulet"],
	"The Eye of Etlich",
	[
		modifiers.allSkills(1),
		modifiers.addsColdDamage([4, 6], [12, 20]),
		modifiers.lifeStolenPerHit([3, 7]),
		modifiers.defenseVsMissile([10, 40]),
		modifiers.lightRadius([1, 5]),
	],
	{
		requirements: { level: 15 },
	}
);

const TheMahimOakCurio = baseToUnique(
	bases.amulet["Amulet"],
	"The Mahim-Oak Curio",
	[
		modifiers.fasterCastRate([5, 10]),
		modifiers.bonusAttackRating([30, 50]),
		modifiers.enhancedDefense([5, 10]),
		modifiers.defense([5, 10]),
		modifiers.allAttributes([5, 10]),
		modifiers.allResist([5, 10]),
	],
	{
		requirements: { level: 25 },
	}
);

const SaracensChance = baseToUnique(
	bases.amulet["Amulet"],
	"Saracen's Chance",
	[
		modifiers.ironMaidenWhenStruck(10, 12),
		modifiers.enhancedDamage([30, 50]),
		modifiers.allAttributes(12),
		modifiers.curseResistance(10),
		modifiers.allResist([15, 25]),
	],
	{
		requirements: { level: 47 },
	}
);

const CrescentMoon = baseToUnique(
	bases.amulet["Amulet"],
	"Crescent Moon",
	[
		modifiers.coldSkills(2),
		modifiers.attackSpeed(10),
		modifiers.fasterCastRate(10),
		modifiers.manaStolenPerHit([4, 8]),
		modifiers.lifeStolenPerHit([3, 6]),
		modifiers.mana(45),
		modifiers.flatMagicDamageReduced([5, 10]),
	],
	{
		requirements: { level: 50 },
	}
);

const TheCatsEye = baseToUnique(
	bases.amulet["Amulet"],
	"The Cat's Eye",
	[
		modifiers.fasterRunWalk(30),
		modifiers.attackSpeed(30),
		modifiers.defense(100),
		modifiers.defenseVsMissile(100),
		modifiers.dexterity([25, 35]),
	],
	{
		requirements: { level: 50 },
	}
);

const AtmasScarab = baseToUnique(
	bases.amulet["Amulet"],
	"Atma's Scarab",
	[
		modifiers.amplifyDamageOnStriking(8, 15),
		modifiers.bonusAttackRating([40, 60]),
		modifiers.chanceOfOpenWounds(10),
		modifiers.openWoundsDamagePerSeconds(300),
		modifiers.poisonResist([30, 60]),
		modifiers.thorns([300, 450]),
		modifiers.lightRadius(3),
	],
	{
		requirements: { level: 60 },
	}
);

const HighlordsWrath = baseToUnique(
	bases.amulet["Amulet"],
	"Highlord's Wrath",
	[
		modifiers.allSkills(1),
		modifiers.attackSpeed(20),
		modifiers.addsLightningDamage(1, 300),
		modifiers.deadlyStrikePerLevel(0.25),
		modifiers.lightningResist([30, 40]),
		modifiers.thorns([100, 150]),
	],
	{
		requirements: { level: 65 },
	}
);

const TheRisingSun = baseToUnique(
	bases.amulet["Amulet"],
	"The Rising Sun",
	[
		modifiers.meteorWhenStruck(4, 23),
		modifiers.fireSkills([1, 2]),
		modifiers.addsFireDamage([80, 124], [200, 248]),
		modifiers.enemyFireResistance([4, 8]),
		modifiers.replenishLife(10),
		modifiers.lightRadius(4),
	],
	{
		requirements: { level: 65 },
	}
);

const SeraphsHymn = baseToUnique(
	bases.amulet["Amulet"],
	"Seraph's Hymn",
	[
		modifiers.allSkills(2),
		modifiers.defensiveAurasSkillsPaladinOnly([1, 2]),
		modifiers.damageToDemons([50, 80]),
		modifiers.attackRatingAgainstDemons([150, 250]),
		modifiers.damageToUndead([50, 80]),
		modifiers.attackRatingAgainstUndead([150, 250]),
		modifiers.lightRadius(2),
	],
	{
		requirements: { level: 65 },
	}
);

const MarasKaleidoscope = baseToUnique(
	bases.amulet["Amulet"],
	"Mara's Kaleidoscope",
	[modifiers.allSkills(2), modifiers.allAttributes([5, 8]), modifiers.allResist([20, 30])],
	{
		requirements: { level: 67 },
	}
);

const Metalgrid = baseToUnique(
	bases.amulet["Amulet"],
	"Metalgrid",
	[
		modifiers.attackRating([400, 450]),
		modifiers.defense([300, 350]),
		modifiers.allResist([25, 35]),
		modifiers.thorns([750, 1000]),
		modifiers.ironMaidenSkillCharges(12, 20),
		modifiers.ironGolemSkill(25),
		modifiers.golemMasterySkill(20),
	],
	{
		requirements: { level: 81 },
	}
);

const TheThirdEye = baseToUnique(
	bases.amulet["Amulet"],
	"The Third Eye",
	[
		modifiers.boneNovaOnCasting(10, 25),
		modifiers.allSkills(1),
		modifiers.fasterCastRate(20),
		modifiers.energy([20, 30]),
		modifiers.cannotBeFrozen(),
		modifiers.lightRadius(-4),
		modifiers.socketed(1),
	],
	{
		requirements: { level: 90 },
	}
);

export const amulet = {
	NokozanRelic,
	TheEyeOfEtlich,
	TheMahimOakCurio,
	SaracensChance,
	CrescentMoon,
	TheCatsEye,
	AtmasScarab,
	HighlordsWrath,
	TheRisingSun,
	SeraphsHymn,
	MarasKaleidoscope,
	Metalgrid,
	TheThirdEye,
} as const satisfies Record<string, Item>;
