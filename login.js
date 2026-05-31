const loginForm = document.querySelector('form.login');
const signupForm = document.querySelector('form.signup');
const loginLink = document.querySelector('.login .log-in a');
const signupLink = document.querySelector('.signup .log-in a');
const loginError = loginForm.querySelector('.error');
const signupError = signupForm.querySelector('.error');

const showError = (element, message) => {
  element.textContent = message;
  element.style.display = 'block';
  element.style.color = 'red';
};

const clearError = (element) => {
  element.textContent = '';
  element.style.display = 'none';
};

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
backLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
  });
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = loginForm.querySelector('#login-name').value.trim();
  const password = loginForm.querySelector('#password').value.trim();

  if (!name || !password) {
    showError(loginError, 'Please fill in all required fields.');
    return;
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      showError(loginError, data.message || 'Login failed.');
      return;
    }

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('userName', data.user.name);
    localStorage.setItem('userEmail', data.user.email);
    localStorage.setItem('userPhone', data.user.phone);
    localStorage.setItem('userStatus', data.user.status);

    loginForm.reset();
    clearError(loginError);
    window.location.href = data.role === 'admin' ? 'admin.html' : 'dashboard.html';
  } catch (error) {
    showError(loginError, 'Unable to login. Please try again later.');
  }
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = signupForm.querySelector('#signup-name').value.trim();
  const email = signupForm.querySelector('#signup-email').value.trim();
  const phone = signupForm.querySelector('#signup-phone').value.trim();
  const password = signupForm.querySelector('#signup-password').value.trim();
  const status = signupForm.querySelector('input[name="status"]:checked').value;

  if (!name || !email || !phone || !password) {
    showError(signupError, 'Please fill in all required fields.');
    return;
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, status }),
    });

    const data = await response.json();
    if (!response.ok) {
      showError(signupError, data.message || 'Signup failed.');
      return;
    }

    clearError(signupError);
    alert('Account created successfully. Please log in.');
    window.location.href = '/login.html';
  } catch (error) {
    showError(signupError, 'Unable to sign up. Please try again later.');
  }
});
