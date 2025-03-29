document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusEl = document.getElementById('status');

  async function controlBots(action) {
    try {
      statusEl.textContent = `${action}ing bots...`;
      const response = await fetch(`/api/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      statusEl.textContent = data.message;
      alert(data.message);
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
      alert(`Failed to ${action} bots: ${error.message}`);
    }
  }

  startBtn.addEventListener('click', () => controlBots('start'));
  stopBtn.addEventListener('click', () => controlBots('stop'));
});