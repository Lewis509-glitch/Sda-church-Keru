const profileViewName = document.getElementById('view-name');
const profileViewEmail = document.getElementById('view-email');
const profileViewPhone = document.getElementById('view-phone');
const editName = document.getElementById('edit-name');
const editEmail = document.getElementById('edit-email');
const editPhone = document.getElementById('edit-phone');
const adminPanelButton = document.createElement('button');
const profileForm = document.getElementById('profile-form');

const authToken = localStorage.getItem('authToken');
if (!authToken) {
  window.location.href = '/login.html';
}

const apiHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authToken}`,
};

const toggleEditMode = () => {
  document.getElementById('profile-view').style.display = 'none';
  document.getElementById('profile-edit').style.display = 'block';
};

const cancelEdit = () => {
  document.getElementById('profile-view').style.display = 'block';
  document.getElementById('profile-edit').style.display = 'none';
  loadProfile();
};

const saveProfile = async () => {
  const name = editName.value.trim();
  const email = editEmail.value.trim();
  const phone = editPhone.value.trim();

  if (!name || !email) {
    alert('Name and email are required');
    return;
  }

  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: apiHeaders,
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || 'Unable to update profile.');
      return;
    }

    document.getElementById('profile-view').style.display = 'block';
    document.getElementById('profile-edit').style.display = 'none';
    loadProfile();
    alert('Profile updated successfully!');
  } catch (error) {
    alert('Unable to update profile.');
  }
};

const loadProfile = async () => {
  try {
    const response = await fetch('/api/profile', { headers: apiHeaders });
    if (!response.ok) {
      localStorage.removeItem('authToken');
      window.location.href = '/login.html';
      return;
    }

    const { user } = await response.json();
    profileViewName.textContent = user.name;
    profileViewEmail.textContent = user.email;
    profileViewPhone.textContent = user.phone || 'Not provided';
    editName.value = user.name;
    editEmail.value = user.email;
    editPhone.value = user.phone || '';

    if (user.role === 'admin' && !document.getElementById('admin-link')) {
      adminPanelButton.id = 'admin-link';
      adminPanelButton.textContent = 'Admin Panel';
      adminPanelButton.className = 'btn';
      adminPanelButton.style.marginTop = '1rem';
      adminPanelButton.addEventListener('click', () => {
        window.location.href = '/admin.html';
      });
      document.querySelector('.profile-info').appendChild(adminPanelButton);
    }
  } catch (error) {
    localStorage.removeItem('authToken');
    window.location.href = '/login.html';
  }
};

window.toggleEditMode = toggleEditMode;
window.saveProfile = saveProfile;
window.cancelEdit = cancelEdit;

loadProfile();
