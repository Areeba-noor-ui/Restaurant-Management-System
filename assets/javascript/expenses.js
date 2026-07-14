"use strict";

const Expenses = {

    expenses: [],

    filteredExpenses: [],

    editingExpenseId: null,

    init() {

        this.loadExpenses();

        this.renderTable();

        this.initializeCharts();

        this.renderTimeline();

        this.initializeSearch();

        this.initializeFilters();

        this.initializeButtons();

    },

    loadExpenses() {

        this.expenses = Storage.get(

            CONSTANTS.STORAGE_KEYS.EXPENSES,

            Database.expenses || []

        );

        if (!Array.isArray(this.expenses)) {

            this.expenses = [];

        }

        this.filteredExpenses = [...this.expenses];

    },

    saveExpenses() {

        Storage.save(

            CONSTANTS.STORAGE_KEYS.EXPENSES,

            this.expenses

        );

    },

    renderTable() {

        const tbody = Helper.id("expenseTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredExpenses.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="8" class="text-center py-5 text-muted">

                        No expense records found.

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredExpenses.forEach(expense => {

            tbody.innerHTML += `

                <tr>

                    <td>${expense.receipt}</td>

                    <td>${expense.category}</td>

                    <td>${expense.title}</td>

                    <td>Rs. ${expense.amount.toLocaleString()}</td>

                    <td>${expense.date}</td>

                    <td>

                        <span class="badge bg-info">

                            ${expense.payment}

                        </span>

                    </td>

                    <td>

                        <span class="badge ${this.getStatusClass(expense.status)}">

                            ${expense.status}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-sm btn-primary expense-view"
                            data-id="${expense.id}">

                            <i class="bi bi-eye-fill"></i>

                        </button>

                        <button
                            class="btn btn-sm btn-warning expense-edit"
                            data-id="${expense.id}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button
                            class="btn btn-sm btn-danger expense-delete"
                            data-id="${expense.id}">

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

    initializeCharts() {

    const monthlyCanvas = Helper.id("expenseChart");
    const categoryCanvas = Helper.id("categoryChart");

    if (monthlyCanvas) {

        const monthlyTotal = {};

        this.expenses.forEach(expense => {

            const month = expense.date.substring(0, 7);

            monthlyTotal[month] =
                (monthlyTotal[month] || 0) + expense.amount;

        });

        new Chart(monthlyCanvas, {

            type: "line",

            data: {

                labels: Object.keys(monthlyTotal),

                datasets: [{

                    label: "Expenses",

                    data: Object.values(monthlyTotal),

                    borderColor: "#dc3545",

                    backgroundColor: "rgba(220,53,69,.15)",

                    fill: true,

                    tension: .35

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

    }

    if (categoryCanvas) {

        const categoryTotals = {};

        this.expenses.forEach(expense => {

            categoryTotals[expense.category] =
                (categoryTotals[expense.category] || 0) + expense.amount;

        });

        new Chart(categoryCanvas, {

            type: "doughnut",

            data: {

                labels: Object.keys(categoryTotals),

                datasets: [{

                    data: Object.values(categoryTotals)

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

    }

    },

    renderTimeline() {

    const timeline = Helper.id("expenseTimeline");

    if (!timeline) return;

    timeline.innerHTML = "";

    const latest = [...this.expenses]

        .sort((a, b) => new Date(b.date) - new Date(a.date))

        .slice(0, 5);

    latest.forEach(expense => {

        timeline.innerHTML += `

            <div class="d-flex justify-content-between align-items-center border-bottom py-3">

                <div>

                    <strong>${expense.title}</strong>

                    <div class="text-muted small">

                        ${expense.category}

                    </div>

                </div>

                <div class="text-end">

                    <strong>

                        Rs. ${expense.amount.toLocaleString()}

                    </strong>

                    <div class="text-muted small">

                        ${expense.date}

                    </div>

                </div>

            </div>

        `;

    });

    },

    initializeSearch() {

    const search = Helper.id("expenseSearch");

    if (!search) return;

    search.addEventListener("input", () => {

        this.applyFilters();

    });

    },

    initializeFilters() {

    const category = Helper.id("categoryFilter");

    const payment = Helper.id("paymentFilter");

    const date = Helper.id("expenseDate");

    const refresh = Helper.id("refreshExpenses");

    if (category) {

        category.addEventListener("change", () => {

            this.applyFilters();

        });

    }

    if (payment) {

        payment.addEventListener("change", () => {

            this.applyFilters();

        });

    }

    if (date) {

        date.addEventListener("change", () => {

            this.applyFilters();

        });

    }

    if (refresh) {

        refresh.addEventListener("click", () => {

            Helper.id("expenseSearch").value = "";

            category.value = "All";

            payment.value = "All";

            date.value = "";

            this.filteredExpenses = [...this.expenses];

            this.renderTable();

            this.renderTimeline();

            Toast.show(

                "Expense list refreshed",

                "success"

            );

        });

    }

    },

    applyFilters() {

    const keyword =

        Helper.id("expenseSearch")

        .value

        .trim()

        .toLowerCase();

    const category =

        Helper.id("categoryFilter").value;

    const payment =

        Helper.id("paymentFilter").value;

    const date =

        Helper.id("expenseDate").value;

    this.filteredExpenses =

        this.expenses.filter(expense => {

            const matchSearch =

                expense.title

                .toLowerCase()

                .includes(keyword)

                ||

                expense.receipt

                .toLowerCase()

                .includes(keyword);

            const matchCategory =

                category === "All"

                ||

                expense.category === category;

            const matchPayment =

                payment === "All"

                ||

                expense.payment === payment;

            const matchDate =

                date === ""

                ||

                expense.date === date;

            return (

                matchSearch &&

                matchCategory &&

                matchPayment &&

                matchDate

            );

        });

    this.renderTable();

    },

    initializeButtons() {

    const addButton = Helper.id("addExpenseBtn");

    if (!addButton) return;

    addButton.addEventListener("click", () => {

        this.editingExpenseId = null;

        Helper.id("expenseModalTitle").textContent =
            "Add Expense";

        Helper.id("expenseReceipt").value = "";

        Helper.id("expenseCategory").selectedIndex = 0;

        Helper.id("expenseTitle").value = "";

        Helper.id("expenseAmount").value = "";

        Helper.id("expenseDateInput").value = "";

        Helper.id("expensePayment").selectedIndex = 0;

        Helper.id("expenseStatus").selectedIndex = 0;

        Helper.id("expenseNotes").value = "";

        new bootstrap.Modal(

            Helper.id("expenseModal")

        ).show();

    });

    },

    initializeActionButtons() {

    document.querySelectorAll(".expense-view").forEach(button => {

        button.addEventListener("click", () => {

            this.viewExpense(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".expense-edit").forEach(button => {

        button.addEventListener("click", () => {

            this.editExpense(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".expense-delete").forEach(button => {

        button.addEventListener("click", () => {

            if (!confirm("Delete this expense?")) return;

            const id = Number(button.dataset.id);

            this.expenses = this.expenses.filter(

                expense => expense.id !== id

            );

            this.saveExpenses();

            this.filteredExpenses = [...this.expenses];

            this.renderTable();

            this.initializeCharts();

            this.renderTimeline();

            Toast.show(

                "Expense deleted successfully",

                "success"

            );

        });

    });

    const saveButton = Helper.id("saveExpenseBtn");

    if (!saveButton || saveButton.dataset.initialized) return;

    saveButton.dataset.initialized = "true";

    saveButton.addEventListener("click", () => {

        const expense = {

            id: this.editingExpenseId || Date.now(),

            receipt: Helper.id("expenseReceipt").value.trim(),

            category: Helper.id("expenseCategory").value,

            title: Helper.id("expenseTitle").value.trim(),

            amount: Number(

                Helper.id("expenseAmount").value

            ),

            date: Helper.id("expenseDateInput").value,

            payment: Helper.id("expensePayment").value,

            status: Helper.id("expenseStatus").value,

            notes: Helper.id("expenseNotes").value.trim()

        };

        if (

            expense.receipt === "" ||

            expense.title === ""

        ) {

            Toast.show(

                "Please complete required fields",

                "warning"

            );

            return;

        }

        if (this.editingExpenseId) {

            const index = this.expenses.findIndex(

                item => item.id === this.editingExpenseId

            );

            this.expenses[index] = expense;

            Toast.show(

                "Expense updated",

                "success"

            );

        }

        else {

            this.expenses.push(expense);

            Toast.show(

                "Expense added",

                "success"

            );

        }

        this.saveExpenses();

        this.filteredExpenses = [...this.expenses];

        this.renderTable();

        this.initializeCharts();

        this.renderTimeline();

        bootstrap.Modal

            .getInstance(

                Helper.id("expenseModal")

            )

            .hide();

    });

    },

    viewExpense(id) {

    const expense = this.expenses.find(item => item.id === id);

    if (!expense) return;

    Helper.id("viewExpenseReceipt").textContent =
        expense.receipt;

    Helper.id("viewExpenseCategory").textContent =
        expense.category;

    Helper.id("viewExpenseTitle").textContent =
        expense.title;

    Helper.id("viewExpenseAmount").textContent =
        `Rs. ${expense.amount.toLocaleString()}`;

    Helper.id("viewExpenseDate").textContent =
        expense.date;

    Helper.id("viewExpensePayment").textContent =
        expense.payment;

    Helper.id("viewExpenseStatus").textContent =
        expense.status;

    Helper.id("viewExpenseNotes").textContent =
        expense.notes;

    new bootstrap.Modal(

        Helper.id("viewExpenseModal")

    ).show();

    },

    editExpense(id) {

    const expense = this.expenses.find(item => item.id === id);

    if (!expense) return;

    this.editingExpenseId = id;

    Helper.id("expenseModalTitle").textContent =
        "Edit Expense";

    Helper.id("expenseReceipt").value =
        expense.receipt;

    Helper.id("expenseCategory").value =
        expense.category;

    Helper.id("expenseTitle").value =
        expense.title;

    Helper.id("expenseAmount").value =
        expense.amount;

    Helper.id("expenseDateInput").value =
        expense.date;

    Helper.id("expensePayment").value =
        expense.payment;

    Helper.id("expenseStatus").value =
        expense.status;

    Helper.id("expenseNotes").value =
        expense.notes;

    new bootstrap.Modal(

        Helper.id("expenseModal")

    ).show();

    }
};

document.addEventListener("DOMContentLoaded", () => {

    Expenses.init();

});