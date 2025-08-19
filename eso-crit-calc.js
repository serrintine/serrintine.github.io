let critDamageValues = new Map(Object.entries({
	character: {
		category: "base",
		value: 50,
		active: true,
		quantity: 1,
		hasRange: false,
		label: "Base Character Crit Damage"
	},
	animal: {
		suppress: true,
		category: "base",
		value: 5,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 6],
		default: 1,
		label: "Animal Companions (5% per skill)"
	},
	assassin: {
		suppress: true,
		category: "base",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Assassination"
	},
	aedric: {
		suppress: true,
		category: "base",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Aedric Spear"
	},
	herald: {
		suppress: true,
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
		default: 3,
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
		category: "self",
		value: 2,
		active: false,
		quantity: 6,
		hasRange: true,
		range: [1, 7],
		default: 6,
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
		default: 12,
		label: "Mora Scribe's Thesis (1% per buff)"
	},
	dwAxe: {
		category: "self",
		value: 6,
		active: false,
		quantity: 1,
		hasRange: true,
		range: [1, 2],
		default: 1,
		label: "Dual Wield Axes (6% per weapon)"
	},
	thAxe: {
		category: "self",
		value: 12,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Two-Handed Axe"
	},
	backstabber: {
		category: "self",
		value: 10,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Backstabber"
	},
	fighting: {
		category: "self",
		value: 8,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Fighting Finesse"
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
	mundus: {
		category: "self",
		value: 18,
		active: false,
		quantity: 1,
		hasRange: false,
		label: "Shadow Mundus"
	}
}));

document.querySelectorAll('[data-source]').forEach(source => critDamageValues.forEach((damage, type) => setup(source, type, damage)));

function setup(source, type, damage) {
	if(source.getAttribute('name') === damage.category && !damage.suppress) {
		let checkBox = `<input type="checkbox" class="critDamageSource" name="${type}" id="${type}Check" autocomplete="off"`;
		if (damage.active) {
			checkBox += ` checked`;
		}
		if (damage.category === "base") {
			checkBox += ` disabled`;
		}
		checkBox += ` />`;
		if (damage.hasRange) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source">
				<div class="flex-container medium">` + checkBox + `<div class="number-input enabled">
  			<input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off">
			</div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source">
				<div class="flex-container medium">` + checkBox + `<div class="number-input disabled">
		  	<input class="quantity bg-light" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled>
			</div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
		}
		document.getElementById(type + "Check").addEventListener("click", displayCheck);
	}
}

document.querySelectorAll(".number-input.enabled").forEach(function(element) {
	element.insertAdjacentHTML('afterbegin', `<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>`);
	element.insertAdjacentHTML('beforeend', `<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" class="plus"></button>`);
});

document.querySelectorAll(".number-input.disabled").forEach(function(element) {
	element.insertAdjacentHTML('afterbegin', `<button type="button" disabled></button>`);
	element.insertAdjacentHTML('beforeend', `<button type="button" class="plus" disabled></button>`);
});

function displayCheck(option) {
	let toUpdate = critDamageValues.get(option.target.name);
	if(option.target.checked) {
		toUpdate.active = true;
		let quantity = document.getElementById(option.target.name + "Quantity");
		if (quantity) {
			toUpdate.quantity = document.getElementById(option.target.name + "Quantity").value;
		}
	} else {
		toUpdate.active = false;
	}
	critDamageValues.set(option.target.name, toUpdate);
	updateDisplay();
}

function quantityCheck(change) {
	let key = change.target.id.replace("Quantity", "");
	let toUpdate = critDamageValues.get(key);
	toUpdate.quantity = change.target.valueAsNumber;
	critDamageValues.set(key, toUpdate);
	updateDisplay();
}

function updateDisplay() {
	let critRate = Number(document.getElementById('critRate').value) / 100;
	let critDamage = 0;
	for(const [key, properties] of critDamageValues) {
		let span = document.querySelector('[name="' + key + 'Value"]');
		let label = document.querySelector('[for="' + key + '"]');
		let total = properties.value * properties.quantity;
		if(properties.active) {
			critDamage += total;
			if(span) {
				span.classList.add("green");
			}
			if(label) {
				label.classList.add("green");
			}
		} else {
			if(span) {
				span.classList.remove("green");
			}
			if(label) {
				label.classList.remove("green");
			}
		}
		if(span) {
			span.innerHTML = total + '%';
		}
	}
	let missing = 125 - critDamage;
	let box1 = document.getElementById("displayCritDamage");
	box1.value = critDamage + "%";
	let box2 = document.getElementById("displayMissing");
	box2.value = Math.abs(missing) + "%";
	let box3 = document.getElementById("displayDamageLoss");
	box3.value = Math.max(0, Number((1 - (1 + critDamage / 100 * critRate) / (1 + 1.25 * critRate)) * 100).toFixed(2)) + "%";
	let box4 = document.getElementById("critCap");
	box4.value = 125 + "%";
	if(missing < 0) {
		document.getElementById("cap").innerHTML = "Over Cap";
	} else {
		document.getElementById("cap").innerHTML = "Under Cap";
	}
	if(missing > 0) {
		box1.style["color"] = "#eb4634";
		box2.style["color"] = "#eb4634";
		box3.style["color"] = "#eb4634";
	} else {
		box1.style["color"] = "#3461eb";
		box2.style["color"] = "#3461eb";
		box3.style["color"] = "#3461eb";
	}
}

document.querySelector('#critRate').addEventListener('change', () => {
	updateDisplay();
});

let subclasses = [
	{
		value: "",
		text: "Dragonknight"
	},
	{
		value: "ardent",
		text: "Ardent Flame"
	},
	{
		value: "earthen",
		text: "Earthen Heart"
	},
	{
		value: "draconic",
		text: "Draconic Power"
	},
	{
		value: "",
		text: "Nightblade"
	},
	{
		value: "assassin",
		text: "Assassination"
	},
	{
		value: "siphon",
		text: "Siphoning"
	},
	{
		value: "shadow",
		text: "Shadow"
	},
	{
		value: "",
		text: "Templar"
	},
	{
		value: "dawn",
		text: "Dawn's Wrath"
	},
	{
		value: "aedric",
		text: "Aedric Spear"
	},
	{
		value: "restoring",
		text: "Restoring Light"
	},
	{
		value: "",
		text: "Sorcerer"
	},
	{
		value: "storm",
		text: "Storm Calling"
	},
	{
		value: "daedric",
		text: "Daedric Summoning"
	},
	{
		value: "dark",
		text: "Dark Magic"
	},
	{
		value: "",
		text: "Warden"
	},
	{
		value: "animal",
		text: "Animal Companions"
	},
	{
		value: "winter",
		text: "Winter's Embrace"
	},
	{
		value: "green",
		text: "Green Balance"
	},
	{
		value: "",
		text: "Necromancer"
	},
	{
		value: "grave",
		text: "Grave Lord"
	},
	{
		value: "bone",
		text: "Bone Tyrant"
	},
	{
		value: "living",
		text: "Living Death"
	},
	{
		value: "",
		text: "Arcanist"
	},
	{
		value: "herald",
		text: "Herald of the Tome"
	},
	{
		value: "soldier",
		text: "Soldier of Apocrypha"
	},
	{
		value: "curative",
		text: "Curative Runeforms"
	}

];

	/* MultiSelect taken from https://codeshack.io/multi-select-dropdown-html-javascript/ */
class MultiSelect {
	constructor(element, options = {}) {
		let defaults = {
			placeholder: '',
			max: null,
			search: true,
			selectAll: true,
			listAll: true,
			closeListOnItemSelect: false,
			name: '',
			width: '',
			height: '',
			dropdownWidth: '',
			dropdownHeight: '',
			data: [],
			onChange: function() {},
			onSelect: function() {},
			onUnselect: function() {},
		};
		this.options = Object.assign(defaults, options);
		this.selectElement = typeof element === 'string' ? document.querySelector(element) : element;
		for(const prop in this.selectElement.dataset) {
			if(this.options[prop] !== undefined) {
				this.options[prop] = this.selectElement.dataset[prop];
			}
		}
		this.name = this.selectElement.getAttribute('name') ? this.selectElement.getAttribute('name') : 'multi-select-' + Math.floor(Math.random() * 1000000);
		if(!this.options.data.length) {
			let options = this.selectElement.querySelectorAll('option');
			for(let i = 0; i < options.length; i++) {
				this.options.data.push({
					value: options[i].value,
					text: options[i].innerHTML,
					selected: options[i].selected,
					html: options[i].getAttribute('data-html')
				});
			}
		}
		this.element = this._template();
		this.selectElement.replaceWith(this.element);
		this._updateSelected();
		this._eventHandlers();
		updateDisplay();
	}
	_template() {
		let optionsHTML = '';
		for(let i = 0; i < this.data.length; i++) {
			if(this.data[i].value.length > 0) {
				optionsHTML += `
                      <div class="multi-select-option${this.selectedValues.includes(this.data[i].value) ? ' multi-select-selected' : ''}" data-value="${this.data[i].value}">
                          <span class="multi-select-option-radio"></span>
                          <span class="multi-select-option-text">${this.data[i].html ? this.data[i].html : this.data[i].text}</span>
                      </div>
				`;
			} else {
				optionsHTML += `
                      <div class="multi-select-option-disabled">
                          <span class="multi-select-option-disabled-text">${this.data[i].html ? this.data[i].html : this.data[i].text}</span>
                      </div>
				`;
			}
		}
		let selectAllHTML = '';
		if(this.options.selectAll === true || this.options.selectAll === 'true') {
			selectAllHTML = `<div class="multi-select-all"><span class="multi-select-option-radio"></span><span class="multi-select-option-text">Select all</span></div>`;
		}
		let template = `
                  <div class="multi-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ''} style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
			${this.selectedValues.map(value => `<input type="hidden" name="${this.name}[]" value="${value}">`).join('')}
                      <div class="multi-select-header" style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
                          <span class="multi-select-header-max">${this.options.max ? this.selectedValues.length + '/' + this.options.max + ' selected' : ''}</span>
                          <span class="multi-select-header-placeholder">${this.placeholder}</span>
                      </div>
                      <div class="multi-select-options" style="${this.options.dropdownWidth ? 'width:' + this.options.dropdownWidth + ';' : ''}${this.options.dropdownHeight ? 'height:' + this.options.dropdownHeight + ';' : ''}">
                          ${this.options.search === true || this.options.search === 'true' ? '<input type="text" class="multi-select-search" placeholder="Search...">' : ''}
                          ${selectAllHTML}
                          ${optionsHTML}
                      </div>
                  </div>
		`;
		let element = document.createElement('div');
		element.innerHTML = template;
		return element;
	}
	_eventHandlers() {
		let headerElement = this.element.querySelector('.multi-select-header');
		this.element.querySelectorAll('.multi-select-option').forEach(option => {
			option.onclick = () => {
				let selected = true;
				if(!option.classList.contains('multi-select-selected')) {
					if(this.options.max && this.selectedValues.length >= this.options.max) {
						return;
					}
					option.classList.add('multi-select-selected');
					if(this.options.listAll === true || this.options.listAll === 'true') {
						if(this.element.querySelector('.multi-select-header-option')) {
							let opt = Array.from(this.element.querySelectorAll('.multi-select-header-option')).pop();
							opt.insertAdjacentHTML('afterend', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
						} else {
							headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
						}
					}
					this.element.querySelector('.multi-select').insertAdjacentHTML('afterbegin', `<input type="hidden" name="${this.name}[]" value="${option.dataset.value}">`);
					this.data.filter(data => data.value == option.dataset.value)[0].selected = true;
				} else {
					option.classList.remove('multi-select-selected');
					this.element.querySelectorAll('.multi-select-header-option').forEach(headerOption => headerOption.dataset.value == option.dataset.value ? headerOption.remove() : '');
					this.element.querySelector(`input[value="${option.dataset.value}"]`).remove();
					this.data.filter(data => data.value == option.dataset.value)[0].selected = false;
					selected = false;
					if(critDamageValues.has(option.dataset.value)) {
						let toUpdate = critDamageValues.get(option.dataset.value);
						toUpdate.active = false;
						toUpdate.suppress = true;
						critDamageValues.set(option.dataset.value, toUpdate);
						document.getElementById(toUpdate.label).remove();
					}
				}
				if(this.options.listAll === false || this.options.listAll === 'false') {
					if(this.element.querySelector('.multi-select-header-option')) {
						this.element.querySelector('.multi-select-header-option').remove();
					}
					headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`);
				}
				if(!this.element.querySelector('.multi-select-header-option')) {
					headerElement.insertAdjacentHTML('afterbegin', `<span class="multi-select-header-placeholder">${this.placeholder}</span>`);
				} else if(this.element.querySelector('.multi-select-header-placeholder')) {
					this.element.querySelector('.multi-select-header-placeholder').remove();
				}
				if(this.options.max) {
					this.element.querySelector('.multi-select-header-max').innerHTML = this.selectedValues.length + '/' + this.options.max + ' selected';
				}
				if(this.options.search === true || this.options.search === 'true') {
					this.element.querySelector('.multi-select-search').value = '';
				}
				this.element.querySelectorAll('.multi-select-option').forEach(option => option.style.display = 'flex');
				if(this.options.closeListOnItemSelect === true || this.options.closeListOnItemSelect === 'true') {
					headerElement.classList.remove('multi-select-header-active');
				}
				this.options.onChange(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
				if(selected) {
					this.options.onSelect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
				} else {
					this.options.onUnselect(option.dataset.value, option.querySelector('.multi-select-option-text').innerHTML, option);
				}
				let baseCritDamage = document.getElementById("base");
				this.selectedValues.forEach(option => {
					if(critDamageValues.has(option)) {
						let toUpdate = critDamageValues.get(option);
						toUpdate.active = true;
						toUpdate.suppress = false;
						critDamageValues.set(option, toUpdate);
						if(!document.getElementById(toUpdate.label)) {
							setup(baseCritDamage, option, toUpdate);
						}
					}
				});
				updateDisplay();
			};
		});
		headerElement.onclick = () => headerElement.classList.toggle('multi-select-header-active');
		if(this.options.search === true || this.options.search === 'true') {
			let search = this.element.querySelector('.multi-select-search');
			search.oninput = () => {
				this.element.querySelectorAll('.multi-select-option').forEach(option => {
					option.style.display = option.querySelector('.multi-select-option-text').innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ? 'flex' : 'none';
				});
			};
		}
		if(this.options.selectAll === true || this.options.selectAll === 'true') {
			let selectAllButton = this.element.querySelector('.multi-select-all');
			selectAllButton.onclick = () => {
				let allSelected = selectAllButton.classList.contains('multi-select-selected');
				this.element.querySelectorAll('.multi-select-option').forEach(option => {
					let dataItem = this.data.find(data => data.value == option.dataset.value);
					if(dataItem && ((allSelected && dataItem.selected) || (!allSelected && !dataItem.selected))) {
						option.click();
					}
				});
				selectAllButton.classList.toggle('multi-select-selected');
			};
		}
		if(this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
			document.querySelector('label[for="' + this.selectElement.id + '"]').onclick = () => {
				headerElement.classList.toggle('multi-select-header-active');
			};
		}
		document.addEventListener('click', event => {
			if(!event.target.closest('.' + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
				headerElement.classList.remove('multi-select-header-active');
			}
		});
	}
	_updateSelected() {
		if(this.options.listAll === true || this.options.listAll === 'true') {
			this.element.querySelectorAll('.multi-select-option').forEach(option => {
				if(option.classList.contains('multi-select-selected')) {
					this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option" data-value="${option.dataset.value}">${option.querySelector('.multi-select-option-text').innerHTML}</span>`);
				}
			});
		} else {
			if(this.selectedValues.length > 0) {
				this.element.querySelector('.multi-select-header').insertAdjacentHTML('afterbegin', `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`);
			}
		}
		if(this.element.querySelector('.multi-select-header-option')) {
			this.element.querySelector('.multi-select-header-placeholder').remove();
		}
	}
	get selectedValues() {
		return this.data.filter(data => data.selected).map(data => data.value);
	}
	get selectedItems() {
		return this.data.filter(data => data.selected);
	}
	set data(value) {
		this.options.data = value;
	}
	get data() {
		return this.options.data;
	}
	set selectElement(value) {
		this.options.selectElement = value;
	}
	get selectElement() {
		return this.options.selectElement;
	}
	set element(value) {
		this.options.element = value;
	}
	get element() {
		return this.options.element;
	}
	set placeholder(value) {
		this.options.placeholder = value;
	}
	get placeholder() {
		return this.options.placeholder;
	}
	set name(value) {
		this.options.name = value;
	}
	get name() {
		return this.options.name;
	}
	set width(value) {
		this.options.width = value;
	}
	get width() {
		return this.options.width;
	}
	set height(value) {
		this.options.height = value;
	}
	get height() {
		return this.options.height;
	}
}
//document.querySelectorAll('[data-multi-select]').forEach(select => new MultiSelect(select));
new MultiSelect('#subclass', {
	data: subclasses,
	search: false,
	selectAll: false,
	listAll: true,
	height: 50,
	max: 3
});