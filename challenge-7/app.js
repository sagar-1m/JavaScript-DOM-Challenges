document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".accordion-item.active");
      const parent = button.parentElement;

      if (currentlyActive && currentlyActive !== parent) {
        currentlyActive.classList.remove("active");
        currentlyActive.querySelector(".accordion-content").style.maxHeight =
          null;
      }

      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
        parent.querySelector(".accordion-content").style.maxHeight = null;
      } else {
        parent.classList.add("active");
        const content = parent.querySelector(".accordion-content");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
