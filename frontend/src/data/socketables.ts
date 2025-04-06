interface Socketable {
	name: string;
	// description: string;
}

interface Rune {
	name: string;
	number: number;
	requiredLevel: number;
}

const runes = {
	El: { name: "El", number: 1, requiredLevel: 11 },
	Eld: { name: "Eld", number: 2, requiredLevel: 11 },
	Tir: { name: "Tir", number: 3, requiredLevel: 13 },
	Nef: { name: "Nef", number: 4, requiredLevel: 13 },
	Eth: { name: "Eth", number: 5, requiredLevel: 15 },
	Ith: { name: "Ith", number: 6, requiredLevel: 15 },
	Tal: { name: "Tal", number: 7, requiredLevel: 17 },
	Ral: { name: "Ral", number: 8, requiredLevel: 19 },
	Ort: { name: "Ort", number: 9, requiredLevel: 21 },
	Thul: { name: "Thul", number: 10, requiredLevel: 23 },
	Amn: { name: "Amn", number: 11, requiredLevel: 25 },
	Sol: { name: "Sol", number: 12, requiredLevel: 27 },
	Shael: { name: "Shael", number: 13, requiredLevel: 29 },
	Dol: { name: "Dol", number: 14, requiredLevel: 31 },
	Hel: { name: "Hel", number: 15, requiredLevel: 0 },
	Io: { name: "Io", number: 16, requiredLevel: 35 },
	Lum: { name: "Lum", number: 17, requiredLevel: 37 },
	Ko: { name: "Ko", number: 18, requiredLevel: 39 },
	Fal: { name: "Fal", number: 19, requiredLevel: 41 },
	Lem: { name: "Lem", number: 20, requiredLevel: 43 },
	Pul: { name: "Pul", number: 21, requiredLevel: 45 },
	Um: { name: "Um", number: 22, requiredLevel: 47 },
	Mal: { name: "Mal", number: 23, requiredLevel: 49 },
	Ist: { name: "Ist", number: 24, requiredLevel: 51 },
	Gul: { name: "Gul", number: 25, requiredLevel: 53 },
	Vex: { name: "Vex", number: 26, requiredLevel: 55 },
	Ohm: { name: "Ohm", number: 27, requiredLevel: 57 },
	Lo: { name: "Lo", number: 28, requiredLevel: 59 },
	Sur: { name: "Sur", number: 29, requiredLevel: 61 },
	Ber: { name: "Ber", number: 30, requiredLevel: 63 },
	Jah: { name: "Jah", number: 31, requiredLevel: 65 },
	Cham: { name: "Cham", number: 32, requiredLevel: 67 },
	Zod: { name: "Zod", number: 33, requiredLevel: 69 },
} as const satisfies Record<string, Rune>;

export type RuneName = keyof typeof runes;
