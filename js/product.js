
/* =========================================================
        1. APPLICATION STATE
========================================================= */

let activeCategory = "all";
let minPrice = null;
let maxPrice = null;
let inStockOnly = false;
let activeSort = "featured";
let searchTerm = "";

let minPriceInput;
let maxPriceInput;
let stockCheckbox;

const PRODUCTS_PER_LOAD = 5;
let productsToShow = PRODUCTS_PER_LOAD;

let wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];


/* =========================================================
        2. DOM ELEMENTS
========================================================= */

const categoryNav = document.getElementById("category-nav");
const sortSelect = document.querySelector(".sort-select");

const searchBarWrapper = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-toggle-btn');
const searchInput = document.querySelector('.search-input');

const loadMoreBtn = document.getElementById('load-more-btn');

const cartCount = document.querySelector('.cart-count');
const cartButton = document.querySelector(".cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const cartDrawerClose = document.getElementById("cart-drawer-close");
const cartContinue = document.getElementById("cart-continue");
const cartDrawerBody = document.getElementById("cart-drawer-body");
const cartItemCount = document.getElementById('cart-item-count');
const cartSubtotal = document.getElementById('cart-subtotal');


const filterToggleBtn = document.getElementById('filter-toggle');
const filterDrawer = document.getElementById('filter-drawer');
const filterDrawerOverlay = document.getElementById('filter-drawer-overlay');
const filterDrawerClose = document.getElementById('drawer-close');
const drawerBody = document.getElementById('drawer-body');
const drawerClear = document.getElementById('drawer-clear');
const drawerApply = document.getElementById('drawer-apply');


/* =========================================================
        3. CATEGORY TABS
========================================================= */

// Create category tabs

CATEGORIES.forEach(category => {

    const button = document.createElement("button");

    button.classList.add("category-tab");
    button.textContent = category.name;
    button.dataset.category = category.id;

    button.addEventListener('click', () => {
        setActiveCategory(category.id);
    });

    categoryNav.appendChild(button);
});


// Toggle active state between category tabs

function setActiveCategory(categoryId) {

    const buttons = document.querySelectorAll(".category-tab");

    buttons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.category === categoryId) {
            button.classList.add("active");
        }

    });

    activeCategory = categoryId;
    productsToShow = PRODUCTS_PER_LOAD;

    renderProducts();
}


/* =========================================================
        4. WISHLIST
========================================================= */

// Wishlist Function

function toggleWishList(productId) {

    if (wishList.includes(productId)) {

        wishList = wishList.filter(id => id !== productId);

    }

    else {

        wishList.push(productId);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishList));

    console.log("Wishlist:", wishList);
}


/* =========================================================
        5. CART
========================================================= */

// Add to cart function

function addToCart(productId) {

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++

    }

    else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    updateCartUI();
    openCart();

    console.log("Cart:", cart);
}


// Update cart count

function updateCartCount() {

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartItemCount.textContent = `(${totalQuantity})`;
    cartCount.textContent = totalQuantity;
}


// Open cart function

function openCart() {

    cartDrawer.classList.add("open");
    cartDrawerOverlay.classList.add("open");
}


// Close cart function

function closeCart() {

    cartDrawer.classList.remove('open');
    cartDrawerOverlay.classList.remove('open');
}


// Cart event listeners

cartButton.addEventListener("click", () => {

    openCart();
    renderCart();

});

cartDrawerClose.addEventListener("click", () => {

    closeCart();

});

cartDrawerOverlay.addEventListener("click", () => {

    closeCart();

});

cartContinue.addEventListener("click", () => {

    closeCart();

});


// Save cart

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}


// Render cart

function renderCart() {

    // Reset old state

    cartDrawerBody.innerHTML = "";
    cartDrawer.classList.remove('empty');


    // Check current state

    if(cart.length === 0) {

        // Apply empty state

        cartDrawer.classList.add('empty');


        // Create empty UI

        const emptyMessage = document.createElement("div");
        emptyMessage.classList.add("cart-empty");

        const emptyText = document.createElement("p");
        emptyText.textContent = "Your bag is empty";

        const continueShoppingBtn = document.createElement('button');

        continueShoppingBtn.type = 'button';
        continueShoppingBtn.classList.add('btn-continue')
        continueShoppingBtn.textContent = 'Continue Shopping';

        continueShoppingBtn.addEventListener('click', () => {

            closeCart();

        })


        emptyMessage.appendChild(emptyText);
        emptyMessage.appendChild(continueShoppingBtn)

        cartDrawerBody.appendChild(emptyMessage);

        return;
    }


    // Render cart items

    cart.forEach(item => {

        const product = PRODUCTS.find(currentProduct => {

            return currentProduct.id === item.id;

        });


        // Render normal cart

        // Create the cart item

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");


        // Create the image

        const productImage = document.createElement("img");

        productImage.classList.add("cart-item-image");
        productImage.src = product.images[0];
        productImage.alt = product.name;


        // Create the product information

        const productInfo = document.createElement("div");
        productInfo.classList.add("cart-item-info");

        const productName = document.createElement("h3");

        productName.classList.add("cart-item-name");
        productName.textContent = product.name;


        const productPrice = document.createElement("p");

        productPrice.classList.add("cart-item-price");
        productPrice.textContent = `₦${product.price.toLocaleString()}`;


        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);


        // Create quantity controls

        const quantityContainer = document.createElement("div");

        quantityContainer.classList.add("cart-item-qty");


        const decreaseButton = document.createElement("button");

        decreaseButton.type = "button";
        decreaseButton.classList.add("qty-btn");
        decreaseButton.textContent = "−";


        // Add event listener

        decreaseButton.addEventListener('click', () => {

            if (item.quantity > 1){

                item.quantity--;

                updateCartUI();

            }

        })


        const quantityValue = document.createElement("span");

        quantityValue.classList.add("qty-value");
        quantityValue.textContent = item.quantity;


        const increaseButton = document.createElement("button");

        increaseButton.type = "button";
        increaseButton.classList.add("qty-btn");
        increaseButton.textContent = "+";


        // Add event listener

        increaseButton.addEventListener('click', () => {

            item.quantity++;

            updateCartUI();

        })


        // Remove button

        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.classList.add("cart-item-remove");
        removeButton.textContent = "Remove";

        removeButton.addEventListener('click', () => {

            removeFromCart(item.id);

        });


        // Assemble quantity controls

        quantityContainer.appendChild(decreaseButton);
        quantityContainer.appendChild(quantityValue);
        quantityContainer.appendChild(increaseButton);


        productInfo.appendChild(quantityContainer);


        // Assemble cart item

        cartItem.appendChild(productImage);
        cartItem.appendChild(productInfo);
        cartItem.appendChild(removeButton);

        cartDrawerBody.appendChild(cartItem);

    });

}


// Remove item from cart

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCartUI();

}


// Calculate cart subtotal

function calculateCartSubtotal() {

    let subtotal = 0;

    cart.forEach(item => {

        const product = PRODUCTS.find(currentProduct => {

            return currentProduct.id === item.id

        });

        subtotal += product.price * item.quantity;

    });

    return subtotal;

}


// Update cart subtotal

function updateCartSubtotal() {

    const subtotal = calculateCartSubtotal();

    cartSubtotal.textContent = `₦${subtotal.toLocaleString()}`;

}


// Update entire cart UI

function updateCartUI() {

    // Save the new cart to localStorage

    saveCart();

    // Update the number in the header and drawer title

    updateCartCount();

    // Recalculate the subtotal

    updateCartSubtotal();

    // Redraw the cart items

    renderCart();

}


/* =========================================================
     6. MOBILE FILTER DRAWER
========================================================= */

// open filter drawer 

function openFilterDrawer() {
    filterDrawer.classList.add('open');
    filterDrawerOverlay.classList.add('open');
}


// Close filter drawer
function closeFilterDrawer() {

    filterDrawer.classList.remove('open');
    filterDrawerOverlay.classList.remove('open');

}


// Open drawer when Filter button is clicked
filterToggleBtn.addEventListener('click', () => {

    openFilterDrawer();

});


// Close drawer when X button is clicked
filterDrawerClose.addEventListener('click', () => {

    closeFilterDrawer();

});


// Close drawer when overlay is clicked

filterDrawerOverlay.addEventListener('click', () => {

    closeFilterDrawer();

});


/* =========================================================
        6. SEARCH
========================================================= */

// Open and close search bar

searchBtn.addEventListener('click', () => {

    searchBarWrapper.classList.toggle('open');

});


// Search products as the user types

searchInput.addEventListener('input', () => {

    searchTerm = searchInput.value.trim().toLowerCase();

    productsToShow = PRODUCTS_PER_LOAD;

    renderProducts();

});


// Search products

function searchProducts(products) {

    if (searchTerm === "" ) {

        return products;

    }

    return products.filter(function(product) {

        return product.name.toLowerCase().includes(searchTerm);

    });

}


/* =========================================================
        7. SORTING
========================================================= */

// Listen for sort changes

sortSelect.addEventListener('change', () => {

    activeSort = sortSelect.value;

    renderProducts();

});


// Sort products

function sortProducts(products) {

    let sortedProducts = products;

    if (activeSort === 'price-asc'){

        sortedProducts = products.toSorted((a,b) =>{

            return a.price - b.price;

        });

    }

    else if (activeSort === 'price-desc'){

        sortedProducts = products.toSorted((a,b) =>{

            return b.price - a.price;

        });

    }

    else if (activeSort === "new-arrivals") {

        sortedProducts = products.toSorted((a, b) => {

            return Number(b.isNew) - Number(a.isNew);

        });

    }

    else if (activeSort === "featured") {

        sortedProducts = products.toSorted((a, b) => {

            return Number(b.isFeatured) - Number(a.isFeatured);

        });

    }

    else if (activeSort === 'name-asc') {

        sortedProducts = products.toSorted((a,b) => {

            return a.name.localeCompare(b.name);

        })

    }

    else if (activeSort === 'name-desc') {

        sortedProducts = products.toSorted((a,b) => {

            return b.name.localeCompare(a.name);

        })

    }


    return sortedProducts

}


/* =========================================================
        8. CLEAR FILTERS
========================================================= */

function clearFilters() {

    // Reset application state

    activeCategory = "all";
    minPrice = null;
    maxPrice = null;
    inStockOnly = false;
    searchTerm = "";
    activeSort = "featured";


    // Reset visible controls

    searchInput.value = "";
    sortSelect.value = "featured";


    // Reset visible products

    productsToShow = PRODUCTS_PER_LOAD;


    // Reset category and render

    setActiveCategory("all");

}


/* =========================================================
        9. FILTER SIDEBAR
========================================================= */

// Build the filter interface

function renderFilters() {

    const filterSidebar = document.querySelector('.filters-sidebar');


    /* -------------------------
        Filter Header
    ------------------------- */

    const filterHeader = document.createElement('div');

    filterHeader.classList.add('filter-header');


    const filterTitle = document.createElement('h2');

    filterTitle.classList.add('filter-title');
    filterTitle.textContent = 'Filters';


    const clearButton = document.createElement('button');

    clearButton.type = 'button';
    clearButton.classList.add('clear-filters-btn')
    clearButton.textContent = 'Clear all';


    /* -------------------------
        Price Filter
    ------------------------- */

    const priceGroup = document.createElement('div');

    priceGroup.classList.add('price-group');


    const priceTitle = document.createElement("h3");

    priceTitle.classList.add("filter-group-title");
    priceTitle.textContent = "Price";


    const priceInputs = document.createElement("div");

    priceInputs.classList.add("price-inputs");


    minPriceInput = document.createElement('input');

    minPriceInput.type = 'number';
    minPriceInput.placeholder = 'Min';
    minPriceInput.classList.add('price-input');


    const separator = document.createElement("span");

    separator.textContent = "–";


    maxPriceInput = document.createElement('input');

    maxPriceInput.type = 'number';
    maxPriceInput.placeholder = 'Max';
    maxPriceInput.classList.add('price-input');


    // Put the min and max input and the separator into priceInputs

    priceInputs.appendChild(minPriceInput);
    priceInputs.appendChild(separator);
    priceInputs.appendChild(maxPriceInput);


    const applyPriceButton = document.createElement("button");

    applyPriceButton.type = "button";
    applyPriceButton.classList.add("apply-price-btn");
    applyPriceButton.textContent = "Apply";


    // Add event listener

    applyPriceButton.addEventListener('click', () =>{

        if (minPriceInput.value !== '') {

            minPrice = Number(minPriceInput.value);

        }

        else {

            minPrice = null;

        }


        if (maxPriceInput.value !== '') {

            maxPrice = Number(maxPriceInput.value);

        }

        else {

            maxPrice = null;

        }

        productsToShow = PRODUCTS_PER_LOAD;

        renderProducts();

    });


    // Put the title, inputs and apply button into priceGroup

    priceGroup.appendChild(priceTitle);
    priceGroup.appendChild(priceInputs);
    priceGroup.appendChild(applyPriceButton);


    /* -------------------------
        Availability Filter
    ------------------------- */

    const availabilityGroup = document.createElement('div');

    availabilityGroup.classList.add('filter-group');


    const availabilityTitle = document.createElement('h3');

    availabilityTitle.classList.add('filter-group-title');
    availabilityTitle.textContent = 'Availability';


    const stockLabel = document.createElement('label');

    stockLabel.classList.add('availability-label');


    stockCheckbox = document.createElement('input');

    stockCheckbox.type = 'checkbox';


    // Add event listener

    stockCheckbox.addEventListener('change', () => {

        inStockOnly = stockCheckbox.checked;

        productsToShow = PRODUCTS_PER_LOAD;

        renderProducts();

    });


    stockLabel.appendChild(stockCheckbox);
    stockLabel.append('In stock only');

    availabilityGroup.append(availabilityTitle);
    availabilityGroup.append(stockLabel)


    /* -------------------------
        Clear All
    ------------------------- */

    clearButton.addEventListener('click', () => {

        clearFilters();

    });


    /* -------------------------
        Assemble Filter Sidebar
    ------------------------- */

    filterHeader.appendChild(filterTitle);
    filterHeader.appendChild(clearButton);

    filterSidebar.appendChild(filterHeader);
    filterSidebar.appendChild(priceGroup);
    filterSidebar.appendChild(availabilityGroup);

    // Copy filters into mobile drawer
 
    drawerBody.innerHTML = filterSidebar.innerHTML;


    // Remove desktop price Apply button from mobile drawer

    const mobilePriceApplyButton =
        drawerBody.querySelector('.apply-price-btn');

    mobilePriceApplyButton.remove();

}


// Connect mobile filter controls

function setupMobileFilters() {

    const mobileMinPriceInput =
        drawerBody.querySelector('.price-inputs input:first-child');

    const mobileMaxPriceInput =
        drawerBody.querySelector('.price-inputs input:last-child');

    const mobileStockCheckbox =
        drawerBody.querySelector('input[type="checkbox"]');


    // Apply mobile filters

    drawerApply.addEventListener('click', () => {

        // Get minimum price

        if (mobileMinPriceInput.value !== '') {

            minPrice = Number(mobileMinPriceInput.value);

        }

        else {

            minPrice = null;

        }


        // Get maximum price

        if (mobileMaxPriceInput.value !== '') {

            maxPrice = Number(mobileMaxPriceInput.value);

        }

        else {

            maxPrice = null;

        }


        // Get availability

        inStockOnly = mobileStockCheckbox.checked;


        // Reset visible products

        productsToShow = PRODUCTS_PER_LOAD;


        // Apply filters
        renderProducts();


        // Close drawer
        closeFilterDrawer();

    });


    // Clear mobile filters

    drawerClear.addEventListener('click', () => {

        minPrice = null;
        maxPrice = null;
        inStockOnly = false;


        // Reset mobile controls

        mobileMinPriceInput.value = '';
        mobileMaxPriceInput.value = '';
        mobileStockCheckbox.checked = false;


        // Reset visible products

        productsToShow = PRODUCTS_PER_LOAD;


        // Re-render products

        renderProducts();

    });

}

renderFilters();
setupMobileFilters();

/* =========================================================
        10. PRODUCT FILTERING
========================================================= */

function getFilteredProducts() {

    let filteredProducts = PRODUCTS;


    // Category

    if (activeCategory !== 'all'){

        filteredProducts = filteredProducts.filter(function(product) {

            return product.category === activeCategory;

        });

    }


    // Minimum Price

    if (minPrice !== null) {

        filteredProducts = filteredProducts.filter(product => {

            return product.price >= minPrice;

        })

    }


    // Maximum Price

    if (maxPrice !== null) {

        filteredProducts = filteredProducts.filter(product => {

            return product.price <= maxPrice;

        })

    }


    // Availability

    if (inStockOnly){

        filteredProducts = filteredProducts.filter(product => {

            return product.inStock === true;

        })

    }


    return filteredProducts;

}


/* =========================================================
        11. RESULT COUNT
========================================================= */

function updateResultCount(total) {

    const resultCount = document.querySelector('.result-count');


    if (activeCategory === 'all') {

        resultCount.innerHTML = `Showing <strong>${total}</strong> products `;

        return

    }


    const selectedCategory = CATEGORIES.find(category => {

        return category.id === activeCategory

    });


    let categoryName = selectedCategory.name;


    if (total === 1 ) {

        categoryName = selectedCategory.singularName;

    }


    resultCount.innerHTML = `Showing <strong>${total}</strong> ${categoryName}`;

}


/* =========================================================
        12. CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const productCard = document.createElement('article');

    productCard.classList.add('product-card');
    productCard.dataset.id = product.id;


    /* -------------------------
        Product Image
    ------------------------- */

    const productCardImageWrap = document.createElement("div");

    productCardImageWrap.classList.add("product-card-image-wrap");


    const productImage = document.createElement("img");

    productImage.classList.add("product-card-image");
    productImage.src = product.images[0];
    productImage.alt = product.name;


    productCardImageWrap.appendChild(productImage);


    /* Product Badge */

    if (product.isNew) {

        const productBadge = document.createElement("span");

        productBadge.classList.add("product-card-badge");
        productBadge.textContent = "New";

        productCardImageWrap.appendChild(productBadge);

    }


    /* Wishlist */

    const wishlistButton = document.createElement("button");

    wishlistButton.type = "button";
    wishlistButton.classList.add("wishlist-btn");
    wishlistButton.setAttribute("aria-label", "Add to wishlist");


    const heartIcon = document.createElement("i");


    if (wishList.includes(product.id)) {

        heartIcon.classList.add("fa-solid", "fa-heart");

    }

    else {

        heartIcon.classList.add("fa-regular", "fa-heart");

    }


    wishlistButton.appendChild(heartIcon);


    // Add event listener

    wishlistButton.addEventListener("click", () => {

        toggleWishList(product.id);

        renderProducts();

    });


    productCardImageWrap.appendChild(wishlistButton);


    /* -------------------------
        Product Information
    ------------------------- */

    const productInfo = document.createElement("div");

    productInfo.classList.add("product-card-info");


    const productName = document.createElement("h3");

    productName.classList.add("product-card-name");
    productName.textContent = product.name;


    /* Price */

    const productPrice = document.createElement('div');

    productPrice.classList.add('product-card-price');


    const currentPrice = document.createElement('span');

    currentPrice.classList.add('current-price');
    currentPrice.textContent = `₦${product.price.toLocaleString()}`;

    productPrice.appendChild(currentPrice);


    if (product.originalPrice && product.originalPrice > product.price) {

        const originalPrice = document.createElement('span');

        originalPrice.classList.add('original-price');
        originalPrice.textContent = `₦${product.originalPrice.toLocaleString()}`;

        productPrice.appendChild(originalPrice);

    }


    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);


    /* -------------------------
        Product Actions
    ------------------------- */

    const productActions = document.createElement("div");

    productActions.classList.add("product-card-actions");


    const addToCartButton = document.createElement("button");

    addToCartButton.type = "button";
    addToCartButton.classList.add("add-to-cart-btn");


    if (product.inStock) {

        addToCartButton.textContent = "Add to Cart";


        addToCartButton.addEventListener('click', () => {

            addToCart(product.id);

        })

    }

    else {

        addToCartButton.textContent = "Out of Stock";
        addToCartButton.disabled = true;

    }


    productActions.appendChild(addToCartButton);


    /* Put everything inside the product card */

    productCard.appendChild(productCardImageWrap);
    productCard.appendChild(productInfo);
    productCard.append(productActions);


    return productCard;

}


/* =========================================================
        13. RENDER PRODUCTS
========================================================= */

function renderProducts() {

    // Get the product grid

    const productGrid = document.querySelector('.product-grid');


    // Clear existing cards

    productGrid.innerHTML = "";


    // 1. Filter

    const filteredProducts = getFilteredProducts();


    // 2. Search

    const searchedProducts = searchProducts(filteredProducts);


    // 3. Sort

    const sortedProducts = sortProducts(searchedProducts);


    // 4. Update result count

    updateResultCount(searchedProducts.length);


    // Check for no products

    if (sortedProducts.length === 0) {

        const emptyMessage = document.createElement("div");

        emptyMessage.classList.add("products-empty");


        const emptyTitle = document.createElement("h3");

        emptyTitle.textContent = "No products found";


        const emptyText = document.createElement("p");

        emptyText.textContent = "Try adjusting your search or filters.";


        const clearFiltersButton = document.createElement('button');

        clearFiltersButton.type = 'button';
        clearFiltersButton.classList.add('empty-action-btn');
        clearFiltersButton.textContent = 'Clear Filters';


        clearFiltersButton.addEventListener('click', () => {

            clearFilters();

        })


        emptyMessage.appendChild(emptyTitle);
        emptyMessage.appendChild(emptyText);
        emptyMessage.appendChild(clearFiltersButton);


        productGrid.appendChild(emptyMessage);

        loadMoreBtn.style.display = 'none';

        return;

    }


    // 5. Determine Visible Products

    const visibleProducts = sortedProducts.slice(0, productsToShow);


    // 6. Display Products

    visibleProducts.forEach(function(product) {

        const card = createProductCard(product)

        productGrid.appendChild(card);

    });


    // 7. Show or hide Load More

    if(productsToShow < searchedProducts.length) {

        loadMoreBtn.style.display = 'block';

    }

    else {

        loadMoreBtn.style.display = 'none';

    }

}


// Load more products

loadMoreBtn.addEventListener('click', () => {

    productsToShow += PRODUCTS_PER_LOAD;

    renderProducts();

});


/* =========================================================
        14. INITIALIZE PAGE
========================================================= */

setActiveCategory(activeCategory);

updateCartCount();

updateCartSubtotal();

renderCart();
