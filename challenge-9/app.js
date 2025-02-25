document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle-btn");
  const closeBtn = document.querySelector(".close-btn");
  const panel = document.querySelector(".panel");
  const menuItems = document.querySelectorAll(".menu-item");

  function openMenu() {
    panel.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    panel.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  toggleBtn.addEventListener("click", openMenu);

  closeBtn.addEventListener("click", closeMenu);

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      alert(`You clicked on ${this.textContent}`);
      closeMenu();
    });
  });

  document.addEventListener("click", function (event) {
    if (!panel.contains(event.target) && !toggleBtn.contains(event.target)) {
      closeMenu();
    }
  });

  // Prevent event from closing menu when clicking inside the panel
  panel.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});
