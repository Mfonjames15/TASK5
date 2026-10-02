/**
 * Casa Gold — Cart Drawer
 * Opens on Add to Cart + bag icon click
 */

(function () {
  "use strict";

  const overlay = document.getElementById("cart-drawer-overlay");
  const drawer = document.getElementById("cart-drawer");
  const bodyEl = document.getElementById("cart-drawer-body");
  const footerEl = document.getElementById("cart-drawer-footer");
  const closeBtn = document.getElementById("cart-drawer-close");
  const continueBtn = document.getElementById("cart-continue");
  const itemCountEl = document.getElementById("cart-item-count");
  const subtotalEl = document.getElementById("cart-subtotal");

  function getCart() {
    return JSON.parse(localStorage.getItem("casaCart") || "[]");
  }

  function saveCart(cart) {
    localStorage.setItem("casaCart", JSON.stringify(cart));
    updateHeaderBadge();
  }

  function updateHeaderBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.querySelector("[data-cart-count]");
    if (badge) {
      badge.textContent = total > 0 ? total : "";
      badge.hidden = total === 0;
    }
  }

  function openCart() {
    renderCart();
    overlay.classList.add("open");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      drawer.classList.add("empty");
      bodyEl.innerHTML = `
        <div class="cart-empty">
          <p>Your bag is empty</p>
          <button type="button" class="btn-continue" id="empty-continue">Continue Shopping</button>
        </div>
      `;
      itemCountEl.textContent = "(0)";
      document.getElementById("empty-continue")?.addEventListener("click", closeCart);
      return;
    }

    drawer.classList.remove("empty");

    let subtotal = 0;
    let totalItems = 0;

    const itemsHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return "";

      const lineTotal = product.price * item.qty;
      subtotal += lineTotal;
      totalItems += item.qty;

      return `
        <div class="cart-item" data-id="${product.id}">
          <img class="cart-item-image" src="${product.images[0]}" alt="${product.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">${formatPrice(product.price)}</div>
            <div class="cart-item-qty">
              <button type="button" class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
              <span class="qty-value">${item.qty}</span>
              <button type="button" class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-action="remove">Remove</button>
        </div>
      `;
    }).join("");

    bodyEl.innerHTML = itemsHTML;
    itemCountEl.textContent = `(${totalItems})`;
    subtotalEl.textContent = formatPrice(subtotal);

    // Bind quantity & remove events
    bodyEl.querySelectorAll(".cart-item").forEach(row => {
      const id = Number(row.dataset.id);

      row.querySelector('[data-action="increase"]')?.addEventListener("click", () => {
        changeQty(id, 1);
      });

      row.querySelector('[data-action="decrease"]')?.addEventListener("click", () => {
        changeQty(id, -1);
      });

      row.querySelector('[data-action="remove"]')?.addEventListener("click", () => {
        removeItem(id);
      });
    });
  }

  function changeQty(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    renderCart();
  }

  function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
  }

  // Public function so products.js can call it after adding an item
  window.openCasaCart = openCart;
  window.refreshCasaCart = function () {
    updateHeaderBadge();
    if (drawer.classList.contains("open")) renderCart();
  };

  // Event listeners
  closeBtn?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);
  continueBtn?.addEventListener("click", closeCart);

  // Open cart when clicking the bag icon in the header
  document.querySelectorAll('[aria-label="Shopping bag"]').forEach(btn => {
    btn.addEventListener("click", openCart);
  });

  // Initial badge
  updateHeaderBadge();
})();