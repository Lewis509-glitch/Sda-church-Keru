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

const backLinks = document.querySelectorAll('.back a');
backLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = loginForm.querySelector('#name').value;
    const password = loginForm.querySelector('#password').value;
    const errorMessages = document.querySelectorAll('.error');
    
    // Simple validation (replace with actual authentication logic)
    if (name === "" || password === "") {
        // Redirect or perform login action
        errorMessages[0].style.display = 'block';
    } else {
        window.location.href = 'dashboard.html';
        errorMessages[0].style.display = 'none';
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('#name').value;
    const email = signupForm.querySelector('#signup-email').value;
    const phone = signupForm.querySelector('#signup-phone').value;
    const password = signupForm.querySelector('#signup-password').value;
    const errorMessages = document.querySelectorAll('.error');
    
    // Simple validation (replace with actual registration logic)
    if (name === "" || email === "" || phone === "" || password === "") {
        // Redirect or perform signup action
        errorMessages[1].style.display = 'block';
    } else {
        window.location.href = 'dashboard.html';
    }
});