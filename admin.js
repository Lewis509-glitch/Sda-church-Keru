const announcementForm = document.getElementById('announcement-form');
const announcementList = document.getElementById('announcement-list');
const logoutBtn = document.getElementById('logoutBtn');
const backBtn = document.getElementById('backBtn');
const cancelEdit = document.getElementById('cancelEdit');
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const userCancel = document.getElementById('user-cancel');

const token = localStorage.getItem('authToken');
const userRole = localStorage.getItem('userRole');
if (!token) {
  window.location.href = '/login.html';
} else if (userRole !== 'admin') {
  window.location.href = '/dashboard.html';
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

const fetchAnnouncements = async () => {
  try {
    const response = await fetch('/api/announcements');
    const data = await response.json();
    if (!response.ok) {
      announcementList.innerHTML = `<p class="error">${data.message || 'Unable to load announcements.'}</p>`;
      return;
    }

    if (data.announcements.length === 0) {
      announcementList.innerHTML = '<p>No announcements have been published yet.</p>';
      return;
    }

    announcementList.innerHTML = data.announcements
      .map((announcement) => {
        return `
          <article class="announcement-card">
            <div class="announcement-header">
              <h3>${announcement.title}</h3>
              <div>
                <button class="btn btn-small edit-btn" data-id="${announcement._id}">Edit</button>
                <button class="btn btn-small btn-secondary delete-btn" data-id="${announcement._id}">Delete</button>
              </div>
            </div>
            <p>${announcement.message}</p>
            <small>Published: ${new Date(announcement.createdAt).toLocaleString()}</small>
          </article>
        `;
      })
      .join('');

    document.querySelectorAll('.edit-btn').forEach((button) => {
      button.addEventListener('click', () => loadEditForm(button.dataset.id, data.announcements));
    });

    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', () => deleteAnnouncement(button.dataset.id));
    });
  } catch (error) {
    announcementList.innerHTML = '<p class="error">Unable to load announcements.</p>';
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users', { headers });
    const data = await response.json();
    if (!response.ok) {
      userList.innerHTML = `<p class="error">${data.message || 'Unable to load users.'}</p>`;
      return;
    }

    if (!data.users.length) {
      userList.innerHTML = '<p>No members or visitors have been added yet.</p>';
      return;
    }

    userList.innerHTML = data.users
      .map((user) => {
        return `
          <article class="announcement-card">
            <div class="announcement-header">
              <h3>${user.name}</h3>
              <div>
                <span style="margin-right:.75rem;text-transform:capitalize;">${user.status}</span>
                <button class="btn btn-small btn-secondary remove-user-btn" data-id="${user._id}">Remove</button>
              </div>
            </div>
            <p>${user.email}</p>
            <small>${user.phone || 'No phone provided'}</small>
          </article>
        `;
      })
      .join('');

    document.querySelectorAll('.remove-user-btn').forEach((button) => {
      button.addEventListener('click', () => deleteUser(button.dataset.id));
    });
  } catch (error) {
    userList.innerHTML = '<p class="error">Unable to load users.</p>';
  }
};

const deleteUser = async (id) => {
  if (!confirm('Remove this user from the database?')) return;
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || 'Unable to remove user.');
      return;
    }
    await fetchUsers();
  } catch (error) {
    alert('Unable to remove user.');
  }
};

const resetUserForm = () => {
  userForm.reset();
  document.getElementById('user-id').value = '';
};

userForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const password = document.getElementById('user-password').value.trim();
  const status = document.getElementById('user-status').value;

  if (!name || !email || !password || !status) {
    alert('Please fill in all required fields to add a user.');
    return;
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, phone, password, status }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || 'Unable to add user.');
      return;
    }

    resetUserForm();
    await fetchUsers();
    alert('User added successfully.');
  } catch (error) {
    alert('Unable to add user.');
  }
});

userCancel.addEventListener('click', resetUserForm);

const loadEditForm = (id, announcements) => {
  const announcement = announcements.find((item) => item._id === id);
  if (!announcement) return;

  document.getElementById('announcement-id').value = announcement._id;
  document.getElementById('announcement-title').value = announcement.title;
  document.getElementById('announcement-message').value = announcement.message;
};

const deleteAnnouncement = async (id) => {
  if (!confirm('Delete this announcement?')) return;
  try {
    const response = await fetch(`/api/announcements/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || 'Unable to delete announcement.');
      return;
    }
    await fetchAnnouncements();
  } catch (error) {
    alert('Unable to delete announcement.');
  }
};

announcementForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('announcement-id').value;
  const title = document.getElementById('announcement-title').value.trim();
  const message = document.getElementById('announcement-message').value.trim();

  if (!title || !message) {
    alert('Please add both title and message.');
    return;
  }

  try {
    const response = await fetch(id ? `/api/announcements/${id}` : '/api/announcements', {
      method: id ? 'PUT' : 'POST',
      headers,
      body: JSON.stringify({ title, message }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || 'Unable to save announcement.');
      return;
    }

    document.getElementById('announcement-id').value = '';
    announcementForm.reset();
    await fetchAnnouncements();
  } catch (error) {
    alert('Unable to save announcement.');
  }
});

cancelEdit.addEventListener('click', () => {
  document.getElementById('announcement-id').value = '';
  announcementForm.reset();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  window.location.href = '/login.html';
});

backBtn.addEventListener('click', () => {
  window.location.href = '/dashboard.html';
});

fetchAnnouncements();
fetchUsers();
