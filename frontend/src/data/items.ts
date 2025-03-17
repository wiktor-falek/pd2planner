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
	thornsLightningModifier,
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
	howlLevelFiveOnStrikingModifier,
	attackSpeedModifier,
	flatMagicDamageReducedModifier,
	thornsModifier,
	damageTakenGainedAsManaModifier,
	attackRatingAgainstUndeadModifier,
	skeletonMasteryModifier,
	raiseSkeletonModifier,
	fasterRunWalkModifier,
	vitalityModifier,
	energyModifier,
	replenishLifeModifier,
	fasterHitRecoveryModifier,
	coldResistModifier,
	fireResistModifier,
	manaStolenPerHitModifier,
	dimVisionLevelThreeWhenStruckModifier,
	defensePerLevelModifier,
	cannotBeFrozenModifier,
	cloakOfShadowsModifier,
	preventMonsterHealModifier,
	slowTargetModifier,
	maxLightningResistModifier,
	lightningAbsorbModifier,
	addsColdDamageModifier,
	slowerStaminaDrainModifier,
	amazonSkillsModifier,
	fasterBlockRateModifier,
	increasedChanceOfBlockingModifier,
	fireAbsorbModifier,
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

// Normal Unique Helms

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
		thornsLightningModifier(17),
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

const Howltusk = createItem(
	"Howltusk",
	"Great Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([30, 35])],
	[
		howlLevelFiveOnStrikingModifier(10),
		attackSpeedModifier(20),
		enhancedDefenseModifier(80),
		flatMagicDamageReducedModifier(2),
		thornsModifier(30),
		damageTakenGainedAsManaModifier(35),
	],
	{
		requiredLevel: 25,
		requiredStrength: 63,
	}
);

const UndeadCrown = createItem(
	"Undead Crown",
	"Crown",
	"helmet",
	"unique",
	[baseDefenseModifier([25, 45])],
	[
		damageToUndeadModifier(50),
		attackRatingAgainstUndeadModifier([50, 100]),
		lifeStolenPerHitModifier(5),
		skeletonMasteryModifier([2, 3]),
		raiseSkeletonModifier([2, 3]),
		defenseModifier(40),
		poisonResistModifier(50),
		halfFreezeDurationModifier(),
	],
	{
		requiredLevel: 29,
		requiredStrength: 55,
	}
);

// Exceptional Helms

const PeasantCrown = createItem(
	"Peasant Crown",
	"War Hat",
	"helmet",
	"unique",
	[baseDefenseModifier([45, 53])],
	[
		allSkillsModifier(1),
		fasterRunWalkModifier(20),
		enhancedDefenseModifier(100),
		vitalityModifier(20),
		energyModifier(20),
		replenishLifeModifier([6, 12]),
	],
	{
		requiredLevel: 28,
		requiredStrength: 20,
	}
);

const Rockstopper = createItem(
	"Rockstopper",
	"Sallet",
	"helmet",
	"unique",
	[baseDefenseModifier([52, 62])],
	[
		fasterHitRecoveryModifier(30),
		enhancedDefenseModifier([160, 220]),
		vitalityModifier(15),
		coldResistModifier([20, 40]),
		fireResistModifier([20, 40]),
		lightningResistModifier([20, 40]),
		physicalDamageReducedModifier(10),
	],
	{
		requiredLevel: 31,
		requiredStrength: 43,
	}
);

const Stealskull = createItem(
	"Stealskull",
	"Casque",
	"helmet",
	"unique",
	[baseDefenseModifier([63, 72])],
	[
		attackSpeedModifier(20),
		fasterHitRecoveryModifier(20),
		manaStolenPerHitModifier([3, 5]),
		lifeStolenPerHitModifier([3, 5]),
		enhancedDefenseModifier([200, 240]),
		magicFindModifier([30, 50]),
	],
	{
		requiredLevel: 35,
		requiredStrength: 59,
	}
);

const DarksightHelm = createItem(
	"Darksight Helm",
	"Basinet",
	"helmet",
	"unique",
	[baseDefenseModifier([0, 0])],
	[
		dimVisionLevelThreeWhenStruckModifier(16),
		manaStolenPerHitModifier(5),
		hitBlindsTargetModifier(),
		defensePerLevelModifier(3),
		fireResistModifier([20, 40]),
		cannotBeFrozenModifier(),
		lightRadiusModifier(-4),
		cloakOfShadowsModifier(1),
	],
	{
		requiredLevel: 38,
		requiredStrength: 82,
	}
);

const BlackhornsFace = createItem(
	"Blackhorn's Face",
	"Death Mask",
	"helmet",
	"unique",
	[baseDefenseModifier([54, 86])],
	[
		preventMonsterHealModifier(),
		slowTargetModifier(20),
		enhancedDefenseModifier([180, 220]),
		maxLightningResistModifier(5),
		lightningResistModifier([20, 30]),
		lightningAbsorbModifier([10, 20]),
		thornsLightningModifier([225, 325]),
	],
	{
		requiredLevel: 41,
		requiredStrength: 55,
	}
);

const VampireGaze = createItem(
	"Vampire Gaze",
	"Grim Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([60, 125])],
	[
		addsColdDamageModifier(30, 60),
		manaStolenPerHitModifier([6, 10]),
		lifeStolenPerHitModifier([6, 10]),
		enhancedDefenseModifier(100),
		slowerStaminaDrainModifier(15),
		physicalDamageReducedModifier([15, 25]),
		flatMagicDamageReducedModifier([10, 15]),
	],
	{
		requiredLevel: 41,
		requiredStrength: 58,
	}
);

const ValkyrieWing = createItem(
	"Valkyrie Wing",
	"Winged Helm",
	"helmet",
	"unique",
	[baseDefenseModifier([85, 98])],
	[
		amazonSkillsModifier([1, 2]),
		fasterRunWalkModifier(30),
		fasterHitRecoveryModifier(30),
		enhancedDamageModifier([40, 60]),
		enhancedDefenseModifier([150, 200]),
		manaAfterEachKillModifier([3, 6]),
	],
	{
		requiredLevel: 44,
		requiredStrength: 115,
	}
);

const CrownOfThieves = createItem(
	"Crown of Thieves",
	"Grand Crown",
	"helmet",
	"unique",
	[baseDefenseModifier([78, 113])],
	[
		lifeStolenPerHitModifier([5, 10]),
		enhancedDefenseModifier([160, 200]),
		dexterityModifier(25),
		lifeModifier(50),
		fireResistModifier(33),
		goldFindModifier([80, 100]),
		magicFindModifier([40, 65]),
	],
	{
		requiredLevel: 49,
		requiredStrength: 103,
	}
);

// Elite Helms
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

const SteelShade = createItem(
	"Steel Shade",
	"Armet",
	"helmet",
	"unique",
	[baseDefenseModifier([105, 149])],
	[
		allSkillsModifier(2),
		fasterBlockRateModifier(20),
		increasedChanceOfBlockingModifier(20),
		manaStolenPerHitModifier([4, 8]),
		enhancedDefenseModifier([100, 130]),
		replenishLifeModifier([30, 48]),
		fireAbsorbModifier([4, 6]),
		goldFindModifier([60, 80]),
	],
	{
		requiredLevel: 62,
		requiredStrength: 109,
	}
);

// const AndarielsVisage = createItem(
// 	"Andariel's Visage",
// 	"Demonhead",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([101, 154])],
// 	[],
// 	{
// 		requiredLevel: 83,
// 		requiredStrength: 102,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

// const Template = createItem(
// 	"",
// 	"",
// 	"helmet",
// 	"unique",
// 	[baseDefenseModifier([])],
// 	[
// 	],
// 	{
// 		requiredLevel: 0,
// 		requiredStrength: 0,
// 		requiredDexterity: 0,
// 	}
// );

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

export const uniques = {
	helmets: {
		"Biggin's Bonnet": BigginsBonnet,
		Tarnhelm: Tarnhelm,
		"Coif of Glory": CoifOfGlory,
		Duskdeep: Duskdeep,
		"The Face of Horror": TheFaceOfHorror,
		Wormskull: Wormskull,
		Howltusk: Howltusk,
		"Undead Crown": UndeadCrown,
		"Peasant Crown": PeasantCrown,
		Rockstopper: Rockstopper,
		Stealskull: Stealskull,
		"Darksight Helm": DarksightHelm,
		"Blackhorn's Face": BlackhornsFace,
		"Vampire Gaze": VampireGaze,
		"Valkyrie Wing": ValkyrieWing,
		"Crown of Thieves": CrownOfThieves,
		"Harlequin Crest": HarlequinCrest,
		"Steel Shade": SteelShade,
		// "Nightwing's Veil": NightwingsVeil,
	},
} as const;
