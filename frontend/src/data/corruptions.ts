import type { ItemBaseType } from "../types";
import { type ItemModifier } from "./modifiers";
import * as modifiers from "./modifiers";

const corruptionModifiers = {
	weapon: [],
	shield: [],
	quiver: [],
	helmet: [],
	chest: [],
	gloves: [],
	boots: [],
	amulet: [],
	ring: [],
	belt: [],
} as const satisfies Record<ItemBaseType, ItemModifier[]>;
