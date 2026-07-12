"use strict";

const Database = {

    cart: [],

    orders: [],

    customers: [

        {
            id: 1,
            name: "Walk-in Customer",
            phone: ""
        }

    ],

    tables: [

        {
            id: 1,
            name: "Table 1",
            capacity: 2,
            status: CONSTANTS.TABLE_STATUS.AVAILABLE,
            customer: null,
            orderId: null
        },

        {
            id: 2,
            name: "Table 2",
            capacity: 4,
            status: CONSTANTS.TABLE_STATUS.AVAILABLE,
            customer: null,
            orderId: null
        },

        {
            id: 3,
            name: "Table 3",
            capacity: 6,
            status: CONSTANTS.TABLE_STATUS.AVAILABLE,
            customer: null,
            orderId: null
        },

        {
            id: 4,
            name: "Table 4",
            capacity: 8,
            status: CONSTANTS.TABLE_STATUS.AVAILABLE,
            customer: null,
            orderId: null
        }

    ]

};