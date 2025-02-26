let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let isGameStarted = false;

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
const gameCards = [...emojis, ...emojis];

const gameContainer = document.getElementById("gameContainer");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");

// Initialize game
function initializeGame() {
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  flippedCards = [];
  isGameStarted = false;
  movesDisplay.textContent = moves;
  timeDisplay.textContent = "0:00";

  // Clear previous timer
  if (timer) clearInterval(timer);

  // Shuffle cards
  cards = shuffleCards([...gameCards]);

  gameContainer.innerHTML = "";
  createGameBoard();
}

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createGameBoard() {
  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${emoji}</div>
        `;

    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

// Start timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

// Flip card
function flipCard() {
  if (!isGameStarted) {
    isGameStarted = true;
    startTimer();
  }

  const selectedCard = this;

  if (
    flippedCards.length === 2 ||
    flippedCards.includes(selectedCard) ||
    selectedCard.classList.contains("flipped")
  ) {
    return;
  }

  // Flip the card
  selectedCard.classList.add("flipped");
  flippedCards.push(selectedCard);

  // Check for match if two cards are flipped
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const match = cards[card1.dataset.index] === cards[card2.dataset.index];

  match ? handleMatch() : handleMismatch();
}

// Handle matching cards
function handleMatch() {
  matchedPairs++;
  flippedCards = [];

  // Check for game completion
  if (matchedPairs === emojis.length) {
    clearInterval(timer);
    setTimeout(() => {
      const score = calculateScore();
      alert(
        `Congratulations! 🎉\nYou won in ${moves} moves\nTime: ${timeDisplay.textContent}\nScore: ${score} points`
      );
    }, 500);
  }
}

// Handle mismatched cards
function handleMismatch() {
  setTimeout(() => {
    flippedCards.forEach((card) => card.classList.remove("flipped"));
    flippedCards = [];
  }, 1000);
}

// Calculate score based on moves and time
function calculateScore() {
  const baseScore = 1000;
  const movesPenalty = moves * 10;
  const timePenalty = seconds * 5;
  return Math.max(baseScore - movesPenalty - timePenalty, 0);
}

// Restart game
function restartGame() {
  initializeGame();
}

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", initializeGame);
