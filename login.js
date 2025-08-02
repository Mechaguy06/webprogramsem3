// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.registration-form'); // Note: Your form has class "registration-form"

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            const email = emailInput.value;
            const password = passwordInput.value;

            // --- IMPORTANT: This is for local demonstration ONLY! ---
            // In a real application, these credentials would be securely validated on a server.

            // Define hardcoded valid credentials for demonstration
            const validEmail = 'user@example.com';
            const validPassword = 'password123'; // NEVER hardcode passwords in production!

            // Attempt to retrieve registered users from localStorage (if you used the previous example)
            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const foundUser = registeredUsers.find(user => user.email === email && user.password === password);

            if (email === validEmail && password === validPassword || foundUser) {
                // Login successful based on either hardcoded credentials or locally registered user
                window.location.href = 'dashboard.html'; // Redirect to dashboard page
            } else {
                // Login failed - clear password and potentially show an in-page error message
                passwordInput.value = ''; // Clear password field for security/usability

                // OPTIONAL: Add an in-page error message instead of an alert
                // You would need to add a <p id="error-message" style="color: red;"></p> somewhere in your HTML
                // const errorMessageElement = document.getElementById('error-message');
                // if (errorMessageElement) {
                //     errorMessageElement.textContent = 'Invalid email or password. Please try again.';
                // }
                
                // For now, if no in-page element, it just fails silently and clears the password.
            }
        });
    }
});