const form = document.getElementById('register-form');
const message = document.getElementById('message');
const successMessage = document.getElementById('success-message');

function validatePass(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateEmail(email){
    if (!email.includes('@')) {
        message.textContent = 'An @ symbol is required in the email';
        message.style.display = 'block';
        return false;
    }
    message.textContent = '';
    message.style.display = 'none';
    return true;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
        message.textContent = 'All fields are required';
        message.style.display = 'block';
        return;
    }

    if (!validateEmail(email)) {
        return;
    }

    if (!validatePass(password)) {
        message.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
        message.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        message.textContent = 'User already exists';
        message.style.display = 'block';
        return;
    }

    users.push({ name, password, email});
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(email));

    successMessage.textContent = 'Registration successful! Redirecting to login...';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
    
});