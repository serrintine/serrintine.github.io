let critRateValues = new Map(Object.entries({
	baseCritRate: {
		category: "base",
		value: 0.1,
		active: true,
		quantity: 1,
		hasRange: false,
		label: "Base Character Crit Rate"
	},
	assassin: {
		suppress: true,
		category: "base",
		value: 438,
		active: false,
		quantity: 1,
		hasRange: true,
    range: [1, 5],
		label: "Assassination"
	},
	grave: {
		suppress: true,
		category: "base",
		value: .15,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Grave Lord"
	},
  minorCrit: {
		category: "group",
		value: 20,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Minor Savagery/Prophecy"
	},
	majorCrit: {
		category: "self",
		value: 20,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Major Savagery/Prophecy"
	},
	thiefMundus: {
		category: "self",
    baseValue: 10,
		value: 10,
		active: false,
		quantity: 1,
		hasRange: true,
    range: [0, 7],
		label: "Thief Mundus (+x per divines)"
	},
	lightArmor: {
		disabled: true,
		category: "self",
		value: 2,
		active: true,
		quantity: 1,
		hasRange: true,
		range: [0, 7],
		label: "Light Armor (2% per piece)"
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
	dwDagger: {
		category: "self",
		value: 6,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		label: "Dual Wield Daggers (6% per weapon)"
	},
	cp: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "CP"
	},
	precise: {
		category: "self",
		value: 8,
		active: false,
		quantity: 1,
		hasRange: true,
    range: [1, 2],
		label: "Precise"
	},
	kilt: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Harpooner's Wading Kilt"
	}
}));
