let cart = [];

function addToCart(productName, price) {
  const existingItem = cart.find((item) => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  updateCart();
}

function changeQuantity(productName, amount) {
  const item = cart.find((item) => item.name === productName);
  if (item) {
    item.quantity += amount;
    if (item.quantity <= 0) {
      removeFromCart(productName);
    }
  }
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Cart is empty</div>';
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <div class="quantity-controls">
          <button onclick="changeQuantity('${item.name}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
          <button onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}
