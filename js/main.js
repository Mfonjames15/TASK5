/* CATEGORY SECTION */

const categories = [
  {
    name: "Rings",
    image: "./images/rings/Elegant Gold Leaf Diamond Ring ✨.jfif"
  },

  {
    name: "Bracelets",
    image: "./images/bracelets/The _Mystery™_ bracelet by M&M GOLD.jfif"
  },

  {
    name: "Necklaces",
    image: "./images/necklaces/81064862037410430.jfif"
  },

  {
    name: "Earrings",
    image: "./images/earrings/37999190602074219.jfif"
  },

  {
    name: "Watches",
    image: "./images/watches/Elegant Gold Watch for Women ✨.jfif"
  }
];

const categoryGrid = document.getElementById("category-grid");

categories.forEach(category => {

    categoryGrid.innerHTML += `
        <a href="products.html" class="category-card">

            <div class="category-image">
                <img src="${category.image}" alt="${category.name}">
            </div>

            <div class="category-info">
                <h3>${category.name}</h3>

                <span class="category-cta">
                Explore →
                </span>
            </div>

        </a>
    `;
});

/* PRODUCTS SECTION */

const products = [

  {
    name: "Classic Gold Ring",
    price: 85000,
    category: "new",
    image: "./images/rings/“The art of simplicity — one oval diamond, endless….jfif",
    modelImage: "./images/rings/332210910033811525.jfif",
    rating: 4.8
  },

  {
    name: "Sculpted Gold Bracelet",
    price: 120000,
    category: "new",
    image: "./images/bracelets/7459155629362568.jfif",
    modelImage: "images/bracelets/AI VISUAL CONTENT for jewelry__Open for….jfif",
    rating: 4.9
  },

  {
    name: "Pearl Drop Necklace",
    price: 150000,
    category: "new",
    image: "images/necklaces/Alilang Layered Chain Necklace with Crystal Accents Adjustable Multi Strand Drop Pendant Fashion Jewelry, Gold.jfif",
    modelImage: "images/necklaces/Eterna Glow French Baroque Faux Pearl Pendant Necklace❤️.jfif",
    rating: 4.7
  },

  {
    name: "Classic Gold Watch",
    price: 200000,
    category: "bestsellers",
    image: "images/watches/watch.jfif",
    modelImage: "images/watches/Minimalist Gold Watch.jfif",
    rating: 4.9
  },

  {
    name: "Gold Hoop Earrings",
    price: 75000,
    category: "bestsellers",
    image: "images/rings/587930926395801406.jfif",
    modelImage: "images/rings/Elegant Butterfly Ring for Women 🦋 _ Dainty Gold Ring with Sparkling Stones.jfif",
    rating: 4.8
  }

];



const productGrid = document.getElementById("product-grid");

function displayProducts(category){

    /* Clear the existing products */
    productGrid.innerHTML = "";

    /* Filter the products */
    const filteredProducts = products.filter(product => {
        return product.category === category;
    });

    /* Display filtered products */
    filteredProducts.forEach(product => {
        
        productGrid.innerHTML += `
            <article class="product-card">

                <div class="product-image">

                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        class="product-main-image"
                    >

                    <img 
                        src="${product.modelImage}" 
                        alt="${product.name} worn by model"
                        class="product-model-image"
                    >

                </div>

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="product-price">
                        ₦${product.price.toLocaleString()}
                    </p>

                    ${
                        category === "bestsellers"
                        ? `
                            <div class="product-rating">
                            ★★★★★
                            <span>${product.rating}</span>
                            </div>
                        `
                        : ""
                    }

                    <button class="btn-primary add-to-cart">
                        Add to Bag
                    </button>

                </div>

            </article>

        `
    })

}


const productTabs = document.querySelectorAll(".product-tab");

productTabs.forEach(tab => {
    tab.addEventListener("click", () => {

      /* Remove active class from all tabs */
      productTabs.forEach(t => t.classList.remove("active"));
        
      /* Add active class to clicked tab */
      tab.classList.add("active");

      /* Get category from data attribute */
      const category = tab.dataset.category;

      /* Display products in that category */
      displayProducts(category);

    });
});

displayProducts("new");

const womenGalleryData = [
  {
    src: "images/hero-image.jfif",
    alt: "Woman wearing Casa Gold necklace",
    caption: "Radiant",
  },
  {
    src: "images/download.jfif",
    alt: "Woman wearing Casa Gold earrings",
    caption: "Bold"
  },
  {
    src: "images/343610646589976322.jfif",
    alt: "Woman wearing Casa Gold bracelet",
    caption: "Empowered"
  },
  {
    src: "images/The latest trends in urban chic style.jfif",
    alt: "Woman wearing Casa Gold ring set",
    caption: "Timeless",
  }
];

function renderWomenSlider() {
    const track = document.getElementById("women-track");

    if (!track) return;

    track.innerHTML = womenGalleryData
        .map(item => `
            <figure class="women-slide">
                <img 
                    src="${item.src}" 
                    alt="${item.alt}" 
                    loading="lazy"
                >
                <figcaption>${item.caption}</figcaption>
            </figure>
        `)
        .join("");
}

renderWomenSlider();