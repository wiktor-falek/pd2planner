import { useAttributeStore } from "../../stores/attributeStore";
import { useCharacterStore } from "../../stores/characterStore";
import { useItemStore, type EquippedItems } from "../../stores/itemStore";
import { useSkillStore, type SkillTreeState } from "../../stores/skillStore";
import type { Attributes, CharacterClass } from "../../types";
import type { Item } from "../items/bases";

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

export function gatherBuildData(): BuildData {
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
