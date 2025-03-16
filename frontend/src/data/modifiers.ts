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

type ModifierValue = number | [number, number];
type ModifierKind = "static" | "dynamic";

export interface ItemModifier {
	id: string;
	modifierKind: ModifierKind;
	description: string;
	rolls?: [number, number];
	_value: number;
	tooltipTemplate?: string;
}

export interface HybridItemModifier {
	id: string;
	modifiers: [ItemModifier, ItemModifier];
}

export function getModifierValue(modifier: ItemModifier, scalingFactor: number = 1): number {
	if (modifier.modifierKind === "dynamic") {
		return modifier._value * scalingFactor;
	}
	return modifier._value;
}

export function getModifierTooltip(
	modifier: ItemModifier | HybridItemModifier,
	scalingFactor: number = 1
): string {
	if ("modifiers" in modifier) {
		return (
			getModifierTooltip(modifier.modifiers[0], scalingFactor) +
			",\n" +
			getModifierTooltip(modifier.modifiers[1], scalingFactor)
		);
	}

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
	value: ModifierValue,
	tooltipTemplate: string,
	templateValue?: string
): ItemModifier {
	const isRange = Array.isArray(value);
	const _templateValue = templateValue ?? (isRange ? `[${value[0]}-${value[1]}]` : `${value}`);

	return {
		id: id,
		modifierKind: modifierKind,
		description: tooltipTemplate.replace("{}", () => _templateValue),
		rolls: isRange ? value : undefined,
		_value: isRange ? midRoll(value) : value,
		tooltipTemplate,
	};
}

function createHybridItemModifier(
	id: string,
	modifiers: [ItemModifier, ItemModifier]
): HybridItemModifier {
	return {
		id,
		modifiers,
	};
}

export function lifePerLevelModifier(valuePerLevel: number): ItemModifier {
	const templateValue = `[${valuePerLevel}-${valuePerLevel * 99}]`;
	return createItemModifier(
		"life_per_level",
		"dynamic",
		valuePerLevel,
		`+{} to Life (+${valuePerLevel} per Character Level)`,
		templateValue
	);
}

export function manaPerLevelModifier(valuePerLevel: number): ItemModifier {
	const templateValue = `[${valuePerLevel}-${valuePerLevel * 99}`;
	return createItemModifier(
		"mana_per_level",
		"dynamic",
		valuePerLevel,
		"+{} to Mana (+1 per Character Level)",
		templateValue
	);
}

export function physicalDamageReducedModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"physical_damage_reduced",
		"static",
		value,
		"Physical Damage Taken Reduced by {}%"
	);
}

export function magicFindModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"magic_find",
		"static",
		value,
		"{}% Better Chance of Getting Magic Items"
	);
}

export function allSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("all_skills", "static", value, "+{} to All Skills");
}

export function allAttributesModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("all_attributes", "static", value, "+{} to All Attributes");
}

export function attackRatingModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("attack_rating", "static", value, "+{} to Attack Rating");
}

export function enhancedDamageModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("enhanced_damage", "static", value, "+{}% Enhanced Damage");
}

export function enemyColdResistanceModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"enemy_cold_resistance",
		"static",
		value,
		"-{}% to Enemy Cold Resistance"
	);
}

export function coldSkillDamageModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_skill_damage", "static", value, "+{}% to Cold Skill Damage");
}

export function baseDefenseModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("base_defense", "static", value, "Base Defense: {}");
}

export function defenseModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("defense", "static", value, "+{} Defense");
}

export function enhancedDefenseModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("enhanced_defense", "static", value, "+{}% Enhanced Defense");
}

export function dexterityModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("dexterity", "static", value, "+{} to Dexterity");
}

export function coldAbsorbModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_absorb", "static", value, "+{} Cold Absorb");
}

export function halfFreezeDurationModifier(): ItemModifier {
	return createItemModifier("freeze_duration", "static", 0.5, "Half Freeze Duration");
}

export function requirementsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("requirements", "static", value, "Requirements -{}%");
}

export function hybridEnhancedDamageAttackRatingModifier(
	enhancedDamageValue: ModifierValue,
	attackRatingValue: ModifierValue
): HybridItemModifier {
	return createHybridItemModifier("hybrid_enhanced_damage_attack_rating", [
		enhancedDamageModifier(enhancedDamageValue),
		attackRatingModifier(enhancedDamageValue),
	]);
}
