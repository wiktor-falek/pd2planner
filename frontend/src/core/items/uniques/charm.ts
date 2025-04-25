import * as modifiers from "../modifiers";
import { bases, type Item } from "../bases";
import { baseToUnique } from "../items";

const Annihilus = baseToUnique(
	bases.charm["Small Charm"],
	"Annihilus",
	[
		modifiers.allSkills(1),
		modifiers.energy([10, 20]),
		modifiers.vitality([30, 60]),
		modifiers.allResist([10, 20]),
		modifiers.experienceGained([5, 10]),
	],
	{ requirements: { level: 75 } }
);

const HellfireTorch = baseToUnique(
	bases.charm["Large Charm"],
	"Hellfire Torch",
	[
		modifiers.amazonSkills(2), // TODO: class range
		modifiers.energy([10, 20]),
		modifiers.vitality([30, 60]),
		modifiers.allResist([10, 20]),
		modifiers.lightRadius([4, 8]),
	],
	{ requirements: { level: 75 } }
);

const GheedsFortune = baseToUnique(
	bases.charm["Grand Charm"],
	"Gheed's Fortune",
	[
		modifiers.goldFind([80, 160]),
		modifiers.magicFind([20, 40]),
		modifiers.reducedAllVendorPrices([10, 15]),
	],
	{ requirements: { level: 62 } }
);

export const charm = {
	Annihilus,
	HellfireTorch,
	GheedsFortune,
} as const satisfies Record<string, Item>;
