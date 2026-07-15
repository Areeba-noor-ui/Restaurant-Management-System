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

    employees: [

    {
        id: 1,
        name: "Ahmed Khan",
        designation: "Restaurant Manager",
        department: "Management",
        phone: "03011234567",
        salary: 85000,
        shift: "Morning",
        status: "Active",
        joining: "2024-02-10",
        emergency: "03017654321",
        address: "Satellite Town, Rawalpindi",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },

    {
        id: 2,
        name: "Fatima Noor",
        designation: "Head Chef",
        department: "Kitchen",
        phone: "03124567890",
        salary: 70000,
        shift: "Morning",
        status: "Active",
        joining: "2024-01-18",
        emergency: "03121234567",
        address: "Bahria Town, Rawalpindi",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },

    {
        id: 3,
        name: "Ali Raza",
        designation: "Sous Chef",
        department: "Kitchen",
        phone: "03214567891",
        salary: 55000,
        shift: "Evening",
        status: "Active",
        joining: "2024-03-12",
        emergency: "03211234567",
        address: "Chakwal",
        image: "https://randomuser.me/api/portraits/men/22.jpg"
    },

    {
        id: 4,
        name: "Ayesha Malik",
        designation: "Cashier",
        department: "POS",
        phone: "03334567890",
        salary: 42000,
        shift: "Morning",
        status: "Active",
        joining: "2024-04-20",
        emergency: "03331234567",
        address: "Islamabad",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    },

    {
        id: 5,
        name: "Usman Tariq",
        designation: "Waiter",
        department: "Service",
        phone: "03454567890",
        salary: 30000,
        shift: "Evening",
        status: "Active",
        joining: "2024-05-11",
        emergency: "03451234567",
        address: "Chakwal",
        image: "https://randomuser.me/api/portraits/men/57.jpg"
    },

    {
        id: 6,
        name: "Hira Shah",
        designation: "Receptionist",
        department: "Front Desk",
        phone: "03054561234",
        salary: 35000,
        shift: "Morning",
        status: "On Leave",
        joining: "2024-06-02",
        emergency: "03059876543",
        address: "Jhelum",
        image: "https://randomuser.me/api/portraits/women/55.jpg"
    },

    {
        id: 7,
        name: "Bilal Ahmed",
        designation: "Delivery Rider",
        department: "Delivery",
        phone: "03167894561",
        salary: 32000,
        shift: "Night",
        status: "Active",
        joining: "2024-07-15",
        emergency: "03160001122",
        address: "Rawalpindi",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    },

    {
        id: 8,
        name: "Sara Iqbal",
        designation: "Store Keeper",
        department: "Inventory",
        phone: "03227894561",
        salary: 40000,
        shift: "Morning",
        status: "Inactive",
        joining: "2024-03-25",
        emergency: "03220001122",
        address: "Taxila",
        image: "https://randomuser.me/api/portraits/women/81.jpg"
    },

    {
    id: 9,
    name: "Ahmed Hassan",
    designation: "Delivery Rider",
    department: "Delivery",
    phone: "03011223344",
    salary: 32000,
    shift: "Morning",
    status: "Active",
    joining: "2024-08-05",
    emergency: "03019876543",
    address: "Chakwal",
    image: "https://randomuser.me/api/portraits/men/12.jpg"
},
{
    id: 10,
    name: "Usman Khalid",
    designation: "Delivery Rider",
    department: "Delivery",
    phone: "03112223344",
    salary: 32000,
    shift: "Evening",
    status: "Active",
    joining: "2024-08-11",
    emergency: "03119876543",
    address: "Rawalpindi",
    image: "https://randomuser.me/api/portraits/men/26.jpg"
},
{
    id: 11,
    name: "Hamza Ali",
    designation: "Delivery Rider",
    department: "Delivery",
    phone: "03212223344",
    salary: 32000,
    shift: "Night",
    status: "Active",
    joining: "2024-08-18",
    emergency: "03219876543",
    address: "Islamabad",
    image: "https://randomuser.me/api/portraits/men/37.jpg"
}

],

    menu: [

    // ===================== BURGERS =====================

    {
        id: 1,
        name: "Zinger Burger",
        category: "Burger",
        price: 650,
        preparation: 15,
        status: "Available",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        description: "Crispy chicken fillet with lettuce, cheese and mayo."
    },

    {
        id: 2,
        name: "Beef Burger",
        category: "Burger",
        price: 750,
        preparation: 18,
        status: "Available",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
        description: "Juicy grilled beef burger with cheddar cheese."
    },

    {
        id: 3,
        name: "Chicken Cheese Burger",
        category: "Burger",
        price: 700,
        preparation: 16,
        status: "Available",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600",
        description: "Chicken patty topped with melted cheese."
    },

    // ===================== PIZZA =====================

    {
        id: 4,
        name: "Chicken Fajita Pizza",
        category: "Pizza",
        price: 1490,
        preparation: 22,
        status: "Available",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        description: "Loaded with fajita chicken and mozzarella cheese."
    },

    {
        id: 5,
        name: "Chicken Tikka Pizza",
        category: "Pizza",
        price: 1450,
        preparation: 20,
        status: "Available",
       image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop",
        description: "Traditional tikka flavor with extra cheese."
    },

    {
        id: 6,
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        price: 1550,
        preparation: 24,
        status: "Available",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600",
        description: "BBQ chicken chunks with special BBQ sauce."
    },

    // ===================== BBQ =====================

    {
        id: 7,
        name: "Chicken Tikka",
        category: "BBQ",
        price: 550,
        preparation: 18,
        status: "Available",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
        description: "Traditional charcoal grilled chicken tikka."
    },

    {
        id: 8,
        name: "Malai Boti",
        category: "BBQ",
        price: 690,
        preparation: 20,
        status: "Available",
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600",
        description: "Creamy boneless chicken BBQ."
    },

    {
        id: 9,
        name: "Seekh Kebab",
        category: "BBQ",
        price: 520,
        preparation: 17,
        status: "Available",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600",
        description: "Juicy minced meat seekh kebabs."
    },

    // ===================== CHINESE =====================

    {
        id: 10,
        name: "Chicken Chow Mein",
        category: "Chinese",
        price: 850,
        preparation: 18,
        status: "Available",
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600",
        description: "Stir-fried noodles with vegetables and chicken."
    },

    {
        id: 11,
        name: "Chicken Manchurian",
        category: "Chinese",
        price: 980,
        preparation: 20,
        status: "Available",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
        description: "Chicken in spicy Manchurian gravy."
    },

    {
        id: 12,
        name: "Chicken Shashlik",
        category: "Chinese",
        price: 1050,
        preparation: 22,
        status: "Available",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600",
        description: "Chicken cubes served with vegetables."
    },

    // ===================== RICE =====================

    {
        id: 13,
        name: "Chicken Biryani",
        category: "Rice",
        price: 420,
        preparation: 15,
        status: "Available",
        image: "https://images.unsplash.com/photo-1701579231349-5f5dcb0db88f?w=600",
        description: "Traditional Pakistani chicken biryani."
    },

    {
        id: 14,
        name: "Beef Biryani",
        category: "Rice",
        price: 520,
        preparation: 18,
        status: "Available",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600",
        description: "Spicy beef biryani with aromatic rice."
    },

    {
        id: 15,
        name: "Chicken Pulao",
        category: "Rice",
        price: 450,
        preparation: 16,
        status: "Available",
        image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600",
        description: "Lightly spiced chicken pulao."
    },

    // ===================== FAST FOOD =====================

    {
        id: 16,
        name: "French Fries",
        category: "Fast Food",
        price: 280,
        preparation: 8,
        status: "Available",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
        description: "Golden crispy french fries."
    },

    {
        id: 17,
        name: "Chicken Nuggets",
        category: "Fast Food",
        price: 450,
        preparation: 10,
        status: "Available",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=600",
        description: "Crunchy chicken nuggets."
    },

    {
        id: 18,
        name: "Club Sandwich",
        category: "Fast Food",
        price: 520,
        preparation: 12,
        status: "Available",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
        description: "Triple layered chicken club sandwich."
    },

    // ===================== DRINKS =====================

    {
        id: 19,
        name: "Pepsi",
        category: "Drinks",
        price: 120,
        preparation: 2,
        status: "Available",
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600",
        description: "Chilled soft drink."
    },

    {
        id: 20,
        name: "Mint Margarita",
        category: "Drinks",
        price: 250,
        preparation: 5,
        status: "Available",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop",
        description: "Refreshing mint margarita."
    },

    {
        id: 21,
        name: "Fresh Lime",
        category: "Drinks",
        price: 220,
        preparation: 4,
        status: "Available",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
        description: "Fresh lime drink with ice."
    },

    // ===================== DESSERTS =====================

    {
        id: 22,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 350,
        preparation: 5,
        status: "Available",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        description: "Rich chocolate cake slice."
    },

    {
        id: 23,
        name: "Brownie",
        category: "Desserts",
        price: 280,
        preparation: 5,
        status: "Available",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
        description: "Warm chocolate brownie."
    },

    {
        id: 24,
        name: "Ice Cream",
        category: "Desserts",
        price: 250,
        preparation: 3,
        status: "Available",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600",
        description: "Creamy vanilla ice cream."
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
            waiter: null,
            originalCapacity: 2,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 4,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 6,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 8,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 10,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 12,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 14,
            merged: false,
            mergedWith: null,
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
            waiter: null,
            originalCapacity: 16,
            merged: false,
            mergedWith: null,
        }

    ],

    inventory: [

    {
        id: 1,
        name: "Chicken Breast",
        category: "Meat",
        supplier: "Fresh Meat Suppliers",
        unit: "Kg",
        quantity: 35,
        purchasePrice: 780,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600",
        description: "Fresh boneless chicken breast."
    },

    {
        id: 2,
        name: "Beef Mince",
        category: "Meat",
        supplier: "Premium Meat House",
        unit: "Kg",
        quantity: 12,
        purchasePrice: 1250,
        status: "Low Stock",
        updated: "2026-07-11",
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600",
        description: "Premium quality minced beef."
    },

    {
        id: 3,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        supplier: "Green Farm",
        unit: "Kg",
        quantity: 45,
        purchasePrice: 180,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
        description: "Farm fresh tomatoes."
    },

    {
        id: 4,
        name: "Onions",
        category: "Vegetables",
        supplier: "Green Farm",
        unit: "Kg",
        quantity: 50,
        purchasePrice: 120,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600",
        description: "Fresh onions."
    },

    {
        id: 5,
        name: "Mozzarella Cheese",
        category: "Dairy",
        supplier: "Dairy Fresh",
        unit: "Kg",
        quantity: 18,
        purchasePrice: 980,
        status: "Low Stock",
        updated: "2026-07-10",
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600",
        description: "Premium mozzarella cheese."
    },

    {
        id: 6,
        name: "Fresh Milk",
        category: "Dairy",
        supplier: "Dairy Fresh",
        unit: "Liter",
        quantity: 40,
        purchasePrice: 210,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600",
        description: "Fresh dairy milk."
    },

    {
        id: 7,
        name: "Burger Buns",
        category: "Bakery",
        supplier: "Bake House",
        unit: "Pack",
        quantity: 22,
        purchasePrice: 260,
        status: "In Stock",
        updated: "2026-07-11",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
        description: "Soft sesame burger buns."
    },

    {
        id: 8,
        name: "Pizza Dough",
        category: "Bakery",
        supplier: "Bake House",
        unit: "Piece",
        quantity: 0,
        purchasePrice: 150,
        status: "Out Of Stock",
        updated: "2026-07-08",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        description: "Prepared pizza dough."
    },

    {
        id: 9,
        name: "Frozen Fries",
        category: "Frozen Food",
        supplier: "Frozen Foods Ltd",
        unit: "Pack",
        quantity: 30,
        purchasePrice: 480,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600",
        description: "Premium frozen fries."
    },

    {
        id: 10,
        name: "Chicken Nuggets",
        category: "Frozen Food",
        supplier: "Frozen Foods Ltd",
        unit: "Pack",
        quantity: 14,
        purchasePrice: 720,
        status: "Low Stock",
        updated: "2026-07-11",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=600",
        description: "Frozen chicken nuggets."
    },

    {
        id: 11,
        name: "Black Pepper",
        category: "Spices",
        supplier: "National Spices",
        unit: "Kg",
        quantity: 8,
        purchasePrice: 1450,
        status: "Low Stock",
        updated: "2026-07-10",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600",
        description: "Premium black pepper."
    },

    {
        id: 12,
        name: "Red Chili Powder",
        category: "Spices",
        supplier: "National Spices",
        unit: "Kg",
        quantity: 20,
        purchasePrice: 850,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1615485291234-9fbc63cddc63?w=600",
        description: "Pure red chili powder."
    },

    {
        id: 13,
        name: "Soft Drink Bottles",
        category: "Beverages",
        supplier: "Coca-Cola Pakistan",
        unit: "Bottle",
        quantity: 60,
        purchasePrice: 120,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600",
        description: "Soft drinks."
    },

    {
        id: 14,
        name: "Mineral Water",
        category: "Beverages",
        supplier: "Nestle Pakistan",
        unit: "Bottle",
        quantity: 80,
        purchasePrice: 65,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1564419320408-38e24e038739?w=600",
        description: "Mineral water bottles."
    },

    {
        id: 15,
        name: "Shrimps",
        category: "Seafood",
        supplier: "Ocean Foods",
        unit: "Kg",
        quantity: 0,
        purchasePrice: 1850,
        status: "Out Of Stock",
        updated: "2026-07-07",
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600",
        description: "Fresh shrimps."
    },

    {
        id: 16,
        name: "Paper Cups",
        category: "Packaging",
        supplier: "Pack World",
        unit: "Box",
        quantity: 45,
        purchasePrice: 390,
        status: "In Stock",
        updated: "2026-07-11",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
        description: "Disposable paper cups."
    },

    {
        id: 17,
        name: "Burger Boxes",
        category: "Packaging",
        supplier: "Pack World",
        unit: "Box",
        quantity: 18,
        purchasePrice: 480,
        status: "Low Stock",
        updated: "2026-07-11",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600",
        description: "Food packaging boxes."
    },

    {
        id: 18,
        name: "Dishwashing Liquid",
        category: "Cleaning Supplies",
        supplier: "CleanMax",
        unit: "Bottle",
        quantity: 24,
        purchasePrice: 320,
        status: "In Stock",
        updated: "2026-07-10",
        image: "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?w=600",
        description: "Kitchen cleaning liquid."
    },

    {
        id: 19,
        name: "Kitchen Gloves",
        category: "Cleaning Supplies",
        supplier: "CleanMax",
        unit: "Pack",
        quantity: 10,
        purchasePrice: 250,
        status: "Low Stock",
        updated: "2026-07-10",
        image: "https://i5.walmartimages.com/seo/Oven-Mitts-Heat-Resistant-Kitchen-Gloves-572-F-Non-Slip-Silicone-Surface-Extra-Long-Flexible-Thick-Mitts-Cooking-Baking-BBQ-Grid-Red_1b570e83-e784-4930-ad4f-1233d4aef923.5b05f0e87e5cf98b5868df9ba7145fe9.jpeg",
        description: "Disposable kitchen gloves."
    },

    {
        id: 20,
        name: "Cooking Oil",
        category: "Beverages",
        supplier: "Sufi Oil",
        unit: "Liter",
        quantity: 55,
        purchasePrice: 610,
        status: "In Stock",
        updated: "2026-07-12",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600",
        description: "Premium cooking oil."
    }

],

    purchases: [

    {
        id: 1001,
        invoice: "INV-1001",
        supplier: "Fresh Farm Suppliers",
        item: "Chicken Breast",
        category: "Meat",
        quantity: 50,
        unit: "Kg",
        unitPrice: 620,
        total: 31000,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-02",
        updated: "2 Jul 2026"
    },

    {
        id: 1002,
        invoice: "INV-1002",
        supplier: "Green Valley Farms",
        item: "Fresh Tomatoes",
        category: "Vegetables",
        quantity: 80,
        unit: "Kg",
        unitPrice: 140,
        total: 11200,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-03",
        updated: "3 Jul 2026"
    },

    {
        id: 1003,
        invoice: "INV-1003",
        supplier: "Dairy Best",
        item: "Mozzarella Cheese",
        category: "Dairy",
        quantity: 35,
        unit: "Kg",
        unitPrice: 980,
        total: 34300,
        payment: "Partial",
        status: "Pending",
        date: "2026-07-04",
        updated: "4 Jul 2026"
    },

    {
        id: 1004,
        invoice: "INV-1004",
        supplier: "Spice World",
        item: "Mixed Spices",
        category: "Spices",
        quantity: 25,
        unit: "Kg",
        unitPrice: 540,
        total: 13500,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-05",
        updated: "5 Jul 2026"
    },

    {
        id: 1005,
        invoice: "INV-1005",
        supplier: "Cool Drinks Ltd",
        item: "Soft Drinks",
        category: "Beverages",
        quantity: 120,
        unit: "Bottle",
        unitPrice: 95,
        total: 11400,
        payment: "Pending",
        status: "Pending",
        date: "2026-07-06",
        updated: "6 Jul 2026"
    },

    {
        id: 1006,
        invoice: "INV-1006",
        supplier: "Prime Bakery",
        item: "Burger Buns",
        category: "Bakery",
        quantity: 300,
        unit: "Piece",
        unitPrice: 28,
        total: 8400,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-07",
        updated: "7 Jul 2026"
    },

    {
        id: 1007,
        invoice: "INV-1007",
        supplier: "Frozen Foods Co.",
        item: "French Fries",
        category: "Frozen",
        quantity: 40,
        unit: "Kg",
        unitPrice: 430,
        total: 17200,
        payment: "Partial",
        status: "Pending",
        date: "2026-07-08",
        updated: "8 Jul 2026"
    },

    {
        id: 1008,
        invoice: "INV-1008",
        supplier: "Food Packaging Hub",
        item: "Takeaway Boxes",
        category: "Packaging",
        quantity: 600,
        unit: "Piece",
        unitPrice: 18,
        total: 10800,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-09",
        updated: "9 Jul 2026"
    },

    {
        id: 1009,
        invoice: "INV-1009",
        supplier: "Sea Fresh Traders",
        item: "Fish Fillet",
        category: "Seafood",
        quantity: 30,
        unit: "Kg",
        unitPrice: 760,
        total: 22800,
        payment: "Pending",
        status: "Pending",
        date: "2026-07-10",
        updated: "10 Jul 2026"
    },

    {
        id: 1010,
        invoice: "INV-1010",
        supplier: "Fresh Farm Suppliers",
        item: "Chicken Wings",
        category: "Meat",
        quantity: 45,
        unit: "Kg",
        unitPrice: 590,
        total: 26550,
        payment: "Paid",
        status: "Completed",
        date: "2026-07-11",
        updated: "11 Jul 2026"
    }

],

    expenses: [

    {
        id: 1,

        receipt: "EXP-1001",

        category: "Electricity",

        title: "June Electricity Bill",

        amount: 42000,

        date: "2026-07-02",

        payment: "Paid",

        status: "Completed",

        notes: "Monthly electricity charges for restaurant."
    },

    {
        id: 2,

        receipt: "EXP-1002",

        category: "Water",

        title: "Water Supply Charges",

        amount: 8500,

        date: "2026-07-04",

        payment: "Paid",

        status: "Completed",

        notes: "Monthly water bill."
    },

    {
        id: 3,

        receipt: "EXP-1003",

        category: "Gas",

        title: "Kitchen Gas Refill",

        amount: 18000,

        date: "2026-07-06",

        payment: "Pending",

        status: "Pending",

        notes: "Commercial gas cylinders."
    },

    {
        id: 4,

        receipt: "EXP-1004",

        category: "Internet",

        title: "PTCL Internet Bill",

        amount: 6200,

        date: "2026-07-08",

        payment: "Paid",

        status: "Completed",

        notes: "Business internet connection."
    },

    {
        id: 5,

        receipt: "EXP-1005",

        category: "Salary",

        title: "Kitchen Staff Salaries",

        amount: 165000,

        date: "2026-07-10",

        payment: "Paid",

        status: "Completed",

        notes: "Monthly salaries."
    },

    {
        id: 6,

        receipt: "EXP-1006",

        category: "Cleaning",

        title: "Cleaning Supplies",

        amount: 9500,

        date: "2026-07-12",

        payment: "Pending",

        status: "Pending",

        notes: "Detergents and sanitizers."
    },

    {
        id: 7,

        receipt: "EXP-1007",

        category: "Maintenance",

        title: "AC Maintenance",

        amount: 27000,

        date: "2026-07-15",

        payment: "Paid",

        status: "Completed",

        notes: "Restaurant AC servicing."
    },

    {
        id: 8,

        receipt: "EXP-1008",

        category: "Marketing",

        title: "Facebook Advertisement",

        amount: 15000,

        date: "2026-07-18",

        payment: "Paid",

        status: "Completed",

        notes: "Weekend promotional campaign."
    },

    {
        id: 9,

        receipt: "EXP-1009",

        category: "Rent",

        title: "Restaurant Rent",

        amount: 250000,

        date: "2026-07-01",

        payment: "Paid",

        status: "Completed",

        notes: "Monthly shop rent."
    },

    {
        id: 10,

        receipt: "EXP-1010",

        category: "Miscellaneous",

        title: "Office Stationery",

        amount: 4300,

        date: "2026-07-20",

        payment: "Pending",

        status: "Pending",

        notes: "Pens, files and registers."
    }

],
    deliveries: [

    {
        id: 1,

        order: "ORD-1001",

        customer: "Ali Khan",

        phone: "03001234567",

        address: "Satellite Town, Rawalpindi",

        rider: "Ahmed",

        eta: "12 min",

        progress: 70,

        status: "Out For Delivery",

        remainingSeconds: 0,
    },

    {
        id: 2,

        order: "ORD-1002",

        customer: "Ayesha Malik",

        phone: "03119876543",

        address: "DHA Phase 2, Islamabad",

        rider: "Usman",

        eta: "5 min",

        progress: 90,

        status: "Near Customer",

        remainingSeconds: 0,
    },

    {
        id: 3,

        order: "ORD-1003",

        customer: "Hamza Ali",

        phone: "03211234567",

        address: "Chakwal City",

        rider: "Bilal",

        eta: "18 min",

        progress: 45,

        status: "Out For Delivery",

        remainingSeconds: 0,
    },

    {
        id: 4,

        order: "ORD-1004",

        customer: "Fatima Noor",

        phone: "03335678901",

        address: "Bahria Town, Rawalpindi",

        rider: "Ahmed",

        eta: "Delivered",

        progress: 100,

        status: "Delivered",

        remainingSeconds: 0,
    },

    {
        id: 5,

        order: "ORD-1005",

        customer: "Zain Ahmed",

        phone: "03034561234",

        address: "Jhelum Road, Chakwal",

        rider: "Hamza",

        eta: "25 min",

        progress: 20,

        status: "Preparing",

        remainingSeconds: 0,
    },

    {
        id: 6,

        order: "ORD-1006",

        customer: "Sana Khan",

        phone: "03451234567",

        address: "F-10, Islamabad",

        rider: "Bilal",

        eta: "15 min",

        progress: 60,

        status: "Out For Delivery",

        remainingSeconds: 0,
    },

    {
        id: 8,

        order: "ORD-1008",

        customer: "Maryam Iqbal",

        phone: "03099887766",

        address: "Saddar, Rawalpindi",

        rider: "Hamza",

        eta: "9 min",

        progress: 85,

        status: "Near Customer",

        remainingSeconds: 0,
    }

],
}