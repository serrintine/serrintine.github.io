let dataSource = critDamageValues;
let subclasses = [];
let permalinkIssue = false;
let dataIssue = false;
init();

function init() {
	let armor = [];
	let crit = [];
	let pen = [];
	let selected = new Set([]);

	const calcParams = new URLSearchParams(window.location.search);
	if(calcParams.size > 0) {
		document.querySelector(".permalink").getElementById("icon1").setAttribute("fill", "#3461eb");
		document.querySelector(".permalink").getElementById("icon2").setAttribute("fill", "#3461eb");
		document.querySelector(".permalink").getElementById("icon3").setAttribute("fill", "#3461eb");

		if(calcParams.has("a")) {
			armor = calcParams.get("a").split('');
			if(armor.length != armorValues.size) {
				permalinkIssue = true;
			}
		} else {
			permalinkIssue = true;
		}
		if(calcParams.has("c")) {
			let str = calcParams.get("c");
			if(str.length != critDamageValues.size * 2) {
				permalinkIssue = true;
			} else {
				crit = str.match(/.{1,2}/g);
			}
		} else {
			permalinkIssue = true;
		}
		if(calcParams.has("p")) {
			let str = calcParams.get("p");
			if(str.length != penetrationValues.size * 2) {
				permalinkIssue = true;
			} else {
				pen = str.match(/.{1,2}/g);
			}
		} else {
			permalinkIssue = true;
		}
		if(calcParams.has("s")) {
			let set = new Set(JSON.parse(calcParams.get("s")));
			if(set.size > 3) {
				permalinkIssue = true;
			} else {
				selected = set;
			}
		} else {
			permalinkIssue = true;
		}
	}

	if(permalinkIssue) {
		document.querySelector('.announcement').insertAdjacentHTML('afterend', '<h5 class="warning" id="permalinkIssue">Permalink corruption detected. All calculators have been reverted to default states.<span class="x" id="dismissPermalinkIssue"></span></h5>');
		document.getElementById("dismissPermalinkIssue").addEventListener("click", () => document.getElementById('permalinkIssue').remove());

		classes.forEach((classConfig, className) => {
			subclasses.push({ "value": className, "text": classConfig.label, "isSection": true });
			classConfig.subclasses.forEach((subclass) => {
				subclasses.push({ "value": subclass.value, "text": subclass.text });
			});
		});
	} else {
		let sum = 0;
		for(val of armor) {
			let num = parseInt(val, 16);
			if(isNaN(num)) {
				dataIssue = true;
			} else {
				sum += num;
			}
		}
		if(sum > 7) {
			dataIssue = true;
		} else if(!dataIssue) {
			armor.forEach((value, index) => {
				let keys = Array.from(armorValues.keys());
				armorValues.get(keys[index]).quantity = Number(value);
			});
		}

		crit.forEach((value, index) => {
			let keys = Array.from(critDamageValues.keys());
			let toUpdate = critDamageValues.get(keys[index]);
			let active = value.substring(0, 1);
			let quantity = parseInt(value.substring(1, 2), 16);
			let checkArmor = armorValues.has(keys[index]) ? armorValues.get(keys[index]).quantity : quantity;
			if(!/^[01]$/.test(active) || isNaN(quantity) || quantity != checkArmor || (!toUpdate.hasRange && quantity != toUpdate.quantity) || (toUpdate.hasRange && (quantity < toUpdate.range[0] || quantity > toUpdate.range[1]))) {
				dataIssue = true;
			} else {
				toUpdate.active = active === "1" ? true : false;
				toUpdate.quantity = quantity;
				if(toUpdate.active && selected.has(keys[index])) {
					toUpdate.suppress = false;
				}
			}
		});

		pen.forEach((value, index) => {
			let keys = Array.from(penetrationValues.keys());
			let toUpdate = penetrationValues.get(keys[index]);
			let active = value.substring(0, 1);
			let quantity = parseInt(value.substring(1, 2), 16);
			let checkArmor = armorValues.has(keys[index]) ? armorValues.get(keys[index]).quantity : quantity;
			if(!/^[01]$/.test(active) || isNaN(quantity) || quantity != checkArmor || (!toUpdate.hasRange && quantity != toUpdate.quantity) || (toUpdate.hasRange && (quantity < toUpdate.range[0] || quantity > toUpdate.range[1]))) {
				dataIssue = true;
				console.log(keys[index]);
				console.log((!toUpdate.hasRange && quantity != toUpdate.quantity))
				console.log((toUpdate.hasRange && (quantity < toUpdate.range[0] || quantity > toUpdate.range[1])))
			} else {
				toUpdate.active = active === "1" ? true : false;
				toUpdate.quantity = quantity;
				if(toUpdate.active && selected.has(keys[index])) {
					toUpdate.suppress = false;
				}
			}
		});

		classes.forEach((classConfig, className) => {
			subclasses.push({ "value": className, "text": classConfig.label, "isSection": true });
			classConfig.subclasses.forEach((subclass) => {
				if(selected.has(subclass.value)) {
					subclasses.push({ "value": subclass.value, "text": subclass.text, "selected": true });
					selected.delete(subclass.value);
				} else {
					subclasses.push({ "value": subclass.value, "text": subclass.text });
				}
			});
		});
		if(selected.size > 0) {
			dataIssue = true;
		}

		if(dataIssue) {
			document.querySelector('.announcement').insertAdjacentHTML('afterend', '<h5 class="warning" id="dataIssue">Permalink corruption detected. Attempted to use defaults where possible. <br /> Calculator states may not be accurate.<span class="x" id="dismissDataIssue"></span></h5>');
			document.getElementById("dismissDataIssue").addEventListener("click", () => document.getElementById('dataIssue').remove());
		}
	}

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
	document.querySelectorAll('[data-source]').forEach(source => critDamageValues.forEach((damage, type) => setupCritCalc(source, type, damage)));
	document.querySelectorAll('[data-source]').forEach(source => penetrationValues.forEach((damage, type) => setupPenCalc(source, type, damage)));
	document.querySelectorAll('input[type="radio"]').forEach(function(element) {
		element.addEventListener("change", calcCheck);
	});
	document.querySelector('#critRate').addEventListener('change', () => {
		updateDisplay();
	});
	
	addButtons();

	if(calcParams.has("r")) {
		let calc = calcParams.get("r");
		if(calc === "p") {
			document.getElementById("penetration").checked = true;
			document.getElementById("penetration").dispatchEvent(new Event('change'));
		} else {
			document.getElementById("critDamage").checked = true;
			document.getElementById("critDamage").dispatchEvent(new Event('change'));
		}
	} else if (!document.getElementById("critDamage").checked && !document.getElementById("penetration").checked) {
		document.getElementById("critDamage").checked = true;
		document.getElementById("critDamage").dispatchEvent(new Event('change'));
	} else {
		calcCheck();
	}
	if(calcParams.has("v")) {
		let critRate = Number(calcParams.get("v"));
		if(!isNaN(critRate) && critRate >=0 && critRate <=100) {
			document.querySelector('#critRate').value = critRate;
			document.querySelector('#critRate').dispatchEvent(new Event('change'));
		}
	}
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
				<input class="quantity" min="${value.range[0]}" max="${value.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${value.quantity}" type="number" autocomplete="off">
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
	console.log(armorSum)
	if(armorSum < 7) {
		element.stepUp();
		element.dispatchEvent(new Event('change'));
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
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-crit-damage><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.quantity}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}CritValue">${damage.value}%</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-crit-damage><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.quantity}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}CritValue">${damage.value}%</span></div>`);
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
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-penetration><div class="flex-container medium">` + checkBox + `<div class="number-input enabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}Quantity" id="${type}Quantity" value="${damage.quantity}" type="number" autocomplete="off"></div><label for="${type}">${damage.label}</label></div><span name="${type}PenValue">${damage.value}</span></div>`);
			document.getElementById(type + "Quantity").addEventListener("change", quantityCheck);
		} else if (damage.hasRange && damage.disabled) {
			source.insertAdjacentHTML('beforeend', `<div id="${damage.label}" class="source" data-penetration><div class="flex-container medium">` + checkBox + `<div class="number-input disabled"><input class="quantity" min="${damage.range[0]}" max="${damage.range[1]}" name="${type}QuantityDummy" id="${type}QuantityDummy" value="${damage.quantity}" type="number" autocomplete="off" disabled></div><label for="${type}">${damage.label}</label></div><span name="${type}PenValue">${damage.value}</span></div>`);
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
			if (!properties.suppress) {
				let span = document.querySelector('[name="' + key + 'PenValue"]');
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
		box1.style["color"] = "#20b044";
		box2.style["color"] = "#20b044";
		box3.style["color"] = "#20b044";
	} 
}
