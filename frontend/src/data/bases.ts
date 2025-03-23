import type { CharacterClass, Rarity, Slot, Tier } from "../types";
import { defenseModifier, type ItemModifier } from "./modifiers";

export interface Item {
	id: string;
	name: string;
	baseName: string;
	slot: Slot;
	rarity: Rarity;
	tier: Tier;
	basemods: ItemModifier[];
	automods: ItemModifier[];
	affixes: ItemModifier[];
	maxSockets: number;
	sockets: number;
	ethereal: boolean;
	corrupted: boolean;
	// corruptedModifier?: ItemModifier;
	requirements: {
		level?: number;
		strength?: number;
		dexterity?: number;
		class?: CharacterClass;
	};
}

export interface ItemOptions {
	maxSockets?: number;
	requirements?: {
		level?: number;
		strength?: number;
		dexterity?: number;
		class?: CharacterClass;
	};
	basemods?: ItemModifier[];
}

function createItemBase(baseName: string, slot: Slot, tier: Tier, options?: ItemOptions): Item {
	return {
		id: crypto.randomUUID(),
		name: "New Item",
		baseName,
		slot,
		rarity: "normal",
		tier,
		requirements: options?.requirements ?? {},
		basemods: options?.basemods ?? [],
		automods: [], // TODO: grant to correct items
		affixes: [],
		maxSockets: options?.maxSockets ?? 0,
		sockets: 0,
		ethereal: false,
		corrupted: false,
	};
}

// prettier-ignore
const helmets = {
	// normal
	"Cap": createItemBase("Cap", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([3, 5])] }),
  	"Skull Cap": createItemBase("Skull Cap", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([8, 11])], requirements: { strength: 15 } }),
  	"Helm": createItemBase("Helm", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([15, 18])], requirements: { strength: 26 } }),
  	"Full Helm": createItemBase("Full Helm", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([23, 26])], requirements: { strength: 41 } }),
  	"Mask": createItemBase("Mask", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([9, 27])], requirements: { strength: 23 } }),
  	"Bone Helm": createItemBase("Bone Helm", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([33, 36])], requirements: { strength: 25 } }),
  	"Great Helm": createItemBase("Great Helm", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([30, 35])], requirements: { strength: 63 } }),
  	"Crown": createItemBase("Crown", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([25, 45])], requirements: { strength: 55 } }),
  	"Circlet": createItemBase("Circlet", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([20, 30])], requirements: { level: 16 } }),
	"Coronet": createItemBase("Coronet", "helmet", "normal", { maxSockets: 2, basemods: [defenseModifier([30, 40])], requirements: { level: 39 } }),
  	"Wolf Head": createItemBase("Wolf Head", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([8, 11])], requirements: { strength: 16, level: 3 } }),
  	"Hawk Helm": createItemBase("Hawk Helm", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([4, 15])], requirements: { strength: 20, level: 6 } }),
  	"Antlers": createItemBase("Antlers", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([18, 24])], requirements: { strength: 24, level: 12 } }),
  	"Falcon Mask": createItemBase("Falcon Mask", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([12, 28])], requirements: { strength: 28, level: 15 } }),
  	"Spirit Mask": createItemBase("Spirit Mask", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([22, 35])], requirements: { strength: 30, level: 18 } }),
  	"Jawbone Cap": createItemBase("Jawbone Cap", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([10, 15])], requirements: { strength: 25, level: 3 } }),
  	"Fanged Helm": createItemBase("Fanged Helm", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([15, 20])], requirements: { strength: 35, level: 6 } }),
  	"Horned Helm": createItemBase("Horned Helm", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([25, 30])], requirements: { strength: 45, level: 12 } }),
  	"Assault Helmet": createItemBase("Assault Helmet", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([30, 35])], requirements: { strength: 55, level: 15 } }),
  	"Avenger Guard": createItemBase("Avenger Guard", "helmet", "normal", { maxSockets: 3, basemods: [defenseModifier([35, 50])], requirements: { strength: 65, level: 18 } }),
	// exceptional
	"War Hat": createItemBase("War Hat", "helmet", "exceptional", { maxSockets: 2, basemods: [defenseModifier([45, 53])], requirements: { strength: 20, level: 22 } }),
	"Sallet": createItemBase("Sallet", "helmet", "exceptional", { maxSockets: 2, basemods: [defenseModifier([52, 62])], requirements: { strength: 43, level: 25 } }),
	"Casque": createItemBase("Casque", "helmet", "exceptional", { maxSockets: 2, basemods: [defenseModifier([63, 72])], requirements: { strength: 59, level: 25 } }),
	"Basinet": createItemBase("Basinet", "helmet", "exceptional", { maxSockets: 2, basemods: [defenseModifier([75, 84])], requirements: { strength: 82, level: 25 } }),
	"Death Mask": createItemBase("Death Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([54, 86])], requirements: { strength: 55, level: 25 } }),
	"Grim Helm": createItemBase("Grim Helm", "helmet", "exceptional", { maxSockets: 2, basemods: [defenseModifier([60, 125])], requirements: { strength: 58, level: 25 } }),
	"Winged Helm": createItemBase("Winged Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([85, 98])], requirements: { strength: 115, level: 25 } }),
	"Grand Crown": createItemBase("Grand Crown", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([78, 113])], requirements: { strength: 103, level: 25 } }),
	"Tiara": createItemBase("Tiara", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([40, 50])], requirements: { level: 52 } }),
	"Alpha Helm": createItemBase("Alpha Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([52, 62])], requirements: { strength: 44, level: 26 } }),
	"Griffon Headress": createItemBase("Griffon Headress", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([46, 68])], requirements: { strength: 50, level: 30 } }),
	"Hunter's Guise": createItemBase("Hunter's Guise", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([67, 81])], requirements: { strength: 56, level: 29 } }),
	"Sacred Feathers": createItemBase("Sacred Feathers", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([58, 87])], requirements: { strength: 62, level: 32 } }),
	"Totemic Mask": createItemBase("Totemic Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([73, 98])], requirements: { strength: 65, level: 41 } }),
	"Jawbone Visor": createItemBase("Jawbone Visor", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([55, 68])], requirements: { strength: 58, level: 25 } }),
	"Lion Helm": createItemBase("Lion Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([63, 75])], requirements: { strength: 73, level: 29 } }),
	"Rage Mask": createItemBase("Rage Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([78, 90])], requirements: { strength: 88, level: 29 } }),
	"Savage Helmet": createItemBase("Savage Helmet", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([85, 98])], requirements: { strength: 103, level: 32 } }),
	"Slayer Guard": createItemBase("Slayer Guard", "helmet", "exceptional", { maxSockets: 3, basemods: [defenseModifier([93, 120])], requirements: { strength: 118, level: 40 } }),
	// elite
	"Shako": createItemBase("Shako", "helmet", "elite", { maxSockets: 2, basemods: [defenseModifier([98, 141])], requirements: { strength: 50, level: 43 } }),
  	"Hydraskull": createItemBase("Hydraskull", "helmet", "elite", { maxSockets: 2, basemods: [defenseModifier([101, 145])], requirements: { strength: 84, level: 47 } }),
  	"Armet": createItemBase("Armet", "helmet", "elite", { maxSockets: 2, basemods: [defenseModifier([105, 149])], requirements: { strength: 109, level: 51 } }),
  	"Giant Conch": createItemBase("Giant Conch", "helmet", "elite", { maxSockets: 2, basemods: [defenseModifier([110, 154])], requirements: { strength: 142, level: 40 } }),
  	"Demonhead": createItemBase("Demonhead", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([101, 154])], requirements: { strength: 102, level: 55 } }),
  	"Bone Visage": createItemBase("Bone Visage", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([100, 157])], requirements: { strength: 106, level: 63 } }),
  	"Spired Helm": createItemBase("Spired Helm", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([114, 159])], requirements: { strength: 192, level: 59 } }),
  	"Corona": createItemBase("Corona", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([111, 165])], requirements: { strength: 174, level: 66 } }),
  	"Diadem": createItemBase("Diadem", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([50, 60])], requirements: { level: 64 } }),
  	"Blood Spirit": createItemBase("Blood Spirit", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([101, 145])], requirements: { strength: 86, level: 46 } }),
  	"Sun Spirit": createItemBase("Sun Spirit", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([98, 147])], requirements: { strength: 95, level: 51 } }),
  	"Earth Spirit": createItemBase("Earth Spirit", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([107, 152])], requirements: { strength: 104, level: 57 } }),
  	"Sky Spirit": createItemBase("Sky Spirit", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([103, 155])], requirements: { strength: 113, level: 62 } }),
  	"Dream Spirit": createItemBase("Dream Spirit", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([109, 159])], requirements: { strength: 118, level: 66 } }),
  	"Carnage Helm": createItemBase("Carnage Helm", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([102, 147])], requirements: { strength: 106, level: 45 } }),
  	"Fury Visor": createItemBase("Fury Visor", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([105, 150])], requirements: { strength: 129, level: 49 } }),
  	"Destroyer Helm": createItemBase("Destroyer Helm", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([111, 156])], requirements: { strength: 151, level: 54 } }),
  	"Conquerer Crown": createItemBase("Conquerer Crown", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([114, 159])], requirements: { strength: 174, level: 60 } }),
  	"Guardian Crown": createItemBase("Guardian Crown", "helmet", "elite", { maxSockets: 3, basemods: [defenseModifier([117, 168])], requirements: { strength: 196, level: 65 } })
};

export const bases = {
	helmets,
} as const;
