"use strict";

const Employees = {

    employees: [],

    filteredEmployees: [],

    editingEmployeeId: null,

    init() {

        this.loadEmployees();

        this.renderTable();

        this.updateSummaryCards();

        this.initializeSearch();

        this.initializeFilters();

        this.initializeButtons();

    },

    loadEmployees() {

       this.employees = Storage.get(
            CONSTANTS.STORAGE_KEYS.EMPLOYEES,
            Database.employees || []
        );

        if (!Array.isArray(this.employees)) {

            this.employees = [];

}

this.filteredEmployees = [...this.employees];

    },

    saveEmployees() {

        Storage.save(

            CONSTANTS.STORAGE_KEYS.EMPLOYEES,

            this.employees

        );

    },

    renderTable() {

        const tbody = Helper.id("employeeTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredEmployees.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="10" class="text-center py-5 text-muted">

                        No employees found.

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredEmployees.forEach(employee => {

            tbody.innerHTML += `

                <tr>

                    <td>

                        <img

                            src="${employee.image}"

                            class="employees-avatar"

                            alt="${employee.name}">

                    </td>

                    <td>${employee.id}</td>

                    <td>${employee.name}</td>

                    <td>${employee.designation}</td>

                    <td>${employee.department}</td>

                    <td>${employee.phone}</td>

                    <td>${employee.shift}</td>

                    <td>Rs. ${employee.salary.toLocaleString()}</td>

                    <td>

                        <span class="employees-status employees-${employee.status.toLowerCase().replace(/\s/g,"-")}">

                            ${employee.status}

                        </span>

                    </td>

                    <td>

                        <button

                            class="employees-action-btn employees-view"

                            data-id="${employee.id}">

                            <i class="bi bi-eye-fill"></i>

                        </button>

                        <button

                            class="employees-action-btn employees-edit"

                            data-id="${employee.id}">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button

                            class="employees-action-btn employees-delete"

                            data-id="${employee.id}">

                            <i class="bi bi-trash-fill"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

        this.initializeActionButtons();

    },

    updateSummaryCards() {

        Helper.id("totalEmployees").textContent =
            this.employees.length;

        Helper.id("activeEmployees").textContent =
            this.employees.filter(employee => employee.status === "Active").length;

        Helper.id("leaveEmployees").textContent =
            this.employees.filter(employee => employee.status === "On Leave").length;

        const totalSalary = this.employees.reduce(

            (sum, employee) => sum + employee.salary,

            0

        );

        Helper.id("salaryExpense").textContent =
            `Rs. ${totalSalary.toLocaleString()}`;

    },

        initializeSearch() {

        const search = Helper.id("employeeSearch");

        if (!search) return;

        search.addEventListener("input", () => {

            this.applyFilters();

        });

    },


    initializeFilters() {

        const department = Helper.id("departmentFilter");

        const status = Helper.id("statusFilter");

        const refresh = Helper.id("refreshEmployees");

        if (department) {

            department.addEventListener("change", () => {

                this.applyFilters();

            });

        }

        if (status) {

            status.addEventListener("change", () => {

                this.applyFilters();

            });

        }

        if (refresh) {

            refresh.addEventListener("click", () => {

                Helper.id("employeeSearch").value = "";

                department.value = "All";

                status.value = "All";

                this.filteredEmployees = [...this.employees];

                this.renderTable();

                Toast.show("Employee list refreshed", "success");

            });

        }

    },


    applyFilters() {

        const keyword = Helper.id("employeeSearch")
            .value
            .trim()
            .toLowerCase();

        const department =
            Helper.id("departmentFilter").value;

        const status =
            Helper.id("statusFilter").value;

        this.filteredEmployees = this.employees.filter(employee => {

            const matchSearch =

                employee.name.toLowerCase().includes(keyword) ||

                employee.phone.includes(keyword) ||

                employee.designation.toLowerCase().includes(keyword);

            const matchDepartment =

                department === "All" ||

                employee.department === department;

            const matchStatus =

                status === "All" ||

                employee.status === status;

            return matchSearch && matchDepartment && matchStatus;

        });

        this.renderTable();

    },


    initializeButtons() {

        const addButton = Helper.id("addEmployeeBtn");

        console.log("Add Employee Button:", addButton); // Debugging line

        if (!addButton) return;

        addButton.addEventListener("click", () => {

            this.editingEmployeeId = null;

            Helper.id("employeeModalTitle").textContent =
                "Add Employee";

            Helper.id("employeeForm").reset();

            Helper.id("employeePreviewImage").src =
                "https://placehold.co/300x300?text=Employee";

            new bootstrap.Modal(

                Helper.id("employeeModal")

            ).show();

        });

        const image = Helper.id("employeeImage");

        if (image) {

            image.addEventListener("input", () => {

                Helper.id("employeePreviewImage").src =

                    image.value ||

                    "https://placehold.co/300x300?text=Employee";

            });

        }

    },

    initializeActionButtons() {

        document.querySelectorAll(".employees-view").forEach(button => {

            button.addEventListener("click", () => {

                this.viewEmployee(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".employees-edit").forEach(button => {

            button.addEventListener("click", () => {

                this.editEmployee(Number(button.dataset.id));

            });

        });

        document.querySelectorAll(".employees-delete").forEach(button => {

            button.addEventListener("click", () => {

                if (!confirm("Delete this employee?")) return;

                const id = Number(button.dataset.id);

                this.employees = this.employees.filter(employee => employee.id !== id);

                this.saveEmployees();

                this.filteredEmployees = [...this.employees];

                this.renderTable();

                this.updateSummaryCards();

                Toast.show("Employee deleted successfully", "success");

            });

        });


        const saveButton = Helper.id("saveEmployeeBtn");

        if (!saveButton || saveButton.dataset.initialized) return;

        saveButton.dataset.initialized = "true";

        saveButton.addEventListener("click", () => {

            const employee = {

                id: this.editingEmployeeId || Date.now(),

                name: Helper.id("employeeName").value.trim(),

                designation: Helper.id("employeeDesignation").value.trim(),

                department: Helper.id("employeeDepartment").value,

                phone: Helper.id("employeePhone").value.trim(),

                salary: Number(Helper.id("employeeSalary").value),

                shift: Helper.id("employeeShift").value,

                status: Helper.id("employeeStatus").value,

                joining: Helper.id("employeeJoining").value,

                emergency: Helper.id("employeeEmergency").value.trim(),

                address: Helper.id("employeeAddress").value.trim(),

                image:

                    Helper.id("employeeImage").value ||

                    "https://placehold.co/300x300?text=Employee"

            };

            if (

                employee.name === "" ||

                employee.designation === ""

            ) {

                Toast.show("Please complete required fields", "warning");

                return;

            }

            if (this.editingEmployeeId) {

                const index = this.employees.findIndex(

                    item => item.id === this.editingEmployeeId

                );

                this.employees[index] = employee;

                Toast.show("Employee updated", "success");

            }

            else {

                this.employees.push(employee);

                Toast.show("Employee added", "success");

            }

            this.saveEmployees();

            this.filteredEmployees = [...this.employees];

            this.renderTable();

            this.updateSummaryCards();

            bootstrap.Modal
                .getInstance(Helper.id("employeeModal"))
                .hide();

        });

    },

    viewEmployee(id) {

        const employee = this.employees.find(item => item.id === id);

        if (!employee) return;

        Helper.id("viewEmployeeImage").src = employee.image;

        Helper.id("viewEmployeeName").textContent = employee.name;

        Helper.id("viewEmployeeDesignation").textContent = employee.designation;

        Helper.id("viewEmployeeDepartment").textContent = employee.department;

        Helper.id("viewEmployeePhone").textContent = employee.phone;

        Helper.id("viewEmployeeSalary").textContent =
            `Rs. ${employee.salary.toLocaleString()}`;

        Helper.id("viewEmployeeShift").textContent =
            employee.shift;

        Helper.id("viewEmployeeStatus").textContent =
            employee.status;

        Helper.id("viewEmployeeJoining").textContent =
            employee.joining;

        Helper.id("viewEmployeeEmergency").textContent =
            employee.emergency;

        Helper.id("viewEmployeeAddress").textContent =
            employee.address;

        new bootstrap.Modal(
            Helper.id("viewEmployeeModal")
        ).show();

    },


    editEmployee(id) {

        const employee = this.employees.find(item => item.id === id);

        if (!employee) return;

        this.editingEmployeeId = id;

        Helper.id("employeeModalTitle").textContent =
            "Edit Employee";

        Helper.id("employeeName").value = employee.name;
        Helper.id("employeeDesignation").value = employee.designation;
        Helper.id("employeeDepartment").value = employee.department;
        Helper.id("employeePhone").value = employee.phone;
        Helper.id("employeeSalary").value = employee.salary;
        Helper.id("employeeShift").value = employee.shift;
        Helper.id("employeeStatus").value = employee.status;
        Helper.id("employeeJoining").value = employee.joining;
        Helper.id("employeeEmergency").value = employee.emergency;
        Helper.id("employeeAddress").value = employee.address;
        Helper.id("employeeImage").value = employee.image;

        Helper.id("employeePreviewImage").src = employee.image;

        new bootstrap.Modal(

            Helper.id("employeeModal")

        ).show();

    }

};


document.addEventListener("DOMContentLoaded", () => {

    Employees.init();

});

