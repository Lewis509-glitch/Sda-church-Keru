const loginForm = document.querySelector('form');
const signupForm = document.querySelectorAll('form')[1];
const loginLink = document.querySelector('.log-in a');
const signupLink = document.querySelectorAll('.log-in a')[1];

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

const errorMessages = document.querySelectorAll('.error');
errorMessages.forEach(error => error.style.display = 'none'); // Hide all error messages on page load



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = loginForm.querySelector('#name').value;
    const password = loginForm.querySelector('#password').value;

    // Simple validation (replace with actual authentication logic)
    if (name && password) {
        // Redirect or perform login action
        window.location.href = 'dashboard.html';
    } else {
        loginForm.querySelector('.error').style.display = 'block';
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('#name').value;
    const email = signupForm.querySelector('#signup-email').value;
    const phone = signupForm.querySelector('#signup-phone').value;
    const password = signupForm.querySelector('#signup-password').value;

    // Simple validation (replace with actual registration logic)
    if (name && email && phone && password) {
        // Redirect or perform signup action
        window.location.href = 'dashboard.html';
    } else {
        signupForm.querySelector('.error').style.display = 'block';
    }
});