let armorValues = new Map(Object.entries({
	heavyArmor: {
		label: "Heavy",
		range: [0, 7],
		quantity: 0
	},
	mediumArmor: {
		label: "Medium",
		range: [0, 7],
		quantity: 6
	},
	lightArmor: {
		label: "Light",
		range: [0, 7],
		quantity: 0
	},
}));

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
		category: "base",
		value: 3271,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Grave Lord"
	},
	herald: {
		category: "base",
		value: 1240,
		active: false,
		quantity: 2,
		hasRange: true,
		range: [0, 6],
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
		range: [0, 7],
		label: "Light Armor (939 per piece)"
	},
	velothi: {
		category: "self",
		value: 1650,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Velothi Ur-Mage's Amulet"
	},
	mace: {
		category: "self",
		value: 1487,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		label: "Mace/Maul (1487 per weapon, 2H = 2 weapons)"
	},
	sharpened: {
		category: "self",
		value: 1638,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		label: "Sharpened (1638 per weapon, 2H = 2 weapons)"
	},
	fonCP: {
		category: "self",
		value: 660,
		active: false,
		quantity: 3,
		hasRange: true,
		range: [1, 10],
		label: "Force of Nature CP (660 per status)"
	},
	otherArmor: {
		category: "self",
		value: 1487,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 10],
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
	arenaPen: {
		category: "self",
		value: 1190,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Arena Set Bonus"
	},
	loverMundus: {
		category: "self",
		value: 4491,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Lover Mundus (7 divines)"
	}
}));

let classes = new Map(Object.entries({
	dk: {
		label: "Dragonknight",
		active: true,
		subclasses: [{
			value: "ardent",
			text: "Ardent Flame",
			active: true
		},
		{
			value: "earthen",
			text: "Earthen Heart",
			active: true
		},
		{
			value: "draconic",
			text: "Draconic Power",
			active: true
		}]
	},
	nb: {
		label: "Nightblade",
		active: true,
		subclasses: [{
			value: "assassin",
			text: "Assassination",
			active: true
		},
		{
			value: "siphon",
			text: "Siphoning",
			active: true
		},
		{
			value: "shadow",
			text: "Shadow",
			active: true
		}]
	},
	plar: {
		label: "Templar",
		active: true,
		subclasses: [{
			value: "dawn",
			text: "Dawn's Wrath",
			active: true
		},
		{
			value: "aedric",
			text: "Aedric Spear",
			active: true
		},
		{
			value: "restoring",
			text: "Restoring Light",
			active: true
		}]
	},
	sorc: {
		label: "Sorcerer",
		active: true,
		subclasses: [{
			value: "storm",
			text: "Storm Calling",
			active: true
		},
		{
			value: "daedric",
			text: "Daedric Summoning",
			active: true
		},
		{
			value: "dark",
			text: "Dark Magic",
			active: true
		}]
	},
	den: {
		label: "Warden",
		active: true,
		subclasses: [{
			value: "animal",
			text: "Animal Companions",
			active: true
		},
		{
			value: "winter",
			text: "Winter's Embrace",
			active: true
		},
		{
			value: "green",
			text: "Green Balance",
			active: true
		}]
	},
	cro: {
		label: "Necromancer",
		active: true,
		subclasses: [{
			value: "grave",
			text: "Grave Lord",
			active: true
		},
		{
			value: "bone",
			text: "Bone Tyrant"
		},
		{
			value: "living",
			text: "Living Death",
			active: true
		}]
	},
	arc: {
		label: "Arcanist",
		active: true,
		subclasses: [{
			value: "herald",
			text: "Herald of the Tome",
			active: true
		},
		{
			value: "soldier",
			text: "Soldier of Apocrypha",
			active: true
		},
		{
			value: "curative",
			text: "Curative Runeforms",
			active: true
		}]
	}
}));

let classBaseCode = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
let classCodeMap = {};
let codeIndex = 0;
classes.forEach((classConfig, className) => {
	classConfig.subclasses.forEach((subclass) => {
		classCodeMap[subclass.value] = classBaseCode[codeIndex];
		codeIndex++;
	});
});