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
