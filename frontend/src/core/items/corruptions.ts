import type { ItemBaseType } from "../../types";
import { type ItemModifier } from "./modifiers";
import * as modifiers from "./modifiers";

export const corruptionModifiers = {
	weapon: [
		modifiers.enhancedDamage([40, 80]),
		modifiers.attackRating([150, 250]),
		// +[100-150]% Enhanced Damage to Demons
		// +200 to Attack Rating against Demons

		// +[100-150]% Enhanced Damage to Undead
		// +200 to Attack Rating against Undead
		modifiers.fasterCastRate(10),
	],
	shield: [],
	quiver: [],
	helmet: [
		// low rarity (48% chance)
		modifiers.fasterHitRecovery([20, 30]),
		modifiers.enhancedDefense([50, 80]),
		modifiers.magicFind([20, 30]),
		modifiers.replenishLife([20, 30]),
		modifiers.fireResist([30, 35]),
		modifiers.coldResist([30, 35]),
		modifiers.lightningResist([30, 35]),
		modifiers.poisonResist([30, 35]),
	],
	chest: [],
	gloves: [],
	boots: [],
	amulet: [],
	ring: [
		// low rarity (48% chance)
		modifiers.strength([7, 10]),
		modifiers.dexterity([7, 10]),
		modifiers.vitality([7, 10]),
		modifiers.energy([7, 10]),
		modifiers.fireResist([10, 15]),
		modifiers.coldResist([10, 15]),
		modifiers.lightningResist([10, 15]),
		modifiers.poisonResist([10, 15]),
		// mid rarity (32% chance)
		modifiers.attackRating([100, 150]),
		modifiers.lifeAfterEachKill([2, 3]),
		modifiers.manaAfterEachKill([2, 3]),
		modifiers.flatPhysicalDamageReduced([4, 6]),
		modifiers.flatMagicDamageReduced([4, 6]),
		modifiers.life([30, 40]),
		modifiers.goldFind([40, 80]),
		modifiers.magicFind([15, 20]),
		// high rarity (20% chance)
		modifiers.fasterCastRate(10),
		modifiers.fasterRunWalk(10),
		modifiers.reducedCurseDuration(10),
		modifiers.manaStolenPerHit([3, 4]),
		modifiers.lifeStolenPerHit([3, 4]),
		modifiers.allAttributes([4, 6]),
		modifiers.allResist([4, 6]),
		modifiers.physicalDamageReduced(3),
	],
	belt: [],
} as const satisfies Record<ItemBaseType, ItemModifier[]>;
