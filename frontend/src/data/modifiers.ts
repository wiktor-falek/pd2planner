export interface Modifier {
	id: string;
	description: string;
	value: number;
}

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

class ItemModifier {
	id: string;
	modifierKind: ModifierKind;
	description: string;
	rolls?: [number, number];
	private value: number;

	constructor(
		id: string,
		modifierKind: ModifierKind,
		description: string,
		value: ModifierValue,
		private tooltipTemplate?: string
	) {
		const isRange = Array.isArray(value);

		this.id = id;
		this.modifierKind = modifierKind;
		this.description = description;
		this.rolls = isRange ? value : undefined;
		this.value = isRange ? this.midRoll(value) : value;
	}

	getValue(scalingFactor: number = 1): number {
		if (this.modifierKind === "dynamic") {
			return this.value * scalingFactor;
		}
		return this.value;
	}

	getTooltip(scalingFactor: number = 1): string {
		if (this.tooltipTemplate) {
			return this.tooltipTemplate.replace(/{}/g, () => this.getValue(scalingFactor).toString());
		}
		return this.description;
	}

	private midRoll(range: [number, number]): number {
		return Math.ceil((range[0] + range[1]) / 2);
	}
}

class HybridItemModifier {
	id: string;
	modifiers: [ItemModifier, ItemModifier];

	constructor(id: string, modifiers: [ItemModifier, ItemModifier]) {
		this.id = id;
		this.modifiers = modifiers;
	}

	getTooltip(scalingFactor: number = 1) {
		return (
			this.modifiers[0].getTooltip(scalingFactor) +
			",\n" +
			this.modifiers[1].getTooltip(scalingFactor)
		);
	}
}

function hybridEnhancedDamageAccuracyModifier(
	enhancedDamageValue: ModifierValue,
	accuracyValue: ModifierValue
): HybridItemModifier {
	return new HybridItemModifier("hybrid_enhanced_damage_accuracy", [
		enhancedDamageModifier(enhancedDamageValue),
		attackRatingModifier(accuracyValue),
	]);
}

function lifePerCharacterLevelModifier(valuePerLevel: number) {
	const template = `[${valuePerLevel}-${valuePerLevel * 99}`;
	return new ItemModifier(
		"life_per_level",
		"dynamic",
		`+${template} to Life (+${valuePerLevel} per Character Level)`,
		valuePerLevel,
		"+{} to Life (+1 per Character Level)"
	);
}

function allSkillsModifier(value: ModifierValue): ItemModifier {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return new ItemModifier(
		"all_skills",
		"static",
		`+${template} to All Skills`,
		value,
		"+{} to All Skills"
	);
}

function attackRatingModifier(value: ModifierValue) {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return new ItemModifier(
		"attack_rating",
		"static",
		`+${template} to Attack Rating`,
		value,
		"+{} to Attack Rating"
	);
}

function enhancedDamageModifier(value: ModifierValue) {
	const isRange = Array.isArray(value);
	const template = isRange ? `[${value[0]}-${value[1]}` : `${value}`;
	return new ItemModifier(
		"enhanced_damage",
		"static",
		`+${template}% Enhanced Damage`,
		value,
		"+{}% Enhanced Damage"
	);
}
