const announcementForm = document.getElementById('announcement-form');
const announcementList = document.getElementById('announcement-list');
const logoutBtn = document.getElementById('logoutBtn');
const backBtn = document.getElementById('backBtn');
const cancelEdit = document.getElementById('cancelEdit');

const token = localStorage.getItem('authToken');
if (!token) {
  window.location.href = '/login.html';
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
