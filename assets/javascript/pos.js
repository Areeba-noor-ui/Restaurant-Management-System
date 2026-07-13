"use strict";

function formatCurrency(amount){

    return `Rs. ${amount.toLocaleString("en-PK")}`;

}


const POSData = {


};


// object

const POS = {

    id: Date.now(),

    customer: Helper.id("customerName").value,
    
    phone: Helper.id("customerPhone").value,

    orderType: Helper.id("orderType").value,

    payment: Helper.id("paymentMethod").value,

    currentCategory: "All",

    filteredProducts: [],

    cart: [],

    priority: Helper.id("priority").value,

    init() {

        this.products = Storage.get(
            CONSTANTS.STORAGE_KEYS.MENU,
            Database.menu
        );

        this.filteredProducts = [...this.products];

        this.renderCategories();

        this.renderCustomers();

        this.initializeCategorySelect();

        this.initializeSearch();     

        this.renderProducts();    
        
        this.cart = Storage.get(

            CONSTANTS.STORAGE_KEYS.CART,

            Database.cart

        );    

        this.renderCart();  

        this.initializeClearCart();

        this.initializeActionButtons();

    },

    renderCategories() {

    const container = Helper.id("categoryList");

    if (!container) return;

    container.innerHTML = "";

    const categories = [

        "All",

        ...new Set(

            this.products.map(item => item.category)

        )

    ];

    categories.forEach(category => {

        container.innerHTML += `

            <button

                class="category-btn ${category === "All" ? "active" : ""}"

                data-category="${category}">

                ${category}

            </button>

        `;
    });

        container.querySelectorAll(".category-btn").forEach(button => {

        button.addEventListener("click", () => {

        document.querySelectorAll(".category-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        this.currentCategory = button.dataset.category;

        Helper.id("categoryFilter").value = this.currentCategory;

        this.filterProducts();

    });

});

    },

    
    renderCustomers() {

    const select = Helper.id("customerSelect");

    if (!select) return;

    select.innerHTML = "";

    const customers = Storage.get(
        CONSTANTS.STORAGE_KEYS.CUSTOMERS,
        Database.customers
    );

    customers.forEach(customer => {

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

    const categories = [

        "All",

        ...new Set(

            this.products.map(item => item.category)

        )

    ];

    categories.forEach(category => {

        select.innerHTML += `

            <option>

                ${category}

            </option>

        `;

    });
    select.addEventListener("change", () => {

        this.currentCategory = select.value;

        this.filterProducts();

});

    },


    initializeSearch() {
        console.log("Search initialized");

        const search = Helper.id("productSearch");

        if (!search) return;

        search.addEventListener("input", () => {

            this.filterProducts(); 

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

    filterProducts() {

    const keyword = Helper.id("productSearch")
        .value
        .trim()
        .toLowerCase();

    let products = [...this.products];

    // Filter by category
    if (this.currentCategory !== "All") {

        products = products.filter(product =>
            product.category === this.currentCategory
        );

    }

    // Filter by search
    if (keyword) {

        products = products.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.description.toLowerCase().includes(keyword)

        );

    }

    this.filteredProducts = products;

    this.renderProducts();

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

    const product = this.products.find(item => item.id === productId);

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
    Storage.save(

        CONSTANTS.STORAGE_KEYS.CART,

        this.cart

    );

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

                    <span>

                        ${formatCurrency(item.price)}

                        ×

                        ${item.quantity}

                    </span>

                    <p class="mb-0 fw-bold text-danger">

                        ${formatCurrency(item.price * item.quantity)}

                    </p>

                </div>

                <div class="quantity-box">

                    <button
                        class="qty-btn decrease-btn"
                        data-id="${item.id}">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        class="qty-btn increase-btn"
                        data-id="${item.id}">
                        +
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

    Storage.save(

        CONSTANTS.STORAGE_KEYS.CART,

        this.cart

    );

    },

    removeFromCart(productId) {

    this.cart = this.cart.filter(product => product.id !== productId);

    this.renderCart();

    Storage.save(

        CONSTANTS.STORAGE_KEYS.CART,

        this.cart

    );

    },

    updateTotals() {

    const subtotal = this.cart.reduce(

        (sum, item) => sum + item.price * item.quantity, 0
    );

    const tax = Number((subtotal * 0.10).toFixed(2));

    const grandTotal = subtotal + tax;

    Helper.id("subtotal").textContent =
        formatCurrency(subtotal);

    Helper.id("tax").textContent =
        formatCurrency(tax);

    Helper.id("grandTotal").textContent =
        formatCurrency(grandTotal);

    },

    initializeClearCart() {

    const button = Helper.id("clearCart");

    if (!button) return;

    button.addEventListener("click", () => {

        this.cart = [];

        this.renderCart();

        Storage.save(

            CONSTANTS.STORAGE_KEYS.CART,

            this.cart

        );

        Toast.show("Cart cleared", "warning");

    });

    },

    initializeActionButtons(){

    const holdBtn = Helper.id("holdOrder");

    if(holdBtn){

        holdBtn.addEventListener("click",()=>{

            if(this.cart.length===0){

                Toast.show("Cart is empty","warning");

                return;

            }

            Storage.save(

                CONSTANTS.STORAGE_KEYS.CART,

                this.cart

            );

            Toast.show("Order placed on hold","info");

        });

    }

        const saveBtn = Helper.id("saveOrder");

    if(saveBtn){

        saveBtn.addEventListener("click",()=>{

            if(this.cart.length===0){

                Toast.show("Cart is empty","warning");

                return;

            }

             const order = {

                id: Date.now(),

                customer: Helper.id("customerName").value.trim() || "Walk-in Customer",

                orderType: Helper.id("orderType").value,

                payment: Helper.id("paymentMethod").value,

                items: [...this.cart],

                subtotal: this.cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                ),

                status: CONSTANTS.ORDER_STATUS.PENDING,

                createdAt: Date.now()

            };

            const orders = Storage.get(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                Database.orders

            );

            orders.push(order);

            Storage.save(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                orders

            );

            Toast.show(

                `${ Helper.id("customerName").value || "Walk-in Customer"}'s  Order saved successfully`,

                "success"

            );

            this.cart=[];

            this.renderCart();

            Helper.id("customerName").value = "";

            Helper.id("customerPhone").value = "";

            Storage.save(

                CONSTANTS.STORAGE_KEYS.CART,

                this.cart

            );

        });

    }

        const printBtn=Helper.id("printReceipt");

    if(printBtn){

        printBtn.addEventListener("click",()=>{

            window.print();

        });

    }

    }



    }

document.addEventListener("DOMContentLoaded", () => {

    POS.init();

});
