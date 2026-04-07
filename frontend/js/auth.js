document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
  }

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterBtn = document.getElementById('show-register');
  const showLoginBtn = document.getElementById('show-login');

  showRegisterBtn.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  showLoginBtn.addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      window.location.href = 'dashboard.html';
    } catch (err) {
      showAlert(err.message, 'error');
    }
  });

  document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
      const data = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      showAlert('Registration successful!', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } catch (err) {
      showAlert(err.message, 'error');
    }
  });
});
