// --- ELEMENTS ---
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const loginForm = document.getElementById("loginForm");
const rememberCheckbox = document.getElementById("remember");

// --- 1. TOGGLE PASSWORD VISIBILITY ---
togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "⊘" : "👁️";
});

// --- 2. PASSWORD STRENGTH CHECKER ---
const strengthBar = document.createElement("div");
strengthBar.style.height = "5px";
strengthBar.style.borderRadius = "3px";
strengthBar.style.marginTop = "5px";
passwordInput.insertAdjacentElement("afterend", strengthBar);

passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    let strength = 0;

    if (val.match(/[a-z]+/)) strength++;
    if (val.match(/[A-Z]+/)) strength++;
    if (val.match(/[0-9]+/)) strength++;
    if (val.match(/[$@#&!]+/)) strength++;
    if (val.length >= 8) strength++;

    switch (strength) {
        case 0:
            strengthBar.style.width = "0%";
            break;
        case 1:
            strengthBar.style.width = "20%";
            strengthBar.style.background = "red";
            break;
        case 2:
            strengthBar.style.width = "40%";
            strengthBar.style.background = "orange";
            break;
        case 3:
            strengthBar.style.width = "60%";
            strengthBar.style.background = "yellow";
            break;
        case 4:
            strengthBar.style.width = "80%";
            strengthBar.style.background = "lightgreen";
            break;
        case 5:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "green";
            break;
    }
});

// --- 3. REMEMBER ME USING LOCALSTORAGE ---
window.addEventListener("load", () => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }

    // Animate the card on load
    document.querySelector(".login-box").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".login-box").style.transition = "all 0.8s ease";
        document.querySelector(".login-box").style.opacity = "1";
        document.querySelector(".login-box").style.transform = "translateY(0)";
    }, 100);
});

// --- 4. SUBMIT FORM WITH ANIMATED BUTTON ---
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const btn = document.querySelector(".btn");

    if (!username || !password) {
        alert("Please enter both username and password!");
        return;
    }

    // Save username if remember me is checked
    if (rememberCheckbox.checked) {
        localStorage.setItem("rememberedUsername", username);
    } else {
        localStorage.removeItem("rememberedUsername");
    }

    // Loading animation
    btn.innerHTML = `<span class="spinner"></span> Logging in...`;
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = "✅ Success!";
        btn.style.background = "green";

        setTimeout(() => {
            alert(`Welcome back, ${username}!`);
            btn.innerHTML = "Login";
            btn.disabled = false;
            btn.style.background = "";
            loginForm.reset();
        }, 1500);
    }, 1500);
});

// --- 5. DARK MODE TOGGLE ---
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙";
darkModeBtn.className = "dark-toggle";
document.body.appendChild(darkModeBtn);

// Apply saved theme
if (localStorage.getItem("theme") === "dark") enableDarkMode();

darkModeBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
}

function disableDarkMode() {
    document.body.classList.remove("dark");
    darkModeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
}
