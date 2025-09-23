document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('announcement-form');
  const input = document.getElementById('announcementInput');
  const message = document.getElementById('save-message');
  const announcementList = document.getElementById('announcement-list');

  // Render announcements from given data
  function renderAnnouncements(data) {
    announcementList.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      announcementList.innerHTML = '<li>No announcements yet.</li>';
      return;
    }

    data.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('announcement-card');

      const textDiv = document.createElement('div');
      textDiv.classList.add('announcement-text');
      textDiv.textContent = item.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.onclick = () => deleteAnnouncement(item._id);

      li.appendChild(textDiv);
      li.appendChild(deleteBtn);
      announcementList.appendChild(li);
    });
  }

  // Load announcements from cache first
  function loadFromCache() {
    const cachedData = localStorage.getItem('announcements');
    if (cachedData) {
      try {
        renderAnnouncements(JSON.parse(cachedData));
      } catch (e) {
        console.warn('Invalid cache data, clearing...');
        localStorage.removeItem('announcements');
      }
    }
  }

  // Load announcements from API
  function loadFromAPI() {
    fetch('/api/get-announcement')
      .then(res => res.json())
      .then(data => {
        renderAnnouncements(data);
        localStorage.setItem('announcements', JSON.stringify(data)); // Update cache
      })
      .catch(err => console.error('Error loading announcements:', err));
  }

  // Delete an announcement
  function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      fetch(`/api/delete-announcement?id=${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            loadFromAPI(); // Reload after delete
          } else {
            alert('Error deleting announcement');
          }
        })
        .catch(err => console.error(err));
    }
  }

  // Submit announcement
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
      });

      const data = await response.json();

      if (data.success) {
        message.textContent = data.message;
        message.style.color = 'green';
        input.value = '';
        loadFromAPI(); // Refresh list
      } else {
        message.textContent = 'Failed to save announcement';
        message.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      message.textContent = 'Error submitting announcement';
      message.style.color = 'red';
    }
  });

  // Initial load — show cache instantly, then fetch new data
  loadFromCache();
  loadFromAPI();
});
