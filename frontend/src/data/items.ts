import { toRaw } from "vue";
import {
	allAttributesModifier,
	allSkillsModifier,
	coldAbsorbModifier,
	coldSkillDamageModifier,
	dexterityModifier,
	enemyColdResistanceModifier,
	enhancedDefenseModifier,
	halfFreezeDurationModifier,
	lifePerLevelModifier,
	magicFindModifier,
	manaPerLevelModifier,
	physicalDamageReducedModifier,
	requirementsModifier,
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
	requiredLevel: number;
	requiredStrength: number;
	requiredDexterity: number;
	sockets: number;
	corrupted: boolean;
	corruptedModifier?: ItemModifier;
	ethereal: boolean;
	defense?: [number, number];
}

interface ItemOptions {
	corruptedModifier?: ItemModifier;
	defense?: [number, number];
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
	modifiers: ItemModifier[],
	options?: ItemOptions
): Item {
	return {
		id: crypto.randomUUID(),
		name,
		baseName,
		slot,
		rarity,
		modifiers,
		defense: options?.defense,
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
		defense: [98, 141],
	}
);

const NightwingsVeil = createItem(
	"Nightwing's Veil",
	"Spired Helm",
	"helmet",
	"unique",
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
		defense: [304, 352],
	}
);

export const uniques = {
	helmets: { "Harlequin Crest": HarlequinCrest, "Nightwing's Veil": NightwingsVeil },
} as const;
