"use strict";

const Tables = {

    tables: [],

    selectedTable: null,

    filteredTables: [],

    init() {

        this.tables = Storage.get(

            CONSTANTS.STORAGE_KEYS.TABLES,

            Database.tables

        );

        this.filteredTables = [...this.tables];

        this.renderTables();

        this.updateSummary();

        this.initializeFilters();

        this.initializeRefresh();

        this.initializeModalButtons();

        this.initializeActionButtons(); 

        this.initializeWaiterButton();


    },
    renderTables() {

    const container = Helper.id("tablesGrid");

    if (!container) return;

    container.innerHTML = "";

    if (this.filteredTables.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-warning">

                    No tables found.

                </div>

            </div>

        `;

        return;

    }

    this.filteredTables.forEach(table => {

        container.innerHTML += `

        <div class="col-md-6 col-xl-4">

            <div class="table-card">

                <div class="table-card-top">

                    <h4 class="table-number">

                        ${table.name}

                    </h4>

                    <span class="table-status status-${table.status.toLowerCase()}">

                        ${table.status}

                    </span>

                </div>

                <div class="table-info">

                    <p>

                        <strong>Capacity:</strong>

                        ${table.capacity}

                    </p>

                    <p>

                        <strong>Customer:</strong>

                        ${table.customer || "Walk-in Customer"}

                    </p>

                    <p>
                        <strong>Waiter:</strong>
                        ${table.waiter || "Not Assigned"}
                    </p>

                    <p>

                        <strong>Time:</strong>

                        ${table.time || "--"}

                    </p>

                </div>

                <div class="table-actions">

                    <button
                        class="btn btn-outline-primary view-table"
                        data-id="${table.id}">

                        View

                    </button>

                </div>

            </div>

        </div>

        `;

    });

     this.initializeViewButtons();

    },

    initializeViewButtons() {

    document.querySelectorAll(".view-table").forEach(button => {

        button.addEventListener("click", () => {

            const tableId = Number(button.dataset.id);

            this.openTableModal(tableId);

        });

    });

},

    openTableModal(tableId) {

        this.selectedTable = this.tables.find(

            table => table.id === tableId

        );

        if(!this.selectedTable) return;

        console.log(this.selectedTable);

        // Update modal content
        Helper.id("modalTableName").textContent = this.selectedTable.name;
        Helper.id("modalCustomer").textContent = this.selectedTable.customer || "None";
        Helper.id("modalCapacity").textContent = this.selectedTable.capacity;
        Helper.id("modalStatus").textContent = this.selectedTable.status;

        Helper.id("modalWaiter").value = this.selectedTable.waiter || "";

        Helper.id("reservationCustomer").value =
            this.selectedTable.customer || "";

        Helper.id("reservationPhone").value =
            this.selectedTable.phone || "";

        Helper.id("reservationTime").value =
            this.selectedTable.time || "";

        // Show modal
        const modal = new bootstrap.Modal(Helper.id("tableModal"));
        modal.show();

    },

    changeStatus(status){

    if(!this.selectedTable) return;

    this.selectedTable.status = status;

    Storage.save(

        CONSTANTS.STORAGE_KEYS.TABLES,

        this.tables

    );

    this.filteredTables = [...this.tables];

    this.renderTables();

    this.updateSummary();

    bootstrap.Modal
        .getInstance(
            Helper.id("tableModal")
        )
        .hide();

    Toast.show(

        "Table updated",

        "success"

    );

    },

    updateSummary() {

        Helper.id("totalTables").textContent =
            this.tables.length;

        Helper.id("occupiedTables").textContent =
            this.tables.filter(
                table => table.status === CONSTANTS.TABLE_STATUS.OCCUPIED
            ).length;

        Helper.id("reservedTables").textContent =
            this.tables.filter(
                table => table.status === CONSTANTS.TABLE_STATUS.RESERVED
            ).length;

        Helper.id("availableTables").textContent =
            this.tables.filter(
                table => table.status === CONSTANTS.TABLE_STATUS.AVAILABLE
            ).length;

        Helper.id("cleaningTables").textContent =
            this.tables.filter(
                table => table.status === CONSTANTS.TABLE_STATUS.CLEANING
            ).length;

    },

    initializeFilters() {

        const search = Helper.id("tableSearch");

        const status = Helper.id("tableStatusFilter");

        const capacity = Helper.id("tableCapacityFilter");

        [search, status, capacity].forEach(element => {

            element.addEventListener("input", () => {

                this.filterTables();

            });

            element.addEventListener("change", () => {

                this.filterTables();

            });

        });

    },


    filterTables() {

        const keyword =

            Helper.id("tableSearch")

            .value

            .trim()

            .toLowerCase();

        const status =

            Helper.id("tableStatusFilter").value;

        const seats =

            Helper.id("tableCapacityFilter").value;

        this.filteredTables = this.tables.filter(table => {

            const matchKeyword =

                table.name.toLowerCase().includes(keyword);

            const matchStatus =

                status === "All" ||

                table.status === status;

            const matchSeats =

                seats === "All" ||

                table.capacity == seats;

            return (

                matchKeyword &&

                matchStatus &&

                matchSeats

            );

        });

        this.renderTables();

    },


   initializeRefresh() {

    const button = Helper.id("refreshTables");

    if (!button) return;

    button.addEventListener("click", () => {

        if (!confirm("Reset all tables to default state?"))
            return;

        this.tables = structuredClone(Database.tables);

        Storage.save(

            CONSTANTS.STORAGE_KEYS.TABLES,

            this.tables

        );

        this.filteredTables = [...this.tables];

        this.renderTables();

        this.updateSummary();

        Toast.show(

            "Tables reset successfully",

            "success"

        );

    });

    },

    initializeModalButtons(){

    Helper.id("occupyTableBtn")
        .addEventListener("click",()=>{

        this.changeStatus(

            CONSTANTS.TABLE_STATUS.OCCUPIED

        );

    });

    Helper.id("reserveTableBtn")
        .addEventListener("click",()=>{

        this.changeStatus(

            CONSTANTS.TABLE_STATUS.RESERVED

        );

    });

    Helper.id("cleanTableBtn")
        .addEventListener("click",()=>{

        this.changeStatus(

            CONSTANTS.TABLE_STATUS.CLEANING

        );

    });

    Helper.id("availableTableBtn")
        .addEventListener("click",()=>{

        this.changeStatus(

            CONSTANTS.TABLE_STATUS.AVAILABLE

        );

    });

},
    initializeActionButtons() {

        Helper.id("reserveTableBtn")
        .addEventListener("click", () => {

            this.selectedTable.status =
                CONSTANTS.TABLE_STATUS.RESERVED;

            this.selectedTable.customer =
                Helper.id("reservationCustomer").value;

            this.selectedTable.phone =
                Helper.id("reservationPhone").value;

            this.selectedTable.time =
                Helper.id("reservationTime").value;

            Storage.save(
                CONSTANTS.STORAGE_KEYS.TABLES,
                this.tables
            );

            this.renderTables();

            this.updateSummary();

            bootstrap.Modal
                .getInstance(
                    Helper.id("tableModal")
                )
                .hide();

            Toast.show(
                "Table Reserved",
                "success"
            );

        });

    },

    initializeWaiterButton() {

        const button = Helper.id("assignWaiterBtn");

        if (!button) return;

        button.addEventListener("click", () => {

            if (!this.selectedTable) return;

            this.selectedTable.waiter =
                Helper.id("modalWaiter").value;

            Storage.save(
                CONSTANTS.STORAGE_KEYS.TABLES,
                this.tables
            );

            this.renderTables();

            Toast.show(
                "Waiter Assigned",
                "success"
            );

        });

    },

}

document.addEventListener("DOMContentLoaded", () => {

    Tables.init();

});