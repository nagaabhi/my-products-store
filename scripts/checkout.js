import { cart, addToStorage, removeItemFromCart } from "../data/cart.js";
import { products } from "../data/productsData.js";


const showErrorMessage = document.querySelector('.now-products-found-warning-msg');
const subTotalValue = document.querySelector('.sub-total-value');
const taxValue = document.querySelector('.tax-value');
const totalPriceValue = document.querySelector('.total-price');


let subTotal = 0;
let totalValue = 0;
let tax = 0;
let extraCartValue = 1;

let cartProductsHTML = '';

cart.forEach((cartItem) => {
  const cartItemPrdId = cartItem.productId;
  let matching;
  products.forEach((product) => {
    if (cartItemPrdId === product.id) {
      matching = product;
    }
  })

  subTotal += (matching.discountPrice * cartItem.quantity);
  console.log(typeof subTotal);
  totalValue += (subTotal + matching.taxValue);
  tax += matching.taxValue;
  subTotalValue.innerHTML = subTotal.toFixed(2);
  taxValue.innerHTML = tax;
  totalPriceValue.innerHTML = totalValue.toFixed(2);

  cartProductsHTML += `<div class="cart-content-information js-cart-container js-remove-cart-item-${matching.id}">
        <div class="cart-product-type">${matching.type}</div>

        <div class="cart-product-image">
          <img src="${matching.image}" alt="" />
        </div>

        <div class="cart-product-name">
          ${matching.name}
        </div>

        <div class="cart-product-price">&#8377;${(matching.discountPrice * cartItem.quantity * extraCartValue).toFixed(2)}</div>

        <div class="update-cart-products">
          <button class="js-increment-button">+</button>
          <span class="js-display-value">0</span>
          <button class="js-decrement-button">-</button>
        </div>

        <div class="remove-cart-product">
          <button class="js-remove-button" data-product-id="${matching.id}">remove</button>
        </div>
      </div>`;
})

document.querySelector('.js-cart-products').innerHTML = cartProductsHTML;



document.querySelectorAll('.js-remove-button').forEach((removeButton, idx) => {
  removeButton.addEventListener('click', () => {
    const productId = removeButton.dataset.productId;
    removeItemFromCart(productId);

    const cartItemContainer = document.querySelector(`.js-remove-cart-item-${productId}`);
    cartItemContainer.remove();
    location.reload();

    if (cart.length === 0) {
      showErrorMessage.classList.add('show-err-msg');
    }
    addToStorage();
  })

})

document.querySelectorAll('.js-cart-container').forEach((cartContainer) => {
  const incrementButton = cartContainer.querySelector('.js-increment-button');
  const decrementButton = cartContainer.querySelector('.js-increment-button');
  const displayCartValue = cartContainer.querySelector('.js-display-value');

  incrementButton.addEventListener('click', () => {
    console.log("Clicked...")
    extraCartValue += 1;
    displayCartValue.innerHTML = extraCartValue
    console.log(extraCartValue)
  })




})




