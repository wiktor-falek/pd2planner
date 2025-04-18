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

interface ModifierValueData {
	kind: ModifierKind;
	_value: number;
	rolls?: [number, number];
}

export interface ItemModifier {
	id: string;
	description: string;
	values: ModifierValueData[];
	tooltipTemplate?: string;
}

export interface HybridItemModifier {
	id: string;
	modifiers: [ItemModifier, ItemModifier];
}

export function getModifierValues(modifier: ItemModifier, scalingFactor: number = 1): number[] {
	return modifier.values.map((value) => {
		if (value.kind === "dynamic") {
			return value._value * scalingFactor;
		}
		return value._value;
	});
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
		let i = 0;
		return modifier.tooltipTemplate.replace(/{}/g, () => {
			const values = getModifierValues(modifier, scalingFactor);
			return values[i++]!.toString();
		});
	}
	return modifier.description;
}

function midRoll(range: [number, number]): number {
	return Math.ceil((range[0] + range[1]) / 2);
}

function createItemModifier(
	id: string,
	modifierKind: ModifierKind,
	values: ModifierValue[],
	tooltipTemplate: string,
	templates: string[] = []
): ItemModifier {
	const _templates: string[] = [];

	for (let i = 0; i < values.length; i++) {
		const template = templates[i];
		const modifierValue = values[i]!;

		if (template === undefined) {
			const isRange = Array.isArray(modifierValue);
			_templates.push(isRange ? `[${modifierValue[0]}-${modifierValue[1]}]` : `${modifierValue}`);
		} else {
			_templates.push(template);
		}
	}

	let i = 0;
	const description = tooltipTemplate.replace(/{}/g, () => _templates[i++]!);
	const _values = values.map((value) => {
		const isRange = Array.isArray(value);
		return {
			_value: isRange ? midRoll(value) : value,
			rolls: isRange ? value : undefined,
			kind: modifierKind,
		};
	});

	return {
		id: id,
		description,
		values: _values,
		tooltipTemplate,
	};
}

function createHybridItem(id: string, modifiers: [ItemModifier, ItemModifier]): HybridItemModifier {
	return {
		id,
		modifiers,
	};
}

export function lifePerLevel(valuePerLevel: number): ItemModifier {
	return createItemModifier(
		"life_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} to Life (+${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function manaPerLevel(valuePerLevel: number): ItemModifier {
	return createItemModifier(
		"mana_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} to Mana (+${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function defensePerLevel(valuePerLevel: number): ItemModifier {
	return createItemModifier(
		"defense_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} Defense (+${valuePerLevel} per Character Level) `,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function life(value: ModifierValue): ItemModifier {
	return createItemModifier("life", "static", [value], "+{} to Life");
}

export function mana(value: ModifierValue): ItemModifier {
	return createItemModifier("mana", "static", [value], "+{} to Mana");
}

export function fireResist(value: ModifierValue): ItemModifier {
	return createItemModifier("fire_resist", "static", [value], "Fire Resist +{}%");
}

export function coldResist(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_resist", "static", [value], "Cold Resist +{}%");
}

export function maxFireResist(value: ModifierValue): ItemModifier {
	return createItemModifier("max_fire_resist", "static", [value], "+{}% to Maximum Fire Resist");
}

export function maxColdResist(value: ModifierValue): ItemModifier {
	return createItemModifier("max_cold_resist", "static", [value], "+{}% to Maximum Cold Resist");
}

export function maxLightningResist(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"max_lightning_resist",
		"static",
		[value],
		"+{}% to Maximum Lightning Resist"
	);
}

export function maxPoisonResist(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"max_poison_resist",
		"static",
		[value],
		"+{}% to Maximum Poison Resist"
	);
}

export function lightningResist(value: ModifierValue): ItemModifier {
	return createItemModifier("lightning_resist", "static", [value], "Lightning Resist +{}%");
}

export function poisonResist(value: ModifierValue): ItemModifier {
	return createItemModifier("poison_resist", "static", [value], "Poison Resist +{}%");
}

export function allResist(value: ModifierValue): ItemModifier {
	return createItemModifier("all_resist", "static", [value], "All Resistances +{}");
}

export function lifeAfterEachKill(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"life_after_each_kill",
		"static",
		[value],
		"+{} to Life after each Kill"
	);
}

export function manaAfterEachKill(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"mana_after_each_kill",
		"static",
		[value],
		"+{} to Mana after each Kill"
	);
}

export function physicalDamageReduced(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"physical_damage_reduced",
		"static",
		[value],
		"Physical Damage Taken Reduced by {}%"
	);
}

export function magicFind(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"magic_find",
		"static",
		[value],
		"{}% Better Chance of Getting Magic Items"
	);
}

export function goldFind(value: ModifierValue): ItemModifier {
	return createItemModifier("gold_find", "static", [value], "{}% Extra Gold from Monsters ");
}

export function allSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("all_skills", "static", [value], "+{} to All Skills");
}

export function allAttributes(value: ModifierValue): ItemModifier {
	return createItemModifier("all_attributes", "static", [value], "+{} to All Attributes");
}

export function attackRating(value: ModifierValue): ItemModifier {
	return createItemModifier("attack_rating", "static", [value], "+{} to Attack Rating");
}

export function attackRatingAgainstUndead(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"attack_rating_against Undead",
		"static",
		[value],
		"+{} to Attack Rating against Undead"
	);
}

export function attackRatingAgainstDemons(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"attack_rating_against Demons",
		"static",
		[value],
		"+{} to Attack Rating against Demons"
	);
}

export function enhancedDamage(value: ModifierValue): ItemModifier {
	return createItemModifier("enhanced_damage", "static", [value], "+{}% Enhanced Damage");
}

export function enemyColdResistance(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"enemy_cold_resistance",
		"static",
		[value],
		"-{}% to Enemy Cold Resistance"
	);
}

export function coldSkillDamage(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_skill_damage", "static", [value], "+{}% to Cold Skill Damage");
}

export function baseDefense(value: ModifierValue): ItemModifier {
	return createItemModifier("base_defense", "static", [value], "Base Defense: {}");
}

export function defense(value: ModifierValue): ItemModifier {
	return createItemModifier("defense", "static", [value], "+{} Defense");
}

export function defenseVsMissile(value: ModifierValue): ItemModifier {
	return createItemModifier("defense_vs_missile", "static", [value], "+{} Defense vs. Missile");
}

export function enhancedDefense(value: ModifierValue): ItemModifier {
	return createItemModifier("enhanced_defense", "static", [value], "+{}% Enhanced Defense");
}

export function strength(value: ModifierValue): ItemModifier {
	return createItemModifier("strength", "static", [value], "+{} to Strength");
}

export function dexterity(value: ModifierValue): ItemModifier {
	return createItemModifier("dexterity", "static", [value], "+{} to Dexterity");
}

export function vitality(value: ModifierValue): ItemModifier {
	return createItemModifier("vitality", "static", [value], "+{} to Vitality");
}

export function energy(value: ModifierValue): ItemModifier {
	return createItemModifier("energy", "static", [value], "+{} to Energy");
}

export function fireAbsorb(value: ModifierValue): ItemModifier {
	return createItemModifier("fire_absorb", "static", [value], "+{} Fire Absorb");
}

export function coldAbsorb(value: ModifierValue): ItemModifier {
	return createItemModifier("cold_absorb", "static", [value], "+{} Cold Absorb");
}

export function lightningAbsorb(value: ModifierValue): ItemModifier {
	return createItemModifier("lightning_absorb", "static", [value], "+{} Lightning Absorb");
}

export function halfFreezeDuration(): ItemModifier {
	return createItemModifier("freeze_duration", "static", [0.5], "Half Freeze Duration");
}

export function cannotBeFrozen(): ItemModifier {
	return createItemModifier("freeze_duration", "static", [1], "Cannot be Frozen");
}

export function hitBlindsTarget(): ItemModifier {
	return createItemModifier("hit_blinds_target", "static", [1], "Hit Blinds Target ");
}

export function chanceToFlee(value: ModifierValue): ItemModifier {
	return createItemModifier("chance_to_flee", "static", [value], "Hit Causes Monster to Flee {}%");
}

export function requirements(value: ModifierValue): ItemModifier {
	return createItemModifier("requirements", "static", [value], "Requirements -{}%");
}

export function thorns(value: ModifierValue): ItemModifier {
	return createItemModifier("thorns", "static", [value], "Attacker Takes Damage of {}");
}

export function thornsLightning(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"thorns_lightning",
		"static",
		[value],
		"Attacker Takes Lightning Damage of {}"
	);
}

export function maximumDamage(value: ModifierValue): ItemModifier {
	return createItemModifier("maximum_damage", "static", [value], "+{} to Maximum Damage");
}

export function flatPhysicalDamageReduced(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"flat_physical_damage_reduced",
		"static",
		[value],
		"Physical Damage Taken Reduced by {}"
	);
}

export function flatMagicDamageReduced(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"flat_magic_damage_reduced",
		"static",
		[value],
		"Magic Damage Taken Reduced by {}"
	);
}

export function lightRadius(value: ModifierValue): ItemModifier {
	return createItemModifier("light_radius", "static", [value], "{} to Light Radius");
}

export function damageToUndead(value: ModifierValue): ItemModifier {
	return createItemModifier("damage_to_undead", "static", [value], "+{}% Damage to Undead");
}

export function damageToDemons(value: ModifierValue): ItemModifier {
	return createItemModifier("damage_to_demons", "static", [value], "+{}% Damage to Demons");
}

export function javelinAndSpearSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"javelin_and_spear_skills",
		"static",
		[value],
		"+{} to Javelin and Spear Skills (Amazon Only)"
	);
}

export function passiveAndMagicSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"passive_and_magic_skills",
		"static",
		[value],
		"+{} to Passive and Magic Skills (Amazon Only)"
	);
}

export function bowAndCrossbowSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"bow_and_crossbow_skills",
		"static",
		[value],
		"+{} to Bow and Crossbow Skills (Amazon Only)"
	);
}

export function combatSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"combat_skills",
		"static",
		[value],
		"+{} to Combat Skills (Barbarian Only)"
	);
}

export function warcriesSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"warcries_skills",
		"static",
		[value],
		"+{} to Warcries Skills (Barbarian Only)"
	);
}

export function masteriesSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"masteries_skills",
		"static",
		[value],
		"+{} to Masteries Skills (Barbarian Only)"
	);
}

export function summoningSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"summoning_skills",
		"static",
		[value],
		"+{} to Summoning Skills (Necromancer Only)"
	);
}

export function poisonAndBoneSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"poison_and_bone_skills",
		"static",
		[value],
		"+{} to Poison and Bone Skills (Necromancer Only)"
	);
}

export function cursesSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"curses_skills",
		"static",
		[value],
		"+{} to Curses Skills (Necromancer Only)"
	);
}

export function combatSkillsPaladin(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"combat_skills_paladin",
		"static",
		[value],
		"+{} to Combat Skills (Paladin Only)"
	);
}

export function defensiveAurasSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"defensive_auras_skills",
		"static",
		[value],
		"+{} to Defensive Auras Skills (Paladin Only)"
	);
}

export function offensiveAurasSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"offensive_auras_skills",
		"static",
		[value],
		"+{} to Offensive Auras Skills (Paladin Only)"
	);
}

export function fireSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"fire_skills",
		"static",
		[value],
		"+{} to Fire Skills (Sorceress Only)"
	);
}

export function coldSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"cold_skills",
		"static",
		[value],
		"+{} to Cold Skills (Sorceress Only)"
	);
}

export function lightningSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"lightning_skills",
		"static",
		[value],
		"+{} to Lightning Skills (Sorceress Only)"
	);
}

export function shapeShiftingSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"shape_shifting_skills",
		"static",
		[value],
		"+{} to Shape Shifting Skills (Druid Only)"
	);
}

export function summoningSkillsDruid(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"summoning_skills_druid",
		"static",
		[value],
		"+{} to Summoning Skills (Druid Only)"
	);
}

export function elementalSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"elemental_skills",
		"static",
		[value],
		"+{} to Elemental Skills (Druid Only)"
	);
}

export function martialArtsSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"martial_arts_skills",
		"static",
		[value],
		"+{} to Martial Arts Skills (Assassin Only)"
	);
}

export function trapsSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"traps_skills",
		"static",
		[value],
		"+{} to Traps Skills (Assassin Only)"
	);
}

export function shadowDisciplineSkills(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"shadow_discipline_skills",
		"static",
		[value],
		"+{} to Shadow Discipline Skills (Assassin Only)"
	);
}

export function necromancerSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("necromancer_skills", "static", [value], "+{} to Necromancer Skills");
}

export function amazonSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("amazon_skills", "static", [value], "+{} to Amazon Skills");
}

export function barbarianSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("barbarian_skills", "static", [value], "+{} to Barbarian Skills");
}

export function paladinSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("paladin_skills", "static", [value], "+{} to Paladin Skills");
}

export function sorceressSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("sorceress_skills", "static", [value], "+{} to Sorceress Skills");
}

export function druidSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("druid_skills", "static", [value], "+{} to Druid Skills");
}

export function assassinSkills(value: ModifierValue): ItemModifier {
	return createItemModifier("assassin_skills", "static", [value], "+{} to Assassin Skills");
}

export function skeletonMastery(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"skeleton_mastery",
		"static",
		[value],
		"+{} to Skeleton Mastery (Necromancer Only)"
	);
}

export function raiseSkeleton(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"raise_skeleton",
		"static",
		[value],
		"+{} to Raise Skeleton (Necromancer Only)"
	);
}

export function cloakOfShadows(value: ModifierValue): ItemModifier {
	return createItemModifier("cloak_of_shadows", "static", [value], "+{} to Cloak of Shadows");
}

export function poisonDamageOverSeconds(
	damage: ModifierValue,
	seconds: ModifierValue
): ItemModifier {
	return createItemModifier(
		"poison_damage_over_seconds",
		"static",
		[damage, seconds],
		"+{} Poison Damage over {} seconds"
	);
}

export function lifeStolenPerHit(value: ModifierValue): ItemModifier {
	return createItemModifier("life_stolen_per_hit", "static", [value], "{}% Life Stolen per Hit");
}

export function manaStolenPerHit(value: ModifierValue): ItemModifier {
	return createItemModifier("mana_stolen_per_hit", "static", [value], "{}% Mana Stolen per Hit");
}

export function howlOnStriking(chance: ModifierValue, level: ModifierValue): ItemModifier {
	return createItemModifier(
		"howl_on_striking",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Howl on Striking"
	);
}

export function dimVisionWhenStruck(chance: ModifierValue, level: ModifierValue): ItemModifier {
	return createItemModifier(
		"dim_vision_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Dim Vision when Struck"
	);
}

export function attackSpeed(value: ModifierValue): ItemModifier {
	return createItemModifier("attack_speed", "static", [value], "+{}% Increased Attack Speed ");
}

export function damageTakenGainedAsMana(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"damage_taken_gained_as_mana",
		"static",
		[value],
		"{}% Damage Taken Gained as Mana when Hit"
	);
}

export function replenishLife(value: ModifierValue): ItemModifier {
	return createItemModifier("replenish_life", "static", [value], "Replenish Life +{}");
}

export function fasterHitRecovery(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_hit_recovery", "static", [value], "+{}% Faster Hit Recovery");
}

export function fasterCastRate(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_cast_rate", "static", [value], "+{}% Faster Cast Rate");
}

export function fasterBlockRate(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_block_rate", "static", [value], "+{}% Faster Block Rate");
}

export function increasedChanceOfBlocking(value: ModifierValue): ItemModifier {
	return createItemModifier(
		"increased_block_chance",
		"static",
		[value],
		"{}% Increased Chance of Blocking"
	);
}

export function fasterRunWalk(value: ModifierValue): ItemModifier {
	return createItemModifier("faster_run_walk", "static", [value], "+{}% Faster Run/Walk");
}

export function preventMonsterHeal(): ItemModifier {
	return createItemModifier("prevent_monster_heal", "static", [1], "Prevent Monster Heal");
}

export function slowTarget(value: ModifierValue): ItemModifier {
	return createItemModifier("slow_target", "static", [value], "Slows Target by {}%");
}

export function slowerStaminaDrain(value: ModifierValue): ItemModifier {
	return createItemModifier("slower_stamina_drain", "static", [value], "{}% Slower Stamina Drain");
}

export function addsFireDamage(min: ModifierValue, max: ModifierValue): ItemModifier {
	return createItemModifier("adds_fire_damage", "static", [min, max], "Adds {}-{} Fire Damage ");
}

export function addsColdDamage(min: ModifierValue, max: ModifierValue): ItemModifier {
	return createItemModifier("adds_cold_damage", "static", [min, max], "Adds {}-{} Cold Damage ");
}

export function addsLightningDamage(min: ModifierValue, max: ModifierValue): ItemModifier {
	return createItemModifier(
		"adds_lightning_damage",
		"static",
		[min, max],
		"Adds {}-{} Lightning Damage"
	);
}

export function hybridEnhancedDamageAttackRating(
	enhancedDamageValue: ModifierValue,
	attackRatingValue: ModifierValue
): HybridItemModifier {
	return createHybridItem("hybrid_enhanced_damage_attack_rating", [
		enhancedDamage(enhancedDamageValue),
		attackRating(attackRatingValue),
	]);
}
