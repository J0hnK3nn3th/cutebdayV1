const surpriseButton = document.querySelector("#surpriseButton");
const noteCard = document.querySelector("#note");
const confettiLayer = document.querySelector("#confettiLayer");

const colors = ["#ee7c6f", "#f5cd69", "#9db7a1", "#f6b28f", "#d5a8c6"];

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
