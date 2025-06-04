export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

  let matching;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matching = cartItem;
    }

  })

  if (matching) {
    matching.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    })
  }
  addToStorage();
}


export function removeItemFromCart(productId) {

  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }

  })

  cart = newCart;
}

