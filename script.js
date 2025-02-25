document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".challenges-grid a");
  links.forEach((link, index) => {
    link.style.setProperty("--index", index);
  });

  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Set initial theme based on user's system preference
  if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "🌛";
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "🌛" : "🌞";

    // Save preference
    localStorage.setItem("theme", newTheme);
  });

  // Check for saved user preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "🌛" : "🌞";
  }
});
