export type CharacterClass =
	| "amazon"
	| "assassin"
	| "necromancer"
	| "barbarian"
	| "paladin"
	| "sorceress"
	| "druid";

export type Attributes = {
	strength: number;
	dexterity: number;
	vitality: number;
	energy: number;
};

export type Attribute = "strength" | "dexterity" | "vitality" | "energy";

export type Rarity = "normal" | "magic" | "rare" | "set" | "unique";
export type CraftableRarity = "normal" | "magic" | "rare";

export const ALL_RARITIES: Rarity[] = ["normal", "magic", "rare", "set", "unique"];

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

export const ALL_SLOTS: Slot[] = [
	"weapon-1",
	"weapon-2",
	"helmet",
	"chest",
	"gloves",
	"boots",
	"amulet",
	"ring-1",
	"ring-2",
	"belt",
];

export type Tier = "normal" | "exceptional" | "elite";
