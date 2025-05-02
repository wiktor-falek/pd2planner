import { getDefaultAttributes, useAttributeStore } from "../../stores/attributeStore";
import { useCharacterStore } from "../../stores/characterStore";
import { getDefaultEquippedItems, useItemStore, type EquippedItems } from "../../stores/itemStore";
import {
	getDefaultSkillTreeState,
	useSkillStore,
	type SkillTreeState,
} from "../../stores/skillStore";
import type { Attributes, CharacterClass } from "../../types";
import type { Item } from "../items/item";

export interface BuildData {
	character: {
		class: CharacterClass;
		level: number;
	};
	attributes: Attributes;
	skills: SkillTreeState;
	items: {
		all: Item[];
		equipped: EquippedItems;
	};
}

export function getBuildData(): BuildData {
	const characterStore = useCharacterStore();
	const attributeStore = useAttributeStore();
	const skillStore = useSkillStore();
	const itemStore = useItemStore();

	return {
		character: {
			class: characterStore.characterClass,
			level: characterStore.characterLevel,
		},
		attributes: attributeStore.attributes,
		skills: skillStore.skillTreeState,
		items: {
			all: itemStore.items,
			equipped: itemStore.equippedItems,
		},
	};
}

export function resetBuild() {
	const characterStore = useCharacterStore();
	const attributeStore = useAttributeStore();
	const skillStore = useSkillStore();
	const itemStore = useItemStore();

	characterStore.setCharacterClass("amazon");
	characterStore.setCharacterLevel(1);

	attributeStore.attributes = getDefaultAttributes();

	skillStore.skillTreeState = getDefaultSkillTreeState("amazon");

	itemStore.items = [];
	itemStore.equippedItems = getDefaultEquippedItems();
}

export function importBuild(buildData: BuildData) {
	const characterStore = useCharacterStore();
	const attributeStore = useAttributeStore();
	const skillStore = useSkillStore();
	const itemStore = useItemStore();

	characterStore.setCharacterClass(buildData.character.class);
	characterStore.setCharacterLevel(buildData.character.level);

	attributeStore.attributes.strength = buildData.attributes.strength;
	attributeStore.attributes.dexterity = buildData.attributes.dexterity;
	attributeStore.attributes.vitality = buildData.attributes.vitality;
	attributeStore.attributes.energy = buildData.attributes.energy;

	skillStore.skillTreeState = buildData.skills;

	itemStore.items = buildData.items.all;
	itemStore.equippedItems = buildData.items.equipped;
}
