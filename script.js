document.getElementById('drawBtn').addEventListener('click', async () => {
  // Replace this URL with your Apps Script web app endpoint later
  const res = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=draw');
  const data = await res.json();
  document.getElementById('result').textContent = data.picked || 'No lot found';
});
