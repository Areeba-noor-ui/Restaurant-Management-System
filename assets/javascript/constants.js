"use strict";

const CONSTANTS = {

    TAX_RATE: 0.10,

    STORAGE_KEYS: {

        CART: "posCart",

        ORDERS: "restaurantOrders",

        TABLES: "restaurantTables",

        CUSTOMERS: "restaurantCustomers",

        INVENTORY: "inventory",

        MENU: "restaurantMenu",

        EMPLOYEES: "restaurantEmployees",

        PURCHASES: "restaurant_purchases",

        EXPENSES: "rms_expenses",

    },

    ORDER_STATUS: {

        PENDING: "Pending",

        PREPARING: "Preparing",

        READY: "Ready",

        SERVED: "Served",

        COMPLETED: "Completed"

    },

    TABLE_STATUS: {

        AVAILABLE: "Available",

        OCCUPIED: "Occupied",

        RESERVED: "Reserved",

        CLEANING: "Cleaning"

    }

};