async function generateShortLink() {
  let armor = "";
  armorValues.forEach((value, type) => {
    armor += value.quantity;
  })

  let crit = "";
  critDamageValues.forEach((value, type) => {
    crit += value.active ? "1" : "0";
    crit += value.quantity.toString(16);
  })

  let pen = "";
  penetrationValues.forEach((value, type) => {
    pen += value.active ? "1" : "0";
    pen += value.quantity.toString(16);
  })

  let subclass = [];
  document.querySelectorAll('.multi-select-option').forEach(option => {
    if(option.classList.contains('multi-select-selected')) {
      subclass.push(option.dataset.value);
    }
  });

  let calc = document.getElementById("critDamage").checked ? "c" : "p";
  let critRate = document.querySelector('#critRate').value;

  const enemyList = document.querySelectorAll("div.wrapper-dropdown li");
  const selectedEnemy = document.querySelector(".selected-display").innerHTML;
  let enemyIndex = 0;
  enemyList.forEach((enemy, index) => {
    if(enemy.innerHTML == selectedEnemy) {
      enemyIndex = index;
    }
  });

  const attributes = [subclass.join(), armor, crit, pen, critRate, calc, enemyIndex];
  const compressed = base64UrlEncode(await compress(attributes.join("_")));
  navigator.clipboard.writeText(window.location.href.split('?')[0] + "?pl=" + compressed);
  window.history.replaceState(null, null, "?pl=" + compressed);
}

async function processShortLink(str) {
  try {
    const decompressed = await decompress(base64UrlDecode(str));
    const attributes = decompressed.split("_");
    return attributes;
  } catch(e) {
    return [];
  }
}

const copyText = (e) => {
  //document.execCommand("copy");
  document.querySelector(".permalink").getElementById("icon1").setAttribute("fill", "#3461eb");
  document.querySelector(".permalink").getElementById("icon2").setAttribute("fill", "#3461eb");
  document.querySelector(".permalink").getElementById("icon3").setAttribute("fill", "#3461eb");
  generateShortLink();
  e.currentTarget.setAttribute("tooltip", "Copied!");
};

const resetTooltip = (e) => {
  e.currentTarget.setAttribute("tooltip", "Permalink");
};

const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));

const restart = (e) => {
  window.location = window.location.pathname;
}

document.getElementById("restart").addEventListener("click", (e) => restart(e));
