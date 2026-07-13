"use strict";

const Customers = {

    customers: [],

    filteredCustomers: [],

    selectedCustomer: null,

    init() {

        this.loadCustomers();

        this.renderCustomers();

        this.updateSummary();

        this.initializeFilters();

        this.initializeRefresh();

        this.initializeDeleteButton();

    },

    loadCustomers() {

        const orders = Storage.get(

            CONSTANTS.STORAGE_KEYS.ORDERS,

            Database.orders

        );

        const map = {};

        orders.forEach(order => {

            const customerName =

                order.customer?.trim() ||

                "Walk-in Customer";

            if (!map[customerName]) {

                map[customerName] = {

                    id: Date.now() + Math.random(),

                    name: customerName,

                    phone: order.phone || "-",

                    type:

                        customerName === "Walk-in Customer"

                            ? "Walk-in"

                            : "Registered",

                    orders: 0,

                    lastVisit: order.createdAt,

                    history: []

                };

            }

            map[customerName].orders++;

            map[customerName].lastVisit = order.createdAt;

            map[customerName].history.push(order);

        });

        this.customers = Object.values(map);

        this.filteredCustomers = [...this.customers];

    },

    renderCustomers() {

        const tbody = Helper.id("customersTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredCustomers.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="6"

                        class="text-center py-5">

                        No customers found.

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredCustomers.forEach(customer => {

            tbody.innerHTML += `

                <tr>

                    <td>

                        <strong>

                            ${customer.name}

                        </strong>

                    </td>

                    <td>

                        ${customer.phone}

                    </td>

                    <td>

                        ${customer.type}

                    </td>

                    <td>

                        ${customer.orders}

                    </td>

                    <td>

                        ${customer.lastVisit}

                    </td>

                    <td>

                        <button

                            class="btn btn-primary btn-sm view-customer"

                            data-id="${customer.id}">

                            View

                        </button>

                    </td>

                </tr>

            `;

        });

        this.initializeViewButtons();

    },

    updateSummary() {

        Helper.id("totalCustomers").textContent =

            this.customers.length;

        Helper.id("walkInCustomers").textContent =

            this.customers.filter(

                customer =>

                customer.type === "Walk-in"

            ).length;

        Helper.id("registeredCustomers").textContent =

            this.customers.filter(

                customer =>

                customer.type === "Registered"

            ).length;

        Helper.id("customerOrders").textContent =

            this.customers.reduce(

                (total, customer) =>

                total + customer.orders,

                0

            );

    },

    initializeViewButtons() {

        document

        .querySelectorAll(".view-customer")

        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(

                    button.dataset.id

                );

                this.openCustomerModal(id);

            });

        });

    },

    openCustomerModal(customerId) {

        this.selectedCustomer = this.customers.find(

            customer => customer.id === customerId

        );

        if (!this.selectedCustomer) return;

        Helper.id("modalCustomerName").textContent =
            this.selectedCustomer.name;

        Helper.id("modalCustomerPhone").textContent =
            this.selectedCustomer.phone;

        Helper.id("modalCustomerType").textContent =
            this.selectedCustomer.type;

        Helper.id("modalCustomerOrders").textContent =
            this.selectedCustomer.orders;

        Helper.id("modalCustomerLastVisit").textContent =
            this.selectedCustomer.lastVisit;

        const history = Helper.id("modalOrderHistory");

        history.innerHTML = "";

        if (this.selectedCustomer.history.length === 0) {

            history.innerHTML = `

                <p class="text-muted text-center">

                    No Orders Found

                </p>

            `;

        }

        else {

            this.selectedCustomer.history.forEach(order => {

                history.innerHTML += `

                <div class="border rounded p-3 mb-3">

                    <div class="d-flex justify-content-between">

                        <strong>

                            Order #${order.id}

                        </strong>

                        <span class="badge bg-primary">

                            ${order.status}

                        </span>

                    </div>

                    <div class="mt-2">

                        Order Type :

                        ${order.orderType}

                    </div>

                    <div>

                        Payment :

                        ${order.payment}

                    </div>

                    <div>

                        Total :

                        ${formatCurrency(order.subtotal)}

                    </div>

                    <div>

                        ${order.createdAt}

                    </div>

                </div>

                `;

            });

        }

        new bootstrap.Modal(

            Helper.id("customerModal")

        ).show();

    },


    initializeFilters() {

        const search = Helper.id("customerSearch");

        const filter = Helper.id("customerTypeFilter");

        if (search) {

            search.addEventListener("input", () => {

                this.filterCustomers();

            });

        }

        if (filter) {

            filter.addEventListener("change", () => {

                this.filterCustomers();

            });

        }

    },


    filterCustomers() {

        const keyword =

            Helper.id("customerSearch")

            .value

            .trim()

            .toLowerCase();

        const type =

            Helper.id("customerTypeFilter").value;

        this.filteredCustomers = this.customers.filter(customer => {

            const matchName =

                customer.name

                .toLowerCase()

                .includes(keyword);

            const matchPhone =

                customer.phone

                .toLowerCase()

                .includes(keyword);

            const matchType =

                type === "All"

                ||

                customer.type === type;

            return (

                (matchName || matchPhone)

                &&

                matchType

            );

        });

        this.renderCustomers();

    },

    initializeRefresh() {

        const button = Helper.id("refreshCustomers");

        if (!button) return;

        button.addEventListener("click", () => {

            this.loadCustomers();

            this.renderCustomers();

            this.updateSummary();

            Toast.show(

                "Customers refreshed",

                "success"

            );

        });

    },


    initializeDeleteButton() {

        const button = Helper.id("deleteCustomerBtn");

        if (!button) return;

        button.addEventListener("click", () => {

            if (!this.selectedCustomer) return;

            if (!confirm("Delete this customer?"))
                return;

            this.customers = this.customers.filter(

                customer =>

                customer.id !== this.selectedCustomer.id

            );

            this.filteredCustomers = [...this.customers];

            this.renderCustomers();

            this.updateSummary();

            bootstrap.Modal

                .getInstance(

                    Helper.id("customerModal")

                )

                .hide();

            Toast.show(

                "Customer removed",

                "success"

            );

        });

    },

}

document.addEventListener("DOMContentLoaded", () => {

    Customers.init();

    Counter.animate(

        Helper.id("totalCustomers"),

        Customers.customers.length

    );

    Counter.animate(

        Helper.id("walkInCustomers"),

        Customers.customers.filter(

            customer =>

            customer.type === "Walk-in"

        ).length

    );

    Counter.animate(

        Helper.id("registeredCustomers"),

        Customers.customers.filter(

            customer =>

            customer.type === "Registered"

        ).length

    );

    Counter.animate(

        Helper.id("customerOrders"),

        Customers.customers.reduce(

            (total, customer) =>

            total + customer.orders,

            0

        )

    );

});