export interface Modifier {
	id: string;
	description: string;
	value: number;
	perLevelValue?: number;
	range?: [number, number];
}

function averageRoll(range: [number, number]) {
	return Math.ceil((range[0] + range[1]) / 2);
}

export function createModifier(
	id: string,
	description: string,
	value: number | [number, number],
	perLevelValue?: number
): Modifier {
	const isRange = Array.isArray(value);
	return {
		id,
		description,
		value: isRange ? averageRoll(value) : value,
		perLevelValue,
		range: isRange ? value : undefined,
	};
}

export function allSkillsModifier(value: number | [number, number]): Modifier {
	const isRange = Array.isArray(value);
	return createModifier(
		"all_skills",
		`+${isRange ? averageRoll(value) : value} to All Skills`,
		value
	);
}

export function allAttributesModifier(value: number | [number, number]): Modifier {
	const isRange = Array.isArray(value);
	return createModifier(
		"all_attributes",
		`+${isRange ? averageRoll(value) : value} to All Attributes`,
		value
	);
}

// export function lifePerLevelModifier(value: number | [number, number]): Modifier {
// 	const isRange = Array.isArray(value);
// 	return createModifier(
// 		"all_attributes",
// 		`+${isRange ? averageRoll(value) : value} to Life (+)`,
// 		0,
// 		isRange ? averageRoll(value) : value
// 	);
// }

// const HarlequinCrest = createItem(
// 	"Harlequin Crest",
// 	"Shako",
// 	"helmet",
// 	"unique",
// 	[
// 		{ description: "+2 to All Skills" },
// 		{ description: "+2 to All Attributes" },
// 		{ description: "+[1-99] to Life (+1 per Character Level)" },
// 		{ description: "+[1-99] to Mana (+1 per Character Level)" },
// 		{ description: "Physical Damage Taken Reduced by [3-5]%" },
// 		{ description: "[25-50]% Better Chance of Getting Magic Items" },
// 	],
// 	{
// 		requiredLevel: 62,
// 		requiredStrength: 50,
// 		defense: [98, 141],
// 	}
// );
