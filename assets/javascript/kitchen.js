"use strict";

const Kitchen = {

    orders: [],

    filteredOrders: [],

    selectedOrder: null,

    init() {

        this.loadOrders();

        this.initializeFilters();

        this.initializeRefresh();

        this.initializeModalButtons();

    },

    loadOrders() {

        this.orders = Storage.get(

            CONSTANTS.STORAGE_KEYS.ORDERS,

            Database.orders

        );

        this.orders.forEach(order => {

            if (!order.priority) {

                order.priority = "Normal";

            }

            if (!order.notes) {

                order.notes = "";

            }

        });

        this.filteredOrders = this.orders.filter(order =>
            order.status !== CONSTANTS.ORDER_STATUS.SERVED
            );

        this.renderOrders();

        this.updateSummary();

    },

    renderOrders() {

        const container = Helper.id("kitchenOrders");

        if (!container) return;

        container.innerHTML = "";

        if (this.filteredOrders.length === 0) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="alert alert-warning">

                        No Kitchen Orders Found.

                    </div>

                </div>

            `;

            return;

        }

        this.filteredOrders.forEach(order => {

            const image = order.items[0]?.image || "assets/images/no-image.jpg";

            const elapsed = this.getElapsedTime(order.createdAt);

            container.innerHTML += `

            <div class="col-lg-4 col-md-6">

                <div class="kitchen-order-card">

                    <img
                        src="${image}"
                        alt="${order.items[0]?.name}">

                    <div class="kitchen-order-body">

                        <div class="d-flex justify-content-between mb-3">

                            <h5>

                                #${order.id}

                            </h5>

                            <span class="kitchen-status status-${order.status.toLowerCase()}">

                                ${order.status}

                            </span>

                        </div>

                        <p>

                            <strong>Customer:</strong>

                            ${order.customer}

                        </p>

                        <p>

                            <strong>Order Type:</strong>

                            ${order.orderType}

                        </p>

                        <p>

                            <strong>Items:</strong>

                            ${order.items.length}

                        </p>

                        <p>

                            <strong>Priority:</strong>

                            <span class="kitchen-status priority-${order.priority.toLowerCase()}">

                                ${order.priority}

                            </span>

                        </p>

                        <p>

                            <strong>Timer:</strong>

                            <span class="kitchen-timer">

                                ${elapsed}

                            </span>

                        </p>

                        <button

                            class="btn btn-danger w-100 mt-3 kitchen-view-btn"

                            data-id="${order.id}">

                            View Order

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        this.initializeViewButtons();

    },

    updateSummary() {

        Helper.id("pendingCount").textContent =

            this.orders.filter(

                order => order.status === CONSTANTS.ORDER_STATUS.PENDING

            ).length;

        Helper.id("preparingCount").textContent =

            this.orders.filter(

                order => order.status === CONSTANTS.ORDER_STATUS.PREPARING

            ).length;

        Helper.id("readyCount").textContent =

            this.orders.filter(

                order => order.status === CONSTANTS.ORDER_STATUS.READY

            ).length;

        Helper.id("servedCount").textContent =

            this.orders.filter(

                order => order.status === CONSTANTS.ORDER_STATUS.SERVED

            ).length;

    },

    initializeFilters() {

        const search = Helper.id("kitchenSearch");

        const status = Helper.id("kitchenStatus");

        const priority = Helper.id("priorityFilter");

        [search, status, priority].forEach(element => {

            element.addEventListener("input", () => {

                this.filterOrders();

            });

            element.addEventListener("change", () => {

                this.filterOrders();

            });

        });

        Helper.id("clearKitchenFilters")

        .addEventListener("click", () => {

            search.value = "";

            status.value = "All";

            priority.value = "All";

            this.filterOrders();

        });

    },

    filterOrders() {

        const keyword =

            Helper.id("kitchenSearch")

            .value

            .trim()

            .toLowerCase();

        const status =

            Helper.id("kitchenStatus").value;

        const priority =

            Helper.id("priorityFilter").value;

        this.filteredOrders = this.orders.filter(order => {

            const matchSearch =

                String(order.id).includes(keyword) ||

                order.customer.toLowerCase().includes(keyword);

            const matchStatus =

                status === "All" ||

                order.status === status;

            const matchPriority =

                priority === "All" ||

                order.priority === priority;

            return (

                matchSearch &&

                matchStatus &&

                matchPriority

            );

        });

        this.renderOrders();

    },

    initializeViewButtons() {

        document.querySelectorAll(".kitchen-view-btn")

        .forEach(button => {

            button.addEventListener("click", () => {

                this.openModal(

                    Number(button.dataset.id)

                );

            });

        });

    },

        openModal(orderId) {

        this.selectedOrder = this.orders.find(

            order => order.id === orderId

        );

        if (!this.selectedOrder) return;

        Helper.id("modalKitchenTitle").textContent =
            `Order #${this.selectedOrder.id}`;

        Helper.id("modalKitchenCustomer").textContent =
            this.selectedOrder.customer;

        Helper.id("modalKitchenOrderType").textContent =
            this.selectedOrder.orderType;

        Helper.id("modalKitchenPayment").textContent =
            this.selectedOrder.payment;

        Helper.id("modalKitchenTotal").textContent =
            formatCurrency(this.selectedOrder.subtotal);

        Helper.id("modalKitchenTime").textContent =
            this.selectedOrder.createdAt;

        Helper.id("modalKitchenImage").src =
            this.selectedOrder.items[0]?.image ||
            "assets/images/no-image.jpg";

        Helper.id("modalKitchenPriority").value =
            this.selectedOrder.priority;

        Helper.id("modalKitchenStatus").value =
            this.selectedOrder.status;

        Helper.id("modalKitchenNotes").value =
            this.selectedOrder.notes;

        const items = Helper.id("modalKitchenItems");

        items.innerHTML = "";

        this.selectedOrder.items.forEach(item => {

            items.innerHTML += `

                <div class="d-flex justify-content-between border-bottom py-2">

                    <span>

                        ${item.name}

                    </span>

                    <span>

                        × ${item.quantity}

                    </span>

                </div>

            `;

        });

        const modal = new bootstrap.Modal(

            Helper.id("kitchenModal")

        );

        modal.show();

    },

    initializeModalButtons() {

        Helper.id("preparingBtn")

        .addEventListener("click", () => {

            this.changeStatus(

                CONSTANTS.ORDER_STATUS.PREPARING

            );

        });

        Helper.id("readyBtn")

        .addEventListener("click", () => {

            this.changeStatus(

                CONSTANTS.ORDER_STATUS.READY

            );

        });

        Helper.id("servedBtn")

        .addEventListener("click", () => {

            this.changeStatus(

                CONSTANTS.ORDER_STATUS.SERVED

            );

        });

        Helper.id("saveKitchenBtn")

        .addEventListener("click", () => {

            if (!this.selectedOrder) return;

            this.selectedOrder.priority =

                Helper.id("modalKitchenPriority").value;

            this.selectedOrder.status =

                Helper.id("modalKitchenStatus").value;

            this.selectedOrder.notes =

                Helper.id("modalKitchenNotes").value;

            Storage.save(

                CONSTANTS.STORAGE_KEYS.ORDERS,

                this.orders

            );

            this.filteredOrders = this.orders.filter(order =>
                order.status !== CONSTANTS.ORDER_STATUS.SERVED
            );

            this.renderOrders();

            this.updateSummary();

            bootstrap.Modal

            .getInstance(

                Helper.id("kitchenModal")

            ).hide();

            Toast.show(

                "Kitchen order updated",

                "success"

            );

        });

    },

    changeStatus(status) {

        if (!this.selectedOrder) return;

        this.selectedOrder.status = status;

        Helper.id("modalKitchenStatus").value = status;

        Storage.save(

            CONSTANTS.STORAGE_KEYS.ORDERS,

            this.orders

        );

        this.filteredOrders = this.orders.filter(order =>
            order.status !== CONSTANTS.ORDER_STATUS.SERVED
        );

        this.renderOrders();

        this.updateSummary();

       if (status === CONSTANTS.ORDER_STATUS.SERVED) {

        Toast.show(
            `Order #${this.selectedOrder.id} completed`,
            "success"
        );

    } 
        else {

            Toast.show(
                "Order status updated",
                "success"
            );

        }

    },

    initializeRefresh() {

        const button = Helper.id("refreshKitchen");

        if (!button) return;

        button.addEventListener("click", () => {

            this.loadOrders();

            Toast.show(

                "Kitchen refreshed",

                "success"

            );

        });

    },

    getElapsedTime(createdAt) {

        if (!createdAt) return "--";

        const created = new Date(createdAt);

        const now = new Date();

        const difference =

            Math.floor(

                (now - created) / 1000

            );

        const hours =

            Math.floor(

                difference / 3600

            );

        const minutes =

            Math.floor(

                (difference % 3600) / 60

            );

        if (hours > 0) {

            return `${hours}h ${minutes}m`;

        }

        return `${minutes}m`;

    },

    startKitchenTimer() {

        setInterval(() => {

            this.renderOrders();

        }, 60000);

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Kitchen.init();

    Kitchen.startKitchenTimer();

});


