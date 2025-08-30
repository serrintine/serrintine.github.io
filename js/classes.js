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