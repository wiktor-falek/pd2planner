import type { CharacterClass, ItemBaseType, Rarity, Tier } from "../types";
import { baseDefenseModifier, type ItemModifier } from "./modifiers";

export interface Item {
	id: string;
	name: string;
	baseName: string;
	type: ItemBaseType;
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

function createItemBase(
	baseName: string,
	type: ItemBaseType,
	tier: Tier,
	options?: ItemOptions
): Item {
	return {
		id: crypto.randomUUID(),
		name: "New Item",
		baseName,
		type,
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
const weapon = {
	"Test Weapon": createItemBase("Test Weapon", "weapon", "normal", { maxSockets: 2, basemods: [] }),
};

const shield = {
	"Test Shield": createItemBase("Test Shield", "shield", "normal", { maxSockets: 2, basemods: [] }),
};

// prettier-ignore
const helmet = {
	// normal
	"Cap": createItemBase("Cap", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([3, 5])] }),
  	"Skull Cap": createItemBase("Skull Cap", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([8, 11])], requirements: { strength: 15 } }),
  	"Helm": createItemBase("Helm", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([15, 18])], requirements: { strength: 26 } }),
  	"Full Helm": createItemBase("Full Helm", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([23, 26])], requirements: { strength: 41 } }),
  	"Mask": createItemBase("Mask", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([9, 27])], requirements: { strength: 23 } }),
  	"Bone Helm": createItemBase("Bone Helm", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([33, 36])], requirements: { strength: 25 } }),
  	"Great Helm": createItemBase("Great Helm", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([30, 35])], requirements: { strength: 63 } }),
  	"Crown": createItemBase("Crown", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([25, 45])], requirements: { strength: 55 } }),
  	"Circlet": createItemBase("Circlet", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([20, 30])], requirements: { level: 16 } }),
	"Coronet": createItemBase("Coronet", "helmet", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([30, 40])], requirements: { level: 39 } }),
  	"Wolf Head": createItemBase("Wolf Head", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([8, 11])], requirements: { strength: 16, level: 3 } }),
  	"Hawk Helm": createItemBase("Hawk Helm", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([4, 15])], requirements: { strength: 20, level: 6 } }),
  	"Antlers": createItemBase("Antlers", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([18, 24])], requirements: { strength: 24, level: 12 } }),
  	"Falcon Mask": createItemBase("Falcon Mask", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([12, 28])], requirements: { strength: 28, level: 15 } }),
  	"Spirit Mask": createItemBase("Spirit Mask", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([22, 35])], requirements: { strength: 30, level: 18 } }),
  	"Jawbone Cap": createItemBase("Jawbone Cap", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([10, 15])], requirements: { strength: 25, level: 3 } }),
  	"Fanged Helm": createItemBase("Fanged Helm", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([15, 20])], requirements: { strength: 35, level: 6 } }),
  	"Horned Helm": createItemBase("Horned Helm", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([25, 30])], requirements: { strength: 45, level: 12 } }),
  	"Assault Helmet": createItemBase("Assault Helmet", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([30, 35])], requirements: { strength: 55, level: 15 } }),
  	"Avenger Guard": createItemBase("Avenger Guard", "helmet", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([35, 50])], requirements: { strength: 65, level: 18 } }),
	// exceptional
	"War Hat": createItemBase("War Hat", "helmet", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([45, 53])], requirements: { strength: 20, level: 22 } }),
	"Sallet": createItemBase("Sallet", "helmet", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([52, 62])], requirements: { strength: 43, level: 25 } }),
	"Casque": createItemBase("Casque", "helmet", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([63, 72])], requirements: { strength: 59, level: 25 } }),
	"Basinet": createItemBase("Basinet", "helmet", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([75, 84])], requirements: { strength: 82, level: 25 } }),
	"Death Mask": createItemBase("Death Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([54, 86])], requirements: { strength: 55, level: 25 } }),
	"Grim Helm": createItemBase("Grim Helm", "helmet", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([60, 125])], requirements: { strength: 58, level: 25 } }),
	"Winged Helm": createItemBase("Winged Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([85, 98])], requirements: { strength: 115, level: 25 } }),
	"Grand Crown": createItemBase("Grand Crown", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([78, 113])], requirements: { strength: 103, level: 25 } }),
	"Tiara": createItemBase("Tiara", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([40, 50])], requirements: { level: 52 } }),
	"Alpha Helm": createItemBase("Alpha Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([52, 62])], requirements: { strength: 44, level: 26 } }),
	"Griffon Headress": createItemBase("Griffon Headress", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([46, 68])], requirements: { strength: 50, level: 30 } }),
	"Hunter's Guise": createItemBase("Hunter's Guise", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([67, 81])], requirements: { strength: 56, level: 29 } }),
	"Sacred Feathers": createItemBase("Sacred Feathers", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([58, 87])], requirements: { strength: 62, level: 32 } }),
	"Totemic Mask": createItemBase("Totemic Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([73, 98])], requirements: { strength: 65, level: 41 } }),
	"Jawbone Visor": createItemBase("Jawbone Visor", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([55, 68])], requirements: { strength: 58, level: 25 } }),
	"Lion Helm": createItemBase("Lion Helm", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([63, 75])], requirements: { strength: 73, level: 29 } }),
	"Rage Mask": createItemBase("Rage Mask", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([78, 90])], requirements: { strength: 88, level: 29 } }),
	"Savage Helmet": createItemBase("Savage Helmet", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([85, 98])], requirements: { strength: 103, level: 32 } }),
	"Slayer Guard": createItemBase("Slayer Guard", "helmet", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([93, 120])], requirements: { strength: 118, level: 40 } }),
	// elite
	"Shako": createItemBase("Shako", "helmet", "elite", { maxSockets: 2, basemods: [baseDefenseModifier([98, 141])], requirements: { strength: 50, level: 43 } }),
  	"Hydraskull": createItemBase("Hydraskull", "helmet", "elite", { maxSockets: 2, basemods: [baseDefenseModifier([101, 145])], requirements: { strength: 84, level: 47 } }),
  	"Armet": createItemBase("Armet", "helmet", "elite", { maxSockets: 2, basemods: [baseDefenseModifier([105, 149])], requirements: { strength: 109, level: 51 } }),
  	"Giant Conch": createItemBase("Giant Conch", "helmet", "elite", { maxSockets: 2, basemods: [baseDefenseModifier([110, 154])], requirements: { strength: 142, level: 40 } }),
  	"Demonhead": createItemBase("Demonhead", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([101, 154])], requirements: { strength: 102, level: 55 } }),
  	"Bone Visage": createItemBase("Bone Visage", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([100, 157])], requirements: { strength: 106, level: 63 } }),
  	"Spired Helm": createItemBase("Spired Helm", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([114, 159])], requirements: { strength: 192, level: 59 } }),
  	"Corona": createItemBase("Corona", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([111, 165])], requirements: { strength: 174, level: 66 } }),
  	"Diadem": createItemBase("Diadem", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([50, 60])], requirements: { level: 64 } }),
  	"Blood Spirit": createItemBase("Blood Spirit", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([101, 145])], requirements: { strength: 86, level: 46 } }),
  	"Sun Spirit": createItemBase("Sun Spirit", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([98, 147])], requirements: { strength: 95, level: 51 } }),
  	"Earth Spirit": createItemBase("Earth Spirit", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([107, 152])], requirements: { strength: 104, level: 57 } }),
  	"Sky Spirit": createItemBase("Sky Spirit", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([103, 155])], requirements: { strength: 113, level: 62 } }),
  	"Dream Spirit": createItemBase("Dream Spirit", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([109, 159])], requirements: { strength: 118, level: 66 } }),
  	"Carnage Helm": createItemBase("Carnage Helm", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([102, 147])], requirements: { strength: 106, level: 45 } }),
  	"Fury Visor": createItemBase("Fury Visor", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([105, 150])], requirements: { strength: 129, level: 49 } }),
  	"Destroyer Helm": createItemBase("Destroyer Helm", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([111, 156])], requirements: { strength: 151, level: 54 } }),
  	"Conquerer Crown": createItemBase("Conquerer Crown", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([114, 159])], requirements: { strength: 174, level: 60 } }),
  	"Guardian Crown": createItemBase("Guardian Crown", "helmet", "elite", { maxSockets: 3, basemods: [baseDefenseModifier([117, 168])], requirements: { strength: 196, level: 65 } })
};

// prettier-ignore
const chest = {
	// normal
	"Quilted Armor": createItemBase("Quilted Armor", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([9, 11])], requirements: { strength: 12 } }),
	"Leather Armor": createItemBase("Leather Armor", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([15, 17])], requirements: { strength: 15 } }),
	"Hard Leather Armor": createItemBase("Hard Leather Armor", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([23, 25])], requirements: { strength: 20 } }),
	"Studded Leather": createItemBase("Studded Leather", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([35, 37])], requirements: { strength: 27 } }),
	"Ring Mail": createItemBase("Ring Mail", "chest", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([49, 51])], requirements: { strength: 36 } }),
	"Scale Mail": createItemBase("Scale Mail", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([61, 63])], requirements: { strength: 44 } }),
	"Chain Mail": createItemBase("Chain Mail", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([70, 71])], requirements: { strength: 48 } }),
	"Breast Plate": createItemBase("Breast Plate", "chest", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([56, 58])], requirements: { strength: 30 } }),
	"Splint Mail": createItemBase("Splint Mail", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([81, 84])], requirements: { strength: 51 } }),
	"Plate Mail": createItemBase("Plate Mail", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([103, 108])], requirements: { strength: 65 } }),
	"Field Plate": createItemBase("Field Plate", "chest", "normal", { maxSockets: 2, basemods: [baseDefenseModifier([100, 102])], requirements: { strength: 55 } }),
	"Gothic Plate": createItemBase("Gothic Plate", "chest", "normal", { maxSockets: 4, basemods: [baseDefenseModifier([124, 128])], requirements: { strength: 70 } }),
	"Light Plate": createItemBase("Light Plate", "chest", "normal", { maxSockets: 3, basemods: [baseDefenseModifier([93, 99])], requirements: { strength: 41 } }),
	"Full Plate Mail": createItemBase("Full Plate Mail", "chest", "normal", { maxSockets: 4, basemods: [baseDefenseModifier([145, 150])], requirements: { strength: 80 } }),
	"Ancient Armor": createItemBase("Ancient Armor", "chest", "normal", { maxSockets: 4, basemods: [baseDefenseModifier([178, 185])], requirements: { strength: 100 } }),
	// exceptional
	"Ghost Armor": createItemBase("Ghost Armor", "chest", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([106, 112])], requirements: { strength: 38, level: 22 } }),
	"Serpentskin Armor": createItemBase("Serpentskin Armor", "chest", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([116, 122])], requirements: { strength: 43, level: 24 } }),
	"Demonhide Armor": createItemBase("Demonhide Armor", "chest", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([128, 134])], requirements: { strength: 50, level: 25 } }),
	"Trellised Armor": createItemBase("Trellised Armor", "chest", "exceptional", { maxSockets: 2, basemods: [baseDefenseModifier([148, 156])], requirements: { strength: 61, level: 25 } }),
	"Linked Mail": createItemBase("Linked Mail", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([172, 180])], requirements: { strength: 74, level: 25 } }),
	"Tigulated Mail": createItemBase("Tigulated Mail", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([193, 202])], requirements: { strength: 86, level: 25 } }),
	"Mesh Armor": createItemBase("Mesh Armor", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([207, 216])], requirements: { strength: 92, level: 25 } }),
	"Cuirass": createItemBase("Cuirass", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([170, 176])], requirements: { strength: 65, level: 25 } }),
	"Russet Armor": createItemBase("Russet Armor", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([223, 233])], requirements: { strength: 97, level: 25 } }),
	"Templar Coat": createItemBase("Templar Coat", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([264, 278])], requirements: { strength: 118, level: 25 } }),
	"Sharktooth Armor": createItemBase("Sharktooth Armor", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([246, 255])], requirements: { strength: 103, level: 25 } }),
	"Embossed Plate": createItemBase("Embossed Plate", "chest", "exceptional", { maxSockets: 4, basemods: [baseDefenseModifier([291, 304])], requirements: { strength: 125, level: 25 } }),
	"Mage Plate": createItemBase("Mage Plate", "chest", "exceptional", { maxSockets: 3, basemods: [baseDefenseModifier([178, 187])], requirements: { strength: 55, level: 25 } }),
	"Chaos Armor": createItemBase("Chaos Armor", "chest", "exceptional", { maxSockets: 4, basemods: [baseDefenseModifier([323, 340])], requirements: { strength: 140, level: 25 } }),
	"Ornate Plate": createItemBase("Ornate Plate", "chest", "exceptional", { maxSockets: 4, basemods: [baseDefenseModifier([423, 444])], requirements: { strength: 170, level: 25 } }),
	// elite
	"Dusk Shroud": createItemBase("Dusk Shroud", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([270, 302])], requirements: { strength: 77, level: 49 } }),
	"Wyrmhide": createItemBase("Wyrmhide", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([287, 322])], requirements: { strength: 84, level: 50 } }),
	"Scarab Husk": createItemBase("Scarab Husk", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([309, 349])], requirements: { strength: 95, level: 51 } }),
	"Wire Fleece": createItemBase("Wire Fleece", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([343, 391])], requirements: { strength: 111, level: 53 } }),
	"Diamond Mail": createItemBase("Diamond Mail", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([388, 445])], requirements: { strength: 131, level: 54 } }),
	"Loricated Mail": createItemBase("Loricated Mail", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([428, 495])], requirements: { strength: 149, level: 55 } }),
	"Boneweave": createItemBase("Boneweave", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([419, 489])], requirements: { strength: 158, level: 47 } }),
	"Great Hauberk": createItemBase("Great Hauberk", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([371, 420])], requirements: { strength: 118, level: 56 } }),
	"Balrog Skin": createItemBase("Balrog Skin", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([469, 541])], requirements: { strength: 165, level: 57 } }),
	"Hellforge Plate": createItemBase("Hellforge Plate", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([536, 625])], requirements: { strength: 196, level: 59 } }),
	"Kraken Shell": createItemBase("Kraken Shell", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([501, 576])], requirements: { strength: 174, level: 61 } }),
	"Lacquered Plate": createItemBase("Lacquered Plate", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([573, 664])], requirements: { strength: 208, level: 62 } }),
	"Archon Plate": createItemBase("Archon Plate", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([364, 407])], requirements: { strength: 103, level: 63 } }),
	"Shadow Plate": createItemBase("Shadow Plate", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([599, 696])], requirements: { strength: 220, level: 64 } }),
	"Sacred Armor": createItemBase("Sacred Armor", "chest", "elite", { maxSockets: 4, basemods: [baseDefenseModifier([633, 730])], requirements: { strength: 232, level: 66 } }),
};

// prettier-ignore
const gloves = {
	// normal
	"Gloves": createItemBase("Gloves", "gloves", "normal", { basemods: [baseDefenseModifier([2, 3])] }),
	"Heavy Gloves": createItemBase("Heavy Gloves", "gloves", "normal", { basemods: [baseDefenseModifier([5, 6])] }),
	"Chain Gloves": createItemBase("Chain Gloves", "gloves", "normal", { basemods: [baseDefenseModifier([8, 9])], requirements: { strength: 25 } }),
	"Light Gauntlets": createItemBase("Light Gauntlets", "gloves", "normal", { basemods: [baseDefenseModifier([9, 11])], requirements: { strength: 45 } }),
	"Gaunlets": createItemBase("Gaunlets", "gloves", "normal", { basemods: [baseDefenseModifier([12, 15])], requirements: { strength: 60 } }),
	// exceptional
	"Demonhide Gloves": createItemBase("Demonhide Gloves", "gloves", "exceptional", { basemods: [baseDefenseModifier([28, 35])], requirements: { strength: 20, level: 21 } }),
	"Sharkskin Gloves": createItemBase("Sharkskin Gloves", "gloves", "exceptional", { basemods: [baseDefenseModifier([33, 39])], requirements: { strength: 20, level: 25 } }),
	"Heavy Bracers": createItemBase("Heavy Bracers", "gloves", "exceptional", { basemods: [baseDefenseModifier([37, 44])], requirements: { strength: 58, level: 25 } }),
	"Battle Gauntlets": createItemBase("Battle Gauntlets", "gloves", "exceptional", { basemods: [baseDefenseModifier([39, 47])], requirements: { strength: 88, level: 25 } }),
	"War Gauntlets": createItemBase("War Gauntlets", "gloves", "exceptional", { basemods: [baseDefenseModifier([43, 53])], requirements: { strength: 110, level: 25 } }),
	// elite
	"Bramble Mitts": createItemBase("Bramble Mitts", "gloves", "elite", { basemods: [baseDefenseModifier([54, 62])], requirements: { strength: 50, level: 42 } }),
	"Vampirebone Gloves": createItemBase("Vampirebone Gloves", "gloves", "elite", { basemods: [baseDefenseModifier([56, 65])], requirements: { strength: 50, level: 47 } }),
	"Vambraces": createItemBase("Vambraces", "gloves", "elite", { basemods: [baseDefenseModifier([59, 67])], requirements: { strength: 106, level: 51 } }),
	"Crusader Gauntlets": createItemBase("Crusader Gauntlets", "gloves", "elite", { basemods: [baseDefenseModifier([59, 68])], requirements: { strength: 151, level: 57 } }),
	"Ogre Gauntlets": createItemBase("Ogre Gauntlets", "gloves", "elite", { basemods: [baseDefenseModifier([62, 71])], requirements: { strength: 185, level: 64 } }),
};

// prettier-ignore
const boots = {
	// normal
	"Boots": createItemBase("Boots", "boots", "normal", { basemods: [baseDefenseModifier([2, 3])] }),
	"Heavy Boots": createItemBase("Heavy Boots", "boots", "normal", { basemods: [baseDefenseModifier([5, 6])], requirements: { strength: 18 } }),
	"Chain Boots": createItemBase("Chain Boots", "boots", "normal", { basemods: [baseDefenseModifier([8, 9])], requirements: { strength: 30 } }),
	"Light Plated Boots": createItemBase("Light Plated Boots", "boots", "normal", { basemods: [baseDefenseModifier([9, 11])], requirements: { strength: 50 } }),
	"Greaves": createItemBase("Greaves", "boots", "normal", { basemods: [baseDefenseModifier([12, 15])], requirements: { strength: 70 } }),
	// exceptional
	"Demonhide Boots": createItemBase("Demonhide Boots", "boots", "exceptional", { basemods: [baseDefenseModifier([28, 35])], requirements: { strength: 20, level: 24 } }),
	"Sharkskin Boots": createItemBase("Sharkskin Boots", "boots", "exceptional", { basemods: [baseDefenseModifier([33, 39])], requirements: { strength: 47, level: 25 } }),
	"Mesh Boots": createItemBase("Mesh Boots", "boots", "exceptional", { basemods: [baseDefenseModifier([37, 44])], requirements: { strength: 65, level: 25 } }),
	"Battle Boots": createItemBase("Battle Boots", "boots", "exceptional", { basemods: [baseDefenseModifier([39, 47])], requirements: { strength: 95, level: 25 } }),
	"War Boots": createItemBase("War Boots", "boots", "exceptional", { basemods: [baseDefenseModifier([43, 53])], requirements: { strength: 125, level: 25 } }),
	// elite
	"Wyrmhide Boots": createItemBase("Wyrmhide Boots", "boots", "elite", { basemods: [baseDefenseModifier([54, 62])], requirements: { strength: 50, level: 45 } }),
	"Scarabshell Boots": createItemBase("Scarabshell Boots", "boots", "elite", { basemods: [baseDefenseModifier([56, 65])], requirements: { strength: 91, level: 49 } }),
	"Boneweave Boots": createItemBase("Boneweave Boots", "boots", "elite", { basemods: [baseDefenseModifier([59, 67])], requirements: { strength: 118, level: 54 } }),
	"Mirrored Boots": createItemBase("Mirrored Boots", "boots", "elite", { basemods: [baseDefenseModifier([59, 68])], requirements: { strength: 163, level: 60 } }),
	"Myrmidon Greaves": createItemBase("Myrmidon Greaves", "boots", "elite", { basemods: [baseDefenseModifier([62, 71])], requirements: { strength: 208, level: 65 } }),
};

// prettier-ignore
const amulet = {
	"Amulet": createItemBase("Amulet", "amulet", "normal")
};

// prettier-ignore
const ring = {
	"Ring": createItemBase("Ring", "ring", "normal")
};

// prettier-ignore
const belt = {
	// normal
	"Sash": createItemBase("Sash", "belt", "normal", { basemods: [baseDefenseModifier([2, 2])] }),
	"Light Belt": createItemBase("Light Belt", "belt", "normal", { basemods: [baseDefenseModifier([3, 3])] }),
	"Belt": createItemBase("Belt", "belt", "normal", { basemods: [baseDefenseModifier([5, 5])], requirements: { strength: 25 } }),
	"Heavy Belt": createItemBase("Heavy Belt", "belt", "normal", { basemods: [baseDefenseModifier([6, 6])], requirements: { strength: 45 } }),
	"Plated Belt": createItemBase("Plated Belt", "belt", "normal", { basemods: [baseDefenseModifier([8, 11])], requirements: { strength: 60 } }),
	// exceptional
	"Demonhide Sash": createItemBase("Demonhide Sash", "belt", "exceptional", { basemods: [baseDefenseModifier([29, 34])], requirements: { strength: 20, level: 24 } }),
	"Sharkskin Belt": createItemBase("Sharkskin Belt", "belt", "exceptional", { basemods: [baseDefenseModifier([31, 36])], requirements: { strength: 20, level: 25 } }),
	"Mesh Belt": createItemBase("Mesh Belt", "belt", "exceptional", { basemods: [baseDefenseModifier([35, 40])], requirements: { strength: 58, level: 25 } }),
	"Battle Belt": createItemBase("Battle Belt", "belt", "exceptional", { basemods: [baseDefenseModifier([37, 42])], requirements: { strength: 88, level: 25 } }),
	"War Belt": createItemBase("War Belt", "belt", "exceptional", { basemods: [baseDefenseModifier([41, 52])], requirements: { strength: 110, level: 25 } }),
	// elite
	"Spiderweb Sash": createItemBase("Spiderweb Sash", "belt", "elite", { basemods: [baseDefenseModifier([55, 62])], requirements: { strength: 50, level: 46 } }),
	"Vampirefang Belt": createItemBase("Vampirefang Belt", "belt", "elite", { basemods: [baseDefenseModifier([56, 63])], requirements: { strength: 50, level: 51 } }),
	"Mithril Coil": createItemBase("Mithril Coil", "belt", "elite", { basemods: [baseDefenseModifier([58, 65])], requirements: { strength: 106, level: 56 } }),
	"Troll Belt": createItemBase("Troll Belt", "belt", "elite", { basemods: [baseDefenseModifier([59, 66])], requirements: { strength: 151, level: 62 } }),
	"Colossus Girdle": createItemBase("Colossus Girdle", "belt", "elite", { basemods: [baseDefenseModifier([61, 71])], requirements: { strength: 185, level: 67 } }),
};

export const bases = {
	weapon,
	shield,
	helmet,
	chest,
	gloves,
	boots,
	amulet,
	ring,
	belt,
} as const satisfies Record<ItemBaseType, Record<string, Item>>;
