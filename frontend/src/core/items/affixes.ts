import type { ItemModifier } from "./modifiers";
import * as modifiers from "./modifiers";

interface AffixData {
	modifier: ItemModifier;
	// alvl: number;
	// rlvl: number;
}

// TODO: all tiers
const charm = {
	"Small Charm": {
		prefixes: {
			defense: {
				modifier: modifiers.defense([1, 30]),
			},
			minimumDamage: {
				modifier: modifiers.minimumDamage([1, 3]),
			},
			attackRating: {
				modifier: modifiers.attackRating([2, 36]),
			},
			hybridMinimumDamageAttackRating: {
				modifier: modifiers.hybridMinimumDamageAttackRating([1, 3], [10, 20]),
			},
			mana: {
				modifier: modifiers.mana([1, 17]),
			},
			allResist: {
				modifier: modifiers.allResist([3, 5]),
			},
			coldResist: {
				modifier: modifiers.coldResist([3, 11]),
			},
			fireResist: {
				modifier: modifiers.fireResist([3, 11]),
			},
			lightningResist: {
				modifier: modifiers.lightningResist([3, 11]),
			},
			poisonResist: {
				modifier: modifiers.poisonResist([3, 11]),
			},
			addsFireDamage: {
				modifier: modifiers.addsFireDamage([1, 10], [2, 29]),
			},
			addsColdDamage: {
				modifier: modifiers.addsColdDamage([1, 13], [2, 27]),
			},
			addsLightningDamage: {
				modifier: modifiers.addsLightningDamage(1, [6, 50]),
			},
			poisonDamageOverSeconds: {
				modifier: modifiers.poisonDamageOverSeconds([4, 65], [3, 2]),
			},
		},
		suffixes: {
			// defense: {},
		},
	},
};

export const affixes = { charm } as const satisfies Record<
	string,
	Record<string, { prefixes: Record<string, AffixData>; suffixes: Record<string, AffixData> }>
>;
