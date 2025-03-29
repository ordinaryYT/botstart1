document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusEl = document.getElementById('status');

  async function controlBots(action) {
    console.log(`${action} button clicked`); // Debug log
    statusEl.textContent = `${action}ing bots...`;
    statusEl.style.color = 'orange';
    
    try {
      const response = await fetch(`/api/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) throw new Error('Network response failed');
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log
      
      statusEl.textContent = data.message;
      statusEl.style.color = data.success ? 'green' : 'red';
      alert(data.message);
      
    } catch (error) {
      console.error('Error:', error); // Debug log
      statusEl.textContent = `Error: ${error.message}`;
      statusEl.style.color = 'red';
      alert(`Failed to ${action} bots: ${error.message}`);
    }
  }

  startBtn.addEventListener('click', () => controlBots('start'));
  stopBtn.addEventListener('click', () => controlBots('stop'));
});