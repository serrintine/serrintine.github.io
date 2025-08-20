let dataSource = critDamageValues;

document.querySelectorAll('[data-armor]').forEach(armor => armorValues.forEach((value, type) => setupArmor(armor, type, value)));
document.querySelectorAll('[data-source]').forEach(source => critDamageValues.forEach((damage, type) => setupCritCalc(source, type, damage)));
document.querySelectorAll('[data-source]').forEach(source => penetrationValues.forEach((damage, type) => setupPenCalc(source, type, damage)));

document.querySelectorAll('input[type="radio"]').forEach(function(element) {
	element.addEventListener("change", calcCheck);
});
document.querySelector('#critRate').addEventListener('change', () => {
	updateDisplay();
});

addButtons();
if (!document.getElementById("critDamage").checked && !document.getElementById("penetration").checked) {
	document.getElementById("critDamage").checked = true;
	document.getElementById("critDamage").dispatchEvent(new Event('change'))
} else {
	calcCheck();
}

function calcCheck(event) {
	if (document.getElementById("critDamage").checked) {
		dataSource = critDamageValues;
		document.querySelectorAll('[data-crit-damage]').forEach(element => element.style["display"] = "flex");
		document.querySelectorAll('[data-penetration]').forEach(element => element.style["display"] = "none");
		document.querySelector('[data-calc-sources]').innerHTML = "Crit Damage Sources";
		document.querySelector('[data-calc-result]').innerHTML = "Crit Damage";
	} else if (document.getElementById("penetration").checked) {
		dataSource = penetrationValues;
		document.querySelectorAll('[data-crit-damage]').forEach(element => element.style["display"] = "none");
		document.querySelectorAll('[data-penetration]').forEach(element => element.style["display"] = "flex");
		document.querySelector('[data-calc-sources]').innerHTML = "Penetration Sources";
		document.querySelector('[data-calc-result]').innerHTML = "Penetration";
	}
	updateDisplay();
}

function setupArmor(armor, type, value) {
	if(armor.getAttribute('name') === type) {
		armor.insertAdjacentHTML('beforeend', `
				<div id="${value.label}" class="source">
				<div class="flex-container vertical">
				<label class="bold" for="${type}Armor">${value.label}</label>
				<div class="number-input enabled">
				<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>
				<input class="quantity" min="${value.range[0]}" max="${value.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${value.default}" type="number" autocomplete="off">
				<button type="button" onclick="stepUp(this.parentNode.querySelector('input[type=number]'))" class="plus"></button>
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
		element.dispatchEvent(new Event('change'))
	}
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

function setupCritCalc(source, type, damage) {
	if(source.getAttribute('name') === damage.category && !damage.suppress) {
		let checkBox = `<input type="checkbox" class="critDamageSource" name="${type}" id="${type}Check" autocomplete="off"`;
		if (damage.active || damage.disabled) {
			checkBox += ` checked`;
		}
		if (damage.category === "base" || damage.disabled) {
			checkBox += ` disabled`;
		}
		checkBox += ` />`;
		if (damage.hasRange && !damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-crit-damage><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}CritValue">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-crit-damage><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.default}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}CritValue">${damage.value}%</span></div>`);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-crit-damage><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}CritValue">${damage.value}%</span></div>`);
		}
		document.getElementById(type + "Check").addEventListener("click", displayCheck);
	}
}

function setupPenCalc(source, type, damage) {
	if(source.getAttribute('name') === damage.category && !damage.suppress) {
		let checkBox = `<input type="checkbox" class="penetrationSource" name="${type}" id="${type}Check" autocomplete="off"`;
		if (damage.active || damage.disabled) {
			checkBox += ` checked`;
		}
		if (damage.category === "base" || damage.disabled) {
			checkBox += ` disabled`;
		}
		checkBox += ` />`;
		if (damage.hasRange && !damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-penetration><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}PenValue">${damage.value}</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-penetration><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.default}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}PenValue">${damage.value}</span></div>`);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-penetration><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}PenValue">${damage.value}</span></div>`);
		}
		document.getElementById(type + "Check").addEventListener("click", displayCheck);
	}
}

function addButtons() {
	document.querySelectorAll(".number-input.enabled").forEach(function(element) {
		if (element.firstChild && element.firstChild.nodeName === "INPUT") {
			element.insertAdjacentHTML('afterbegin', `<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>`);
			element.insertAdjacentHTML('beforeend', `<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" class="plus"></button>`);
		}
	});
	document.querySelectorAll(".number-input.disabled").forEach(function(element) {
		if (element.firstChild && element.firstChild.nodeName === "INPUT") {
			element.insertAdjacentHTML('afterbegin', `<button type="button" disabled></button>`);
			element.insertAdjacentHTML('beforeend', `<button type="button" class="plus" disabled></button>`);
		}
	});
}

function displayCheck(option) {
	let toUpdate = dataSource.get(option.target.name);
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

function quantityCheck(change) {
	let key = change.target.id.replace("Quantity", "");
	dataSource.get(key).quantity = change.target.valueAsNumber;
	updateDisplay();
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
			if (!properties.suppress) {
				let span = document.querySelector('[name="' + key + 'CritValue"]');
				let total = properties.value * properties.quantity;
				if(properties.active) {
					critDamage += total;
					span.classList.add("green");
				} else {
					span.classList.remove("green");
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
			if (!properties.suppress) {
				let span = document.querySelector('[name="' + key + 'PenValue"]');
				let total = properties.value * properties.quantity;
				if(properties.active) {
					penetration += total;
					span.classList.add("green");
				} else {
					span.classList.remove("green");
				}
				span.innerHTML = total;
			}
		}
		missing = 18200 - penetration;
		box1.value = penetration;
		box2.value = Math.abs(missing);
		box3.value = Math.max(0, (missing / 500).toFixed(2)) + "%";
		box4.value = 18200;
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
		box1.style["color"] = "#3461eb";
		box2.style["color"] = "#3461eb";
		box3.style["color"] = "#3461eb";
	} 
}