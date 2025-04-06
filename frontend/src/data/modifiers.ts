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
		`+{} to Mana (+${valuePerLevel} per Character Level)`,
		templateValue
	);
}

export function defensePerLevelModifier(valuePerLevel: number): ItemModifier {
	const templateValue = `[${valuePerLevel}-${valuePerLevel * 99}`;
	return createItemModifier(
		"defense_per_level",
		"dynamic",
		valuePerLevel,
		`+{} Defense (+${valuePerLevel} per Character Level) `,
		templateValue
	);
}

export function lifeModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("life", "static", value, "+{} to Life");
}

export function manaModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("mana", "static", value, "+{} to Mana");
}

export function fireResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("fire_resist", "static", value, "Fire Resist +{}%");
}

export function coldResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_resist", "static", value, "Cold Resist +{}%");
}

export function maxFireResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("max_fire_resist", "static", value, "+{}% to Maximum Fire Resist");
}

export function maxColdResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("max_cold_resist", "static", value, "+{}% to Maximum Cold Resist");
}

export function maxLightningResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"max_lightning_resist",
		"static",
		value,
		"+{}% to Maximum Lightning Resist"
	);
}

export function maxPoisonResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("max_poison_resist", "static", value, "+{}% to Maximum Poison Resist");
}

export function lightningResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("lightning_resist", "static", value, "Lightning Resist +{}%");
}

export function poisonResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("poison_resist", "static", value, "Poison Resist +{}%");
}

export function allResistModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("all_resist", "static", value, "All Resistances +{}");
}

export function lifeAfterEachKillModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("life_after_each_kill", "static", value, "+{} to Life after each Kill");
}

export function manaAfterEachKillModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("mana_after_each_kill", "static", value, "+{} to Mana after each Kill");
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

export function goldFindModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("gold_find", "static", value, "{}% Extra Gold from Monsters ");
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

export function attackRatingAgainstUndeadModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"attack_rating_against Undead",
		"static",
		value,
		"+{} to Attack Rating against Undead"
	);
}

export function attackRatingAgainstDemonsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"attack_rating_against Demons",
		"static",
		value,
		"+{} to Attack Rating against Demons"
	);
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

export function defenseVsMissileModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("defense_vs_missile", "static", value, "+{} Defense vs. Missile");
}

export function enhancedDefenseModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("enhanced_defense", "static", value, "+{}% Enhanced Defense");
}

export function strengthModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("strength", "static", value, "+{} to Strength");
}

export function dexterityModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("dexterity", "static", value, "+{} to Dexterity");
}

export function vitalityModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("vitality", "static", value, "+{} to Vitality");
}

export function energyModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("energy", "static", value, "+{} to Energy");
}

export function fireAbsorbModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("fire_absorb", "static", value, "+{} Fire Absorb");
}

export function coldAbsorbModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_absorb", "static", value, "+{} Cold Absorb");
}

export function lightningAbsorbModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("lightning_absorb", "static", value, "+{} Lightning Absorb");
}

export function halfFreezeDurationModifier(): ItemModifier {
	return createItemModifier("freeze_duration", "static", 0.5, "Half Freeze Duration");
}

export function cannotBeFrozenModifier(): ItemModifier {
	return createItemModifier("freeze_duration", "static", 1, "Cannot be Frozen");
}

export function hitBlindsTargetModifier(): ItemModifier {
	return createItemModifier("hit_blinds_target", "static", 1, "Hit Blinds Target ");
}

export function chanceToFleeModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("chance_to_flee", "static", value, "Hit Causes Monster to Flee {}%");
}

export function requirementsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("requirements", "static", value, "Requirements -{}%");
}

export function thornsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("thorns", "static", value, "Attacker Takes Damage of {}");
}

export function thornsLightningModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"thorns_lightning",
		"static",
		value,
		"Attacker Takes Lightning Damage of {}"
	);
}

export function maximumDamageModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("maximum_damage", "static", value, "+{} to Maximum Damage");
}

export function flatPhysicalDamageReducedModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"flat_physical_damage_reduced",
		"static",
		value,
		"Physical Damage Taken Reduced by {}"
	);
}

export function flatMagicDamageReducedModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"flat_magic_damage_reduced",
		"static",
		value,
		"Magic Damage Taken Reduced by {}"
	);
}

export function lightRadiusModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("light_radius", "static", value, "{} to Light Radius");
}

export function damageToUndeadModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("damage_to_undead", "static", value, "+{}% Damage to Undead");
}

export function damageToDemonsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("damage_to_demons", "static", value, "+{}% Damage to Demons");
}

export function javelinAndSpearSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"javelin_and_spear_skills",
		"static",
		value,
		"+{} to Javelin and Spear Skills (Amazon Only)"
	);
}

export function passiveAndMagicSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"passive_and_magic_skills",
		"static",
		value,
		"+{} to Passive and Magic Skills (Amazon Only)"
	);
}

export function bowAndCrossbowSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"bow_and_crossbow_skills",
		"static",
		value,
		"+{} to Bow and Crossbow Skills (Amazon Only)"
	);
}

export function combatSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"combat_skills",
		"static",
		value,
		"+{} to Combat Skills (Barbarian Only)"
	);
}

export function warcriesSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"warcries_skills",
		"static",
		value,
		"+{} to Warcries Skills (Barbarian Only)"
	);
}

export function masteriesSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"masteries_skills",
		"static",
		value,
		"+{} to Masteries Skills (Barbarian Only)"
	);
}

export function summoningSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"summoning_skills",
		"static",
		value,
		"+{} to Summoning Skills (Necromancer Only)"
	);
}

export function poisonAndBoneSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_and_bone_skills",
		"static",
		value,
		"+{} to Poison and Bone Skills (Necromancer Only)"
	);
}

export function cursesSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"curses_skills",
		"static",
		value,
		"+{} to Curses Skills (Necromancer Only)"
	);
}

export function combatSkillsPaladinModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"combat_skills_paladin",
		"static",
		value,
		"+{} to Combat Skills (Paladin Only)"
	);
}

export function defensiveAurasSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"defensive_auras_skills",
		"static",
		value,
		"+{} to Defensive Auras Skills (Paladin Only)"
	);
}

export function offensiveAurasSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"offensive_auras_skills",
		"static",
		value,
		"+{} to Offensive Auras Skills (Paladin Only)"
	);
}

export function fireSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("fire_skills", "static", value, "+{} to Fire Skills (Sorceress Only)");
}

export function coldSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_skills", "static", value, "+{} to Cold Skills (Sorceress Only)");
}

export function lightningSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"lightning_skills",
		"static",
		value,
		"+{} to Lightning Skills (Sorceress Only)"
	);
}

export function shapeShiftingSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"shape_shifting_skills",
		"static",
		value,
		"+{} to Shape Shifting Skills (Druid Only)"
	);
}

export function summoningSkillsDruidModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"summoning_skills_druid",
		"static",
		value,
		"+{} to Summoning Skills (Druid Only)"
	);
}

export function elementalSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"elemental_skills",
		"static",
		value,
		"+{} to Elemental Skills (Druid Only)"
	);
}

export function martialArtsSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"martial_arts_skills",
		"static",
		value,
		"+{} to Martial Arts Skills (Assassin Only)"
	);
}

export function trapsSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("traps_skills", "static", value, "+{} to Traps Skills (Assassin Only)");
}

export function shadowDisciplineSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"shadow_discipline_skills",
		"static",
		value,
		"+{} to Shadow Discipline Skills (Assassin Only)"
	);
}

export function necromancerSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("necromancer_skills", "static", value, "+{} to Necromancer Skills");
}

export function amazonSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("amazon_skills", "static", value, "+{} to Amazon Skills");
}

export function barbarianSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("barbarian_skills", "static", value, "+{} to Barbarian Skills");
}

export function paladinSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("paladin_skills", "static", value, "+{} to Paladin Skills");
}

export function sorceressSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("sorceress_skills", "static", value, "+{} to Sorceress Skills");
}

export function druidSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("druid_skills", "static", value, "+{} to Druid Skills");
}

export function assassinSkillsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("assassin_skills", "static", value, "+{} to Assassin Skills");
}

export function skeletonMasteryModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"skeleton_mastery",
		"static",
		value,
		"+{} to Skeleton Mastery (Necromancer Only)"
	);
}

export function raiseSkeletonModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"raise_skeleton",
		"static",
		value,
		"+{} to Raise Skeleton (Necromancer Only)"
	);
}

export function cloakOfShadowsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("cloak_of_shadows", "static", value, "+{} to Cloak of Shadows");
}

export function poisonDamageOverTwoSecondsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_damage_over_two_seconds",
		"static",
		value,
		"+{} Poison Damage over 2 seconds"
	);
}

export function poisonDamageOverThreeSecondsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_damage_over_three_seconds",
		"static",
		value,
		"+{} Poison Damage over 3 seconds"
	);
}

export function poisonDamageOverFourSecondsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_damage_over_four_seconds",
		"static",
		value,
		"+{} Poison Damage over 4 seconds"
	);
}

export function poisonDamageOverFiveSecondsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_damage_over_five_seconds",
		"static",
		value,
		"+{} Poison Damage over 5 seconds"
	);
}

export function poisonDamageOverSixSecondsModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_damage_over_six_seconds",
		"static",
		value,
		"+{} Poison Damage over 6 seconds"
	);
}

export function lifeStolenPerHitModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("life_stolen_per_hit", "static", value, "{}% Life Stolen per Hit");
}

export function manaStolenPerHitModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("mana_stolen_per_hit", "static", value, "{}% Mana Stolen per Hit");
}

// TODO: multiple values

export function howlLevelFiveOnStrikingModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"howl_level_five_on_striking",
		"static",
		value,
		"{}% Chance to Cast Level 5 Howl on Striking"
	);
}

export function dimVisionLevelThreeWhenStruckModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"dim_vision_level_three_when_struck",
		"static",
		value,
		"{}% Chance to Cast Level 3 Dim Vision when Struck"
	);
}

export function attackSpeedModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("attack_speed", "static", value, "+{}% Increased Attack Speed ");
}

export function damageTakenGainedAsManaModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"damage_taken_gained_as_mana",
		"static",
		value,
		"{}% Damage Taken Gained as Mana when Hit"
	);
}

export function replenishLifeModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("replenish_life", "static", value, "Replenish Life +{}");
}

export function fasterHitRecoveryModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_hit_recovery", "static", value, "+{}% Faster Hit Recovery");
}

export function fasterCastRateModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_cast_rate", "static", value, "+{}% Faster Cast Rate");
}

export function fasterBlockRateModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_block_rate", "static", value, "+{}% Faster Block Rate");
}

export function increasedChanceOfBlockingModifier(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"increased_block_chance",
		"static",
		value,
		"{}% Increased Chance of Blocking"
	);
}

export function fasterRunWalkModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_run_walk", "static", value, "+{}% Faster Run/Walk");
}

export function preventMonsterHealModifier(): ItemModifier {
	return createItemModifier("prevent_monster_heal", "static", 1, "Prevent Monster Heal");
}

export function slowTargetModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("slow_target", "static", value, "Slows Target by {}%");
}

export function slowerStaminaDrainModifier(value: ModifierValue): ItemModifier {
	return createItemModifier("slower_stamina_drain", "static", value, "{}% Slower Stamina Drain");
}

export function addsFireDamageModifier(min: number, max: number): ItemModifier {
	// TODO: two values
	const templateValue = `[${min}-${max}]`;
	return createItemModifier(
		"adds_fire_damage",
		"static",
		min,
		"Adds {} Fire Damage ",
		templateValue
	);
}

export function addsColdDamageModifier(min: number, max: number): ItemModifier {
	// TODO: two values
	const templateValue = `[${min}-${max}]`;
	return createItemModifier(
		"adds_cold_damage",
		"static",
		min,
		"Adds {} Cold Damage ",
		templateValue
	);
}

export function addsLightningDamageModifier(min: number, max: number): ItemModifier {
	// TODO: two values
	const templateValue = `[${min}-${max}]`;
	return createItemModifier(
		"adds_lightning_damage",
		"static",
		min,
		"Adds {} Lightning Damage ",
		templateValue
	);
}

// export function hybridEnhancedDamageAttackRatingModifier(
// 	enhancedDamageValue: ModifierValue,
// 	attackRatingValue: ModifierValue
// ): HybridItemModifier {
// 	return createHybridItemModifier("hybrid_enhanced_damage_attack_rating", [
// 		enhancedDamageModifier(enhancedDamageValue),
// 		attackRatingModifier(attackRatingValue),
// 	]);
// }
