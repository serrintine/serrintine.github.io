let critDamageValues = new Map(Object.entries({
	baseCritDmg: {
		category: "base",
		value: 50,
		active: true,
		quantity: 1,
		hasRange: false,
		label: "Base Character Crit Damage"
	},
	animal: {
		category: "base",
		value: 5,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [0, 6],
		label: "Animal Companions (5% per skill)"
	},
	assassin: {
		category: "base",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Assassination"
	},
	aedric: {
		category: "base",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Aedric Spear"
	},
	herald: {
		category: "base",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Herald of the Tome"
	},
	majorForce: {
		category: "group",
		value: 20,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Major Force"
	},
	majorBrittle: {
		category: "group",
		value: 20,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Major Brittle"
	},
	minorBrittle: {
		category: "group",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Minor Brittle"
	},
	lucent: {
		category: "group",
		value: 11,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Lucent Echoes"
	},
	ec: {
		category: "group",
		value: 5,
		active: false,
		quantity: 3,
		hasRange: true,
		range: [1, 3],
		label: "Elemental Catalyst"
	},
	minorForce: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Minor Force"
	},
	mediumArmor: {
		disabled: true,
		category: "self",
		value: 2,
		active: true,
		quantity: 6,
		hasRange: true,
		range: [0, 7],
		label: "Medium Armor (2% per piece)"
	},
	sulxan: {
		category: "self",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Sul-Xan's Torment"
	},
	moras: {
		category: "self",
		value: 1,
		active: false,
		quantity: 12,
		hasRange: true,
		range: [1, 12],
		label: "Mora Scribe's Thesis (1% per buff)"
	},
	axe: {
		category: "self",
		value: 6,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		label: "Axe (6% per weapon, 2H = 2 weapons)"
	},
	backstabber: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Backstabber CP"
	},
	fighting: {
		category: "self",
		value: 8,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Fighting Finesse CP"
	},
	khajiit: {
		category: "self",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Khajiit"
	},
	kilt: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Harpooner's Wading Kilt"
	},
	shadowMundus: {
		category: "self",
		value: 18,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Shadow Mundus (7 divines)"
	}
}));