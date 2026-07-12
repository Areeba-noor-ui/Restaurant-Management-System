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
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

    {
        id: 2,
        name: "Table 2",
        capacity: 4,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

    {
        id: 3,
        name: "Table 3",
        capacity: 6,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

    {
        id: 4,
        name: "Table 4",
        capacity: 8,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

        {
        id: 5,
        name: "Table 5",
        capacity: 10,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

        {
        id: 6,
        name: "Table 6",
        capacity: 12    ,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

        {
        id: 7,
        name: "Table 7",
        capacity: 14,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    },

        {
        id: 8,
        name: "Table 8",
        capacity: 16,
        status: CONSTANTS.TABLE_STATUS.AVAILABLE,
        customer: "",
        waiter: "",
        reservation: "",
        mergedWith: [],
        orderId: null,
        waiter: null
    }

]
}