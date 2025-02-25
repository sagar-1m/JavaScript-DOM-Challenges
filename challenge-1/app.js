// Get DOM elements
const bulb = document.getElementById('bulb');
const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('status');
const body = document.getElementById('body');

// Track bulb state
let isOn = false;

// Function to update UI based on bulb state
function updateUI() {
  if (isOn) {
    bulb.classList.remove('off');
    toggleButton.textContent = 'Turn Off';
    statusText.textContent = 'Status: On';
    body.classList.remove('dark-mode');
  } else {
    bulb.classList.add('off');
    toggleButton.textContent = 'Turn On';
    statusText.textContent = 'Status: Off';
    body.classList.add('dark-mode');
  }
}

// Toggle button click handler
toggleButton.addEventListener('click', () => {
  isOn = !isOn;
  updateUI();
});

// Initialize UI on page load
updateUI();
