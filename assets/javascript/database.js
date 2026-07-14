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

]
}