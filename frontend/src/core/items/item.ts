import type { ItemModifier } from "./modifiers";
import { toRawDeep } from "../../utils/toRawDeep";
import type { CharacterClass, ItemBaseType, ItemBaseWeaponType, Rarity, Tier } from "../../types";
import { cleanUndefined } from "../../utils/cleanUndefined";

export interface Item {
	id: string;
	name: string;
	baseName: string;
	type: ItemBaseType;
	weaponType?: ItemBaseWeaponType;
	rarity: Rarity;
	tier: Tier;
	basemods: ItemModifier[];
	automods: ItemModifier[];
	affixes: ItemModifier[];
	corruptedModifier: ItemModifier | null;
	desecratedModifier?: ItemModifier;
	maxSockets: number;
	sockets: number;
	ethereal: boolean;
	corrupted: boolean;
	requirements: {
		level?: number;
		strength?: number;
		dexterity?: number;
		class?: CharacterClass;
	};
	img?: string;
	size?: [width: number, height: number];
}

export interface ItemOptions {
	weaponType?: ItemBaseWeaponType;
	maxSockets?: number;
	requirements?: {
		level?: number;
		strength?: number;
		dexterity?: number;
		class?: CharacterClass;
	};
	basemods?: ItemModifier[];
	img?: string;
	size?: [number, number];
}

export function createItemCopy(item: Item): Item {
	const copy = structuredClone(toRawDeep(item));
	copy.id = crypto.randomUUID();
	return copy;
}

export function baseToMagic(
	base: Item,
	name: string,
	affixes: ItemModifier[],
	options: ItemOptions = {}
): Item {
	return { ...base, ...cleanUndefined(options), name, rarity: "magic", affixes };
}

export function baseToUnique(
	base: Item,
	name: string,
	affixes: ItemModifier[],
	options: ItemOptions = {}
): Item {
	return { ...base, ...cleanUndefined(options), name, rarity: "unique", affixes };
}
