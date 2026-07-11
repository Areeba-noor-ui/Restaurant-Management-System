"use strict";


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
            price: 8.50,
            image: "assets/images/zingerBurger.jpg",
            description: "Crispy chicken burger"
        },

        {
            id: 2,
            name: "Cheese Burger",
            category: "Burger",
            price: 9.50,
            image: "assets/images/cheeseBurger.jpg",
            description: "Double cheese burger"
        },

        {
            id: 3,
            name: "Chicken Pizza",
            category: "Pizza",
            price: 15,
            image: "assets/images/chickenPizza.jpg",
            description: "Large pizza"
        },

        {
            id: 4,
            name: "French Fries",
            category: "Chicken",
            price: 4,
            image: "assets/images/frenchFries.jpg",
            description: "Crispy fries"
        },

        {
            id: 5,
            name: "Cold Drink",
            category: "Drinks",
            price: 2,
            image: "assets/images/coldDrinks.jpg",
            description: "Soft drink"
        },

        {
            id: 6,
            name: "Chocolate Cake",
            category: "Dessert",
            price: 6,
            image: "assets/images/choclateCake.jpg",
            description: "Chocolate dessert"
        }

    ]

};



const POS = {

    currentCategory: "All",

    filteredProducts: [],

    init() {

        this.filteredProducts = [...POSData.products];

        this.renderCategories();

        this.renderCustomers();

        this.renderProducts();

        this.initializeSearch();

        this.initializeCategorySelect();

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

                                $${product.price.toFixed(2)}

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


    }

}

document.addEventListener("DOMContentLoaded", () => {

    POS.init();

});
