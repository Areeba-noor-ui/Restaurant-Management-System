"use strict";

const Reports = {

    reports: [],

    init() {

        this.loadSummary();

        this.generateReport();

        this.initializeEvents();

    },

    loadSummary() {

        const orders = Storage.get(
            CONSTANTS.STORAGE_KEYS.ORDERS,
            Database.orders
        );

        const customers = Storage.get(
            CONSTANTS.STORAGE_KEYS.CUSTOMERS,
            Database.customers
        );

        const expenses = Storage.get(
            CONSTANTS.STORAGE_KEYS.EXPENSES,
            Database.expenses
        );

        const totalSales = orders.reduce(
            (sum, order) => sum + (order.subtotal || 0),
            0
        );

        const totalExpenses = expenses.reduce(
            (sum, expense) => sum + (expense.amount || 0),
            0
        );

        Helper.id("totalSales").textContent =
            `Rs. ${totalSales.toLocaleString()}`;

        Helper.id("totalOrders").textContent =
            orders.length;

        Helper.id("totalCustomers").textContent =
            customers.length;

        Helper.id("totalExpenses").textContent =
            `Rs. ${totalExpenses.toLocaleString()}`;

    },

    initializeEvents() {

    Helper.id("generateReport")
        .addEventListener("click", () => {

            this.generateReport();

        });

    Helper.id("reportType")
        .addEventListener("change", () => {

            this.generateReport();

        });

    Helper.id("printReport")
        .addEventListener("click", () => {

            window.print();

        });

},

    generateReport() {

    const reportType =
        Helper.id("reportType").value;

    console.log("generateReport")

    switch (reportType) {

        case "Sales Report":

            this.renderSales();

            break;

        case "Orders Report":

            this.renderOrders();

            break;

        case "Customers Report":

            this.renderCustomers();

            break;

        case "Inventory Report":

            this.renderInventory();

            break;

        case "Purchases Report":

            this.renderPurchases();

            break;

        case "Expenses Report":

            this.renderExpenses();

            break;

        case "Delivery Report":

            this.renderDelivery();

            break;

        case "Employees Report":

            this.renderEmployees();

            break;

    }

},

    renderSales() {

        const tbody = Helper.id("reportTableBody");

        const orders = Storage.get(
            CONSTANTS.STORAGE_KEYS.ORDERS,
            Database.orders
        );

        tbody.innerHTML = "";

        orders.forEach(order => {

            tbody.innerHTML += `

                <tr>

                    <td>${order.id}</td>

                    <td>${order.customer}</td>

                    <td>${order.items.length} Items</td>

                    <td>Rs. ${order.subtotal.toLocaleString()}</td>

                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>

                    <td>${order.status}</td>

                </tr>

            `;

        });

        },
    renderOrders() {

        this.renderSales();

    },
    renderCustomers() {

    const tbody = Helper.id("reportTableBody");

    const customers = Storage.get(
        CONSTANTS.STORAGE_KEYS.CUSTOMERS,
        Database.customers
    );

    tbody.innerHTML = "";

    customers.forEach(customer => {

        tbody.innerHTML += `

            <tr>

                <td>${customer.id}</td>

                <td>${customer.name}</td>

                <td>${customer.phone || "-"}</td>

                <td>-</td>

                <td>-</td>

                <td>Active</td>

            </tr>

        `;

    });

},
    renderInventory() {

        const tbody = Helper.id("reportTableBody");

        const inventory = Storage.get(
            CONSTANTS.STORAGE_KEYS.INVENTORY,
            Database.inventory
        );

        tbody.innerHTML = "";

        inventory.forEach(item => {

            tbody.innerHTML += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.name}</td>

                    <td>${item.category}</td>

                    <td>${item.stock}</td>

                    <td>${item.unit}</td>

                    <td>${item.status}</td>

                </tr>

            `;

        });

    },
    renderPurchases() {

    const tbody = Helper.id("reportTableBody");

    const purchases = Storage.get(
        CONSTANTS.STORAGE_KEYS.PURCHASES,
        Database.purchases
    );

    tbody.innerHTML = "";

    purchases.forEach(item => {

        tbody.innerHTML += `

            <tr>

                <td>${item.invoice}</td>

                <td>${item.supplier}</td>

                <td>${item.item}</td>

                <td>Rs. ${item.total.toLocaleString()}</td>

                <td>${item.date}</td>

                <td>${item.status}</td>

            </tr>

        `;

    });

},
    renderExpenses() {

        const tbody = Helper.id("reportTableBody");

        const expenses = Storage.get(
            CONSTANTS.STORAGE_KEYS.EXPENSES,
            Database.expenses
        );

        tbody.innerHTML = "";

        expenses.forEach(item => {

            tbody.innerHTML += `

                <tr>

                    <td>${item.receipt}</td>

                    <td>${item.category}</td>

                    <td>${item.title}</td>

                    <td>Rs. ${item.amount.toLocaleString()}</td>

                    <td>${item.date}</td>

                    <td>${item.status}</td>

                </tr>

            `;

        });

    },
    renderDelivery() {

        const tbody = Helper.id("reportTableBody");

        const deliveries = Storage.get(
            CONSTANTS.STORAGE_KEYS.DELIVERIES,
            Database.deliveries
        );

        tbody.innerHTML = "";

        deliveries.forEach(item => {

            tbody.innerHTML += `

                <tr>

                    <td>${item.order}</td>

                    <td>${item.customer}</td>

                    <td>${item.rider}</td>

                    <td>${item.eta}</td>

                    <td>${item.address}</td>

                    <td>${item.status}</td>

                </tr>

            `;

        });

    },
    renderEmployees() {

        const tbody = Helper.id("reportTableBody");

        const employees = Storage.get(
            CONSTANTS.STORAGE_KEYS.EMPLOYEES,
            Database.employees
        );

        tbody.innerHTML = "";

        employees.forEach(employee => {

            tbody.innerHTML += `

                <tr>

                    <td>${employee.id}</td>

                    <td>${employee.name}</td>

                    <td>${employee.designation}</td>

                    <td>${employee.department}</td>

                    <td>${employee.phone}</td>

                    <td>${employee.status}</td>

                </tr>

            `;

        });

    },
    printReport() {

        window.print();
    }
};

document.addEventListener("DOMContentLoaded", () => {

    Reports.init();

});