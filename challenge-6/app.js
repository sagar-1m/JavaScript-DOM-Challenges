function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // Digital Clock Display
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
  document.querySelector(".digital-clock").textContent = formattedTime;

  // Date Display
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.querySelector(".date").textContent = now.toLocaleDateString(
    "en-US",
    options
  );

  // Analog Clock Calculations
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  document.querySelector(
    ".second"
  ).style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.querySelector(
    ".minute"
  ).style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.querySelector(
    ".hour"
  ).style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

// Add event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  updateClock(); // Initial call
  setInterval(updateClock, 1000); // Update every second
});
