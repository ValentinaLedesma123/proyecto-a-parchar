const form = document.getElementById('loginform');
const message = document.getElementById('message');
const successMessage = document.getElementById('success-message');

const session = localStorage.getItem('loggedInUser');
if (session) {
    message.classList.remove('text-danger');
    message.classList.add('text-success');
    message.textContent = `Ya has iniciado sesion como ${session}`;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        localStorage.setItem('loggedInUser', email);
        successMessage.textContent = `Bienvenido, ${user.name}`;
        successMessage.style.display = 'block';
        message.textContent = '';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        message.textContent = 'Invalid email or password';
        message.style.display = 'block';
        successMessage.textContent = '';
    }


});