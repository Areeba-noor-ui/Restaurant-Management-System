"use strict";

const Delivery = {

    deliveries: [],

    filteredDeliveries: [],

    init() {

        this.loadDeliveries();

        this.renderSummary();

        this.renderTable();

        this.renderProgress();

        this.initializeSearch();

        this.initializeFilters();

    },

    loadDeliveries() {

        const saved = localStorage.getItem("rms_deliveries");

        if (saved) {

            this.deliveries = JSON.parse(saved);

        }

        else {

            this.deliveries = [...Database.deliveries];

            this.saveDeliveries();

        }

        this.filteredDeliveries = [...this.deliveries];

    },

    saveDeliveries() {

    Storage.save(

        CONSTANTS.STORAGE_KEYS.DELIVERIES,

        this.deliveries

    );

},

    renderSummary() {

    const active = this.deliveries.filter(

        delivery => delivery.status !== "Delivered"

    ).length;

    const delivered = this.deliveries.filter(

        delivery => delivery.status === "Delivered"

    ).length;

    const riders = new Set(

        this.deliveries.map(

            delivery => delivery.rider

        )

    );

    const etaValues = this.deliveries

        .filter(delivery => delivery.eta.includes("min"))

        .map(delivery =>

            parseInt(delivery.eta)

        );

    const averageETA = etaValues.length

        ? Math.round(

            etaValues.reduce(

                (total, value) => total + value,

                0

            ) / etaValues.length

        )

        : 0;

    Helper.id("activeDeliveries").textContent = active;

    Helper.id("deliveredToday").textContent = delivered;

    Helper.id("averageETA").textContent =

        `${averageETA} min`;

    Helper.id("availableRiders").textContent =

        riders.size;

},

    renderTable() {

    const tbody = Helper.id("deliveryTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (this.filteredDeliveries.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="8" class="text-center py-5 text-muted">

                    No delivery records found.

                </td>

            </tr>

        `;

        return;

    }

    this.filteredDeliveries.forEach(delivery => {

        tbody.innerHTML += `

            <tr>

                <td>${delivery.order}</td>

                <td>${delivery.customer}</td>

                <td>${delivery.phone}</td>

                <td>${delivery.address}</td>

                <td>

                    <select

                        class="form-select form-select-sm rider-select"

                        data-id="${delivery.id}">

                        ${this.renderRiderOptions(delivery.rider)}

                    </select>

                </td>

                <td>${delivery.eta}</td>

                <td>

                    <span class="badge ${this.getStatusClass(delivery.status)}">

                        ${delivery.status}

                    </span>

                </td>

                <td>

                    <button

                        class="btn btn-sm btn-primary delivery-view"

                        data-id="${delivery.id}">

                        <i class="bi bi-eye-fill"></i>

                    </button>

                </td>

            </tr>

        `;

    });

    this.initializeActionButtons();
    this.initializeRiderSelect();

},

    getStatusClass(status) {

    switch (status) {

        case "Preparing":

            return "bg-warning";

        case "Out For Delivery":

            return "bg-primary";

        case "Near Customer":

            return "bg-info";

        case "Delivered":

            return "bg-success";

        default:

            return "bg-secondary";

    }

},

    renderRiderOptions(selected = "Unassigned") {

    const employees = Storage.get(

        CONSTANTS.STORAGE_KEYS.EMPLOYEES,

        Database.employees

    );

    const riders = employees.filter(employee =>

        employee.designation === "Delivery Rider"

    );

    let html = `

        <option value="Unassigned">

            Unassigned

        </option>

    `;

    riders.forEach(rider => {

        html += `

            <option

                value="${rider.name}"

                ${selected === rider.name ? "selected" : ""}>

                ${rider.name}

            </option>

        `;

    });

    return html;

},

    renderProgress() {

    const container = Helper.id("deliveryProgressList");

    if (!container) return;

    container.innerHTML = "";

    this.deliveries
        .filter(delivery => delivery.status !== "Delivered")
        .forEach(delivery => {

            container.innerHTML += `

                <div class="delivery-progress-item mb-3">

                    <div class="d-flex justify-content-between mb-2">

                        <div>

                            <strong>${delivery.customer}</strong>

                            <br>

                            <small>

                                Rider : ${delivery.rider}

                            </small>

                        </div>

                        <div class="text-end">

                            <strong>${delivery.eta}</strong>

                            <br>

                            <small>

                                ${delivery.status}

                            </small>

                        </div>

                    </div>

                    <div class="progress">

                        <div

                            class="progress-bar"

                            role="progressbar"

                            style="width:${delivery.progress}%">

                            ${delivery.progress}%

                        </div>

                    </div>

                </div>

            `;

        });

},

    initializeSearch() {

    Helper.id("deliverySearch")
        .addEventListener("input", () => {

            this.applyFilters();

        });

},

    initializeFilters() {

    const riderFilter =
        Helper.id("deliveryRiderFilter");

    const riders = [

        ...new Set(

            this.deliveries.map(

                delivery => delivery.rider

            )

        )

    ];

    riders.forEach(rider => {

        riderFilter.innerHTML += `

            <option>

                ${rider}

            </option>

        `;

    });

    Helper.id("deliveryStatusFilter")
        .addEventListener("change", () => {

            this.applyFilters();

        });

    Helper.id("deliveryRiderFilter")
        .addEventListener("change", () => {

            this.applyFilters();

        });

    Helper.id("deliveryDate")
        .addEventListener("change", () => {

            this.applyFilters();

        });

    Helper.id("refreshDelivery")
        .addEventListener("click", () => {

            Helper.id("deliverySearch").value = "";

            Helper.id("deliveryStatusFilter").value = "All";

            Helper.id("deliveryRiderFilter").value = "All";

            Helper.id("deliveryDate").value = "";

            this.filteredDeliveries = [...this.deliveries];

            this.renderTable();

        });

},

    applyFilters() {

    const search = Helper.id("deliverySearch")
        .value
        .toLowerCase();

    const status =
        Helper.id("deliveryStatusFilter").value;

    const rider =
        Helper.id("deliveryRiderFilter").value;

    this.filteredDeliveries = this.deliveries.filter(delivery => {

        const matchSearch =

            delivery.order.toLowerCase().includes(search) ||

            delivery.customer.toLowerCase().includes(search);

        const matchStatus =

            status === "All" ||

            delivery.status === status;

        const matchRider =

            rider === "All" ||

            delivery.rider === rider;

        return matchSearch && matchStatus && matchRider;

    });

    this.renderTable();

},


    initializeActionButtons() {

        document.querySelectorAll(".delivery-view")
            .forEach(button => {

                button.onclick = () => {

                    this.viewDelivery(

                        Number(button.dataset.id)

                    );

                };

            });

    },

    initializeRiderSelect() {

    document.querySelectorAll(".rider-select").forEach(select => {

        select.addEventListener("change", () => {

            const id = Number(select.dataset.id);

            const delivery = this.deliveries.find(

                item => item.id === id

            );

            if (!delivery) return;

            delivery.rider = select.value;

            if (select.value !== "Unassigned") {

                delivery.status = "Out For Delivery";

                delivery.progress = 20;

                delivery.eta = "25 min";

            }

            else {

                delivery.status = "Preparing";

                delivery.progress = 0;

                delivery.eta = "--";

            }

            this.saveDeliveries();

            this.filteredDeliveries = [...this.deliveries];

            this.renderSummary();

            this.renderTable();

            this.renderProgress();

        });

    });

},

    viewDelivery(id) {

        const delivery = this.deliveries.find(

            delivery => delivery.id === id

        );

        if (!delivery) return;

        Helper.id("viewDeliveryOrder").textContent =
            delivery.order;

        Helper.id("viewDeliveryCustomer").textContent =
            delivery.customer;

        Helper.id("viewDeliveryPhone").textContent =
            delivery.phone;

        Helper.id("viewDeliveryRider").textContent =
            delivery.rider;

        Helper.id("viewDeliveryAddress").textContent =
            delivery.address;

        Helper.id("viewDeliveryETA").textContent =
            delivery.eta;

        Helper.id("viewDeliveryStatus").textContent =
            delivery.status;

        const progress =
            Helper.id("viewDeliveryProgress");

        progress.style.width =
            `${delivery.progress}%`;

        progress.textContent =
            `${delivery.progress}%`;

        new bootstrap.Modal(

            Helper.id("viewDeliveryModal")

        ).show();

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Delivery.init();

});