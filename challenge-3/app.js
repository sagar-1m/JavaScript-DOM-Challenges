// Get DOM elements for inputs
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const ageInput = document.getElementById("ageInput");
const bioInput = document.getElementById("bioInput");

// Get DOM elements for display
const nameDisplay = document.getElementById("nameDisplay");
const jobDisplay = document.getElementById("jobDisplay");
const ageDisplay = document.getElementById("ageDisplay");
const bioDisplay = document.getElementById("bioDisplay");

// Function to update display
function updateDisplay(input, display) {
  const value = input.value.trim();
  display.textContent = value || "Not provided";
}

nameInput.addEventListener("input", () =>
  updateDisplay(nameInput, nameDisplay)
);
jobInput.addEventListener("input", () => updateDisplay(jobInput, jobDisplay));
ageInput.addEventListener("input", () => updateDisplay(ageInput, ageDisplay));
bioInput.addEventListener("input", () => updateDisplay(bioInput, bioDisplay));

updateDisplay(nameInput, nameDisplay);
updateDisplay(jobInput, jobDisplay);
updateDisplay(ageInput, ageDisplay);
updateDisplay(bioInput, bioDisplay);
