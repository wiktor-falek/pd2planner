import { toRaw } from "vue";
import {
	allAttributesModifier,
	allResistModifier,
	allSkillsModifier,
	attackRatingModifier,
	baseDefenseModifier,
	chanceToFleeModifier,
	coldAbsorbModifier,
	coldSkillDamageModifier,
	damageToUndeadModifier,
	defenseModifier,
	defenseVsMissileModifier,
	dexterityModifier,
	enemyColdResistanceModifier,
	enhancedDamageModifier,
	enhancedDefenseModifier,
	flatPhysicalDamageReducedModifier,
	goldFindModifier,
	halfFreezeDurationModifier,
	hitBlindsTargetModifier,
	lifeAfterEachKillModifier,
	lifeModifier,
	lifePerLevelModifier,
	lifeStolenPerHitModifier,
	lightningResistModifier,
	lightningThornsModifier,
	lightRadiusModifier,
	magicFindModifier,
	manaAfterEachKillModifier,
	manaModifier,
	manaPerLevelModifier,
	maximumDamageModifier,
	necromancerSkillsModifier,
	physicalDamageReducedModifier,
	poisonAndBoneSkillsModifier,
	poisonDamageOverTwoSecondsModifier,
	poisonResistModifier,
	requirementsModifier,
	strengthModifier,
	type ItemModifier,
} from "./modifiers";

export type Rarity = "normal" | "magic" | "rare" | "set" | "unique";
export type Slot =
	| "weapon-1"
	| "weapon-2"
	| "helmet"
	| "chest"
	| "gloves"
	| "boots"
	| "amulet"
	| "ring-1"
	| "ring-2"
	| "belt";

export interface Item {
	id: string;
	name: string;
	baseName: string;
	slot: Slot;
	rarity: Rarity;
	modifiers: ItemModifier[];
	baseModifiers: ItemModifier[];
	requiredLevel: number;
	requiredStrength: number;
	requiredDexterity: number;
	sockets: number;
	corrupted: boolean;
	corruptedModifier?: ItemModifier;
	ethereal: boolean;
	defense?: ItemModifier;
}

interface ItemOptions {
	corruptedModifier?: ItemModifier;
	requiredLevel?: number;
	requiredStrength?: number;
	requiredDexterity?: number;
	sockets?: number;
	corrupted?: boolean;
	ethereal?: boolean;
}

export function createItemCopy(item: Item): Item {
	const copy = structuredClone(toRaw(item));
	copy.id = crypto.randomUUID();
	return copy;
}

function createItem(
	name: string,
	baseName: string,
	slot: Slot,
	rarity: Rarity,
	baseModifiers: ItemModifier[],
	modifiers: ItemModifier[],
	options?: ItemOptions
): Item {
	return {
		id: crypto.randomUUID(),
		name,
		baseName,
		slot,
		rarity,
		baseModifiers,
		modifiers,
		corruptedModifier: options?.corruptedModifier,
		requiredLevel: options?.requiredLevel ?? 0,
		requiredStrength: options?.requiredStrength ?? 0,
		requiredDexterity: options?.requiredDexterity ?? 0,
		sockets: options?.sockets ?? 0,
		corrupted: options?.corrupted ?? false,
		ethereal: options?.ethereal ?? false,
	};
}

const HarlequinCrest = createItem(
	"Harlequin Crest",
	"Shako",
	"helmet",
	"unique",
	[baseDefenseModifier([98, 141])],
	[
		allSkillsModifier(2),
		allAttributesModifier(2),
		lifePerLevelModifier(1),
		manaPerLevelModifier(1),
		physicalDamageReducedModifier([3, 5]),
		magicFindModifier([25, 50]),
	],
	{
		requiredLevel: 62,
		requiredStrength: 50,
	}
);

const NightwingsVeil = createItem(
	"Nightwing's Veil",
	"Spired Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([304, 352])],
	[
		allSkillsModifier(2),
		enemyColdResistanceModifier([5, 10]),
		coldSkillDamageModifier([10, 15]),
		enhancedDefenseModifier([90, 120]),
		dexterityModifier([10, 20]),
		coldAbsorbModifier([5, 9]),
		halfFreezeDurationModifier(),
		requirementsModifier(50),
	],
	{
		requiredLevel: 67,
		requiredStrength: 96,
	}
);

const BigginsBonnet = createItem(
	"Biggin's Bonnet",
	"Cap",
	"helmet",
	"unique",
	[baseDefenseModifier([3, 5])],
	[
		enhancedDamageModifier([30, 50]),
		attackRatingModifier([30, 50]),
		defenseModifier(14),
		lifeModifier(15),
		manaModifier(15),
		defenseModifier(15),
	],
	{
		requiredLevel: 3,
	}
);

const Tarnhelm = createItem(
	"Tarnhelm",
	"Skull Cap",
	"helmet",
	"unique",
	[baseDefenseModifier([8, 11])],
	[
		allSkillsModifier(1),
		manaAfterEachKillModifier([2, 3]),
		goldFindModifier(75),
		magicFindModifier([25, 50]),
	],
	{
		requiredLevel: 15,
		requiredStrength: 15,
	}
);

const CoifOfGlory = createItem(
	"Coif of Glory",
	"Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([15, 18])],
	[
		hitBlindsTargetModifier(),
		defenseModifier(10),
		defenseVsMissileModifier(100),
		lightningResistModifier(15),
		lifeAfterEachKillModifier([2, 3]),
		lightningThornsModifier(17),
	],
	{
		requiredLevel: 14,
		requiredStrength: 26,
	}
);

const Duskdeep = createItem(
	"Duskdeep",
	"Full Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([23, 26])],
	[
		maximumDamageModifier([10, 15]),
		enhancedDefenseModifier([30, 50]),
		defenseModifier([10, 20]),
		allResistModifier(15),
		flatPhysicalDamageReducedModifier(7),
		lightRadiusModifier(-2),
	],
	{
		requiredLevel: 17,
		requiredStrength: 41,
	}
);

const TheFaceOfHorror = createItem(
	"The Face of Horror",
	"Mask",
	"helmet",
	"unique",
	[baseDefenseModifier([9, 27])],
	[
		damageToUndeadModifier(50),
		chanceToFleeModifier(50),
		defenseModifier(25),
		strengthModifier(20),
		allResistModifier([15, 20]),
	],
	{
		requiredLevel: 20,
		requiredStrength: 23,
	}
);

const Wormskull = createItem(
	"Wormskull",
	"Bone Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([33, 36])],
	[
		poisonAndBoneSkillsModifier(1),
		necromancerSkillsModifier(1),
		poisonDamageOverTwoSecondsModifier(60),
		lifeStolenPerHitModifier(5),
		manaModifier(10),
		poisonResistModifier(25),
	],
	{
		requiredLevel: 21,
		requiredStrength: 25,
	}
);

// const Template = createItem(
// 	"UniqueName",
// 	"BaseName",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([0, 0])],
// 	[
// 	],
// 	{
// requiredLevel: 0,
// requiredStrength: 0,
// requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"UniqueName",
// 	"BaseName",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([0, 0])],
// 	[
// 	],
// 	{
// requiredLevel: 0,
// requiredStrength: 0,
// requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"UniqueName",
// 	"BaseName",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([0, 0])],
// 	[
// 	],
// 	{
// requiredLevel: 0,
// requiredStrength: 0,
// requiredDexterity: 0,
// 	}
// );

export const uniques = {
	helmets: {
		"Biggin's Bonnet": BigginsBonnet,
		Tarnhelm: Tarnhelm,
		"Coif of Glory": CoifOfGlory,
		Duskdeep: Duskdeep,
		Wormskull: Wormskull,
		"The Face of Horror": TheFaceOfHorror,
		"Harlequin Crest": HarlequinCrest,
		"Nightwing's Veil": NightwingsVeil,
	},
} as const;
