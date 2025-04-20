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
		// Low-Rarity (48% chance)
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
	boots: [
		// Low-Rarity (48% chance)
		modifiers.enhancedDefense([50, 80]),
		modifiers.regenerateMana([10, 15]),
		modifiers.goldFind([50, 100]),
		modifiers.magicFind([10, 25]),
		modifiers.fireResist([15, 20]),
		modifiers.coldResist([15, 20]),
		modifiers.lightningResist([15, 20]),
		modifiers.poisonResist([15, 20]),
		// Mid-Rarity (32% chance)
		modifiers.hybridIndestructibleEnhancedDefense([50, 80]),
		modifiers.fasterBlockRate(10),
		modifiers.fasterHitRecovery(10),
		modifiers.life([20, 40]),
		modifiers.allResist([5, 8]),
		modifiers.lifeAfterEachKill([2, 3]),
		modifiers.manaAfterEachKill([2, 3]),
		modifiers.replenishLife([15, 25]),
		// High-Rarity (20% chance)
		modifiers.fasterRunWalk(15),
		modifiers.reducedCurseDuration(20),
		modifiers.physicalDamageReduced([3, 4]),
		modifiers.increasedChanceOfBlocking(10),
		modifiers.hybridMaxFireResistFireResist([2, 3], 10),
		modifiers.hybridMaxColdResistColdResist([2, 3], 10),
		modifiers.hybridMaxLightningResistLightningResist([2, 3], 10),
		modifiers.hybridMaxPoisonResistPoisonResist([2, 3], 10),
	],
	amulet: [
		// Low-Rarity (48% chance)
		modifiers.strength([6, 12]),
		modifiers.dexterity([6, 12]),
		modifiers.vitality([6, 12]),
		modifiers.energy([6, 12]),
		modifiers.fireResist([15, 20]),
		modifiers.coldResist([15, 20]),
		modifiers.lightningResist([15, 20]),
		modifiers.poisonResist([15, 20]),
		// Mid-Rarity (32% chance)
		modifiers.chanceToPierce([10, 20]),
		modifiers.fasterHitRecovery(10),
		modifiers.increasedChanceOfBlocking(10),
		modifiers.lifeAfterEachKill([2, 3]),
		modifiers.manaAfterEachKill([2, 3]),
		modifiers.allAttributes([6, 8]),
		modifiers.goldFind([60, 100]),
		modifiers.magicFind([20, 30]),
		// High-Rarity (20% chance)
		modifiers.allSkills(1),
		modifiers.fasterCastRate(10),
		modifiers.fasterRunWalk(10),
		modifiers.curseResistance(10),
		modifiers.enhancedDamage([30, 40]),
		modifiers.cannotBeFrozen(),
		modifiers.maxAllResist(2),
		modifiers.allResist([7, 10]),
	],
	ring: [
		// Low-Rarity (48% chance)
		modifiers.strength([7, 10]),
		modifiers.dexterity([7, 10]),
		modifiers.vitality([7, 10]),
		modifiers.energy([7, 10]),
		modifiers.fireResist([10, 15]),
		modifiers.coldResist([10, 15]),
		modifiers.lightningResist([10, 15]),
		modifiers.poisonResist([10, 15]),
		// Mid-Rarity (32% chance)
		modifiers.attackRating([100, 150]),
		modifiers.lifeAfterEachKill([2, 3]),
		modifiers.manaAfterEachKill([2, 3]),
		modifiers.flatPhysicalDamageReduced([4, 6]),
		modifiers.flatMagicDamageReduced([4, 6]),
		modifiers.life([30, 40]),
		modifiers.goldFind([40, 80]),
		modifiers.magicFind([15, 20]),
		// High-Rarity (20% chance)
		modifiers.fasterCastRate(10),
		modifiers.fasterRunWalk(10),
		modifiers.reducedCurseDuration(10),
		modifiers.manaStolenPerHit([3, 4]),
		modifiers.lifeStolenPerHit([3, 4]),
		modifiers.allAttributes([4, 6]),
		modifiers.allResist([4, 6]),
		modifiers.physicalDamageReduced(3),
	],
	belt: [
		// Low-Rarity (48% chance)
		modifiers.strength([7, 10]),
		modifiers.dexterity([7, 10]),
		modifiers.vitality([7, 10]),
		modifiers.energy([7, 10]),
		modifiers.fireResist([10, 15]),
		modifiers.coldResist([10, 15]),
		modifiers.lightningResist([10, 15]),
		modifiers.poisonResist([10, 15]),
		// Mid-Rarity (32% chance)
		modifiers.chanceToPierce([10, 15]),
		modifiers.fasterHitRecovery(10),
		modifiers.allAttributes([3, 6]),
		modifiers.replenishLife([15, 20]),
		modifiers.attackRating([100, 150]),
		modifiers.thornsPerLevel(2), // FIXME: [2, 4]
		modifiers.goldFind([60, 100]),
		modifiers.magicFind([20, 30]),
		// High-Rarity (20% chance)
		modifiers.fasterCastRate(10),
		modifiers.attackSpeed(10),
		modifiers.fasterRunWalk(10),
		modifiers.reducedCurseDuration(20),
		modifiers.increasedChanceOfBlocking(10),
		modifiers.maxAllResist(2),
		modifiers.allResist([5, 8]),
		modifiers.physicalDamageReduced([3, 4]),
	],
} as const satisfies Record<ItemBaseType, ItemModifier[]>;
