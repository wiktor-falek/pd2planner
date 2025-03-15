import { toRaw } from "vue";
import { allSkillsModifier, type Modifier } from "./modifiers";

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
	modifiers: Modifier[];
	requiredLevel: number;
	requiredStrength: number;
	requiredDexterity: number;
	sockets: number;
	corrupted: boolean;
	corruptedModifier?: Modifier;
	ethereal: boolean;
	defense?: [number, number];
}

interface ItemOptions {
	corruptedModifier?: Modifier;
	defense?: [number, number];
	requiredLevel?: number;
	requiredStrength?: number;
	requiredDexterity?: number;
	sockets?: number;
	corrupted?: boolean;
	ethereal?: boolean;
}

export function createItemCopy(item: Item) {
	const copy = structuredClone(toRaw(item));
	copy.id = crypto.randomUUID();
	return copy;
}

function createItem(
	name: string,
	baseName: string,
	slot: Slot,
	rarity: Rarity,
	modifiers: Modifier[],
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
		// { description: "+2 to All Skills" },
		// { description: "+2 to All Attributes" },
		// { description: "+[1-99] to Life (+1 per Character Level)" },
		// { description: "+[1-99] to Mana (+1 per Character Level)" },
		// { description: "Physical Damage Taken Reduced by [3-5]%" },
		// { description: "[25-50]% Better Chance of Getting Magic Items" },
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
		// { description: "+2 to All Skills" },
		// { description: "-[5-10]% to Enemy Cold Resistance" },
		// { description: "+[10-15]% to Cold Skill Damage" },
		// { description: "+[90-120]% Enhanced Defense" },
		// { description: "+[10-20] to Dexterity" },
		// { description: "+[5-9] Cold Absorb" },
		// { description: "Half Freeze Duration" },
		// { description: "Requirements -50% " },
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
