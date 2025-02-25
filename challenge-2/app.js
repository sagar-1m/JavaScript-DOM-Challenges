// Get DOM elements
const mainHeading = document.getElementById('mainHeading');
const redButton = document.getElementById('redButton');
const greenButton = document.getElementById('greenButton');
const blueButton = document.getElementById('blueButton');
const purpleButton = document.getElementById('purpleButton');
const resetButton = document.getElementById('resetButton');

// Function to change text color
function changeColor(color) {
  mainHeading.style.color = color;
}

// Add click event listeners to buttons
redButton.addEventListener('click', () => changeColor('#e74c3c'));
greenButton.addEventListener('click', () => changeColor('#2ecc71'));
blueButton.addEventListener('click', () => changeColor('#3498db'));
purpleButton.addEventListener('click', () => changeColor('#9b59b6'));
resetButton.addEventListener('click', () => changeColor('black'));
