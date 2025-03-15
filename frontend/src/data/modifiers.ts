type ModifierValue = number | [number, number];

type ModifierKind = "static" | "dynamic";

/*
Modifier structure
- Single modifier e.g. +[10-20]% Enhanced Damage
- Hybrid modifier e.g. [10-20] to Attack Rating, +[10-20]% Enhanced Damage

Value ranges
- Fixed value e.g. +1 to Mana after each Kill
- Rolled value e.g. +[1-3] to Mana after each Kill

Value Scaling types
- Static value e.g. +1 or +[1-3]
- Dynamic value (per level) e.g. +[0-74] to Life (+0.75 per Level), or Purgatory RW


Item structure requirements:
- Description: hardcoded string e.g. +[1-99] to Life (+1 per Character Level)
- Modifying value(s) if has range
- Dynamic tooltip: (scalingFactor: number) => +${value * scalingFactor} to Life (+1 per Character Level)
*/

export interface ItemModifier {
	id: string;
	modifierKind: ModifierKind;
	description: string;
	rolls?: [number, number];
	_value: number;
	tooltipTemplate?: string;
}

export function getModifierValue(modifier: ItemModifier, scalingFactor: number = 1): number {
	if (modifier.modifierKind === "dynamic") {
		return modifier._value * scalingFactor;
	}
	return modifier._value;
}

export function getModifierTooltip(modifier: ItemModifier, scalingFactor: number = 1): string {
	if (modifier.tooltipTemplate) {
		return modifier.tooltipTemplate.replace(/{}/g, () =>
			getModifierValue(modifier, scalingFactor).toString()
		);
	}
	return modifier.description;
}

function midRoll(range: [number, number]): number {
	return Math.ceil((range[0] + range[1]) / 2);
}

function createItemModifier(
	id: string,
	modifierKind: ModifierKind,
	description: string,
	value: ModifierValue,
	tooltipTemplate?: string
): ItemModifier {
	const isRange = Array.isArray(value);

	return {
		id: id,
		modifierKind: modifierKind,
		description: description,
		rolls: isRange ? value : undefined,
		_value: isRange ? midRoll(value) : value,
		tooltipTemplate,
	};
}

export function lifePerLevelModifier(valuePerLevel: number): ItemModifier {
	const template = `[${valuePerLevel}-${valuePerLevel * 99}`;
	return createItemModifier(
		"life_per_level",
		"dynamic",
		`+${template} to Life (+${valuePerLevel} per Character Level)`,
		valuePerLevel,
		"+{} to Life (+1 per Character Level)"
	);
}

export function manaPerLevelModifier(valuePerLevel: number): ItemModifier {
	const template = `[${valuePerLevel}-${valuePerLevel * 99}`;
	return createItemModifier(
		"mana_per_level",
		"dynamic",
		`+${template} to Mana (+${valuePerLevel} per Character Level)`,
		valuePerLevel,
		"+{} to Mana (+1 per Character Level)"
	);
}

export function physicalDamageReducedModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"physical_damage_reduced",
		"static",
		`Physical Damage Taken Reduced by ${template}%`,
		value,
		"Physical Damage Taken Reduced by {}%"
	);
}

export function magicFindModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"magic_find",
		"static",
		`${template}% Better Chance of Getting Magic Items`,
		value,
		"{}% Better Chance of Getting Magic Items"
	);
}

export function allSkillsModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"all_skills",
		"static",
		`+${template} to All Skills`,
		value,
		"+{} to All Skills"
	);
}

export function allAttributesModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"all_attributes",
		"static",
		`+${template} to All Attributes`,
		value,
		"+{} to All Attributes"
	);
}

export function attackRatingModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"attack_rating",
		"static",
		`+${template} to Attack Rating`,
		value,
		"+{} to Attack Rating"
	);
}

export function enhancedDamageModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"enhanced_damage",
		"static",
		`+${template}% Enhanced Damage`,
		value,
		"+{}% Enhanced Damage"
	);
}

export function enemyColdResistanceModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"enemy_cold_resistance",
		"static",
		`-${template}% to Enemy Cold Resistance`,
		value,
		"-{}% to Enemy Cold Resistance"
	);
}

export function coldSkillDamageModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"cold_skill_damage",
		"static",
		`+${template}% to Cold Skill Damage`,
		value,
		"+{}% to Cold Skill Damage"
	);
}

export function baseDefenseModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"base_defense",
		"static",
		`Base Defense: ${template}`,
		value,
		"Base Defense: {}"
	);
}

export function defenseModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier("defense", "static", `+${template} Defense`, value, "+{} Defense");
}

export function enhancedDefenseModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"enhanced_defense",
		"static",
		`+${template}% Enhanced Defense`,
		value,
		"+{}% Enhanced Defense"
	);
}

export function dexterityModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"dexterity",
		"static",
		`+${template} to Dexterity`,
		value,
		"+{} to Dexterity"
	);
}

export function coldAbsorbModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}]` : `${value}`;
	return createItemModifier(
		"cold_absorb",
		"static",
		`+${template} Cold Absorb`,
		value,
		"+{} Cold Absorb"
	);
}

export function halfFreezeDurationModifier(): ItemModifier {
	return createItemModifier("freeze_duration", "static", "Half Freeze Duration", 0.5);
}

export function requirementsModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `${value[0]}-${value[1]}` : `${value}`;
	return createItemModifier(
		"requirements",
		"static",
		`Requirements -${template}%`,
		value,
		"Requirements -{}%"
	);
}

// class HybridItemModifier {
// 	id: string;
// 	modifiers: [ItemModifier, ItemModifier];

// 	constructor(id: string, modifiers: [ItemModifier, ItemModifier]) {
// 		this.id = id;
// 		this.modifiers = modifiers;
// 	}

// 	getTooltip(scalingFactor: number = 1) {
// 		return (
// 			this.modifiers[0].getTooltip(scalingFactor) +
// 			",\n" +
// 			this.modifiers[1].getTooltip(scalingFactor)
// 		);
// 	}
// }

// export function hybridEnhancedDamageAccuracyModifier(
// 	enhancedDamageValue: ModifierValue,
// 	accuracyValue: ModifierValue
// ): HybridItemModifier {
// 	return new HybridItemModifier("hybrid_enhanced_damage_accuracy", [
// 		enhancedDamageModifier(enhancedDamageValue),
// 		attackRatingModifier(accuracyValue),
// 	]);
// }
