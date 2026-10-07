const surpriseButton = document.querySelector("#surpriseButton");
const noteCard = document.querySelector("#note");
const confettiLayer = document.querySelector("#confettiLayer");
const gameGate = document.querySelector("#gameGate");
const birthdayPage = document.querySelector("#birthdayPage");
const beginGames = document.querySelector("#beginGames");
const welcomeStage = document.querySelector("#welcomeStage");
const heartStage = document.querySelector("#heartStage");
const candleStage = document.querySelector("#candleStage");
const heartArena = document.querySelector("#heartArena");
const heartCount = document.querySelector("#heartCount");
const candleCount = document.querySelector("#candleCount");
let heartsCaught = 0;
let candlesOut = 0;

function revealBirthdayPage() {
  if (!birthdayPage) return;
  birthdayPage.classList.add("unlocked");
  birthdayPage.setAttribute("aria-hidden", "false");
}

function resetUnlockFlow() {
  if (!gameGate || !birthdayPage || !beginGames || !welcomeStage || !heartStage || !candleStage) {
    revealBirthdayPage();
    return;
  }
  welcomeStage.hidden = false;
  heartStage.hidden = true;
  candleStage.hidden = true;
  gameGate.classList.remove("gate-complete");
  birthdayPage.classList.remove("unlocked");
  birthdayPage.setAttribute("aria-hidden", "true");
}

resetUnlockFlow();

const colors = ["#ee7c6f", "#f5cd69", "#9db7a1", "#f6b28f", "#d5a8c6"];

function showStage(currentStage, nextStage) {
  currentStage.hidden = true;
  nextStage.hidden = false;
  nextStage.classList.add("active");
}

function createHeart() {
  const heart = document.createElement("button");
  heart.className = "heart-target";
  heart.type = "button";
  heart.textContent = "♥";
  heart.setAttribute("aria-label", "Catch this heart");
  heart.style.left = `${10 + Math.random() * 78}%`;
  heart.style.top = `${18 + Math.random() * 55}%`;
  heart.style.animationDelay = `${Math.random() * -.8}s`;
  heart.addEventListener("click", () => {
    if (heart.classList.contains("caught")) return;
    heart.classList.add("caught");
    heartsCaught += 1;
    heartCount.textContent = heartsCaught;
    window.setTimeout(() => heart.remove(), 350);
    if (heartsCaught === 5) {
      window.setTimeout(() => showStage(heartStage, candleStage), 550);
    } else {
      window.setTimeout(createHeart, 300);
    }
  });
  heartArena.appendChild(heart);
}

function startHeartGame() {
  welcomeStage.hidden = true;
  heartStage.hidden = false;
  for (let index = 0; index < 3; index += 1) createHeart();
}

function finishGames() {
  gameGate.classList.add("gate-complete");
  window.setTimeout(() => {
    gameGate.remove();
    revealBirthdayPage();
    document.querySelector("#birthday-title").focus?.();
    celebrate();
  }, 700);
}

beginGames.addEventListener("click", startHeartGame);

document.querySelectorAll(".game-candle").forEach((candle) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("is-out")) return;
    candle.classList.add("is-out");
    candlesOut += 1;
    candleCount.textContent = candlesOut;
    if (candlesOut === 3) window.setTimeout(finishGames, 700);
  });
});

function celebrate() {
  noteCard.classList.add("revealed");
  surpriseButton.querySelector("span:first-child").textContent = "wish granted ✦";
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3800);
  }
}

surpriseButton.addEventListener("click", celebrate);
