import type { ItemModifier } from "./modifiers";
import type { Item, ItemOptions } from "./bases";
import { toRawDeep } from "../../utils";

export function createItemCopy(item: Item): Item {
	const copy = structuredClone(toRawDeep(item));
	copy.id = crypto.randomUUID();
	return copy;
}

export function baseToUnique(
	base: Item,
	name: string,
	affixes: ItemModifier[],
	options?: ItemOptions
): Item {
	return { ...base, name, rarity: "unique", affixes, ...options };
}
