// This function runs when the page loads
function startColorApp() {
  // Get DOM elements from the page
  const dropdown = document.querySelector("#colorSelect");
  const makeButton = document.querySelector("#createBtn");
  const buttonArea = document.querySelector("#buttonContainer");

  // List to remember colors we've already used
  let usedColors = [];

  // WHAT CLOSURE IS: Think of this function as a "button factory"
  // Each button it creates "remembers" its own color forever!
  function makeColorButton(color) {
    // Step 1: Create a new button
    const button = document.createElement("button");

    // Step 2: Make it look nice
    button.style.backgroundColor = color;
    button.innerText = color;
    button.className = "color-button";

    // Step 3: Make it do something when clicked
    // THIS IS THE CLOSURE: Even after this function is done,
    // this click handler will "remember" what color was used!
    button.addEventListener("click", function () {
      // When clicked, change the page background
      document.body.style.backgroundColor = color;

      // Show a checkmark to confirm click
      button.textContent = `${color} ✓`;

      // Change text back after 1 second
      setTimeout(function () {
        button.textContent = color;
      }, 1000);
    });

    return button;
  }

  // When the "Create Button" button is clicked
  makeButton.addEventListener("click", function () {
    // Get the color from dropdown
    const pickedColor = dropdown.value;

    // Make sure user picked a color
    if (!pickedColor) {
      alert("Please select a color first!");
      return;
    }

    // Check if we already used this color
    if (usedColors.includes(pickedColor)) {
      alert("You've already created a button with this color!");
      dropdown.value = "";
      return;
    }

    // Make a new color button and add it to the page
    const newButton = makeColorButton(pickedColor);
    buttonArea.appendChild(newButton);

    // Remember we used this color
    usedColors.push(pickedColor);
    dropdown.value = "";
  });

  // Allow custom color input
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Custom color...";
  dropdown.appendChild(customOption);

  dropdown.addEventListener("change", function () {
    if (dropdown.value === "custom") {
      const customColor = prompt(
        "Enter a color name or hex code (e.g., #FF5733):"
      );

      if (customColor) {
        // Create a temporary option for this custom color
        const tempOption = document.createElement("option");
        tempOption.value = customColor;
        tempOption.textContent = customColor;
        tempOption.selected = true;
        dropdown.appendChild(tempOption);
      } else {
        dropdown.value = "";
      }
    }
  });
}

// Start when page is ready
document.addEventListener("DOMContentLoaded", startColorApp);
