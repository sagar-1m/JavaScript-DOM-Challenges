const Utils = {
  getElement: (selector) => document.querySelector(selector),
  getElements: (selector) => document.querySelectorAll(selector),
};

// Theme Management
const ThemeManager = {
  init() {
    const themeToggle = Utils.getElement("#themeToggle");
    if (!themeToggle) return;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const setTheme = (theme) => {
      const isDark = theme === "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      themeToggle.textContent = isDark ? "🌞" : "🌛";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${isDark ? "light" : "dark"} theme`
      );
    };

    // Initialize theme
    const savedTheme =
      localStorage.getItem("theme") || (prefersDark.matches ? "dark" : "light");
    setTheme(savedTheme);

    // Theme toggle handler
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    // Listen for system theme changes
    prefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
  },
};

// UI Management
const UIManager = {
  init() {
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initAnimations();
  },

  initMobileMenu() {
    const btn = Utils.getElement(".mobile-menu-btn");
    const menu = Utils.getElement(".nav-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isActive = menu.classList.toggle("active");
      btn.setAttribute("aria-expanded", isActive);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("active") && !e.target.closest(".navbar")) {
        menu.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("active")) {
        menu.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  },

  initSmoothScroll() {
    const navLinks = Utils.getElements('.nav-link[href^="#"]');
    if (!navLinks.length) return;

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Close mobile menu if open
          const navMenu = Utils.getElement(".nav-menu");
          if (navMenu) navMenu.classList.remove("active");

          const mobileBtn = Utils.getElement(".mobile-menu-btn");
          if (mobileBtn) mobileBtn.setAttribute("aria-expanded", "false");

          const navHeight = Utils.getElement(".navbar")?.offsetHeight || 0;
          const targetPosition = targetSection.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update active state
          navLinks.forEach((navLink) => navLink.classList.remove("active"));
          link.classList.add("active");
        }
      });
    });
  },

  initAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
      }
    );

    // Pre-animate the first few items immediately for faster initial load
    const elements = Utils.getElements(".animated");

    if (!elements.length) return;

    const challengesContainer =
      Utils.getElement(".challenges-grid")?.parentElement;
    if (challengesContainer) {
      challengesContainer.classList.add("challenges-container", "loading");

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        // Wait for next paint cycle
        requestAnimationFrame(() => {
          challengesContainer.classList.remove("loading");
        });
      });
    }

    // Immediately show the first few visible challenges
    elements.forEach((el, index) => {
      if (index < 4 || el.getBoundingClientRect().top < window.innerHeight) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.classList.add("animate");
          }, index * 50);
        });
      } else {
        observer.observe(el);
      }
    });

    // Clean up observer on page navigation
    window.addEventListener("unload", () => {
      observer.disconnect();
    });
  },
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    ThemeManager.init();
    UIManager.init();
  } catch (error) {
    console.error("Initialization error:", error);
  }
});
