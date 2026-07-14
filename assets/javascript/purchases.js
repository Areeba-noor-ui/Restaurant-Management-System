"use strict";

const Purchases = {

    purchases: [],

    filteredPurchases: [],

    editingPurchaseId: null,

    purchaseChart: null,

    paymentChart: null,

    

    init() {

        this.loadPurchases();

        this.populateSupplierFilter();

        this.renderTable();

        this.updateBudgetProgress();

        this.renderPurchaseChart();

        this.renderPaymentChart();

        this.renderTimeline();

        this.initializeSearch();

        this.initializeFilters();

        this.initializeButtons();

    },

    loadPurchases() {

        this.purchases = Storage.get(

            CONSTANTS.STORAGE_KEYS.PURCHASES,

            Database.purchases || []

        );

        if (!Array.isArray(this.purchases)) {

            this.purchases = [];

        }

        this.filteredPurchases = [...this.purchases];

    },

    savePurchases() {

        Storage.save(

            CONSTANTS.STORAGE_KEYS.PURCHASES,

            this.purchases

        );

    },

    renderTable() {

        const tbody = Helper.id("purchaseTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredPurchases.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="8" class="text-center py-5 text-muted">

                        No purchase records found.

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredPurchases.forEach(purchase => {

            tbody.innerHTML += `

                <tr>

                    <td>${purchase.invoice}</td>

                    <td>${purchase.supplier}</td>

                    <td>${(purchase.items || "").split(",").filter(item => item.trim() !== "").length} Items</td>

                    <td>Rs. ${purchase.total.toLocaleString()}</td>

                    <td>${purchase.date}</td>

                    <td>

                        <span class="badge bg-info">

                            ${purchase.payment}

                        </span>

                    </td>

                    <td>

                        <span class="badge ${this.getStatusClass(purchase.status)}">

                            ${purchase.status}

                        </span>

                    </td>

                    <td>

                        <button

                            class="btn btn-sm btn-primary purchase-view"

                            data-id="${purchase.id}">

                            <i class="bi bi-eye-fill"></i>

                        </button>

                        <button

                            class="btn btn-sm btn-warning purchase-edit"

                            data-id="${purchase.id}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button

                            class="btn btn-sm btn-danger purchase-delete"

                            data-id="${purchase.id}">

                            <i class="bi bi-trash-fill"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

        this.initializeActionButtons();

    },

    getStatusClass(status) {

        switch (status) {

            case "Completed":

                return "bg-success";

            case "Pending":

                return "bg-warning text-dark";

            case "Cancelled":

                return "bg-danger";

            default:

                return "bg-secondary";

        }

    },

    populateSupplierFilter() {

        const supplierFilter = Helper.id("supplierFilter");

        if (!supplierFilter) return;

        supplierFilter.innerHTML = `

            <option value="All">

                All Suppliers

            </option>

        `;

        const suppliers = [

            ...new Set(

                this.purchases.map(purchase => purchase.supplier)

            )

        ].sort();

        suppliers.forEach(supplier => {

            supplierFilter.innerHTML += `

                <option value="${supplier}">

                    ${supplier}

                </option>

            `;

        });

    },

    initializeSearch() {

        const search = Helper.id("purchaseSearch");

        if (!search) return;

        search.addEventListener("input", () => {

            this.applyFilters();

        });

    },

    initializeFilters() {

        const supplier = Helper.id("supplierFilter");

        const payment = Helper.id("paymentFilter");

        const date = Helper.id("purchaseDate");

        const refresh = Helper.id("refreshPurchases");

        supplier?.addEventListener("change", () => {

            this.applyFilters();

        });

        payment?.addEventListener("change", () => {

            this.applyFilters();

        });

        date?.addEventListener("change", () => {

            this.applyFilters();

        });

        refresh?.addEventListener("click", () => {

            Helper.id("purchaseSearch").value = "";

            supplier.value = "All";

            payment.value = "All";

            date.value = "";

            this.filteredPurchases = [...this.purchases];

            this.renderTable();

            Toast.show(

                "Purchase list refreshed",

                "success"

            );

        });

    },

    applyFilters() {

        const keyword = Helper.id("purchaseSearch")

            .value

            .trim()

            .toLowerCase();

        const supplier =

            Helper.id("supplierFilter").value;

        const payment =

            Helper.id("paymentFilter").value;

        const date =

            Helper.id("purchaseDate").value;

        this.filteredPurchases = this.purchases.filter(purchase => {

            const matchSearch =

                purchase.invoice

                    .toLowerCase()

                    .includes(keyword) ||

                purchase.supplier

                    .toLowerCase()

                    .includes(keyword);

            const matchSupplier =

                supplier === "All" ||

                purchase.supplier === supplier;

            const matchPayment =

                payment === "All" ||

                purchase.payment === payment;

            const matchDate =

                date === "" ||

                purchase.date === date;

            return (

                matchSearch &&

                matchSupplier &&

                matchPayment &&

                matchDate

            );

        });

        this.renderTable();

    },

    updateBudgetProgress() {

        const progress = Helper.id("budgetProgress");

        const amount = Helper.id("budgetAmount");

        if (!progress || !amount) return;

        const budget = 1000000;

        const spent = this.purchases.reduce(

            (sum, purchase) => sum + purchase.total,

            0

        );

        const percentage =

            Math.min((spent / budget) * 100, 100);

        progress.style.width = `${percentage}%`;

        progress.textContent = `${percentage.toFixed(0)}%`;

        amount.textContent =

            `Rs. ${spent.toLocaleString()} / Rs. ${budget.toLocaleString()}`;

    },

    renderPurchaseChart() {

        const canvas = Helper.id("purchaseChart");

        if (!canvas) return;

        if (this.purchaseChart) {

            this.purchaseChart.destroy();

        }

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const monthlyTotals = new Array(12).fill(0);

        this.purchases.forEach(purchase => {

            const date = new Date(purchase.date);

            if (isNaN(date)) return;

            monthlyTotals[date.getMonth()] += purchase.total;

        });

        this.purchaseChart = new Chart(canvas, {

            type: "bar",

            data: {

                labels: months,

                datasets: [

                    {

                        label: "Purchase Amount",

                        data: monthlyTotals,

                        borderWidth: 1,

                        borderRadius: 8

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    },

    renderPaymentChart() {

        const canvas = Helper.id("paymentChart");

        if (!canvas) return;

        if (this.paymentChart) {

            this.paymentChart.destroy();

        }

        const paid = this.purchases.filter(

            purchase => purchase.payment === "Paid"

        ).length;

        const pending = this.purchases.filter(

            purchase => purchase.payment === "Pending"

        ).length;

        const partial = this.purchases.filter(

            purchase => purchase.payment === "Partial"

        ).length;

        this.paymentChart = new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Paid",

                    "Pending",

                    "Partial"

                ],

                datasets: [

                    {

                        data: [

                            paid,

                            pending,

                            partial

                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    },

    renderTimeline() {

        const timeline = Helper.id("purchaseTimeline");

        if (!timeline) return;

        timeline.innerHTML = "";

        if (this.purchases.length === 0) {

            timeline.innerHTML = `

                <p class="text-muted mb-0">

                    No recent purchase activity.

                </p>

            `;

            return;

        }

        const recentPurchases = [...this.purchases]

            .sort((a, b) => new Date(b.date) - new Date(a.date))

            .slice(0, 5);

        recentPurchases.forEach(purchase => {

            timeline.innerHTML += `

                <div class="d-flex justify-content-between align-items-center border-bottom py-3">

                    <div>

                        <h6 class="mb-1">

                            ${purchase.invoice}

                        </h6>

                        <small class="text-muted">

                            ${purchase.supplier}

                        </small>

                    </div>

                    <div class="text-end">

                        <strong>

                            Rs. ${purchase.total.toLocaleString()}

                        </strong>

                        <br>

                        <small class="text-muted">

                            ${purchase.date}

                        </small>

                    </div>

                </div>

            `;

        });

    },

    initializeButtons() {

        const addButton = Helper.id("addPurchaseBtn");

        if (addButton) {

            addButton.addEventListener("click", () => {

                this.editingPurchaseId = null;

                Helper.id("purchaseModalTitle").textContent =
                    "Add Purchase";

                Helper.id("purchaseInvoice").value = "";

                Helper.id("purchaseSupplier").value = "";

                Helper.id("purchaseDateInput").value = "";

                Helper.id("purchasePayment").value = "Paid";

                Helper.id("purchaseTotal").value = "";

                Helper.id("purchaseStatus").value = "Completed";

                Helper.id("purchaseItems").value = "";

                Helper.id("purchaseNotes").value = "";

                new bootstrap.Modal(
                    Helper.id("purchaseModal")
                ).show();

            });

        }

        const saveButton = Helper.id("savePurchaseBtn");

        if (!saveButton || saveButton.dataset.initialized) return;

        saveButton.dataset.initialized = "true";

        saveButton.addEventListener("click", () => {

            const purchase = {

                id: this.editingPurchaseId || Date.now(),

                invoice: Helper.id("purchaseInvoice").value.trim(),

                supplier: Helper.id("purchaseSupplier").value.trim(),

                date: Helper.id("purchaseDateInput").value,

                payment: Helper.id("purchasePayment").value,

                total: Number(Helper.id("purchaseTotal").value),

                status: Helper.id("purchaseStatus").value,

                items: Helper.id("purchaseItems").value.trim(),

                notes: Helper.id("purchaseNotes").value.trim()

            };

            if (

                purchase.invoice === "" ||

                purchase.supplier === "" ||

                purchase.total <= 0

            ) {

                Toast.show(

                    "Please complete all required fields",

                    "warning"

                );

                return;

            }

            if (this.editingPurchaseId) {

                const index = this.purchases.findIndex(

                    item => item.id === this.editingPurchaseId

                );

                this.purchases[index] = purchase;

                Toast.show(

                    "Purchase updated successfully",

                    "success"

                );

            }

            else {

                this.purchases.push(purchase);

                Toast.show(

                    "Purchase added successfully",

                    "success"

                );

            }

            this.savePurchases();

            this.filteredPurchases = [...this.purchases];

            this.populateSupplierFilter();

            this.renderTable();

            this.updateBudgetProgress();

            this.renderPurchaseChart();

            this.renderPaymentChart();

            this.renderTimeline();

            bootstrap.Modal
                .getInstance(
                    Helper.id("purchaseModal")
                )
                .hide();

        });

    },

    editPurchase(id) {

        const purchase = this.purchases.find(

            item => item.id === id

        );

        if (!purchase) return;

        this.editingPurchaseId = id;

        Helper.id("purchaseModalTitle").textContent =
            "Edit Purchase";

        Helper.id("purchaseInvoice").value =
            purchase.invoice;

        Helper.id("purchaseSupplier").value =
            purchase.supplier;

        Helper.id("purchaseDateInput").value =
            purchase.date;

        Helper.id("purchasePayment").value =
            purchase.payment;

        Helper.id("purchaseTotal").value =
            purchase.total;

        Helper.id("purchaseStatus").value =
            purchase.status;

        Helper.id("purchaseItems").value =
            purchase.items;

        Helper.id("purchaseNotes").value =
            purchase.notes;

        new bootstrap.Modal(

            Helper.id("purchaseModal")

        ).show();

    },

     initializeActionButtons() {

        document.querySelectorAll(".purchase-view").forEach(button => {

            button.addEventListener("click", () => {

                this.viewPurchase(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".purchase-edit").forEach(button => {

            button.addEventListener("click", () => {

                this.editPurchase(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".purchase-delete").forEach(button => {

            button.addEventListener("click", () => {

                if (!confirm("Delete this purchase?")) return;

                const id = Number(button.dataset.id);

                this.purchases = this.purchases.filter(

                    purchase => purchase.id !== id

                );

                this.savePurchases();

                this.filteredPurchases = [...this.purchases];

                this.populateSupplierFilter();

                this.renderTable();

                this.updateBudgetProgress();

                this.renderPurchaseChart();

                this.renderPaymentChart();

                this.renderTimeline();

                Toast.show(

                    "Purchase deleted successfully",

                    "success"

                );

            });

        });

    },

    viewPurchase(id) {

        const purchase = this.purchases.find(

            item => item.id === id

        );

        if (!purchase) return;

        Helper.id("viewPurchaseInvoice").textContent =
            purchase.invoice;

        Helper.id("viewPurchaseSupplier").textContent =
            purchase.supplier;

        Helper.id("viewPurchaseDate").textContent =
            purchase.date;

        Helper.id("viewPurchasePayment").textContent =
            purchase.payment;

        Helper.id("viewPurchaseTotal").textContent =
            `Rs. ${purchase.total.toLocaleString()}`;

        Helper.id("viewPurchaseStatus").textContent =
            purchase.status;

        Helper.id("viewPurchaseItems").innerHTML =
            purchase.items
                .split(",")
                .map(item => `<div>${item.trim()}</div>`)
                .join("");

        Helper.id("viewPurchaseNotes").textContent =
            purchase.notes || "-";

        new bootstrap.Modal(

            Helper.id("viewPurchaseModal")

        ).show();

    },
}

    document.addEventListener("DOMContentLoaded", () => {

        Purchases.init();

    });