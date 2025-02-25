// Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

// Get DOM elements
const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");
const timerDisplay = document.getElementById("timerDisplay");

let currentIndex = 0;
let autoPlayInterval;
let timeLeft = 5; // Seconds between transitions
const transitionTime = 5000; // 5 seconds

// Initialize carousel
function initializeCarousel() {
  // Create slides
  images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.style.backgroundImage = `url(${image.url})`;
    carouselTrack.appendChild(slide);

    // Create indicator
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    indicator.addEventListener("click", () => goToSlide(index));
    carouselNav.appendChild(indicator);
  });

  updateCarousel();
}

// Update carousel display
function updateCarousel() {
  // Update slides position
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  caption.textContent = images[currentIndex].caption;

  // Update indicators
  const indicators = carouselNav.getElementsByClassName("carousel-indicator");
  Array.from(indicators).forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

// Navigation functions
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  resetTimer();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
  resetTimer();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
  resetTimer();
}

// Auto-play functions
function toggleAutoPlay() {
  if (autoPlayInterval) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      nextSlide();
      timeLeft = 5;
    }
  }, 1000);

  autoPlayButton.textContent = "Stop Auto Play";
  timeLeft = 5;
  updateTimerDisplay();
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
  autoPlayButton.textContent = "Start Auto Play";
  timerDisplay.textContent = "";
}

function resetTimer() {
  if (autoPlayInterval) {
    timeLeft = 5;
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  timerDisplay.textContent = autoPlayInterval
    ? `Next slide in ${timeLeft}s`
    : "";
}

// Event listeners
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
autoPlayButton.addEventListener("click", toggleAutoPlay);

// Initialize the carousel
initializeCarousel();
