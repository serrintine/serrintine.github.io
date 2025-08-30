let dataSource = critDamageValues;
let subclasses = [];
let attributes = [];
let permalinkIssue = false;
let enemyArmor = 18200;
let date = new Date(1756513824304);
document.getElementById('time').innerHTML = date;
init();

function init() {
	let armor = [];
	let crit = [];
	let critQuantities = [];
	let pen = [];
	let penQuantities = [];
	let selected = [];

	const calcParams = new URLSearchParams(window.location.search);
	if(calcParams.size > 0) {
		attributes = processShortLink(calcParams.keys().next().value);
		if(attributes.length < 7) {
			permalinkIssue = true;
		} else {
			try {
				armor = attributes[1].split('');
				if(armor.length != armorValues.size) {
					permalinkIssue = true;
				}

				let critString = attributes[2].split('_');
				if(critString.length != 2) {
					permalinkIssue = true;
				} else {
					crit = parseInt(critString[0], 36).toString(2).split('');
					critQuantities = critString[1].split('');
					if(crit.length < critDamageValues.size) {
						permalinkIssue = true;
					}
				}

				let penString = attributes[3].split('_');
				if(penString.length != 2) {
					permalinkIssue = true;
				} else {
					pen = parseInt(penString[0], 36).toString(2).split('');
					penQuantities = penString[1].split('');
					if(pen.length < penetrationValues.size) {
						permalinkIssue = true;
					}
				}

				selected = attributes[0].split('');
				if(selected.length > 3) {
					permalinkIssue = true;
				}
			} catch(e) {
				permalinkIssue = true;
			}
		}
		document.querySelector(".permalink").getElementById("icon1").setAttribute("fill", "#3461eb");
		document.querySelector(".permalink").getElementById("icon2").setAttribute("fill", "#3461eb");
		document.querySelector(".permalink").getElementById("icon3").setAttribute("fill", "#3461eb");
	}

	if(permalinkIssue) {
		document.querySelector('.announcement').insertAdjacentHTML('afterend', '<h5 class="warning" id="permalinkIssue">Permalink corruption detected. All calculators have been reset to default states.<span class="x" id="dismissPermalinkIssue"></span></h5>');
		document.getElementById("dismissPermalinkIssue").addEventListener("click", () => document.getElementById('permalinkIssue').remove());
		classes.forEach((classConfig, className) => {
			subclasses.push({ "value": className, "text": classConfig.label, "isSection": true });
			classConfig.subclasses.forEach((subclass) => {
				subclasses.push({ "value": subclass.value, "text": subclass.text });
			});
		});
	} else {
		armor.forEach((value, index) => {
			let keys = Array.from(armorValues.keys());
			armorValues.get(keys[index]).quantity = Number(value);
		});

		let quantityIndex = 0;
		crit.forEach((value, index) => {
			if(updateValues(critDamageValues, index, value, critQuantities, quantityIndex, selected)) {
				quantityIndex++;
			}
		});

		quantityIndex = 0;
		pen.forEach((value, index) => {
			if(updateValues(penetrationValues, index, value, penQuantities, quantityIndex, selected)) {
				quantityIndex++;
			}
		});

		classes.forEach((classConfig, className) => {
			subclasses.push({ "value": className, "text": classConfig.label, "isSection": true });
			classConfig.subclasses.forEach((subclass) => {
				let code = classCodeMap[subclass.value];
				if(selected.includes(code)) {
					subclasses.push({ "value": subclass.value, "text": subclass.text, "selected": true });
				} else {
					subclasses.push({ "value": subclass.value, "text": subclass.text });
				}
			});
		});
	}

	setupCalcElements();
}

function updateValues(source, index, value, quantities, quantityIndex, selected) {
	let quantityUpdated = false;
	let keys = Array.from(source.keys());
	let toUpdate = source.get(keys[index]);
	toUpdate.active = value === "1" ? true : false;
	if(toUpdate.active) {
		if(toUpdate.hasRange) {
			toUpdate.quantity = parseInt(quantities[quantityIndex], 36);
			quantityUpdated = true;
		}
	}
	return quantityUpdated;
}

function setupCalcElements() {
	new MultiSelect('#subclass', {
		data: subclasses,
		search: true,
		selectAll: false,
		clearAll: true,
		listAll: true,
		height: 50,
		max: 3
	});

	document.querySelectorAll('[data-armor]').forEach(armor => armorValues.forEach((value, type) => setupArmor(armor, type, value)));
	document.querySelectorAll('[data-source]').forEach(source => {
		critDamageValues.forEach((damage, type) => setupCalc("crit-damage", source, type, damage));
		penetrationValues.forEach((damage, type) => setupCalc("penetration", source, type, damage));
	});
	document.querySelectorAll('input[type="radio"]').forEach(function(element) {
		element.addEventListener("change", calcCheck);
	});
	document.querySelector('#critRate').addEventListener('change', () => {
		updateDisplay();
	});

	let enemyIndex = 0;
	if (!permalinkIssue && attributes.length > 0) {
		enemyIndex = Number(attributes[6]);
		enemyIndex = isNaN(enemyIndex) || enemyIndex > 2 || enemyIndex < 0 ? 0 : enemyIndex;
		if(attributes[5] === "p") {
			document.getElementById("penetration").checked = true;
			document.getElementById("critDamage").checked = false;
		} else {
			document.getElementById("penetration").checked = false;
			document.getElementById("critDamage").checked = true;
		}
		let critRate = parseInt(attributes[4], 36);
		document.querySelector('#critRate').value = isNaN(critRate) || critRate > 100 || critRate < 0 ? 70 : critRate;
	} else if (!document.getElementById("critDamage").checked && !document.getElementById("penetration").checked) {
		document.getElementById("critDamage").checked = true;
	}

	setupEnemy(enemyIndex);
	addButtons();
	calcCheck();
}

function addButtons() {
	document.querySelectorAll(".number-input").forEach(function(element) {
		if(element.firstChild && element.firstChild.nodeName === "INPUT") {
			let buttonName = element.firstChild.name;
			if(element.classList.contains("enabled")) {
				element.insertAdjacentHTML('afterbegin', `<button name="${buttonName}Minus" type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>`);
				element.insertAdjacentHTML('beforeend', `<button name="${buttonName}Plus" type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" class="plus"></button>`);
			} else if(element.classList.contains("disabled")) {
				element.insertAdjacentHTML('afterbegin', `<button name="${buttonName}Minus" type="button" disabled></button>`);
				element.insertAdjacentHTML('beforeend', `<button name="${buttonName}Plus" type="button" class="plus" disabled></button>`);
			}
		}
	});
}

function setupArmor(armor, type, value) {
	if(armor.getAttribute('name') === type) {
		armor.insertAdjacentHTML('beforeend', `
				<div id="${value.label}" class="source">
				<div class="flex-container vertical">
				<label class="bold" for="${type}Armor">${value.label}</label>
				<div class="number-input enabled">
				<button name="${type}Minus" type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>
				<input class="quantity" min="${value.range[0]}" max="${value.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${value.quantity}" type="number" autocomplete="off" aria-label="${type}Armor">
				<button name="${type}Plus" type="button" onclick="stepUp(this.parentNode.querySelector('input[type=number]'))" class="plus"></button>
			</div>
			</div>
		</div>`);
		document.getElementById(type + "Quantity").addEventListener("change", armorCheck);
	}
}

function stepUp(element) {
	let armorSum = 0;
	armorValues.forEach((value, type) => armorSum += value.quantity);
	if(armorSum < 7) {
		element.stepUp();
		element.dispatchEvent(new Event('change'));
	}
}

function setupEnemy(index) {
	const element = document.querySelector(".wrapper-dropdown");
	const arrow = element.children[1]
	const optionsList = element.querySelectorAll("div.wrapper-dropdown li");
	element.querySelector(".selected-display").innerHTML = optionsList[index].innerHTML;
	enemyArmor = optionsList[index].dataset.value;

	element.addEventListener("click", () => {
		if(element.classList.contains("active")) {
			handleDropdown(element, arrow, false);
		} else {
			handleDropdown(element, arrow, true);
		}
	});

	for(let option of optionsList) {
		option.addEventListener("click", () => {
			element.querySelector(".selected-display").innerHTML = option.innerHTML;
			enemyArmor = option.dataset.value;
			updateDisplay();
		});
	}

	window.addEventListener("click", function (e) {
		if(e.target.closest(".wrapper-dropdown") === null) {
			handleDropdown(element, arrow, false);
		}
	});
}

function handleDropdown(dropdown, arrow, open) {
	if (open) {
		arrow.classList.add("rotated");
		dropdown.classList.add("active");
	} else {
		arrow.classList.remove("rotated");
		dropdown.classList.remove("active");
	}
}

function setupCalc(calcData, source, type, damage) {
	if(source.getAttribute('name') === damage.category && (damage.category != "base" || damage.active)) {
		let checkBox = `<input type="checkbox" class="${calcData}" name="${type}" id="${type}Check" autocomplete="off" aria-label="${type}Check"`;
		if (damage.active || damage.disabled) {
			checkBox += ` checked`;
		}
		if (damage.category === "base" || damage.disabled) {
			checkBox += ` disabled`;
		}
		checkBox += ` />`;
		if (damage.hasRange && !damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-${calcData}><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.quantity}" type="number" autocomplete="off" aria-label="${type}Check"></div><label for="${type}">${damage.label}</label></div><span name="${type}-${calcData}">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-${calcData}><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.quantity}" type="number" autocomplete="off" aria-label="${type}Check" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}-${calcData}">${damage.value}%</span></div>`);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-${calcData}><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.quantity}" max="${damage.quantity}" name="${type}QuantityDummy" name="${type}QuantityDummy" value="${damage.quantity}" type="number" autocomplete="off" aria-label="${type}Check" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}-${calcData}">${damage.value}%</span></div>`);
		}
		document.getElementById(type + "Check").addEventListener("click", displayCheck);
	}
}

function calcCheck(event) {
	if (document.getElementById("critDamage").checked) {
		dataSource = critDamageValues;
		document.querySelectorAll('[data-crit-damage]').forEach(element => element.style["display"] = "flex");
		document.querySelectorAll('[data-penetration]').forEach(element => element.style["display"] = "none");
		document.querySelector('[data-calc-sources]').innerHTML = "Crit Damage Sources";
		document.querySelector('[data-calc-result]').innerHTML = "Crit Damage";
		document.querySelector('[data-extra-option]').innerHTML = "Crit Rate";
		document.getElementById('critRateDiv').style["display"] = "flex";
		document.getElementById('enemyType').style["display"] = "none";
	} else if (document.getElementById("penetration").checked) {
		dataSource = penetrationValues;
		document.querySelectorAll('[data-crit-damage]').forEach(element => element.style["display"] = "none");
		document.querySelectorAll('[data-penetration]').forEach(element => element.style["display"] = "flex");
		document.querySelector('[data-calc-sources]').innerHTML = "Penetration Sources";
		document.querySelector('[data-calc-result]').innerHTML = "Penetration";
		document.querySelector('[data-extra-option]').innerHTML = "Enemy";
		document.getElementById('critRateDiv').style["display"] = "none";
		document.getElementById('enemyType').style["display"] = "inline-block";
	}
	updateDisplay();
}

function armorCheck(change) {
	let key = change.target.id.replace("Quantity", "");
	let newValue = change.target.valueAsNumber;
	armorValues.get(key).quantity = newValue;
	if (critDamageValues.has(key)) {
		critDamageValues.get(key).quantity = newValue;
		document.getElementById(key + "QuantityDummy").value = newValue;
		document.querySelector("#" + key + "Check").dispatchEvent(new Event('click'));
	}
	if (penetrationValues.has(key)) {
		penetrationValues.get(key).quantity = newValue;
		document.getElementById(key + "QuantityDummy").value = newValue;
		document.querySelector("#" + key + "Check").dispatchEvent(new Event('click'));
	}
}

function quantityCheck(change) {
	let key = change.target.id.replace("Quantity", "");
	dataSource.get(key).quantity = change.target.valueAsNumber;
	updateDisplay();
}

function displayCheck(option) {
	let toUpdate = dataSource.get(option.target.name);
	if (toUpdate) {
		if(option.target.checked) {
			toUpdate.active = true;
			let quantity = document.getElementById(option.target.name + "Quantity");
			if (quantity) {
				toUpdate.quantity = document.getElementById(option.target.name + "Quantity").value;
			}
		} else {
			toUpdate.active = false;
		}
		updateDisplay();
	}
}

function updateDisplay() {
	let missing = 0;
	let box1 = document.getElementById("displayResult");
	let box2 = document.getElementById("displayMissing");
	let box3 = document.getElementById("displayDamageLoss");
	let box4 = document.getElementById("displayCap");

	if (document.getElementById("critDamage").checked) {
		let critRate = Number(document.getElementById('critRate').value) / 100;
		let critDamage = 0;
		for(const [key, properties] of critDamageValues) {
			if (properties.category != "base" || properties.active) {
				let span = document.querySelector('[name="' + key + '-crit-damage"]');
				let total = properties.value * properties.quantity;
				if(properties.active) {
					critDamage += total;
					span.classList.add("blue");
				} else {
					span.classList.remove("blue");
				}
				span.innerHTML = total + '%';
			}
		}
		missing = 125 - critDamage;
		box1.value = critDamage + "%";
		box2.value = Math.abs(missing) + "%";
		box3.value = Math.max(0, Number((1 - (1 + critDamage / 100 * critRate) / (1 + 1.25 * critRate)) * 100).toFixed(2)) + "%";
		box4.value = 125 + "%";
	} else if (document.getElementById("penetration").checked) {
		let penetration = 0;
		for(const [key, properties] of penetrationValues) {
			if (properties.category != "base" || properties.active) {
				let span = document.querySelector('[name="' + key + '-penetration"]');
				let total = properties.value * properties.quantity;
				if(properties.active) {
					penetration += total;
					span.classList.add("blue");
				} else {
					span.classList.remove("blue");
				}
				span.innerHTML = total;
			}
		}
		missing = enemyArmor - penetration;
		box1.value = penetration;
		box2.value = Math.abs(missing);
		box3.value = Math.max(0, (missing / 500).toFixed(2)) + "%";
		box4.value = enemyArmor;
	}

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
		box1.style["color"] = "#20b044";
		box2.style["color"] = "#20b044";
		box3.style["color"] = "#20b044";
	} 
}