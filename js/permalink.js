function base64UrlEncode(str) {
  const utf8Arr = new TextEncoder().encode(str);
  const base64Encoded = btoa(String.fromCharCode(...utf8Arr));
  return base64Encoded
    .replace(/\+/g, '-') // Replace '+' with '-'
    .replace(/\//g, '_') // Replace '/' with '_'
    .replace(/=+$/, ''); // Remove trailing '='
}

function base64UrlDecode(str) {
  let base64Encoded = str
    .replace(/-/g, '+') // Replace '-' with '+'
    .replace(/_/g, '/'); // Replace '_' with '/'
  while (base64Encoded.length % 4) {
    base64Encoded += '='; // Add back padding '='
  }
  const decodedBinary = atob(base64Encoded);
  const utf8Arr = new Uint8Array(decodedBinary.split('').map(char => char.charCodeAt(0)));
  return new TextDecoder().decode(utf8Arr);
}

function generateShortLink() {
  let armor = "";
  armorValues.forEach((value, type) => {
    armor += value.quantity;
  })

  let crit = "";
  let critQuantities = "";
  critDamageValues.forEach((value, type) => {
    crit += value.active ? "1" : "0";
    if (value.active && value.hasRange) {
      critQuantities += Number(value.quantity).toString(36);
    }
  })

  let pen = "";
  let penQuantities = "";
  penetrationValues.forEach((value, type) => {
    pen += value.active ? "1" : "0";
    if (value.active && value.hasRange) {
      penQuantities += Number(value.quantity).toString(36);
    }
  })

  let subclass = [];
  document.querySelectorAll('.multi-select-option').forEach(option => {
    if(option.classList.contains('multi-select-selected')) {
      subclass.push(classCodeMap[option.dataset.value]);
    }
  });

  let calc = document.getElementById("critDamage").checked ? "c" : "p";
  let critRate = Number(document.querySelector('#critRate').value);
  critRate = isNaN(critRate) ? 70 : critRate;

  const enemyList = document.querySelectorAll("div.wrapper-dropdown li");
  const selectedEnemy = document.querySelector(".selected-display").innerHTML;
  let enemyIndex = 0;
  enemyList.forEach((enemy, index) => {
    if(enemy.innerHTML == selectedEnemy) {
      enemyIndex = index;
    }
  });

  const attributes = [
    subclass.join(""), armor,
    parseInt(crit, 2).toString(36) + "_" + critQuantities,
    parseInt(pen, 2).toString(36) + "_" + penQuantities,
    critRate.toString(36),
    calc,
    enemyIndex
  ];
  console.log("compressed: " + attributes.join("."))
  const encoded = base64UrlEncode(attributes.join("."));
  console.log("encoded: " + encoded)

  navigator.clipboard.writeText(window.location.href.split('?')[0] + "?" + encoded);
  window.history.replaceState(null, null, "?" + encoded);
}

function processShortLink(str) {
  try {
    const decoded = base64UrlDecode(str);
    console.log("decoded: " + decoded)
    return decoded.split(".");
  } catch(e) {
    return [];
  }
}

const copyText = (e) => {
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
document.getElementById("restart").addEventListener("click", () => window.location = window.location.pathname);