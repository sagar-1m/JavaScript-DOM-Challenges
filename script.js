const Utils = {
  debounce(func, wait = 150) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  getElement: (selector) => document.querySelector(selector),
  getElements: (selector) => document.querySelectorAll(selector),

  setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
  },

  handleIntersection(elements, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
  },
};

// Theme Management
const ThemeManager = {
  init() {
    const themeToggle = Utils.getElement("#themeToggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const updateThemeToggle = (isDark) => {
      themeToggle.textContent = isDark ? "🌞" : "🌛";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${isDark ? "light" : "dark"} theme`
      );
    };

    const setTheme = (theme) => {
      const isDark = theme === "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      updateThemeToggle(isDark);
    };

    // Initialize theme
    const savedTheme =
      localStorage.getItem("theme") || (prefersDark.matches ? "dark" : "light");
    setTheme(savedTheme);

    // Theme toggle handler
    themeToggle?.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    // Listen for system theme changes
    prefersDark.addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });
  },
};

// Navigation Management
const Navigation = {
  init() {
    this.initMobileMenu();
    this.initScrollHandler();
  },

  initMobileMenu() {
    const btn = Utils.getElement(".mobile-menu-btn");
    const menu = Utils.getElement(".nav-menu");

    btn?.addEventListener("click", () => {
      menu.classList.toggle("active");
      btn.setAttribute("aria-expanded", menu.classList.contains("active"));
    });
  },

  initScrollHandler() {
    const navbar = Utils.getElement(".navbar");
    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      Utils.debounce(() => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle(
          "navbar--hidden",
          currentScroll > lastScroll && currentScroll > 100
        );
        lastScroll = currentScroll;
      })
    );
  },
};

// 1. Single UI Management Module
const UIManager = {
  init() {
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initScrollObserver();
  },

  initMobileMenu() {
    const btn = Utils.getElement(".mobile-menu-btn");
    const menu = Utils.getElement(".nav-menu");

    btn?.addEventListener("click", () => {
      menu.classList.toggle("active");
      btn.setAttribute("aria-expanded", menu.classList.contains("active"));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar")) {
        menu.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  },

  initSmoothScroll() {
    const navLinks = Utils.getElements('.nav-link[href^="#"]');

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Close mobile menu if open
          document.querySelector(".nav-menu").classList.remove("active");

          const navHeight = document.querySelector(".navbar").offsetHeight;

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

  initScrollObserver() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-50% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
          if (entry.isIntersecting) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      });
    }, observerOptions);

    // Observe all sections that have corresponding nav links
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
  },
};

// 2. Clean up initialization
document.addEventListener("DOMContentLoaded", () => {
  try {
    ThemeManager.init();
    UIManager.init();
  } catch (error) {
    console.error("Initialization error:", error);
  }

  const links = document.querySelectorAll(".challenges-grid a");
  links.forEach((link, index) => {
    link.style.setProperty("--index", index);
  });
});
