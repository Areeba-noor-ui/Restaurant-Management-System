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
            customer:"John Smith",
            table:"T-05",
            status:"Preparing",
            total:"$42.50"
        },

        {
            id:"#1024",
            customer:"Emma Watson",
            table:"T-02",
            status:"Served",
            total:"$68.00"
        }

    ]

};

/*DASHBOARD*/

const Dashboard = {

    init() {

        console.log("Dashboard Loaded");

    }

};

/*INITIALIZATION*/

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});