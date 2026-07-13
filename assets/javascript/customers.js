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
}