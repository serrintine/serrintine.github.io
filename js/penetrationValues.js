let penetrationValues = new Map(Object.entries({
	character: {
		category: "base",
		value: 100,
		active: true,
		quantity: 1,
		hasRange: false,
		label: "Base Character Penetration"
	},
	grave: {
		suppress: true,
		category: "base",
		value: 3000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Grave Lord"
	},
	herald: {
		suppress: true,
		category: "base",
		value: 900,
		active: false,
		quantity: 2,
		hasRange: true,
		range: [1, 6],
		default: 2,
		label: "Herald of the Tome (900 per skill)"
	},
	majorBreach: {
		category: "group",
		value: 5000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Major Breach"
	},
	minorBreach: {
		category: "group",
		value: 3000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Minor Breach"
	},
	crusher: {
		category: "group",
		value: 2100,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Infused Crusher"
	},
	alkosh: {
		category: "group",
		value: 6000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Roar of Alkosh"
	},
	tremor: {
		category: "group",
		value: 3000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Tremorscale"
	},
	crimson: {
		category: "group",
		value: 3500,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Crimson Oath's Rive"
	},
	runic: {
		category: "group",
		value: 2200,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Runic Sunder"
	},
	crystal: {
		category: "group",
		value: 1000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Crystal Weapon"
	},
	penCP: {
		category: "self",
		value: 700,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Penetration CP"
	},
	lightArmor: {
		disabled: true,
		category: "self",
		value: 900,
		active: true,
		quantity: 0,
		hasRange: true,
		range: [1, 7],
		default: 0,
		label: "Light Armor (900 per piece)"
	},
	velothi: {
		category: "self",
		value: 1600,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Velothi-Ur Mage's Amulet"
	},
	fonCP: {
		category: "self",
		value: 900,
		active: false,
		quantity: 3,
		hasRange: true,
		range: [1, 10],
		default: 3,
		label: "Force of Nature CP (900 per status)"
	},
	otherArmor: {
		category: "self",
		value: 1400,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 10],
		default: 1,
		label: "Armor Penetration Bonus (1000 per line)"
	},
	woodElf: {
		category: "self",
		value: 3000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Wood Elf"
	},
	mundus: {
		category: "self",
		value: 6000,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Lover Mundus (7 divines)"
	}
}));