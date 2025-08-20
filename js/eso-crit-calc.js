//document.querySelectorAll('[data-armor]').forEach(armor => armorValues.forEach((value, type) => setupArmor(armor, type, value)));
document.querySelectorAll('[data-source]').forEach(source => critDamageValues.forEach((damage, type) => setupCritCalc(source, type, damage)));

function setupArmor(armor, type, value) {
	console.log(armor)
	console.log(type)
	console.log(value)
	if(armor.getAttribute('name') === type) {
			armor.insertAdjacentHTML('beforeend', `<div id="${value.label}" class="source"><div class="flex-container vertical"><label for="${type}">${value.label}</label><div class="number-input enabled"><input class="quantity bg-light" min="${value.range[0]}" max="${value.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${value.default}" type="number" autocomplete="off"></div></div></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", armorCheck);
		}
}

function armorCheck(change) {
	let key = change.target.id.replace("Quantity", "");
	let sum = 0;
	document.querySelectorAll('[data-armor]').forEach(armor => sum += armorValues.get(key).quantity);
  let newValue = change.target.valueAsNumber;
  if (sum + newValue > 7) return;
	let toUpdate = armorValues.get(key);
	toUpdate.quantity = newValue;
	armorValues.set(key, toUpdate);
	//updateDisplay();
}

function setupCritCalc(source, type, damage) {
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
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity bg-light" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.default}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source"><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity bg-light" min="1" max="1" name="dummy" id="dummy" value="1" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}Value">${damage.value}%</span></div>`);
		}
		document.getElementById(type + "Check").addEventListener("click", displayCheck);
	}
}

addButtons();

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