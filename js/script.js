const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const targetColorDisplay = document.getElementById("targetColor");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const overlay = document.getElementById("gameOver");
const finalName = document.getElementById("finalName");
const finalScore = document.getElementById("finalScore");

let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let score = 0;
let time = 30;
let timer;
let targetColor = "";
let playerName = "";

// Definir a cor alvo
function setTargetColor() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorDisplay.textContent = targetColor;
}

function createGrid() {
    grid.innerHTML = "";

    let gridColors = Array.from({ length: 9 }, () => colors[Math.floor(Math.random() * colors.length)]);
    
    const forcedIndex = Math.floor(Math.random() * 9);
    gridColors[forcedIndex] = targetColor;

    gridColors.forEach(color => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = color;

        square.addEventListener("click", () => {
            if (!timer) return;

            if (color === targetColor) {
                score += 10;
            } else {
                score -= 5;
                if (score < 0) score = 0;
            }
            scoreDisplay.textContent = score;
            setTargetColor();
            createGrid();
        });

        grid.appendChild(square);
    });
}

function startGame() {
    playerName = document.getElementById("name").value.trim();
    if (!playerName) {
        alert("Por favor, insira seu nome!");
        return;
    }

    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    overlay.classList.add("hidden");

    setTargetColor();
    createGrid();

    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    timer = null;
    overlay.classList.remove("hidden");
    finalName.textContent = playerName;
    finalScore.textContent = score;
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
