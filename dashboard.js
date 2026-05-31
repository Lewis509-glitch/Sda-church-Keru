const profileViewName = document.getElementById('view-name');
const profileViewEmail = document.getElementById('view-email');
const profileViewPhone = document.getElementById('view-phone');
const profileViewStatus = document.getElementById('view-status');
const profileViewRole = document.getElementById('view-role');
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
      console.error('Profile update error:', data);
      alert(data.message || 'Unable to update profile. Please try again.');
      return;
    }

    // Update localStorage with new data
    if (data.user) {
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userPhone', data.user.phone || '');
    }

    // Switch back to view mode
    document.getElementById('profile-view').style.display = 'block';
    document.getElementById('profile-edit').style.display = 'none';

    // Reload profile to show updated data
    await loadProfile();
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Profile save error:', error);
    alert('Unable to update profile. Please check your connection and try again.');
  }
};

const loadProfile = async () => {
  try {
    const response = await fetch('/api/profile', { headers: apiHeaders });
    
    if (!response.ok) {
      console.error('Profile load error:', response.status, response.statusText);
      
      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userStatus');
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login.html';
      }
      return;
    }

    const responseData = await response.json();
    const user = responseData.user;

    if (!user) {
      console.error('No user data in response');
      return;
    }

    // Update display with user data
    profileViewName.textContent = user.name || '';
    profileViewEmail.textContent = user.email || '';
    profileViewPhone.textContent = user.phone || 'Not provided';
    profileViewStatus.textContent = user.status || 'visitor';
    profileViewRole.textContent = user.role || 'visitor';

    // Update form fields for editing
    editName.value = user.name || '';
    editEmail.value = user.email || '';
    editPhone.value = user.phone || '';

    // Add admin panel link if user is admin
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
    console.error('Profile load exception:', error);
    alert('Unable to load profile. Please check your connection.');
  }
};

window.toggleEditMode = toggleEditMode;
window.saveProfile = saveProfile;
window.cancelEdit = cancelEdit;

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPhone');
  localStorage.removeItem('userStatus');
  window.location.href = '/login.html';
};

window.logout = logout;

loadProfile();
