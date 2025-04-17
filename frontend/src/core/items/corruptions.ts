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
	ring: [],
	belt: [],
} as const satisfies Record<ItemBaseType, ItemModifier[]>;
