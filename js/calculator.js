document.querySelectorAll('[data-armor]').forEach(armor => armorValues.forEach((value, type) => setupArmor(armor, type, value)));

document.querySelectorAll('input[type="radio"]').forEach(function(element) {
	element.addEventListener("click", calcCheck);
});

if (document.getElementById("critDamage").checked) {
	document.querySelectorAll('[data-source]').forEach(source => critDamageValues.forEach((damage, type) => setupCritCalc(source, type, damage)));
	addButtons();
	updateDisplay();
}

if (document.getElementById("penetration").checked) {
	document.querySelector('[data-calc-sources]').innerHTML = "Penetration Sources";
	document.querySelector('[data-calc-result]').innerHTML = "Penetration";
	document.querySelectorAll('[data-source]').forEach(source => penetrationValues.forEach((damage, type) => setupPenCalc(source, type, damage)));
	addButtons();
	updateDisplay();
}

function calcCheck(event) {
	window.location.reload();
}

function setupArmor(armor, type, value) {
	if(armor.getAttribute('name') === type) {
		armor.insertAdjacentHTML('beforeend', `
				<div id="${value.label}" class="source">
				<div class="flex-container vertical">
				<label class="bold" for="${type}Armor">${value.label}</label>
				<div class="number-input enabled">
				<button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown();this.parentNode.querySelector('input[type=number]').dispatchEvent(new Event('change'))" ></button>
				<input class="quantity bg-light" min="${value.range[0]}" max="${value.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${value.default}" type="number" autocomplete="off">
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
	let toUpdate = armorValues.get(key);
	toUpdate.quantity = newValue;
	armorValues.set(key, toUpdate);
	if (critDamageValues.has(key)) {
		let toChange = critDamageValues.get(key);
		toChange.quantity = newValue;
		critDamageValues.set(key, toChange);
		document.getElementById(key + "QuantityDummy").value = newValue;
		document.querySelector("#" + key + "Check").dispatchEvent(new Event('click'))
		updateDisplay();
	} else if (penetrationValues.has(key)) {
		let toChange = penetrationValues.get(key);
		toChange.quantity = newValue;
		penetrationValues.set(key, toChange);
		document.getElementById(key + "QuantityDummy").value = newValue;
		document.querySelector("#" + key + "Check").dispatchEvent(new Event('click'))
		updateDisplay();
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
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.default}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity bg-light" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
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
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.default}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}</span></div>`);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity bg-light" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}</span></div>`);
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
	if (document.getElementById("penetration").checked) {
			let toUpdate = penetrationValues.get(option.target.name);
	if(option.target.checked) {
		toUpdate.active = true;
		let quantity = document.getElementById(option.target.name + "Quantity");
		if (quantity) {
			toUpdate.quantity = document.getElementById(option.target.name + "Quantity").value;
		}
	} else {
		toUpdate.active = false;
	}
	penetrationValues.set(option.target.name, toUpdate);
	} else if (document.getElementById("critDamage").checked) {
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
}
	updateDisplay();
}

function quantityCheck(change) {
	console.log(change)
	if (document.getElementById("penetration").checked) {
		let key = change.target.id.replace("Quantity", "");
	let toUpdate = penetrationValues.get(key);
	toUpdate.quantity = change.target.valueAsNumber;
	penetrationValues.set(key, toUpdate);
	} else if (document.getElementById("critDamage").checked) {
	let key = change.target.id.replace("Quantity", "");
	let toUpdate = critDamageValues.get(key);
	toUpdate.quantity = change.target.valueAsNumber;
	critDamageValues.set(key, toUpdate);
}
	updateDisplay();
}

function updateDisplay() {
	if (document.getElementById("critDamage").checked) {
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
		} else {
			if(span) {
				span.classList.remove("green");
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
} else if (document.getElementById("penetration").checked) {
	let penetration = 0;
	for(const [key, properties] of penetrationValues) {
		let span = document.querySelector('[name="' + key + 'Value"]');
		let label = document.querySelector('[for="' + key + '"]');
		let total = properties.value * properties.quantity;
		if(properties.active) {
			penetration += total;
			if(span) {
				span.classList.add("green");
			}
		} else {
			if(span) {
				span.classList.remove("green");
			}
		}
		if(span) {
			span.innerHTML = total;
		}
	}
	let missing = 18200 - penetration;
	let box1 = document.getElementById("displayCritDamage");
	box1.value = penetration;
	let box2 = document.getElementById("displayMissing");
	box2.value = Math.abs(missing);
	let box3 = document.getElementById("displayDamageLoss");
	box3.value = Math.max(0, (missing / 500).toFixed(2)) + "%";
	let box4 = document.getElementById("critCap");
	box4.value = 18200;
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
}

document.querySelector('#critRate').addEventListener('change', () => {
	updateDisplay();
});