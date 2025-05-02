import type { CharacterClass } from "../types";

interface AttributeInfo {
	strength: {
		base: number;
	};

	dexterity: {
		base: number;
	};

	vitality: {
		base: number;
		lifePerPoint: number;
		staminaPerPoint: number;
	};

	energy: {
		base: number;
		manaPerPoint: number;
	};
}

export const attributeInfo = {
	amazon: {
		strength: {
			base: 20,
		},
		dexterity: {
			base: 25,
		},
		vitality: {
			base: 20,
			lifePerPoint: 3,
			staminaPerPoint: 1,
		},
		energy: {
			base: 15,
			manaPerPoint: 1.5,
		},
	},
	assassin: {
		strength: {
			base: 20,
		},
		dexterity: {
			base: 20,
		},
		vitality: {
			base: 20,
			lifePerPoint: 3,
			staminaPerPoint: 1.25,
		},
		energy: {
			base: 25,
			manaPerPoint: 1.75,
		},
	},
	necromancer: {
		strength: {
			base: 15,
		},
		dexterity: {
			base: 25,
		},
		vitality: {
			base: 15,
			lifePerPoint: 2,
			staminaPerPoint: 1,
		},
		energy: {
			base: 25,
			manaPerPoint: 2,
		},
	},
	barbarian: {
		strength: {
			base: 30,
		},
		dexterity: {
			base: 20,
		},
		vitality: {
			base: 25,
			lifePerPoint: 4,
			staminaPerPoint: 1,
		},
		energy: {
			base: 10,
			manaPerPoint: 1,
		},
	},
	paladin: {
		strength: {
			base: 25,
		},
		dexterity: {
			base: 20,
		},
		vitality: {
			base: 25,
			lifePerPoint: 3,
			staminaPerPoint: 1,
		},
		energy: {
			base: 15,
			manaPerPoint: 1.5,
		},
	},
	sorceress: {
		strength: {
			base: 10,
		},
		dexterity: {
			base: 25,
		},
		vitality: {
			base: 10,
			lifePerPoint: 2,
			staminaPerPoint: 1,
		},
		energy: {
			base: 35,
			manaPerPoint: 2,
		},
	},
	druid: {
		strength: {
			base: 15,
		},
		dexterity: {
			base: 20,
		},
		vitality: {
			base: 25,
			lifePerPoint: 2,
			staminaPerPoint: 1,
		},
		energy: {
			base: 20,
			manaPerPoint: 2,
		},
	},
} as const satisfies Record<CharacterClass, AttributeInfo>;
