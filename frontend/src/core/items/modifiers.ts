type ModifierValue = number | [number, number];
type ModifierKind = "static" | "dynamic";

interface ModifierValueData {
	kind: ModifierKind;
	_value: number;
	rolls?: [number, number];
}

export interface SingleItemModifier {
	id: string;
	description: string;
	values: ModifierValueData[];
	tooltipTemplate?: string;
}

export interface HybridItemModifier {
	id: string;
	modifiers: [SingleItemModifier, SingleItemModifier];
}

export type ItemModifier = SingleItemModifier | HybridItemModifier;

export function getModifierValues(
	modifier: SingleItemModifier,
	scalingFactor: number = 1
): number[] {
	return modifier.values.map((value) => {
		if (value.kind === "dynamic") {
			return value._value * scalingFactor;
		}
		return value._value;
	});
}

export function getModifierTooltip(
	modifier: SingleItemModifier | HybridItemModifier,
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
			const values = getModifierValues(modifier, scalingFactor).map((value) => Math.floor(value));
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
): SingleItemModifier {
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

function createHybridItem(
	id: string,
	modifiers: [SingleItemModifier, SingleItemModifier]
): HybridItemModifier {
	return {
		id,
		modifiers,
	};
}

export function lifePerLevel(valuePerLevel: number): SingleItemModifier {
	return createItemModifier(
		"life_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} to Life (+${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function manaPerLevel(valuePerLevel: number): SingleItemModifier {
	return createItemModifier(
		"mana_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} to Mana (+${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function defensePerLevel(valuePerLevel: number): SingleItemModifier {
	return createItemModifier(
		"defense_per_level",
		"dynamic",
		[valuePerLevel],
		`+{} Defense (+${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}

export function thornsPerLevel(valuePerLevel: number): SingleItemModifier {
	return createItemModifier(
		"thorns_per_level",
		"dynamic",
		[valuePerLevel],
		`Attacker Takes Damage of {} (${valuePerLevel} per Character Level)`,
		[`[${valuePerLevel}-${valuePerLevel * 99}]`]
	);
}
export function deadlyStrikePerLevel(valuePerLevel: number): SingleItemModifier {
	return createItemModifier(
		"deadly_strike_per_level",
		"dynamic",
		[valuePerLevel],
		`{}% Deadly Strike (${valuePerLevel} per Character Level)`,
		[`[${Math.floor(valuePerLevel)}-${Math.floor(valuePerLevel * 99)}]`]
	);
}

export function deadlyStrike(value: number): SingleItemModifier {
	return createItemModifier("deadly_strike", "static", [value], "{}% Deadly Strike");
}

export function life(value: ModifierValue): SingleItemModifier {
	return createItemModifier("life", "static", [value], "+{} to Life");
}

export function maximumLife(value: ModifierValue): SingleItemModifier {
	return createItemModifier("maximum_life", "static", [value], "Increase Maximum Life {}%");
}

export function mana(value: ModifierValue): SingleItemModifier {
	return createItemModifier("mana", "static", [value], "+{} to Mana");
}

export function maximumMana(value: ModifierValue): SingleItemModifier {
	return createItemModifier("maximum_mife", "static", [value], "Increase Maximum Mana {}%");
}

export function fireResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("fire_resist", "static", [value], "Fire Resist +{}%");
}

export function coldResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("cold_resist", "static", [value], "Cold Resist +{}%");
}

export function maxFireResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("max_fire_resist", "static", [value], "+{}% to Maximum Fire Resist");
}

export function maxColdResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("max_cold_resist", "static", [value], "+{}% to Maximum Cold Resist");
}

export function maxLightningResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"max_lightning_resist",
		"static",
		[value],
		"+{}% to Maximum Lightning Resist"
	);
}

export function maxPoisonResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"max_poison_resist",
		"static",
		[value],
		"+{}% to Maximum Poison Resist"
	);
}

export function maxAllResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"max_all_resist",
		"static",
		[value],
		"+{}% to All Maximum Resistances "
	);
}

export function lightningResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("lightning_resist", "static", [value], "Lightning Resist +{}%");
}

export function poisonResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("poison_resist", "static", [value], "Poison Resist +{}%");
}

export function allResist(value: ModifierValue): SingleItemModifier {
	return createItemModifier("all_resist", "static", [value], "All Resistances +{}");
}

export function poisonLengthDurationReduced(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"poison_length_duration_reduced",
		"static",
		[value],
		"Poison Length Reduced by {}%"
	);
}

export function lifeAfterEachKill(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"life_after_each_kill",
		"static",
		[value],
		"+{} to Life after each Kill"
	);
}

export function manaAfterEachKill(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"mana_after_each_kill",
		"static",
		[value],
		"+{} to Mana after each Kill"
	);
}

export function physicalDamageReduced(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"physical_damage_reduced",
		"static",
		[value],
		"Physical Damage Taken Reduced by {}%"
	);
}

export function magicFind(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"magic_find",
		"static",
		[value],
		"{}% Better Chance of Getting Magic Items"
	);
}

export function goldFind(value: ModifierValue): SingleItemModifier {
	return createItemModifier("gold_find", "static", [value], "{}% Extra Gold from Monsters ");
}

export function reducedAllVendorPrices(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"reduced_all_vendor_prices",
		"static",
		[value],
		"Reduces all Vendor Prices {}%"
	);
}

export function allSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("all_skills", "static", [value], "+{} to All Skills");
}

export function allAttributes(value: ModifierValue): SingleItemModifier {
	return createItemModifier("all_attributes", "static", [value], "+{} to All Attributes");
}

export function attackRating(value: ModifierValue): SingleItemModifier {
	return createItemModifier("attack_rating", "static", [value], "+{} to Attack Rating");
}

export function attackRatingAgainstUndead(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"attack_rating_against Undead",
		"static",
		[value],
		"+{} to Attack Rating against Undead"
	);
}

export function attackRatingAgainstDemons(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"attack_rating_against Demons",
		"static",
		[value],
		"+{} to Attack Rating against Demons"
	);
}

export function bonusAttackRating(value: ModifierValue): SingleItemModifier {
	return createItemModifier("bonus_attack_rating", "static", [value], "{}% Bonus to Attack Rating");
}

export function enhancedDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier("enhanced_damage", "static", [value], "+{}% Enhanced Damage");
}

export function enemyColdResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_cold_resistance",
		"static",
		[value],
		"-{}% to Enemy Cold Resistance"
	);
}

export function enemyLightningResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_lightning_resistance",
		"static",
		[value],
		"-{}% to Enemy Lightning Resistance"
	);
}

export function enemyFireResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_fire_resistance",
		"static",
		[value],
		"-{}% to Enemy Fire Resistance"
	);
}

export function enemyPoisonResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_poison_resistance",
		"static",
		[value],
		"-{}% to Enemy Poison Resistance"
	);
}

export function enemyPhysicalResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_physical_resistance",
		"static",
		[value],
		"-{}% to Enemy Physical Resistance"
	);
}

export function enemyMagicResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"enemy_magic_resistance",
		"static",
		[value],
		"-{}% to Enemy Magic Resistance"
	);
}

export function baseDefense(value: ModifierValue): SingleItemModifier {
	return createItemModifier("base_defense", "static", [value], "Base Defense: {}");
}

export function defense(value: ModifierValue): SingleItemModifier {
	return createItemModifier("defense", "static", [value], "+{} Defense");
}

export function defenseVsMissile(value: ModifierValue): SingleItemModifier {
	return createItemModifier("defense_vs_missile", "static", [value], "+{} Defense vs. Missile");
}

export function enhancedDefense(value: ModifierValue): SingleItemModifier {
	return createItemModifier("enhanced_defense", "static", [value], "+{}% Enhanced Defense");
}

export function strength(value: ModifierValue): SingleItemModifier {
	return createItemModifier("strength", "static", [value], "+{} to Strength");
}

export function dexterity(value: ModifierValue): SingleItemModifier {
	return createItemModifier("dexterity", "static", [value], "+{} to Dexterity");
}

export function vitality(value: ModifierValue): SingleItemModifier {
	return createItemModifier("vitality", "static", [value], "+{} to Vitality");
}

export function energy(value: ModifierValue): SingleItemModifier {
	return createItemModifier("energy", "static", [value], "+{} to Energy");
}

export function fireAbsorb(value: ModifierValue): SingleItemModifier {
	return createItemModifier("fire_absorb", "static", [value], "+{} Fire Absorb");
}

export function coldAbsorb(value: ModifierValue): SingleItemModifier {
	return createItemModifier("cold_absorb", "static", [value], "+{} Cold Absorb");
}

export function lightningAbsorb(value: ModifierValue): SingleItemModifier {
	return createItemModifier("lightning_absorb", "static", [value], "+{} Lightning Absorb");
}

export function indestructible(): SingleItemModifier {
	return createItemModifier("indestructible", "static", [1], "Indestructible");
}

export function halfFreezeDuration(): SingleItemModifier {
	return createItemModifier("freeze_duration", "static", [0.5], "Half Freeze Duration");
}

export function cannotBeFrozen(): SingleItemModifier {
	return createItemModifier("freeze_duration", "static", [1], "Cannot be Frozen");
}

export function hitBlindsTarget(): SingleItemModifier {
	return createItemModifier("hit_blinds_target", "static", [1], "Hit Blinds Target ");
}

export function knockback(): SingleItemModifier {
	return createItemModifier("knockback", "static", [1], "Cannot be Frozen");
}

export function chanceToFlee(value: ModifierValue): SingleItemModifier {
	return createItemModifier("chance_to_flee", "static", [value], "Hit Causes Monster to Flee {}%");
}

export function requirements(value: ModifierValue): SingleItemModifier {
	return createItemModifier("requirements", "static", [value], "Requirements -{}%");
}

export function thorns(value: ModifierValue): SingleItemModifier {
	return createItemModifier("thorns", "static", [value], "Attacker Takes Damage of {}");
}

export function thornsLightning(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"thorns_lightning",
		"static",
		[value],
		"Attacker Takes Lightning Damage of {}"
	);
}

export function maximumDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier("maximum_damage", "static", [value], "+{} to Maximum Damage");
}

export function flatPhysicalDamageReduced(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"flat_physical_damage_reduced",
		"static",
		[value],
		"Physical Damage Taken Reduced by {}"
	);
}

export function flatMagicDamageReduced(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"flat_magic_damage_reduced",
		"static",
		[value],
		"Magic Damage Taken Reduced by {}"
	);
}

export function lightRadius(value: ModifierValue): SingleItemModifier {
	return createItemModifier("light_radius", "static", [value], "{} to Light Radius");
}

export function damageToUndead(value: ModifierValue): SingleItemModifier {
	return createItemModifier("damage_to_undead", "static", [value], "+{}% Damage to Undead");
}

export function damageToDemons(value: ModifierValue): SingleItemModifier {
	return createItemModifier("damage_to_demons", "static", [value], "+{}% Damage to Demons");
}

export function javelinAndSpearSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"javelin_and_spear_skills",
		"static",
		[value],
		"+{} to Javelin and Spear Skills (Amazon Only)"
	);
}

export function passiveAndMagicSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"passive_and_magic_skills",
		"static",
		[value],
		"+{} to Passive and Magic Skills (Amazon Only)"
	);
}

export function bowAndCrossbowSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"bow_and_crossbow_skills",
		"static",
		[value],
		"+{} to Bow and Crossbow Skills (Amazon Only)"
	);
}

export function combatSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"combat_skills",
		"static",
		[value],
		"+{} to Combat Skills (Barbarian Only)"
	);
}

export function warcriesSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"warcries_skills",
		"static",
		[value],
		"+{} to Warcries Skills (Barbarian Only)"
	);
}

export function masteriesSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"masteries_skills",
		"static",
		[value],
		"+{} to Masteries Skills (Barbarian Only)"
	);
}

export function summoningSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"summoning_skills",
		"static",
		[value],
		"+{} to Summoning Skills (Necromancer Only)"
	);
}

export function poisonAndBoneSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"poison_and_bone_skills",
		"static",
		[value],
		"+{} to Poison and Bone Skills (Necromancer Only)"
	);
}

export function cursesSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"curses_skills",
		"static",
		[value],
		"+{} to Curses Skills (Necromancer Only)"
	);
}

export function combatSkillsPaladinOnly(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"combat_skills_paladin",
		"static",
		[value],
		"+{} to Combat Skills (Paladin Only)"
	);
}

export function defensiveAurasSkillsPaladinOnly(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"defensive_auras_skills",
		"static",
		[value],
		"+{} to Defensive Auras Skills (Paladin Only)"
	);
}

export function offensiveAurasSkillsPaladinOnly(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"offensive_auras_skills",
		"static",
		[value],
		"+{} to Offensive Auras Skills (Paladin Only)"
	);
}

export function fireSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("fire_skills", "static", [value], "+{} to Fire Skills");
}

export function coldSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("cold_skills", "static", [value], "+{} to Cold Skills");
}

export function lightningSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("lightning_skills", "static", [value], "+{} to Lightning Skills");
}

export function poisonSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("poison_skills", "static", [value], "+{} to Poison Skills");
}

export function magicSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("magic_skills", "static", [value], "+{} to Magic Skills");
}

export function shapeShiftingSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"shape_shifting_skills",
		"static",
		[value],
		"+{} to Shape Shifting Skills (Druid Only)"
	);
}

export function summoningSkillsDruid(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"summoning_skills_druid",
		"static",
		[value],
		"+{} to Summoning Skills (Druid Only)"
	);
}

export function elementalSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"elemental_skills",
		"static",
		[value],
		"+{} to Elemental Skills (Druid Only)"
	);
}

export function martialArtsSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"martial_arts_skills",
		"static",
		[value],
		"+{} to Martial Arts Skills (Assassin Only)"
	);
}

export function trapsSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"traps_skills",
		"static",
		[value],
		"+{} to Traps Skills (Assassin Only)"
	);
}

export function shadowDisciplineSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"shadow_discipline_skills",
		"static",
		[value],
		"+{} to Shadow Discipline Skills (Assassin Only)"
	);
}

export function necromancerSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("necromancer_skills", "static", [value], "+{} to Necromancer Skills");
}

export function amazonSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("amazon_skills", "static", [value], "+{} to Amazon Skills");
}

export function barbarianSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("barbarian_skills", "static", [value], "+{} to Barbarian Skills");
}

export function paladinSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("paladin_skills", "static", [value], "+{} to Paladin Skills");
}

export function sorceressSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("sorceress_skills", "static", [value], "+{} to Sorceress Skills");
}

export function druidSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("druid_skills", "static", [value], "+{} to Druid Skills");
}

export function assassinSkills(value: ModifierValue): SingleItemModifier {
	return createItemModifier("assassin_skills", "static", [value], "+{} to Assassin Skills");
}

export function skeletonMastery(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"skeleton_mastery",
		"static",
		[value],
		"+{} to Skeleton Mastery (Necromancer Only)"
	);
}

export function raiseSkeleton(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"raise_skeleton",
		"static",
		[value],
		"+{} to Raise Skeleton (Necromancer Only)"
	);
}

export function cloakOfShadows(value: ModifierValue): SingleItemModifier {
	return createItemModifier("cloak_of_shadows", "static", [value], "+{} to Cloak of Shadows");
}

export function poisonDamageOverSeconds(
	damage: ModifierValue,
	seconds: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"poison_damage_over_seconds",
		"static",
		[damage, seconds],
		"+{} Poison Damage over {} seconds"
	);
}

export function lifeStolenPerHit(value: ModifierValue): SingleItemModifier {
	return createItemModifier("life_stolen_per_hit", "static", [value], "{}% Life Stolen per Hit");
}

export function manaStolenPerHit(value: ModifierValue): SingleItemModifier {
	return createItemModifier("mana_stolen_per_hit", "static", [value], "{}% Mana Stolen per Hit");
}

export function howlOnStriking(chance: ModifierValue, level: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"howl_on_striking",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Howl on Striking"
	);
}

export function twisterOnStriking(chance: ModifierValue, level: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"twister_on_striking",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Twister on Striking"
	);
}

export function amplifyDamageOnStriking(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"amplify_damage_on_striking",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Amplify Damage on Striking"
	);
}

export function dimVisionWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"dim_vision_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Dim Vision when Struck"
	);
}

export function ironMaidenWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"iron_maiden_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Iron Maiden when Struck"
	);
}

export function poisonNovaWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"poison_nova_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Poison Nova when Struck "
	);
}

export function meteorWhenStruck(chance: ModifierValue, level: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"meteor_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Meteor when Struck "
	);
}

export function blizzardWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"blizzard_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Blizzard when Struck "
	);
}

export function fistOfHeavensWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"fist_of_heavens_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Fist of Heavens when Struck "
	);
}

export function boneArmorWhenStruck(
	chance: ModifierValue,
	level: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"bone_armor_when_struck",
		"static",
		[chance, level],
		"{}% Chance to Cast Level {} Bone Armor when Struck "
	);
}

export function attackSpeed(value: ModifierValue): SingleItemModifier {
	return createItemModifier("attack_speed", "static", [value], "+{}% Increased Attack Speed ");
}

export function damageTakenGainedAsMana(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"damage_taken_gained_as_mana",
		"static",
		[value],
		"{}% Damage Taken Gained as Mana when Hit"
	);
}

export function replenishLife(value: ModifierValue): SingleItemModifier {
	return createItemModifier("replenish_life", "static", [value], "Replenish Life +{}");
}

export function fasterHitRecovery(value: ModifierValue): SingleItemModifier {
	return createItemModifier("faster_hit_recovery", "static", [value], "+{}% Faster Hit Recovery");
}

export function fasterCastRate(value: ModifierValue): SingleItemModifier {
	return createItemModifier("faster_cast_rate", "static", [value], "+{}% Faster Cast Rate");
}

export function fasterBlockRate(value: ModifierValue): SingleItemModifier {
	return createItemModifier("faster_block_rate", "static", [value], "+{}% Faster Block Rate");
}

export function increasedChanceOfBlocking(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"increased_block_chance",
		"static",
		[value],
		"{}% Increased Chance of Blocking"
	);
}

export function fasterRunWalk(value: ModifierValue): SingleItemModifier {
	return createItemModifier("faster_run_walk", "static", [value], "+{}% Faster Run/Walk");
}

export function preventMonsterHeal(): SingleItemModifier {
	return createItemModifier("prevent_monster_heal", "static", [1], "Prevent Monster Heal");
}

export function slainMonstersRestinPeace(): SingleItemModifier {
	return createItemModifier(
		"slain_monsters_rest_in_peace",
		"static",
		[1],
		"Slain Monsters Rest in Peace"
	);
}

export function slowTarget(value: ModifierValue): SingleItemModifier {
	return createItemModifier("slow_target", "static", [value], "Slows Target by {}%");
}

export function slowerStaminaDrain(value: ModifierValue): SingleItemModifier {
	return createItemModifier("slower_stamina_drain", "static", [value], "{}% Slower Stamina Drain");
}

export function addsFireDamage(min: ModifierValue, max: ModifierValue): SingleItemModifier {
	return createItemModifier("adds_fire_damage", "static", [min, max], "Adds {}-{} Fire Damage");
}

export function addsColdDamage(min: ModifierValue, max: ModifierValue): SingleItemModifier {
	return createItemModifier("adds_cold_damage", "static", [min, max], "Adds {}-{} Cold Damage");
}

export function venomSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"venom_skill_charges",
		"static",
		[level, charges],
		"Level {} Venom ({} Charges)"
	);
}

export function poisonCreeperSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"poison_creeper_skill_charges",
		"static",
		[level, charges],
		"Level {} Poison Creeper ({} Charges)"
	);
}

export function oakSageSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"oak_sage_skill_charges",
		"static",
		[level, charges],
		"Level {} Oak Sage ({} Charges)"
	);
}

export function spiritOfBarbsSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"spirit_of_barbs_skill_charges",
		"static",
		[level, charges],
		"Level {} Spirit of Barbs ({} Charges)"
	);
}

export function heartOfWolverineSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"heart_of_wolverine_skill_charges",
		"static",
		[level, charges],
		"Level {} Heart of Wolverine ({} Charges)"
	);
}

export function ironMaidenSkillCharges(
	level: ModifierValue,
	charges: ModifierValue
): SingleItemModifier {
	return createItemModifier(
		"iron_maiden_skill_charges",
		"static",
		[level, charges],
		"Level {} Iron Maiden ({} Charges)"
	);
}

export function ironGolemSkill(level: ModifierValue): SingleItemModifier {
	return createItemModifier("iron_golem_skill_charges", "static", [level], "+{} to Iron Golem");
}

export function golemMasterySkill(level: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"golem_mastery_skill_charges",
		"static",
		[level],
		"+{} to Golem Mastery"
	);
}

export function addsLightningDamage(min: ModifierValue, max: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"adds_lightning_damage",
		"static",
		[min, max],
		"Adds {}-{} Lightning Damage"
	);
}

export function chanceToPierce(value: ModifierValue): SingleItemModifier {
	return createItemModifier("change_to_pierce", "static", [value], "+{}% Chance to Pierce");
}

export function crushingBlow(value: ModifierValue): SingleItemModifier {
	return createItemModifier("crushing_blow", "static", [value], "+{}% Chance of Crushing Blow");
}

export function reducedCurseDuration(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"reduced_curse_duration",
		"static",
		[value],
		"{}% Reduced Curse Duration"
	);
}

export function curseResistance(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"reduced_curse_duration",
		"static",
		[value],
		"{}% Reduced Curse Duration"
	);
}

export function socketed(sockets: ModifierValue): SingleItemModifier {
	return createItemModifier("socketed", "static", [sockets], "Socketed {}");
}

export function fireSkillDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier("fire_skill_damage", "static", [value], "+{}% to Fire Skill Damage");
}

export function coldSkillDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier("cold_skill_damage", "static", [value], "+{}% to Cold Skill Damage");
}

export function lightningSkillDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"lightning_skill_damage",
		"static",
		[value],
		"+{}% to Lightning Skill Damage"
	);
}

export function poisonSkillDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"poison_skill_damage",
		"static",
		[value],
		"+{}% to Poison Skill Damage"
	);
}

export function magicSkillDamage(value: ModifierValue): SingleItemModifier {
	return createItemModifier("magic_skill_damage", "static", [value], "+{}% to Magic Skill Damage");
}

export function regenerateMana(value: ModifierValue): SingleItemModifier {
	return createItemModifier("regenerate_mana", "static", [value], "Regenerate Mana {}%");
}

export function chanceOfOpenWounds(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"chance_of_open_wounds",
		"static",
		[value],
		"{}% Chance of Open Wounds"
	);
}

export function openWoundsDamagePerSeconds(value: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"open_wounds_damage_per_second",
		"static",
		[value],
		"+{} Open Wounds Damage per Second"
	);
}

export function boneNovaOnCasting(chance: ModifierValue, level: ModifierValue): SingleItemModifier {
	return createItemModifier(
		"bone_nova_on_casting",
		"static",
		[chance, level],
		"{}% Chance to Cast Level 25 Bone Nova on Casting"
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
