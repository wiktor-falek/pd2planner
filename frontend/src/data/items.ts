export interface Modifier {
	description: string;
}

export type Rarity = "normal" | "magic" | "rare" | "set" | "unique";

export interface Item {
	name: string; // unique/set name or "normal/superior/magic/rare/crafted slot"
	baseName: string;
	rarity: Rarity;
	requiredLevel?: number;
	requiredStrength?: number;
	requiredDexterity?: number;
	//   sockets: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	//   corrupted: boolean;
	//   corruptedModifier?: Modifier;
	//   ethereal?: boolean;
	defense?: [number, number];
	modifiers: Modifier[];
}

// TODO: organize by files
const HarlequinCrest: Item = {
	name: "Harlequin Crest",
	baseName: "Shako",
	rarity: "unique",
	requiredLevel: 62,
	requiredStrength: 50,
	defense: [98, 141],
	modifiers: [
		{ description: "+2 to All Skills" },
		{ description: "+2 to All Attributes" },
		{ description: "+[1-99] to Life (+1 per Character Level)" },
		{ description: "+[1-99] to Mana (+1 per Character Level)" },
		{ description: "Physical Damage Taken Reduced by [3-5]%" },
		{ description: "[25-50]% Better Chance of Getting Magic Items" },
	],
};

const NightwingsVeil: Item = {
	name: "Nightwing's Veil",
	baseName: "Spired Helm",
	rarity: "unique",
	requiredLevel: 67,
	requiredStrength: 96,
	defense: [304, 352],
	modifiers: [
		{ description: "+2 to All Skills" },
		{ description: "-[5-10]% to Enemy Cold Resistance" },
		{ description: "+[10-15]% to Cold Skill Damage" },
		{ description: "+[90-120]% Enhanced Defense" },
		{ description: "+[10-20] to Dexterity" },
		{ description: "+[5-9] Cold Absorb" },
		{ description: "Half Freeze Duration" },
		{ description: "Requirements -50% " },
	],
};

export const uniques = {
	helmets: { "Harlequin Crest": HarlequinCrest, "Nightwing's Veil": NightwingsVeil },
} as const;
