// register.js

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('.registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission (which would reload the page or navigate)

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value; // WARNING: Storing plain-text password is INSECURE!

            // Basic validation (you can add more)
            if (!name || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Create a user object
            const newUser = {
                name: name,
                email: email,
                password: password // AGAIN: INSECURE FOR PRODUCTION!
            };

            // --- Saving to localStorage ---

            // Step 1: Get existing users from localStorage (if any)
            // localStorage.getItem returns a string or null.
            // JSON.parse converts the string back into a JavaScript array/object.
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Step 2: Check if email already exists (simple local check)
            const emailExists = users.some(user => user.email === newUser.email);
            if (emailExists) {
                alert('This email is already registered. Please use a different email or login.');
                return;
            }

            // Step 3: Add the new user to the array
            users.push(newUser);

            // Step 4: Save the updated array back to localStorage
            // JSON.stringify converts a JavaScript object/array into a JSON string.
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            alert('Registration successful! Data saved locally in your browser.');

            // Redirect to login page after successful local "registration"
            window.location.href = 'login.html';
        });
    }
});