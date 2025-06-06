import type { RunewordBaseType } from "../../types";
import type { Item } from "./item";
import { type ItemModifier } from "./modifiers";
import * as modifiers from "./modifiers";
import type { RuneName } from "../socketables";

export interface RunewordData {
	name: string;
	runes: RuneName[];
	requirements: {
		baseType: RunewordBaseType;
		level: number;
		sockets: number;
	};
	rarity: "runeword";
	affixes: ItemModifier[];
}

function createRunewordData(
	name: string,
	baseType: RunewordBaseType,
	runes: RuneName[],
	requiredLevel: number,
	affixes: ItemModifier[]
): RunewordData {
	return {
		name,
		runes,
		requirements: {
			baseType,
			level: requiredLevel,
			sockets: runes.length,
		},
		rarity: "runeword",
		affixes,
	};
}

export const runewordsData = {
	Lore: createRunewordData("Lore", "helmet", ["Ort", "Sol"], 27, [
		modifiers.allSkills(1),
		modifiers.energy([5, 10]),
		modifiers.lightningResist(30),
		modifiers.flatPhysicalDamageReduced(7),
		modifiers.manaAfterEachKill([1, 2]),
		modifiers.lightRadius(2),
	]),
} as const satisfies Record<string, RunewordData>;

export function createRuneword(base: Item, runewordData: RunewordData): Item {
	console.assert(
		base.type === runewordData.requirements.baseType,
		`Runeword '${runewordData.name}' requires '${base.type}' base type`
	);

	console.assert(
		base.maxSockets >= runewordData.requirements.sockets,
		`Base doesn't meet socket requirements for '${runewordData.name}' runeword`
	);

	const runeword: Item = {
		...base,
		name: runewordData.name,
		affixes: runewordData.affixes,
		requirements: {
			level: Math.max(base.requirements.level ?? 0, runewordData.requirements.level),
		},
		rarity: "runeword",
	};
	return runeword;
}
