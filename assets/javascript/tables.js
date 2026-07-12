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

        this.initializeWaiterButton();

        this.initializeTransferButton();

        this.initializeMergeSplitButtons();


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

    this.filteredTables.filter(table=>table.status!==CONSTANTS.TABLE_STATUS.MERGED).forEach(table => {

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

        this.loadTransferTables();
        this.loadMergeTables();

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

    Helper.id("reserveTableBtn").addEventListener("click", () => {

        if (!this.selectedTable) return;

        this.selectedTable.status =
            CONSTANTS.TABLE_STATUS.RESERVED;

        this.selectedTable.customer =
            Helper.id("reservationCustomer").value.trim();

        this.selectedTable.phone =
            Helper.id("reservationPhone").value.trim();

        this.selectedTable.time =
            Helper.id("reservationTime").value;

        Storage.save(
            CONSTANTS.STORAGE_KEYS.TABLES,
            this.tables
        );

        this.filteredTables = [...this.tables];

        this.renderTables();

        this.updateSummary();

        bootstrap.Modal
            .getInstance(Helper.id("tableModal"))
            .hide();

        Toast.show(
            "Table Reserved",
            "success"
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

    initializeTransferButton(){

    const button = Helper.id("transferTableBtn");

    if(!button) return;

    button.addEventListener("click",()=>{

        this.transferTable();

    });

},

    loadTransferTables(){

        const select=Helper.id("transferTable");

        select.innerHTML="";

        this.tables
        .filter(table=>

        table.id!==this.selectedTable.id

        &&

        table.status===CONSTANTS.TABLE_STATUS.AVAILABLE

        )

        .forEach(table=>{

        select.innerHTML+=`

        <option value="${table.id}">

        ${table.name}

        </option>

        `;

        });

        },

    transferTable() {

        const targetId = Number(
            Helper.id("transferTable").value
        );

        if (!targetId) return;

        const target = this.tables.find(
            table => table.id === targetId
        );

        if (!target) return;

        target.customer = this.selectedTable.customer;
        target.phone = this.selectedTable.phone;
        target.waiter = this.selectedTable.waiter;
        target.time = this.selectedTable.time;
        target.status = this.selectedTable.status;

        this.selectedTable.customer = null;
        this.selectedTable.phone = "";
        this.selectedTable.waiter = "";
        this.selectedTable.time = "";
        this.selectedTable.status =
            CONSTANTS.TABLE_STATUS.AVAILABLE;

        Storage.save(
            CONSTANTS.STORAGE_KEYS.TABLES,
            this.tables
        );

        this.filteredTables=[...this.tables];

        this.renderTables();

        this.updateSummary();

        Toast.show(
            "Table transferred",
            "success"
        );

    },

    splitTable(){

        if(this.selectedTable.capacity<=2){

            Toast.show(
                "Cannot split this table",
                "warning"
            );

            return;

        }

        this.selectedTable.capacity /=2;

        Storage.save(

            CONSTANTS.STORAGE_KEYS.TABLES,

            this.tables

        );

        this.renderTables();

        Toast.show(

            "Table split",

            "success"

        );

    },

    initializeMergeSplitButtons(){

    Helper.id("mergeTableBtn")
    ?.addEventListener("click",()=>{

        this.mergeTables();

    });

    Helper.id("splitTableBtn")
    ?.addEventListener("click",()=>{

        this.splitTable();

    });

},

    loadMergeTables() {

        const select = Helper.id("mergeTable");

        select.innerHTML = "";

        this.tables
            .filter(table =>

                table.id !== this.selectedTable.id &&

                table.status === CONSTANTS.TABLE_STATUS.AVAILABLE

            )

            .forEach(table => {

                select.innerHTML += `

                    <option value="${table.id}">
                        ${table.name}
                    </option>

                `;

            });

    },

    mergeTables(){

    const targetId = Number(
        Helper.id("mergeTable").value
    );

    if(!targetId) return;

    const target = this.tables.find(
        table=>table.id===targetId
    );

    if(!target) return;

    if(
        this.selectedTable.merged ||
        target.merged
    ){

        Toast.show(
            "One table is already merged.",
            "warning"
        );

        return;

    }

    this.selectedTable.capacity += target.capacity;

    this.selectedTable.merged = true;

    this.selectedTable.mergedWith = target.id;

    target.merged = true;

    target.mergedWith = this.selectedTable.id;

    target.status =
        CONSTANTS.TABLE_STATUS.MERGED;

    Storage.save(
        CONSTANTS.STORAGE_KEYS.TABLES,
        this.tables
    );

    this.filteredTables=[...this.tables];

    this.renderTables();

    this.updateSummary();

    bootstrap.Modal
    .getInstance(
        Helper.id("tableModal")
    )
    .hide();

    Toast.show(
        "Tables merged",
        "success"
    );

}


}

document.addEventListener("DOMContentLoaded", () => {

    Tables.init();

});