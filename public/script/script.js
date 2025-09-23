
document.querySelectorAll('.submitBtn').forEach(button => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-target');
    const recipient = button.getAttribute('data-email');
    const message = document.getElementById(targetId).value;

    if (!message.trim()) {
      alert('❌ Please write a message before submitting.');
      return;
    }

    try {
      const response = await fetch('api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipient, message: message })
      });

      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }

      const result = await response.json();

      if (result.success) {
        alert('✅ ' + result.message);
      } else {
        alert('❌ Failed: ' + (result.error || 'Unknown error'));
      }

    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Try again!');
    }
  });
});
