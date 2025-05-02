import type { Item } from "./item";
import type { ItemBaseType } from "../../types";
import { charm } from "./magic/charm";

export const magic = {
	weapon: {},
	shield: {},
	quiver: {},
	helmet: {},
	chest: {},
	gloves: {},
	boots: {},
	amulet: {},
	ring: {},
	belt: {},
	charm,
} as const satisfies Record<ItemBaseType, Record<string, Item>>;
