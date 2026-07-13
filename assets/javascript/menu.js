"use strict";

const Menu = {

    menu: [],

    filteredMenu: [],

    selectedItem: null,

    editIndex: null,

    init() {

        this.menu = Storage.get(

            CONSTANTS.STORAGE_KEYS.MENU,

            Database.menu

        );

        this.filteredMenu = [...this.menu];

        this.renderMenu();

        this.updateSummary();

        this.initializeFilters();

        this.initializeButtons();

        this.initializeImagePreview();

    },

    renderMenu() {

        const tbody = Helper.id("menuTableBody");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.filteredMenu.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="7">

                        <div class="menu-empty">

                            <i class="bi bi-menu-button-wide"></i>

                            <h4>No Menu Items Found</h4>

                            <p>Try changing your search or add a new food item.</p>

                        </div>

                    </td>

                </tr>

            `;

            return;

        }

        this.filteredMenu.forEach((item, index) => {

            tbody.innerHTML += `

            <tr>

                <td>

                    <img

                        src="${item.image}"

                        class="menu-food-image"

                        alt="${item.name}"

                        onerror="this.src='https://placehold.co/100x100?text=Food'">

                </td>

                <td>

                    <div class="menu-item-name">

                        ${item.name}

                    </div>

                    <div class="menu-item-description">

                        ${item.description}

                    </div>

                </td>

                <td>

                    <span class="menu-category">

                        ${item.category}

                    </span>

                </td>

                <td>

                    <span class="menu-price">

                        Rs.${Formatter.number(item.price)}

                    </span>

                </td>

                <td>

                    <div class="menu-time">

                        <i class="bi bi-clock"></i>

                        ${item.preparation} min

                    </div>

                </td>

                <td>

                    <span class="menu-status ${item.status === "Available"

                        ? "menu-available"

                        : "menu-stock"}">

                        ${item.status}

                    </span>

                </td>

                <td>

                    <button

                        class="menu-action-btn menu-view"

                        data-view="${index}">

                        <i class="bi bi-eye-fill"></i>

                    </button>

                    <button

                        class="menu-action-btn menu-edit"

                        data-edit="${index}">

                        <i class="bi bi-pencil-fill"></i>

                    </button>

                    <button

                        class="menu-action-btn menu-delete"

                        data-delete="${index}">

                        <i class="bi bi-trash-fill"></i>

                    </button>

                </td>

            </tr>

            `;

        });

        this.initializeTableButtons();

    },

    updateSummary() {

        Helper.id("totalItems").textContent =
            this.menu.length;

        const categories = [

            ...new Set(

                this.menu.map(item => item.category)

            )

        ];

        Helper.id("totalCategories").textContent =
            categories.length;

        Helper.id("availableItems").textContent =
            this.menu.filter(item =>
                item.status === "Available"
            ).length;

        Helper.id("stockItems").textContent =
            this.menu.filter(item =>
                item.status === "Out of Stock"
            ).length;

        const average = this.menu.length

            ?

            this.menu.reduce(

                (sum, item) => sum + Number(item.price),

                0

            ) / this.menu.length

            :

            0;

        Helper.id("averagePrice").textContent =
            "Rs." + Formatter.number(
                Math.round(average)
            );

    },

    initializeFilters() {

        const categoryFilter = Helper.id("categoryFilter");
        const availabilityFilter = Helper.id("availabilityFilter");

        // Create Category Options
        const categories = [
            "All",
            ...new Set(this.menu.map(item => item.category))
        ];

        categoryFilter.innerHTML = categories
            .map(category =>
                `<option value="${category}">${category}</option>`
            )
            .join("");

        // Create Availability Options
        availabilityFilter.innerHTML = `
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
        `;

        Helper.id("menuSearch").addEventListener("input", () => {
            this.filterMenu();
        });

        categoryFilter.addEventListener("change", () => {
            this.filterMenu();
        });

        availabilityFilter.addEventListener("change", () => {
            this.filterMenu();
        });

    },

    filterMenu() {

        const search =

            Helper.id("menuSearch")

                .value

                .toLowerCase()

                .trim();

        const category =

            Helper.id("categoryFilter").value;

        const status =

            Helper.id("availabilityFilter").value;

        this.filteredMenu = this.menu.filter(item => {

          const searchMatch =
            item.name.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

            const categoryMatch =

                category === "All"

                ||

                item.category === category;

            const statusMatch =

                status === "All"

                ||

                item.status === status;

            return (

                searchMatch

                &&

                categoryMatch

                &&

                statusMatch

            );

        });

        this.renderMenu();

    },

    initializeButtons() {

        Helper.id("addMenuBtn")

            .addEventListener("click", () => {

                this.openAddModal();

            });

        Helper.id("saveMenuBtn")

            .addEventListener("click", () => {

                this.saveItem();

            });

        Helper.id("refreshMenu")

            .addEventListener("click", () => {

                this.refreshMenu();

            });

    },

    initializeTableButtons() {

        document.querySelectorAll("[data-view]")

            .forEach(button => {

                button.addEventListener("click", () => {

                    this.openViewModal(

                        Number(button.dataset.view)

                    );

                });

            });



        document.querySelectorAll("[data-edit]")

            .forEach(button => {

                button.addEventListener("click", () => {

                    this.openEditModal(

                        Number(button.dataset.edit)

                    );

                });

            });



        document.querySelectorAll("[data-delete]")

            .forEach(button => {

                button.addEventListener("click", () => {

                    this.deleteItem(

                        Number(button.dataset.delete)

                    );

                });

            });

    },

    openAddModal() {

        this.editIndex = null;

        Helper.id("menuModalTitle").textContent =

            "Add Menu Item";



        Helper.id("menuName").value = "";



        Helper.id("menuCategory").selectedIndex = 0;



        Helper.id("menuPrice").value = "";



        Helper.id("menuPreparation").value = "";



        Helper.id("menuStatus").value =

            "Available";



        Helper.id("menuImage").value = "";



        Helper.id("menuDescription").value = "";



        Helper.id("menuPreviewImage").src =

            "https://placehold.co/600x400?text=Food+Image";



        new bootstrap.Modal(

            Helper.id("menuModal")

        ).show();

    },

    openEditModal(index) {

        this.editIndex = index;

        const item = this.menu[index];



        Helper.id("menuModalTitle").textContent =

            "Edit Menu Item";



        Helper.id("menuName").value =

            item.name;



        Helper.id("menuCategory").value =

            item.category;



        Helper.id("menuPrice").value =

            item.price;



        Helper.id("menuPreparation").value =

            item.preparation;



        Helper.id("menuStatus").value =

            item.status;



        Helper.id("menuImage").value =

            item.image;



        Helper.id("menuDescription").value =

            item.description;



        Helper.id("menuPreviewImage").src =

            item.image;



        new bootstrap.Modal(

            Helper.id("menuModal")

        ).show();

    },

    initializeImagePreview() {

        Helper.id("menuImage")

            .addEventListener("input", e => {

                const image =

                    e.target.value.trim();



                Helper.id("menuPreviewImage").src =

                    image ||

                    "https://placehold.co/600x400?text=Food+Image";

            });

    },

    saveItem() {

        const name =

            Helper.id("menuName")

                .value

                .trim();



        const category =

            Helper.id("menuCategory").value;



        const price =

            Number(

                Helper.id("menuPrice").value

            );



        const preparation =

            Number(

                Helper.id("menuPreparation").value

            );



        const status =

            Helper.id("menuStatus").value;



        const image =

            Helper.id("menuImage")

                .value

                .trim()



            ||

            "https://placehold.co/600x400?text=Food";



        const description =

            Helper.id("menuDescription")

                .value

                .trim();


        if (

            !name ||

            !price ||

            !preparation

        ) {

            Toast.show(

                "Please complete all required fields",

                "warning"

            );

            return;

        }


        const item = {

            id:

                this.editIndex === null

                    ?

                    Date.now()

                    :

                    this.menu[this.editIndex].id,

            name,

            category,

            price,

            preparation,

            status,

            image,

            description

        };


        if (

            this.editIndex === null

        ) {

            this.menu.push(item);

        }

        else {

            this.menu[this.editIndex] =

                item;

        }



        Storage.save(

            CONSTANTS.STORAGE_KEYS.MENU,

            this.menu,

            this.syncPOSMenu()

        );


        this.filteredMenu = [...this.menu];

        this.initializeFilters();

        this.renderMenu();

        this.updateSummary();

        bootstrap.Modal

            .getInstance(

                Helper.id("menuModal")

            )

            .hide();



        Toast.show(

            this.editIndex === null

                ?

                "Menu item added"

                :

                "Menu item updated",

            "success"

        );

    },

    openViewModal(index) {

        const item = this.menu[index];

        Helper.id("viewMenuImage").src =
            item.image;

        Helper.id("viewMenuName").textContent =
            item.name;

        Helper.id("viewMenuCategory").textContent =
            item.category;

        Helper.id("viewMenuPrice").textContent =
            "Rs. " + Formatter.number(item.price);

        Helper.id("viewPreparationTime").textContent =
            item.preparation + " Minutes";

        Helper.id("viewMenuStatus").innerHTML =

            item.status === "Available"

                ?

                `<span class="menu-status menu-available">

                    Available

                </span>`

                :

                `<span class="menu-status menu-stock">

                    Out of Stock

                </span>`;

        Helper.id("viewMenuDescription").textContent =
            item.description;

        new bootstrap.Modal(

            Helper.id("viewMenuModal")

        ).show();

    },

    deleteItem(index) {

        const item = this.menu[index];

        const confirmDelete =

            confirm(

                `Delete "${item.name}" ?`

            );

        if (!confirmDelete) return;

        this.menu.splice(index, 1);

        Storage.save(

            CONSTANTS.STORAGE_KEYS.MENU,

            this.menu,

            this.syncPOSMenu()

        );

        this.filteredMenu =  [...this.menu];

        this.initializeFilters();

        this.renderMenu();

        this.updateSummary();

        Toast.show(

            "Menu item deleted.",

            "success"

        );

    },

    refreshMenu() {

        const restore =

            confirm(

                "Restore default menu?"

            );

        if (!restore) return;

        this.menu =

            JSON.parse(

                JSON.stringify(

                    Database.menu

                )

            );

        Storage.save(

            CONSTANTS.STORAGE_KEYS.MENU,

            this.menu

        );

        this.filteredMenu =

            [...this.menu];

        this.initializeFilters();

        Helper.id("menuSearch").value = "";

        Helper.id("categoryFilter").value = "All";

        Helper.id("availabilityFilter").value = "All";

        this.renderMenu();

        this.updateSummary();

        Toast.show(

            "Menu refreshed successfully.",

            "success"

        );

    },

    syncPOSMenu() {

        Storage.save(

            CONSTANTS.STORAGE_KEYS.MENU,

            this.menu

        );

    },

     updatePOSMenu() {

        /*
            POS page should always load menu using:

            Storage.get(
                CONSTANTS.STORAGE_KEYS.MENU,
                Database.menu
            );

            Therefore nothing else is required here.
            This function is reserved for future expansion.
        */

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Menu.init();

});
