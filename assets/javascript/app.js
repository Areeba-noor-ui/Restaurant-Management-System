"use strict";

/* APP CONFIGURATION*/

const App = {

    name: "Restaurant Management System",

    version: "1.0",

    currency: "$",

    sidebarWidth: 270,

    storageKeys: {

        login: "isLoggedIn",

        rememberEmail: "rememberEmail",

        sidebar: "sidebarState"

    }

};


/* HELPER FUNCTIONS*/

const Helper = {

    qs(selector) {

        return document.querySelector(selector);

    },

    qsa(selector) {

        return document.querySelectorAll(selector);

    },

    id(id) {

        return document.getElementById(id);

    },

    create(tag) {

        return document.createElement(tag);

    }

};


/* STORAGE*/

const Storage = {

    save(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    },

    get(key, defaultValue = null) {

        const item = localStorage.getItem(key);

        if (!item) return defaultValue;

        return JSON.parse(item);

    },

    saveString(key, value) {

        localStorage.setItem(key, value);

    },

    getString(key) {

        return localStorage.getItem(key);

    },

    remove(key) {

        localStorage.removeItem(key);

    }

};

/*=========================================================
                FORMATTER
=========================================================*/

const Formatter = {

    number(value) {

        return Number(value).toLocaleString();

    },

    currency(value) {

        return "$" + Number(value).toLocaleString();

    },

    date(date = new Date()) {

        return date.toLocaleDateString();

    },

    time(date = new Date()) {

        return date.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    }

};


/*VALIDATORS*/

const Validator = {

    email(email) {

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }

};

/*LOGIN MODULE*/

const Login = {

    demoEmail: "admin@restaurant.com",

    demoPassword: "admin123",

    init() {

        const loginForm = Helper.id("loginForm");

        if (!loginForm) return;

        const email = Helper.id("email");

        const password = Helper.id("password");

        const remember = Helper.id("remember");

        const togglePassword = Helper.id("togglePassword");

        this.loadRememberedUser();

        togglePassword.addEventListener("click", () => {

            this.togglePassword(password, togglePassword);

        });

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            this.login(email, password, remember);

        });

    },

    togglePassword(passwordInput, button) {

        const icon = button.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.replace("bi-eye", "bi-eye-slash");

        } else {

            passwordInput.type = "password";

            icon.classList.replace("bi-eye-slash", "bi-eye");

        }

    },

    login(emailInput, passwordInput, rememberCheck) {

        const email = emailInput.value.trim();

        const password = passwordInput.value.trim();

        if (!email || !password) {

            alert("Please fill in all fields.");

            return;

        }

        if (!Validator.email(email)) {

            alert("Please enter a valid email.");

            return;

        }

        if (

            email === this.demoEmail &&

            password === this.demoPassword

        ) {

            if (rememberCheck.checked) {

                Storage.saveString(

                    App.storageKeys.rememberEmail,

                    email

                );

            }

            else {

                Storage.remove(

                    App.storageKeys.rememberEmail

                );

            }

            Storage.saveString(

                App.storageKeys.login,

                "true"

            );

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        }

        else {

            alert("Invalid Email or Password.");

        }

    },

    loadRememberedUser() {

        const email = Storage.getString(

            App.storageKeys.rememberEmail

        );

        if (!email) return;

        Helper.id("email").value = email;

        Helper.id("remember").checked = true;

    }

};
/*=========================================================
                TOAST NOTIFICATIONS
=========================================================*/

const Toast = {

    container: null,

    init() {

        this.container = Helper.id("toastContainer");

        if (this.container) return;

        this.container = Helper.create("div");

        this.container.id = "toastContainer";

        this.container.className =
            "toast-container position-fixed top-0 end-0 p-3";

        document.body.appendChild(this.container);

    },

    show(message, type = "success") {

        this.init();

        const colors = {

            success: "text-bg-success",

            danger: "text-bg-danger",

            warning: "text-bg-warning",

            info: "text-bg-primary"

        };

        const toast = Helper.create("div");

        toast.className = `toast align-items-center border-0 ${colors[type] || colors.success}`;

        toast.setAttribute("role", "alert");

        toast.innerHTML = `

            <div class="d-flex">

                <div class="toast-body">

                    ${message}

                </div>

                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast">
                </button>

            </div>

        `;

        this.container.appendChild(toast);

        const bsToast = new bootstrap.Toast(toast, {

            delay: 3000

        });

        bsToast.show();

        toast.addEventListener("hidden.bs.toast", () => {

            toast.remove();

        });

    }

};


/*=========================================================
                ANIMATED COUNTERS
=========================================================*/

const Counter = {

    animate(element, endValue, duration = 1500) {

        let startValue = 0;

        const increment = endValue / (duration / 16);

        function update() {

            startValue += increment;

            if (startValue >= endValue) {

                element.textContent = Formatter.number(endValue);

                return;

            }

            element.textContent = Formatter.number(Math.floor(startValue));

            requestAnimationFrame(update);

        }

        update();

    },

    init() {

        const counters = Helper.qsa("[data-counter]");

        if (!counters.length) return;

        counters.forEach(counter => {

            const value = Number(counter.dataset.counter);

            this.animate(counter, value);

        });

    }

};


/*=========================================================
                LIVE DATE & TIME
=========================================================*/

const Clock = {

    init() {

        const dateElement = Helper.id("currentDate");

        const timeElement = Helper.id("currentTime");

        if (!dateElement && !timeElement) return;

        this.update(dateElement, timeElement);

        setInterval(() => {

            this.update(dateElement, timeElement);

        }, 1000);

    },

    update(dateElement, timeElement) {

        const now = new Date();

        if (dateElement) {

            dateElement.textContent = now.toLocaleDateString();

        }

        if (timeElement) {

            timeElement.textContent = now.toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit"

            });

        }

    }

};
/*=========================================================
                LOADER
=========================================================*/

const Loader = {

    show() {

        let loader = Helper.id("pageLoader");

        if (!loader) {

            loader = Helper.create("div");

            loader.id = "pageLoader";

            loader.innerHTML = `

                <div class="spinner-border text-danger"></div>

            `;

            loader.style.cssText = `
                position:fixed;
                inset:0;
                display:flex;
                align-items:center;
                justify-content:center;
                background:rgba(255,255,255,.75);
                z-index:99999;
            `;

            document.body.append(loader);

        }

    },

    hide() {

        const loader = Helper.id("pageLoader");

        if (loader) loader.remove();

    }

};


/*=========================================================
                BUTTON LOADING
=========================================================*/

const Button = {

    loading(button, text = "Loading...") {

        button.dataset.original = button.innerHTML;

        button.disabled = true;

        button.innerHTML = `

            <span class="spinner-border spinner-border-sm me-2"></span>

            ${text}

        `;

    },

    reset(button) {

        button.disabled = false;

        button.innerHTML = button.dataset.original;

    }

};


/*=========================================================
                CONFIRMATION
=========================================================*/

const Confirm = {

    delete(item = "record") {

        return confirm(`Delete this ${item}?`);

    }

};


/*=========================================================
                PAGE GUARD
=========================================================*/

const Guard = {

    requireLogin() {

        if (

            window.location.pathname.includes("index.html")

        ) return;

        if (

            Storage.getString(App.storageKeys.login) !== "true"

        ) {

            window.location.href = "index.html";

        }

    }

};

/*=========================================================
                    SIDEBAR
=========================================================*/

const Sidebar = {

    init() {

        this.sidebar = Helper.id("sidebar");
        this.toggleBtn = Helper.id("menuToggle");
        this.overlay = Helper.id("sidebarOverlay");

        if (!this.sidebar || !this.toggleBtn) return;

        // Restore desktop state
        if (window.innerWidth > 992) {

            const saved = Storage.getString(App.storageKeys.sidebar);

            if (saved === "collapsed") {

                this.sidebar.classList.add("collapsed");
                document.body.classList.add("sidebar-collapsed");

            }

        }

        this.toggleBtn.addEventListener("click", () => {

            this.toggle();

        });

        if (this.overlay) {

            this.overlay.addEventListener("click", () => {

                this.closeMobile();

            });

        }

        window.addEventListener("resize", () => {

            this.handleResize();

        });

    },

    toggle() {

        if (window.innerWidth <= 992) {

            this.sidebar.classList.toggle("mobile-open");

            if (this.overlay) {

                this.overlay.classList.toggle("show");

            }

        } else {

            this.sidebar.classList.toggle("collapsed");

            document.body.classList.toggle("sidebar-collapsed");

            Storage.saveString(

                App.storageKeys.sidebar,

                this.sidebar.classList.contains("collapsed")
                    ? "collapsed"
                    : "expanded"

            );

        }

    },

    closeMobile() {

        this.sidebar.classList.remove("mobile-open");

        if (this.overlay) {

            this.overlay.classList.remove("show");

        }

    },

    handleResize() {

        if (window.innerWidth > 992) {

            this.sidebar.classList.remove("mobile-open");

            if (this.overlay) {

                this.overlay.classList.remove("show");

            }

        }

    }

};

/*INITIALIZATION*/

document.addEventListener("DOMContentLoaded", () => {

    Guard.requireLogin();

    Login.init();

    Sidebar.init();

    Toast.init();

    Counter.init();

    Clock.init();

});
