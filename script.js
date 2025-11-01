// 1. SET THIS to your Apps Script Web App URL (ending with /exec)
const API_URL = 'https://script.google.com/macros/s/AKfycbxlCrRBAZF5Roiwx6sRUHi3qyL60DqZ0t5oiFLrJrUzLIEsqnwtcWWOH1I77cDdgEsi/exec?action=draw';

// 2. Small helper to render the result area
function renderResult(data) {
  const resultEl = document.getElementById('result');

  if (!data) {
    resultEl.textContent = 'No response';
    return;
  }

  // If the backend said "no available lots", show that message
  if ((!data.content || data.content === null) && data.message) {
    resultEl.textContent = data.message;
    return;
  }

  // If there's no content at all, fallback
  if (!data.content) {
    resultEl.textContent = 'No lot found';
    return;
  }

  // Decide how to display based on type
  if (data.type === 'image') {
    // Display an image
    // data.content should be a URL
    resultEl.innerHTML = `
      <div class="flex flex-col items-center">
        <img src="${data.content}"
             alt="${data.picked || 'Image lot'}"
             class="max-w-[80%] rounded-2xl shadow-xl border border-gray-200" />
        <div class="text-sm text-gray-500 mt-2">${data.picked || ''}</div>
      </div>
    `;
  } else {
    // Default: treat as text
    resultEl.innerHTML = `
      <div class="text-2xl font-semibold text-gray-800">
        ${data.content}
      </div>
    `;
  }
}

// 3. Hook up the button
document.getElementById('drawBtn').addEventListener('click', async () => {
  const resultEl = document.getElementById('result');
  resultEl.innerHTML = `
    <div class="animate-pulse text-gray-500 text-lg">
      Drawing...
    </div>
  `;

  try {
    // Call the backend
    const res = await fetch(API_URL, {
      method: 'GET',
      // No headers required unless you later lock this down
    });

    const data = await res.json();
    renderResult(data);

  } catch (err) {
    console.error(err);
    resultEl.textContent = 'Error contacting API';
  }
});
