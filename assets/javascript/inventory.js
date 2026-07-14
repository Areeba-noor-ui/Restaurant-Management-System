"use strict";

const Inventory = {

    inventory: [],

    filteredInventory: [],

    editingInventoryId: null,

    init() {

        this.loadInventory();

        this.renderTable();

        this.updateSummaryCards();

        this.renderSupplierFilter();

        this.renderAlerts();

        this.initializeSearch();

        this.initializeFilters();

        this.initializeButtons();

    },

    loadInventory() {

        this.inventory = Storage.get(

            CONSTANTS.STORAGE_KEYS.INVENTORY,

            Database.inventory || []

        );

        if (!Array.isArray(this.inventory)) {

            this.inventory = [];

        }

        this.filteredInventory = [...this.inventory];

    },

    saveInventory() {

        Storage.save(

            CONSTANTS.STORAGE_KEYS.INVENTORY,

            this.inventory

        );

    },
        renderSupplierFilter() {

        const supplier = Helper.id("supplierFilter");

        if (!supplier) return;

        supplier.innerHTML = `

            <option value="All">

                All Suppliers

            </option>

        `;

        const suppliers = [

            ...new Set(

                this.inventory.map(item => item.supplier)

            )

        ];

        suppliers.sort();

        suppliers.forEach(name => {

            supplier.innerHTML += `

                <option>

                    ${name}

                </option>

            `;

        });

    },

        updateSummaryCards() {

        Helper.id("totalItems").textContent =

            this.inventory.length;

        Helper.id("lowStockItems").textContent =

            this.inventory.filter(

                item => item.status === "Low Stock"

            ).length;

        Helper.id("outStockItems").textContent =

            this.inventory.filter(

                item => item.status === "Out Of Stock"

            ).length;

        Helper.id("totalSuppliers").textContent =

            new Set(

                this.inventory.map(

                    item => item.supplier

                )

            ).size;

        Helper.id("expiringItems").textContent =

            this.inventory.filter(

                item => item.quantity <= 10

            ).length;

        const totalValue =

            this.inventory.reduce(

                (sum, item) =>

                    sum +

                    (item.quantity * item.purchasePrice),

                0

            );

        Helper.id("inventoryValue").textContent =

            `Rs. ${totalValue.toLocaleString()}`;

    },

        renderAlerts() {

        const low = Helper.id("lowStockList");

        const out = Helper.id("outStockList");

        const expiry = Helper.id("expiryList");

        low.innerHTML = "";

        out.innerHTML = "";

        expiry.innerHTML = "";

        this.inventory

            .filter(item => item.status === "Low Stock")

            .forEach(item => {

                low.innerHTML += `

                    <div class="inventory-alert-item">

                        <div>

                            <h6>${item.name}</h6>

                            <small>

                                ${item.quantity} ${item.unit}

                            </small>

                        </div>

                        <span class="inventory-alert-badge low">

                            Low

                        </span>

                    </div>

                `;

            });

        this.inventory

            .filter(item => item.status === "Out Of Stock")

            .forEach(item => {

                out.innerHTML += `

                    <div class="inventory-alert-item">

                        <div>

                            <h6>${item.name}</h6>

                        </div>

                        <span class="inventory-alert-badge out">

                            Empty

                        </span>

                    </div>

                `;

            });

        this.inventory

            .filter(item => item.quantity <= 10)

            .forEach(item => {

                expiry.innerHTML += `

                    <div class="inventory-alert-item">

                        <div>

                            <h6>${item.name}</h6>

                        </div>

                        <span class="inventory-alert-badge expiry">

                            Soon

                        </span>

                    </div>

                `;

            });

    },

        renderTable() {

        const tbody = Helper.id("inventoryTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredInventory.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="11" class="text-center py-5 text-muted">

                        No inventory items found.

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredInventory.forEach(item => {

            let stockLevel = "high";

            if (item.status === "Low Stock") {

                stockLevel = "low";

            }

            if (item.status === "Out Of Stock") {

                stockLevel = "out";

            }

            tbody.innerHTML += `

                <tr>

                    <td>

                        <img

                            src="${item.image}"

                            alt="${item.name}">

                    </td>

                    <td>

                        <strong>

                            ${item.name}

                        </strong>

                    </td>

                    <td>

                        ${item.category}

                    </td>

                    <td>

                        ${item.supplier}

                    </td>

                    <td>

                        ${item.unit}

                    </td>

                    <td>

                        ${item.quantity}

                    </td>

                    <td>

                        <span class="inventory-stock ${stockLevel}">

                            ${item.quantity} ${item.unit}

                        </span>

                    </td>

                    <td>

                        Rs. ${(item.purchasePrice || 0).toLocaleString()}

                    </td>

                    <td>

                        <span class="inventory-status ${item.status.toLowerCase().replace(/\s/g,'-')}">

                            ${item.status}

                        </span>

                    </td>

                    <td>

                        ${item.updated}

                    </td>

                    <td>

                        <button

                            class="inventory-action-btn inventory-view"

                            data-id="${item.id}">

                            <i class="bi bi-eye-fill"></i>

                        </button>

                        <button

                            class="inventory-action-btn inventory-edit"

                            data-id="${item.id}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button

                            class="inventory-action-btn inventory-delete"

                            data-id="${item.id}">

                            <i class="bi bi-trash-fill"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

        this.initializeActionButtons();

    },

        initializeSearch() {

        const search = Helper.id("inventorySearch");

        if (!search) return;

        search.addEventListener("input", () => {

            this.applyFilters();

        });

    },


    initializeFilters() {

        const category = Helper.id("categoryFilter");

        const stock = Helper.id("stockFilter");

        const supplier = Helper.id("supplierFilter");

        const refresh = Helper.id("refreshInventory");

        if (category) {

            category.addEventListener("change", () => {

                this.applyFilters();

            });

        }

        if (stock) {

            stock.addEventListener("change", () => {

                this.applyFilters();

            });

        }

        if (supplier) {

            supplier.addEventListener("change", () => {

                this.applyFilters();

            });

        }

        if (refresh) {

            refresh.addEventListener("click", () => {

                Helper.id("inventorySearch").value = "";

                category.value = "All";

                stock.value = "All";

                supplier.value = "All";

                this.filteredInventory = [...this.inventory];

                this.renderTable();

                Toast.show(

                    "Inventory refreshed",

                    "success"

                );

            });

        }

    },


    applyFilters() {

        const keyword = Helper.id("inventorySearch")
            .value
            .trim()
            .toLowerCase();

        const category =
            Helper.id("categoryFilter").value;

        const stock =
            Helper.id("stockFilter").value;

        const supplier =
            Helper.id("supplierFilter").value;

        this.filteredInventory = this.inventory.filter(item => {

            const matchSearch =

                item.name.toLowerCase().includes(keyword) ||

                item.category.toLowerCase().includes(keyword) ||

                item.supplier.toLowerCase().includes(keyword);

            const matchCategory =

                category === "All" ||

                item.category === category;

            const matchStock =

                stock === "All" ||

                item.status === stock;

            const matchSupplier =

                supplier === "All" ||

                item.supplier === supplier;

            return (

                matchSearch &&

                matchCategory &&

                matchStock &&

                matchSupplier

            );

        });

        this.renderTable();

    },

        initializeButtons() {

        const addButton = Helper.id("addInventoryBtn");

        if (addButton) {

            addButton.addEventListener("click", () => {

                this.editingInventoryId = null;

                Helper.id("inventoryModalTitle").textContent =
                    "Add Inventory Item";

                Helper.id("inventoryName").value = "";
                Helper.id("inventoryCategory").selectedIndex = 0;
                Helper.id("inventorySupplier").value = "";
                Helper.id("inventoryUnit").selectedIndex = 0;
                Helper.id("inventoryQuantity").value = "";
                Helper.id("inventoryPrice").value = "";
                Helper.id("inventoryStatus").selectedIndex = 0;
                Helper.id("inventoryUpdated").value = "";
                Helper.id("inventoryImage").value = "";
                Helper.id("inventoryDescription").value = "";

                Helper.id("inventoryPreviewImage").src =
                    "https://placehold.co/600x350?text=Inventory+Item";

                new bootstrap.Modal(

                    Helper.id("inventoryModal")

                ).show();

            });

        }

        const image = Helper.id("inventoryImage");

        if (image) {

            image.addEventListener("input", () => {

                Helper.id("inventoryPreviewImage").src =

                    image.value ||

                    "https://placehold.co/600x350?text=Inventory+Item";

            });

        }

        const saveButton = Helper.id("saveInventoryBtn");

        if (!saveButton || saveButton.dataset.initialized) return;

        saveButton.dataset.initialized = "true";

        saveButton.addEventListener("click", () => {

            const item = {

                id: this.editingInventoryId || Date.now(),

                name: Helper.id("inventoryName").value.trim(),

                category: Helper.id("inventoryCategory").value,

                supplier: Helper.id("inventorySupplier").value.trim(),

                unit: Helper.id("inventoryUnit").value,

                quantity: Number(

                    Helper.id("inventoryQuantity").value

                ),

                purchasePrice: Number(

                    Helper.id("inventoryPrice").value

                ),

                status: Helper.id("inventoryStatus").value,

                updated: Helper.id("inventoryUpdated").value,

                image:

                    Helper.id("inventoryImage").value ||

                    "https://placehold.co/600x350?text=Inventory+Item",

                description:

                    Helper.id("inventoryDescription").value.trim()

            };

            if (

                item.name === "" ||

                item.supplier === ""

            ) {

                Toast.show(

                    "Please complete required fields",

                    "warning"

                );

                return;

            }

            if (this.editingInventoryId) {

                const index = this.inventory.findIndex(

                    inventory =>

                        inventory.id === this.editingInventoryId

                );

                this.inventory[index] = item;

                Toast.show(

                    "Inventory updated",

                    "success"

                );

            }

            else {

                this.inventory.push(item);

                Toast.show(

                    "Inventory item added",

                    "success"

                );

            }

            this.saveInventory();

            this.filteredInventory = [...this.inventory];

            this.renderSupplierFilter();

            this.renderAlerts();

            this.updateSummaryCards();

            this.renderTable();

            bootstrap.Modal
                .getInstance(

                    Helper.id("inventoryModal")

                )
                .hide();

        });

    },

        initializeActionButtons() {

        document.querySelectorAll(".inventory-view").forEach(button => {

            button.addEventListener("click", () => {

                this.viewInventory(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".inventory-edit").forEach(button => {

            button.addEventListener("click", () => {

                this.editInventory(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".inventory-delete").forEach(button => {

            button.addEventListener("click", () => {

                if (!confirm("Delete this inventory item?")) return;

                const id = Number(button.dataset.id);

                this.inventory = this.inventory.filter(item => item.id !== id);

                this.saveInventory();

                this.filteredInventory = [...this.inventory];

                this.renderSupplierFilter();

                this.renderAlerts();

                this.updateSummaryCards();

                this.renderTable();

                Toast.show(

                    "Inventory item deleted",

                    "success"

                );

            });

        });

    },


    viewInventory(id) {

        const item = this.inventory.find(item => item.id === id);

        if (!item) return;

        Helper.id("viewInventoryImage").src = item.image;
        Helper.id("viewInventoryName").textContent = item.name;
        Helper.id("viewInventoryCategory").textContent = item.category;
        Helper.id("viewInventorySupplier").textContent = item.supplier;
        Helper.id("viewInventoryUnit").textContent = item.unit;
        Helper.id("viewInventoryQuantity").textContent = item.quantity;
        Helper.id("viewInventoryPrice").textContent =
            `Rs. ${item.purchasePrice.toLocaleString()}`;
        Helper.id("viewInventoryStatus").textContent = item.status;
        Helper.id("viewInventoryUpdated").textContent = item.updated;
        Helper.id("viewInventoryDescription").textContent = item.description;

        new bootstrap.Modal(

            Helper.id("viewInventoryModal")

        ).show();

    },


    editInventory(id) {

        const item = this.inventory.find(item => item.id === id);

        if (!item) return;

        this.editingInventoryId = id;

        Helper.id("inventoryModalTitle").textContent =
            "Edit Inventory Item";

        Helper.id("inventoryName").value = item.name;
        Helper.id("inventoryCategory").value = item.category;
        Helper.id("inventorySupplier").value = item.supplier;
        Helper.id("inventoryUnit").value = item.unit;
        Helper.id("inventoryQuantity").value = item.quantity;
        Helper.id("inventoryPrice").value = item.purchasePrice;
        Helper.id("inventoryStatus").value = item.status;
        Helper.id("inventoryUpdated").value = item.updated;
        Helper.id("inventoryImage").value = item.image;
        Helper.id("inventoryDescription").value = item.description;

        Helper.id("inventoryPreviewImage").src = item.image;

        new bootstrap.Modal(

            Helper.id("inventoryModal")

        ).show();

    }

};


document.addEventListener("DOMContentLoaded", () => {

    Inventory.init();

});
