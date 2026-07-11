"use strict";

/*DASHBOARD DATA*/

const DashboardData = {

    statistics: {

        sales: 3850,
        orders: 148,
        customers: 92,
        tables: 18,
        kitchen: 23,
        expenses: 840

    },

    weeklySales: {

        thisWeek: [420, 610, 510, 730, 880, 950, 760],
        lastWeek: [310, 500, 450, 620, 710, 780, 640],
        thisMonth: [250, 420, 510, 600, 710, 850, 960]

    },

    revenueSources: {

        labels: [
            "Dine In",
            "Take Away",
            "Delivery"
        ],

        values: [55, 20, 25]

    },

    recentOrders: [

        {
            id:"#1025",
            customer:"Areeba Noor",
            table:"T-05",
            status:"Preparing",
            total:"$42.50"
        },

        {
            id:"#1024",
            customer:"Babar khan",
            table:"T-02",
            status:"Served",
            total:"$68.00"
        },

    {
        id: "#1023",
        customer: "Hina Batool",
        table: "Delivery",
        status: "Pending",
        total: "$25.00"
    },

    {
        id: "#1022",
        customer: "Sarah Khan",
        table: "T-09",
        status: "Ready",
        total: "$54.20"
    },

    {
        id: "#1021",
        customer: "Ali Ahmed",
        table: "T-11",
        status: "Completed",
        total: "$87.90"
    }

],

kitchenOrders: [

    {
        id: "#1028",
        item: "Burger + Fries",
        status: "Pending"
    },

    {
        id: "#1027",
        item: "Chicken Pizza",
        status: "Preparing"
    },

    {
        id: "#1026",
        item: "Pasta Alfredo",
        status: "Ready"
    },

    {
        id: "#1025",
        item: "BBQ Sandwich",
        status: "Served"
    }

],

};

/* DASHBOARD*/

const Dashboard = {


    salesChart: null,

    revenueChart: null,

    init() {

        this.renderSalesChart();

        this.renderRevenueChart();

        this.initializeSalesFilter();

        this.renderRecentOrders();

        this.initializeSearch();

        this.renderKitchenOrders();

    },

    /*SALES CHART*/

    renderSalesChart() {

        const canvas = Helper.id("salesChart");

        if (!canvas) return;

        this.salesChart = new Chart(canvas, {

            type: "bar",

            data: {

                labels: [

                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"

                ],

                datasets: [

                    {

                        label: "Sales",

                        data: DashboardData.weeklySales.thisWeek,

                        backgroundColor: "#8B0000",

                        borderRadius: 8,

                        borderSkipped: false

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

                        beginAtZero: true,

                        grid: {

                            color: "#eeeeee"

                        }

                    },

                    x: {

                        grid: {

                            display: false

                        }

                    }

                }

            }

        });

    },

    /* REVENUE CHART*/

    renderRevenueChart() {

        const canvas = Helper.id("revenueChart");

        if (!canvas) return;

        this.revenueChart = new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: DashboardData.revenueSources.labels,

                datasets: [

                    {

                        data: DashboardData.revenueSources.values,

                        backgroundColor: [

                            "#8B0000",

                            "#FF8C00",

                            "#198754"

                        ],

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    },

    /*= SALES FILTER*/

    initializeSalesFilter() {

        const filter = Helper.id("salesFilter");

        if (!filter) return;

        filter.addEventListener("change", () => {

            const selected = filter.value;

            this.salesChart.data.datasets[0].data =
                DashboardData.weeklySales[selected];

            this.salesChart.update();

            Toast.show(
                `Showing ${filter.options[filter.selectedIndex].text} sales`,
                "info"
            );

        });

    },

    /*RECENT ORDERS*/

    renderRecentOrders(orders = DashboardData.recentOrders) {

        const tbody = Helper.id("recentOrdersBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        orders.forEach(order => {

            let badgeClass = "";

            switch (order.status) {

                case "Preparing":
                    badgeClass = "bg-warning text-dark";
                    break;

                case "Served":
                    badgeClass = "bg-success";
                    break;

                case "Pending":
                    badgeClass = "bg-danger";
                    break;

                case "Ready":
                    badgeClass = "bg-primary";
                    break;

                case "Completed":
                    badgeClass = "bg-success";
                    break;

                default:
                    badgeClass = "bg-secondary";

            }

            tbody.innerHTML += `

                <tr>

                    <td>${order.id}</td>

                    <td>${order.customer}</td>

                    <td>${order.table}</td>

                    <td>

                        <span class="badge ${badgeClass}">

                            ${order.status}

                        </span>

                    </td>

                    <td>${order.total}</td>

                </tr>

            `;

        });

        if(orders.length === 0){

        tbody.innerHTML = `

            <tr>

                <td colspan="5" class="text-center text-muted py-4">

                    No matching orders found.

                </td>

            </tr>

        `;

    }

    },

/*  SEARCH ORDERS*/

initializeSearch() {

    const input = Helper.id("globalSearch");

    if (!input) return;

    // Live filtering
    input.addEventListener("input", () => {

        const keyword = input.value
            .toLowerCase()
            .trim();

        const filteredOrders = DashboardData.recentOrders.filter(order => {

            return (

                order.id.toLowerCase().includes(keyword) ||

                order.customer.toLowerCase().includes(keyword) ||

                order.table.toLowerCase().includes(keyword) ||

                order.status.toLowerCase().includes(keyword)

            );

        });

        this.renderRecentOrders(filteredOrders);

    });

    // Scroll on Enter
    input.addEventListener("keydown", (event) => {

        if (event.key !== "Enter") return;

        event.preventDefault();

        const section = Helper.id("recentOrdersSection");

        if (section) {

            section.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

},

/*  KITCHEN STATUS */

renderKitchenOrders() {

    const container = Helper.id("kitchenList");

    if (!container) return;

    container.innerHTML = "";

    DashboardData.kitchenOrders.forEach(order => {

        let badgeClass = "";

        switch (order.status) {

            case "Pending":
                badgeClass = "bg-danger";
                break;

            case "Preparing":
                badgeClass = "bg-warning text-dark";
                break;

            case "Ready":
                badgeClass = "bg-primary";
                break;

            case "Served":
                badgeClass = "bg-success";
                break;

            default:
                badgeClass = "bg-secondary";

        }

        container.innerHTML += `

            <div class="kitchen-item">

                <div>

                    <strong>${order.id}</strong>

                    <p class="mb-0">${order.item}</p>

                </div>

                <span class="badge ${badgeClass}">

                    ${order.status}

                </span>

            </div>

        `;

    });

},
};

/*===============
                INITIALIZATION*/

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});