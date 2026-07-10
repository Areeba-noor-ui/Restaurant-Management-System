/*
    Login Page JavaScript====*/

document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();

});


function initializeLogin() {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("remember");

    loadRememberedUser();

    togglePassword.addEventListener("click", () => {

        togglePasswordVisibility(passwordInput, togglePassword);

    });

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        login(emailInput, passwordInput, rememberMe);

    });

}



function togglePasswordVisibility(passwordInput, button) {

    const icon = button.querySelector("i");

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    } else {

        passwordInput.type = "password";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

    }

}



function login(emailInput, passwordInput, rememberMe) {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {

        alert("Please fill in all fields.");

        return;

    }

    if (!validateEmail(email)) {

        alert("Please enter a valid email address.");

        return;

    }



    // Demo Credentials

    const demoEmail = "admin@restaurant.com";
    const demoPassword = "admin123";

    if (email === demoEmail && password === demoPassword) {

        if (rememberMe.checked) {

            localStorage.setItem("rememberEmail", email);

        } else {

            localStorage.removeItem("rememberEmail");

        }

        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password.");

    }

}



function validateEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}



function loadRememberedUser() {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (!savedEmail) return;

    document.getElementById("email").value = savedEmail;

    document.getElementById("remember").checked = true;

}