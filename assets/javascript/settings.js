"use strict";

const Settings = {

    init() {

        this.loadSettings();

        this.initializeEvents();

    },

    loadSettings() {

        const appearance = JSON.parse(localStorage.getItem("appearance")) || {};

        const restaurant = JSON.parse(localStorage.getItem("restaurantInfo")) || {};

        const preferences = JSON.parse(localStorage.getItem("preferences")) || {};

        const admin = JSON.parse(localStorage.getItem("adminProfile")) || {};

        Helper.id("themeMode").value = appearance.theme || "Dark";
        Helper.id("themeColor").value = appearance.color || "Blue";
        Helper.id("fontSize").value = appearance.font || "Medium";

        Helper.id("restaurantName").value = restaurant.name || "";
        Helper.id("restaurantPhone").value = restaurant.phone || "";
        Helper.id("restaurantEmail").value = restaurant.email || "";
        Helper.id("restaurantAddress").value = restaurant.address || "";

        Helper.id("enableNotification").checked = preferences.notification ?? true;
        Helper.id("autoPrint").checked = preferences.autoPrint ?? false;
        Helper.id("playSound").checked = preferences.sound ?? true;
        Helper.id("dashboardAnimation").checked = preferences.animation ?? true;

        Helper.id("adminName").value = admin.name || "Admin";
        Helper.id("adminUsername").value = admin.username || "admin";
        Helper.id("adminEmail").value = admin.email || "";

    },

    initializeEvents() {

        Helper.id("saveAppearance").addEventListener("click", () => this.saveAppearance());

        Helper.id("saveRestaurant").addEventListener("click", () => this.saveRestaurant());

        Helper.id("savePreferences").addEventListener("click", () => this.savePreferences());

        Helper.id("updateProfile").addEventListener("click", () => this.updateProfile());

        Helper.id("clearData").addEventListener("click", () => this.clearData());

    },

    saveAppearance() {

        const appearance = {

            theme: Helper.id("themeMode").value,

            color: Helper.id("themeColor").value,

            font: Helper.id("fontSize").value

        };

        localStorage.setItem("appearance", JSON.stringify(appearance));

        Toast.show("Appearance settings saved", "success");

    },

    saveRestaurant() {

        const restaurant = {

            name: Helper.id("restaurantName").value,

            phone: Helper.id("restaurantPhone").value,

            email: Helper.id("restaurantEmail").value,

            address: Helper.id("restaurantAddress").value

        };

        localStorage.setItem("restaurantInfo", JSON.stringify(restaurant));

        Toast.show("Restaurant information saved", "success");

    },

    savePreferences() {

        const preferences = {

            notification: Helper.id("enableNotification").checked,

            autoPrint: Helper.id("autoPrint").checked,

            sound: Helper.id("playSound").checked,

            animation: Helper.id("dashboardAnimation").checked

        };

        localStorage.setItem("preferences", JSON.stringify(preferences));

        Toast.show("Preferences saved", "success");

    },

    updateProfile() {

        const admin = {

            name: Helper.id("adminName").value,

            username: Helper.id("adminUsername").value,

            email: Helper.id("adminEmail").value

        };

        localStorage.setItem("adminProfile", JSON.stringify(admin));

        Helper.id("currentPassword").value = "";
        Helper.id("newPassword").value = "";
        Helper.id("confirmPassword").value = "";

        Toast.show("Profile updated", "success");

    },

    clearData() {

        if (!confirm("Clear all local data?")) return;

        localStorage.clear();

        location.reload();

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Settings.init();

});