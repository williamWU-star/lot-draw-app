document.getElementById('drawBtn').addEventListener('click', async () => {
  const apiUrl = 'https://script.google.com/macros/s/AKfycbxlCrRBAZF5Roiwx6sRUHi3qyL60DqZ0t5oiFLrJrUzLIEsqnwtcWWOH1I77cDdgEsi/exec?action=draw';

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    document.getElementById('result').textContent =
      data.picked || data.message || 'No lot found';
  } catch (err) {
    document.getElementById('result').textContent =
      'Error contacting draw API';
  }
});
