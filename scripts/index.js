import { products } from "../data/productsData.js";
import { cart, addToCart, addToStorage } from "../data/cart.js";
// import { updateCartCount } from "./checkout.js";



const showPopUpMessage = document.querySelector('.js-show-pop-up-message');
const hamburgerElement = document.querySelector('.hamburger');
hamburgerElement.addEventListener('click', () => {
  toggleMenu();


})
  function toggleMenu() {
    document.querySelector('.navbar-right').classList.toggle('active');
  }

let productsHTML = '';
products.forEach((product) => {

  productsHTML += ` <div class="products-container-details">
          <div class="products-type">${product.type}</div>

          <div class="product-image">
            <img src="${product.image}" alt="" />
          </div>

          <div class="product-name">${product.name}</div>
          <div class="product-ratings">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>

          <div class="product-details">
            ${product.description}
            
          </div>

          <div class="product-price-duttribution">
            <div class="discount-price">&#8377;${product.discountPrice}</div>

            <div class="product-original-price">&#8377;${product.originalPrice}</div>
          </div>

          <div class="total-stocks-avialable">
            Total Stocks Available : <span>${product.totalStock}</span>
          </div>

          <div class="quantity-check">
            <div class="quantity">Quantity(Pieces)</div>

            <div class="quantity-hike-buttons">
              <button class="js-increment" data-product-id="${product.id}">+</button>
              <span class="js-display-count">0</span>
              <button class="js-decrement">-</button>
            </div>

            
          </div>
          <div class="add-to-cart-button">
              <button class="js-add-to-cart-button" data-product-id="${product.id}"> 
                <i style="font-size: 19px" class="fa">&#xf07a;</i>
                <span>Add To Cart</span>
              </button>
            </div>
        </div>`

})

document.querySelector('.js-products-container').innerHTML = productsHTML;



function updateCartQuantity() {
  let cartQuantityValue = 0;
  cart.forEach((cartItem) => {
    cartQuantityValue += cartItem.quantity;
    document.querySelector('.cart-quantity-value').innerHTML = cartQuantityValue;

  })
}


document.querySelectorAll('.products-container-details').forEach((container) => {
  let cartQuantityValue = 0;
  const incrementButton = container.querySelector('.js-increment');
  const decrementButton = container.querySelector('.js-decrement');
  const displayCartItemsCount = container.querySelector('.js-display-count');
  incrementButton.addEventListener('click', () => {
    cart.forEach((cartItem) => {
      cartQuantityValue += cartItem.quantity - 1;
      displayCartItemsCount.innerHTML = cartQuantityValue;
      addToStorage();
    })

  })

  decrementButton.addEventListener('click', () => {
    cart.forEach((cartItem) => {
      if (cartItem.quantity < 0) {
        alert(`Add the products`)
      } else {
        cartQuantityValue -= cartItem.quantity;
        displayCartItemsCount.innerHTML = cartQuantityValue;
        addToStorage();
      }
    })
  })


})

document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('mouseover', () => {
    addToCartBtn.classList.add('add-to-cart-hover');
  })
})

document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('mouseleave', () => {
    addToCartBtn.classList.remove('add-to-cart-hover');
  })
})


document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.dataset.productId;
    // updateOrderSummaryStatus(productId);
    showPopUpMessage.innerHTML = `Product with ID <span>${productId}</span> has been added.`;
    showPopUpMessage.classList.add('show-pop-up-message');

    addToCart(productId);
    updateCartQuantity();


    setTimeout(() => {
      showPopUpMessage.classList.remove('show-pop-up-message');
    }, 500)
  })

})

window.addEventListener('scroll', () => {
  let windowWidth = window.scrollY;
  console.log(windowWidth);
})

