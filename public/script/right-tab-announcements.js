document.addEventListener('DOMContentLoaded', () => {
  const announcementUL = document.getElementById('right-tab-announcements');
  if (!announcementUL) return; // Exit if element not found

  fetch('/api/get-announcement')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch announcements');
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        announcementUL.innerHTML = '<li>No announcements yet.</li>';
        return;
      }

      const topThree = data.slice(0, 2);
      topThree.forEach(item => {
        const li = document.createElement('li');
        const content = document.createElement('div');
        content.textContent = item.text;

        const time = document.createElement('small');
        const dateObj = new Date(item.timestamp);
        time.textContent = dateObj.toLocaleString();

        li.appendChild(content);
        li.appendChild(time);
        announcementUL.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      announcementUL.innerHTML = '<li>Error loading announcements.</li>';
    });
});
