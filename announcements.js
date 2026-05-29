const announcementSection = document.querySelector('.ann-sect');

const loadAnnouncements = async () => {
  try {
    const response = await fetch('/api/announcements');
    const data = await response.json();
    if (!response.ok) {
      announcementSection.innerHTML = `<p class="error">${data.message || 'Unable to load announcements.'}</p>`;
      return;
    }

    const announcements = data.announcements;
    if (!announcements.length) {
      announcementSection.innerHTML = '<h1>Announcements</h1><p>No announcements available yet.</p>';
      return;
    }

    announcementSection.innerHTML = `
      <h1>Announcements</h1>
      <div class="announcement-list">
        ${announcements
          .map((announcement) => `
            <article class="announcement-card">
              <h3>${announcement.title}</h3>
              <p>${announcement.message}</p>
              <small>Published: ${new Date(announcement.createdAt).toLocaleString()}</small>
            </article>
          `)
          .join('')}
      </div>
    `;
  } catch (error) {
    announcementSection.innerHTML = '<p class="error">Unable to load announcements.</p>';
  }
};

loadAnnouncements();
