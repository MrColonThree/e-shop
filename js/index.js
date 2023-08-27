let count = 0;
let totalPrice = 0;
let discount = 0;
let total = 0;
let selectedItemPrices = [];
let discountApplied = false;
let applyButtonUsed = false;
let itemsMap = new Map();
const selectedItems = document.getElementById("selected-items");
const applyButton = document.getElementById("btn-apply");
const purchaseButton = document.getElementById("btn-purchase");

function clickedItem(target) {
  const clickedItemName = target.childNodes[5].innerText;
  if (!heading.classList.contains("items")) {
    const heading1 = document.createElement("h4");
    const heading2 = document.createElement("h4");
    heading1.innerText = "Items";
    heading2.innerText = "Quantity";
    heading.appendChild(heading1);
    heading.appendChild(heading2);
    heading.classList.add("items");
  }
  if (itemsMap.has(clickedItemName)) {
    const quantity = itemsMap.get(clickedItemName) + 1;
    itemsMap.set(clickedItemName, quantity);
    updateSelectedItem(clickedItemName, quantity);
  } else {
    itemsMap.set(clickedItemName, 1);
    addItemToList(clickedItemName);
  }
  const price = parseFloat(target.childNodes[7].innerText.split(" ")[0]);
  selectedItemPrices.push(price);

  updateTotalPrice();
  applyButtonCondition();
  purchaseButtonCondition();
}

function addItemToList(itemName) {
  const li = document.createElement("li");
  li.innerText = `${count + 1}. ${itemName}`;
  count++;
  li.classList.add("list-none");
  li.classList.add("items");
  selectedItems.appendChild(li);
  const serial = document.createElement("p");
  serial.innerText = "1"; // Initial quantity is 1
  li.appendChild(serial);
}

function updateSelectedItem(itemName, quantity) {
  const items = document.querySelectorAll(".items");
  items.forEach(item => {
    if (item.innerText.includes(itemName)) {
      const quantityElement = item.querySelector("p");
      quantityElement.innerText = quantity.toString();
    }
  });
}

function updateTotalPrice() {
  totalPrice = selectedItemPrices.reduce((sum, price) => sum + price, 0);
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);

  if (discountApplied) {
    updateDiscountAndTotal();
  } else {
    total = totalPrice;
    document.getElementById("total").innerText = total.toFixed(2);
  }
}

function updateDiscountAndTotal() {
  discount = totalPrice * (20 / 100);
  document.getElementById("discount").innerText = discount.toFixed(2);

  total = totalPrice - discount;
  document.getElementById("total").innerText = total.toFixed(2);
}

function applyButtonCondition() {
  if (totalPrice >= 200) {
    applyButton.removeAttribute("disabled");
    applyButton.style.backgroundColor = "#e527b2";
  } else {
    applyButton.setAttribute("disabled", true);
    applyButton.style.backgroundColor = "";
  }
}

document
  .getElementById("coupon")
  .addEventListener("input", applyButtonCondition);

function clickApplyButton() {
  const coupon = document.getElementById("coupon").value;
  if (coupon !== "SELL200") {
    alert("Invalid coupon!");
    document.getElementById("coupon").value = "";
  } else {
    discountApplied = true;
    updateDiscountAndTotal();
    applyButtonUsed = true;
    applyButton.setAttribute("disabled", true);
    applyButton.style.backgroundColor = "";
  }
}

function purchaseButtonCondition() {
  if (totalPrice > 0) {
    purchaseButton.removeAttribute("disabled");
    purchaseButton.style.backgroundColor = "#e527b2";
  } else {
    purchaseButton.setAttribute("disabled", true);
    purchaseButton.style.backgroundColor = "";
  }
}

function resetAllValue() {
  document.getElementById("coupon").value = "";
  document.getElementById("total-price").innerText = "00";
  document.getElementById("discount").innerText = "00";
  document.getElementById("total").innerText = "00";
  selectedItems.innerHTML = "";
  count = 0;
  totalPrice = 0;
  discount = 0;
  total = 0;
  selectedItemPrices = [];
  discountApplied = false;
  applyButtonUsed = false;
  itemsMap.clear(); // Clear the itemsMap

  applyButton.setAttribute("disabled", true);
  applyButton.style.backgroundColor = "";

  purchaseButton.setAttribute("disabled", true);
  purchaseButton.style.backgroundColor = "";

   // Clear the 'items' class and heading content
   const heading = document.getElementById('heading');
   heading.classList.remove("items");
   heading.innerHTML = "";

  window.location.href = "#home";
}

applyButton.addEventListener("click", clickApplyButton);
applyButtonCondition(); // Initialize apply button state
updateTotalPrice();
