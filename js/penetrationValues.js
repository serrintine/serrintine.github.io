let penetrationValues = new Map(Object.entries({
	basePen: {
		category: "base",
		value: 0,
		active: true,
		quantity: 1,
		hasRange: false,
		label: "Base Character Penetration"
	},
	grave: {
		suppress: true,
		category: "base",
		value: 3271,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Grave Lord"
	},
	herald: {
		suppress: true,
		category: "base",
		value: 1240,
		active: false,
		quantity: 2,
		hasRange: true,
		range: [1, 6],
		default: 2,
		label: "Herald of the Tome (1240 per skill)"
	},
	majorBreach: {
		category: "group",
		value: 5948,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Major Breach"
	},
	minorBreach: {
		category: "group",
		value: 2974,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Minor Breach"
	},
	crusher: {
		category: "group",
		value: 2108,
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
		value: 2640,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Tremorscale"
	},
	crimson: {
		category: "group",
		value: 3541,
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
		label: "Piercing CP"
	},
	lightArmor: {
		disabled: true,
		category: "self",
		value: 939,
		active: true,
		quantity: 0,
		hasRange: true,
		range: [1, 7],
		default: 0,
		label: "Light Armor (939 per piece)"
	},
	velothi: {
		category: "self",
		value: 1650,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Velothi-Ur Mage's Amulet"
	},
	dwMace: {
		category: "self",
		value: 1487,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		default: 1,
		label: "Dual Wield Mace (1487 per weapon)"
	},
	thMaul: {
		category: "self",
		value: 2974,
		active: false,
		quantity: 1,
		hasRange: false,
		default: 1,
		label: "Two-Handed Maul"
	},
	fonCP: {
		category: "self",
		value: 660,
		active: false,
		quantity: 3,
		hasRange: true,
		range: [1, 10],
		default: 3,
		label: "Force of Nature CP (660 per status)"
	},
	otherArmor: {
		category: "self",
		value: 1487,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 10],
		default: 1,
		label: "Armor Set Bonus (1487 per line)"
	},
	woodElf: {
		category: "self",
		value: 950,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Wood Elf"
	},
	lover: {
		category: "self",
		value: 4491,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Lover Mundus (7 divines)"
	}

}));
