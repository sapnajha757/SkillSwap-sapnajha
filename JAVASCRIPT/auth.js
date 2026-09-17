// ==================================================
// SUPABASE CLIENT INITIALIZATION
// ==================================================

// Replace placeholders with your actual Supabase credentials from Project Settings > API
const SUPABASE_URL = "https://rvhtmresjmhjhtaflkfh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aHRtcmVzam1oamh0YWZsa2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDkyMDYsImV4cCI6MjEwNTIyNTIwNn0.WUWADZAotBc917hpfc-9XXS6M6bnApKAkJC11Z87KNM";

const supabaseClient = (typeof supabase !== "undefined")
    ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

if (supabaseClient) {
    console.log("Supabase client initialized successfully.");
} else {
    console.error("Supabase library not loaded. Make sure the CDN script is included before auth.js.");
}

// ==================================================
// AUTHENTICATION HELPER FUNCTIONS
// ==================================================

/**
 * Get current authenticated user
 */
async function getCurrentUser() {
    if (!supabaseClient) return null;
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error || !user) {
        return null;
    }
    return user;
}

/**
 * Protect pages requiring login
 */
async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

/**
 * Update UI Navbar dynamically based on auth state
 */
async function updateNavigationUI() {
    const user = await getCurrentUser();
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    if (user) {
        // Logged in navigation
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="browse.html">Browse Skills</a>
            <a href="profile.html">My Profile</a>
            <a href="swap-request.html">Swap Requests</a>
            <a href="chat.html">Chat</a>
            <a href="#" id="nav-logout-btn" class="nav-btn">Logout</a>
        `;

        const logoutBtn = document.getElementById("nav-logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", async function (e) {
                e.preventDefault();
                await handleLogout();
            });
        }
    } else {
        // Logged out navigation
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="browse.html">Browse Skills</a>
            <a href="login.html">Login</a>
            <a href="signup.html" class="nav-btn">Get Started</a>
        `;
    }
}

/**
 * Handle user logout
 */
async function handleLogout() {
    if (!supabaseClient) return;
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error("Logout error:", error.message);
    }
    window.location.href = "login.html";
}

// Execute Navbar state update on DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
    updateNavigationUI();
});

// ==================================================
// SIGNUP FORM EVENT LISTENER
// ==================================================

const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password")
            ? document.getElementById("confirm-password").value
            : password;
        const message = document.getElementById("auth-message");

        if (password !== confirmPassword) {
            if (message) {
                message.textContent = "Passwords do not match.";
                message.style.color = "red";
            }
            return;
        }

        if (message) {
            message.textContent = "Creating account...";
            message.style.color = "#0056b3";
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            console.error("Signup error:", error);
            if (message) {
                message.textContent = error.message;
                message.style.color = "red";
            }
            return;
        }

        console.log("User created successfully:", data.user);
        if (message) {
            message.textContent = "Account created successfully! Redirecting to login...";
            message.style.color = "green";
        }

        signupForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// ==================================================
// LOGIN FORM EVENT LISTENER
// ==================================================

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("auth-message");

        if (message) {
            message.textContent = "Logging in...";
            message.style.color = "#0056b3";
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Login error:", error);
            if (message) {
                message.textContent = error.message;
                message.style.color = "red";
            }
            return;
        }

        console.log("Logged in successfully:", data.user);
        if (message) {
            message.textContent = "Login successful! Redirecting...";
            message.style.color = "green";
        }

        loginForm.reset();

        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    });
}