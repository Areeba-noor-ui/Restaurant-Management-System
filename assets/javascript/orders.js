"use strict";

const Orders = {

    orders: [],

    filteredOrders: [],

    selectedOrder: null,

    init() {

        this.orders = Storage.get(
            CONSTANTS.STORAGE_KEYS.ORDERS,
            Database.orders
        );

        this.filteredOrders = [...this.orders];

        this.renderOrders();

        this.updateSummary();

        this.initializeFilters();

        this.initializeRefresh();

        this.initializeModalButtons();

    },
    renderOrders() {

    const body = Helper.id("ordersTableBody");

    if (!body) return;

    body.innerHTML = "";

    if (this.filteredOrders.length === 0) {

        body.innerHTML = `

        <tr>

            <td colspan="8" class="text-center">

                No Orders Found

            </td>

        </tr>

        `;

        return;

    }

    this.filteredOrders.forEach(order => {

        body.innerHTML += `

        <tr>

            <td>#${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.orderType}</td>

            <td>${order.payment}</td>

            <td>${formatCurrency(order.subtotal)}</td>

            <td>

                <span class="badge bg-primary">

                    ${order.status}

                </span>

            </td>

            <td>${order.createdAt}</td>

            <td>

                <button
                    class="btn btn-sm btn-primary view-order"
                    data-id="${order.id}">

                    View

                </button>

            </td>

        </tr>

        `;

    });

    this.initializeViewButtons();

    },

    updateSummary() {

        Helper.id("totalOrders").textContent =
            this.orders.length;

        Helper.id("pendingOrders").textContent =
            this.orders.filter(order =>
                order.status === CONSTANTS.ORDER_STATUS.PENDING
            ).length;

        Helper.id("preparingOrders").textContent =
            this.orders.filter(order =>
                order.status === CONSTANTS.ORDER_STATUS.PREPARING
            ).length;

        Helper.id("completedOrders").textContent =
            this.orders.filter(order =>
                order.status === CONSTANTS.ORDER_STATUS.COMPLETED
            ).length;

        const revenue = this.orders.reduce(

            (sum, order) => sum + order.subtotal,

            0

        );

        Helper.id("totalRevenue").textContent =
            formatCurrency(revenue);

    },


    initializeViewButtons() {

        document.querySelectorAll(".view-order").forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(button.dataset.id);

                this.openOrderModal(id);

            });

        });

    },


    openOrderModal(orderId) {

        this.selectedOrder = this.orders.find(

            order => order.id === orderId

        );

        if (!this.selectedOrder) return;

        Helper.id("modalOrderTitle").textContent =
            `Order #${this.selectedOrder.id}`;

        Helper.id("modalCustomer").textContent =
            this.selectedOrder.customer;

        Helper.id("modalOrderType").textContent =
            this.selectedOrder.orderType;

        Helper.id("modalPayment").textContent =
            this.selectedOrder.payment;

        Helper.id("modalDate").textContent =
            this.selectedOrder.createdAt;

        Helper.id("modalTotal").textContent =
            formatCurrency(this.selectedOrder.subtotal);

        Helper.id("modalStatus").value =
            this.selectedOrder.status;

        const items = Helper.id("modalItems");

        items.innerHTML = "";

        this.selectedOrder.items.forEach(item => {

            items.innerHTML += `

            <div class="d-flex justify-content-between mb-2">

                <span>

                    ${item.name}

                    ×

                    ${item.quantity}

                </span>

                <strong>

                    ${formatCurrency(item.price * item.quantity)}

                </strong>

            </div>

            `;

        });

        new bootstrap.Modal(

            Helper.id("orderModal")

        ).show();

    },


    initializeFilters() {

        Helper.id("orderSearch")
            .addEventListener("input", () => {

            this.filterOrders();

        });

        Helper.id("statusFilter")
            .addEventListener("change", () => {

            this.filterOrders();

        });

        Helper.id("paymentFilter")
            .addEventListener("change", () => {

            this.filterOrders();

        });

    },


    filterOrders() {

        const keyword =
            Helper.id("orderSearch")
            .value
            .trim()
            .toLowerCase();

        const status =
            Helper.id("statusFilter").value;

        const payment =
            Helper.id("paymentFilter").value;

        this.filteredOrders = this.orders.filter(order => {

            const searchMatch =

                order.customer.toLowerCase().includes(keyword)

                ||

                String(order.id).includes(keyword);

            const statusMatch =

                status === "All"

                ||

                order.status === status;

            const paymentMatch =

                payment === "All"

                ||

                order.payment === payment;

            return (

                searchMatch

                &&

                statusMatch

                &&

                paymentMatch

            );

        });

        this.renderOrders();

    },


    initializeModalButtons() {

        Helper.id("saveStatusBtn")
            .addEventListener("click", () => {

            if (!this.selectedOrder) return;

            this.selectedOrder.status =
                Helper.id("modalStatus").value;

            Storage.save(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                this.orders

            );

            this.renderOrders();

            this.updateSummary();

            bootstrap.Modal
                .getInstance(
                    Helper.id("orderModal")
                )
                .hide();

            Toast.show(

                "Order Updated",

                "success"

            );

        });

        Helper.id("deleteOrderBtn")
            .addEventListener("click", () => {

            if (!this.selectedOrder) return;

            if (!confirm("Delete this order?"))

                return;

            this.orders = this.orders.filter(

                order =>

                order.id !== this.selectedOrder.id

            );

            Storage.save(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                this.orders

            );

            this.filteredOrders = [...this.orders];

            this.renderOrders();

            this.updateSummary();

            bootstrap.Modal
                .getInstance(
                    Helper.id("orderModal")
                )
                .hide();

            Toast.show(

                "Order Deleted",

                "danger"

            );

        });

    },


    initializeRefresh() {

        Helper.id("refreshOrders")
            .addEventListener("click", () => {

            this.orders = Storage.get(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                Database.orders

            );

            this.filteredOrders = [...this.orders];

            this.renderOrders();

            this.updateSummary();

            Toast.show(

                "Orders Refreshed",

                "success"

            );

        });

    },

}

document.addEventListener("DOMContentLoaded", () => {

    Orders.init();

});

