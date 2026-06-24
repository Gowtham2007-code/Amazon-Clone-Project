class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

  if(!this.cartItems) {
    this.cartItems = [{
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity : 2,
      delivaryOptionId : '1'
    }, {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        delivaryOptionId : '2'
      }];
    }
  }

  savetoStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if(productId === item.productId)
        matchingItem = item;
    });

    if(matchingItem)
      matchingItem.quantity += 1;
    else  {
      this.cartItems.push({
      productId,
      quantity : 1,
      delivaryOptionId : '1'
      });
    }
    this.savetoStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId)
        newCart.push(cartItem);
    });

    this.cartItems = newCart;

    this.savetoStorage();
  }

  updateDelivaryOption(productId, delivaryOptionId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if(productId === item.productId)
        matchingItem = item;
    });

    matchingItem.delivaryOptionId = delivaryOptionId;

      this.savetoStorage();
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('BusinessCart-oop');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);
console.log(cart instanceof Cart);