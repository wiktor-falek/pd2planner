import type { Item } from "./bases";
import type { ItemBaseType } from "../../types";
import { helmet } from "./uniques/helmet";
import { ring } from "./uniques/ring";
import { amulet } from "./uniques/amulet";
import { belt } from "./uniques/belt";
import { boots } from "./uniques/boots";
import { gloves } from "./uniques/gloves";
import { charm } from "./uniques/charm";

export const uniques = {
	weapon: {},
	shield: {},
	quiver: {},
	helmet,
	chest: {},
	gloves,
	boots,
	amulet,
	ring,
	belt,
	charm,
} as const satisfies Record<ItemBaseType, Record<string, Item>>;
