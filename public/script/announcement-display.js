document.addEventListener('DOMContentLoaded', () => {
  const announcementList = document.getElementById('announcement-list');

  fetch('/api/get-announcement')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        announcementList.innerHTML = '<li>No announcements yet.</li>';
        return;
      }

      data.forEach(item => {
        const li = document.createElement('li');
        const content = document.createElement('div');
        content.textContent = item.text;

        const time = document.createElement('time');
        const dateObj = new Date(item.timestamp);
        time.textContent = dateObj.toLocaleString();

        li.appendChild(content);
        li.appendChild(time);
        announcementList.appendChild(li);
      });
    })
    .catch(error => {
      console.error(error);
      announcementList.innerHTML = '<li>Error loading announcements.</li>';
    });
});
