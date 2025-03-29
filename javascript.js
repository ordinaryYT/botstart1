document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusEl = document.getElementById('status');

  async function controlBots(action) {
    statusEl.textContent = `${action}ing bots...`;
    
    try {
      const response = await fetch(`/api/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      
      if (data.success) {
        statusEl.textContent = data.message;
        alert(data.message);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      statusEl.textContent = `Error: ${error.message}`;
      alert(`Failed to ${action} bots: ${error.message}`);
    }
  }

  startBtn.addEventListener('click', () => controlBots('start'));
  stopBtn.addEventListener('click', () => controlBots('stop'));
});