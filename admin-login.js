const adminLoginForm = document.getElementById('admin-login-form');
const loginStatus = document.getElementById('login-status');

const showLoginError = (message) => {
  if (!loginStatus) return;
  loginStatus.textContent = message;
  loginStatus.style.display = 'block';
};

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;

    if (!email || !password) {
      showLoginError('Please enter your email and password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        showLoginError(data.message || 'Login failed.');
        return;
      }

      if (data.role !== 'admin') {
        showLoginError('Admin access is required.');
        return;
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.user?.name || 'Admin');
      localStorage.setItem('userEmail', data.user?.email || email);

      window.location.href = 'admin.html';
    } catch (error) {
      showLoginError('Unable to login. Please try again.');
    }
  });
}
