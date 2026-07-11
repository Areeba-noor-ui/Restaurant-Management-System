"use strict";

function formatCurrency(amount){

    return `Rs. ${amount.toLocaleString("en-PK")}`;

}


const POSData = {

    categories: [

        "All",
        "Burger",
        "Pizza",
        "Chicken",
        "Drinks",
        "Dessert"

    ],

    customers: [

        "Walk-in Customer",
        "Areeba Noor",
        "Ali Ahmed",
        "Sarah Khan",
        "John Smith"

    ],

    products: [

        {
            id: 1,
            name: "Zinger Burger",
            category: "Burger",
            price: 850,
            image: "assets/images/zingerBurger.jpg",
            description: "Crispy chicken burger"
        },

        {
            id: 2,
            name: "Cheese Burger",
            category: "Burger",
            price: 950,
            image: "assets/images/cheeseBurger.jpg",
            description: "Double cheese burger"
        },

        {
            id: 3,
            name: "Chicken Pizza",
            category: "Pizza",
            price: 1500,
            image: "assets/images/chickenPizza.jpg",
            description: "Large pizza"
        },

        {
            id: 4,
            name: "French Fries",
            category: "Chicken",
            price: 400,
            image: "assets/images/frenchFries.jpg",
            description: "Crispy fries"
        },

        {
            id: 5,
            name: "Cold Drink",
            category: "Drinks",
            price: 200,
            image: "assets/images/coldDrinks.jpg",
            description: "Soft drink"
        },

        {
            id: 6,
            name: "Chocolate Cake",
            category: "Dessert",
            price: 650,
            image: "assets/images/choclateCake.jpg",
            description: "Chocolate dessert"
        }

    ]

};


// object

const POS = {

    currentCategory: "All",

    filteredProducts: [],

    cart: [],

    init() {

        this.filteredProducts = [...POSData.products];

        this.renderCategories();

        this.renderCustomers();

        this.renderProducts();

        this.initializeSearch();

        this.initializeCategorySelect();

        this.initializeClearCart();

    },

    renderCategories() {

    const container = Helper.id("categoryList");

    if (!container) return;

    container.innerHTML = "";

    POSData.categories.forEach(category => {

        container.innerHTML += `

            <button

                class="category-btn ${category === "All" ? "active" : ""}"

                data-category="${category}">

                ${category}

            </button>

        `;

    });

    },

    
    renderCustomers() {

    const select = Helper.id("customerSelect");

    if (!select) return;

    select.innerHTML = "";

    POSData.customers.forEach(customer => {

        select.innerHTML += `

            <option>

                ${customer}

            </option>

        `;

    });

    },


    renderProducts(products = this.filteredProducts) {

    const grid = Helper.id("productGrid");

    if (!grid) return;

    grid.innerHTML = "";

    products.forEach(product => {

        grid.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4">

                <div class="product-card">

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}">

                        <span class="product-badge">

                            ${product.category}

                        </span>

                    </div>

                    <div class="product-body">

                        <h5 class="product-name">

                            ${product.name}

                        </h5>

                        <p class="product-description">

                            ${product.description}

                        </p>

                        <div class="product-footer">

                            <span class="product-price">

                                ${formatCurrency(product.price)}

                            </span>

                            <button
                                class="add-cart-btn"
                                data-id="${product.id}">

                                <i class="bi bi-plus-lg"></i>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

    this.initializeAddToCartButtons();

    },


    initializeCategorySelect() {

    const select = Helper.id("categoryFilter");

    if (!select) return;

    POSData.categories.forEach(category => {

        select.innerHTML += `

            <option>

                ${category}

            </option>

        `;

    });

    },


    initializeSearch() {
        console.log("Search initialized");

        const search = Helper.id("productSearch");

        if (!search) return;

        search.addEventListener("input", () => {

            const keyword = search.value.trim().toLowerCase();

            const products = POSData.products.filter(product =>

                product.name.toLowerCase().includes(keyword)

            );

            this.renderProducts(products);
                console.log(search.value);

        });

        /* Scroll to first matching product when Enter is pressed */

        search.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") return;

            event.preventDefault();

            const firstProduct = document.querySelector("#productGrid .product-card");

            if (firstProduct) {

                firstProduct.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        });


    },

    initializeAddToCartButtons() {

        const buttons = document.querySelectorAll(".add-cart-btn");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const productId = Number (button.dataset.id);

                this.addToCart(productId);

            });

        });

    },

    addToCart(productId) {

    const product = POSData.products.find(item => item.id === productId);

    if (!product) return;

    const existing = this.cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        this.cart.push({

            ...product,

            quantity: 1

        });

    }

    this.renderCart();

    },

    renderCart() {

        const cartItems = Helper.id("cartItems");

        if (!cartItems) return;

        if (this.cart.length === 0) {

            cartItems.innerHTML = `
                <p class="text-center text-muted py-5">
                    Cart is empty.
                </p>
            `;

            this.updateTotals();

            return;

        }

        cartItems.innerHTML = "";

        this.cart.forEach(item => {

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div class="cart-info">

                        <h6>${item.name}</h6>

                        <span>Rs. ${item.price}</span>

                    </div>

                    <div class="quantity-box">

                        <button
                            class="qty-btn decrease-btn"
                            data-id="${item.id}">

                            <i class="bi bi-dash"></i>

                        </button>

                        <strong>${item.quantity}</strong>

                        <button
                            class="qty-btn increase-btn"
                            data-id="${item.id}">

                            <i class="bi bi-plus"></i>

                        </button>

                        <button
                            class="remove-btn"
                            data-id="${item.id}">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </div>

            `;

        });

        this.initializeCartButtons();

        this.updateTotals();

    },

    initializeCartButtons() {

    document.querySelectorAll(".increase-btn").forEach(button => {

        button.addEventListener("click", () => {

            this.changeQuantity(Number(button.dataset.id), 1);

        });

    });

    document.querySelectorAll(".decrease-btn").forEach(button => {

        button.addEventListener("click", () => {

            this.changeQuantity(Number(button.dataset.id), -1);

        });

    });

    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", () => {

            this.removeFromCart(Number(button.dataset.id));

        });

    });

    },

    changeQuantity(productId, amount) {

    const item = this.cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        this.cart = this.cart.filter(product => product.id !== productId);

    }

    this.renderCart();

    },

    removeFromCart(productId) {

    this.cart = this.cart.filter(product => product.id !== productId);

    this.renderCart();

    },

    updateTotals() {

    let subtotal = 0;

    this.cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    const tax = subtotal * 0.10;

    const grandTotal = subtotal + tax;

    Helper.id("subtotal").textContent =
        `RS. ${subtotal}`;

    Helper.id("tax").textContent =
        `RS. ${tax}`;

    Helper.id("grandTotal").textContent =
        `RS. ${grandTotal}`;

    },

    initializeClearCart() {

    const button = Helper.id("clearCart");

    if (!button) return;

    button.addEventListener("click", () => {

        this.cart = [];

        this.renderCart();

        Toast.show("Cart cleared", "warning");

    });

    },


    }

document.addEventListener("DOMContentLoaded", () => {

    POS.init();

});
