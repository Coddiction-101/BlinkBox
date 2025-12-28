const gridEl = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const startBtn = document.getElementById("startBtn");

let gridSize = 3;
let score = 0;
let canClick = false;
let activeIndex = null;

let bestScore = localStorage.getItem("blinkboxBest") || 0;
bestEl.textContent = bestScore;

function createGrid() {
    gridEl.innerHTML = "";
    gridEl.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.onclick = () => handleClick(i, cell);
        gridEl.appendChild(cell);
    }
}

function startRound() {
    createGrid();
    canClick = false;

    const cells = document.querySelectorAll(".cell");
    activeIndex = Math.floor(Math.random() * cells.length);

    cells[activeIndex].classList.add("active");

    setTimeout(() => {
        cells[activeIndex].classList.remove("active");
        canClick = true;
    }, 700);
}

function handleClick(index, cell) {
    if (!canClick) return;
    canClick = false;

    if (index === activeIndex) {
        cell.classList.add("correct");
        score++;
        scoreEl.textContent = score;

        // Increase difficulty slowly
        if (score % 5 === 0 && gridSize < 4) {
            gridSize++;
        }

        setTimeout(startRound, 500);
    } else {
        cell.classList.add("wrong");
        endGame();
    }
}

function endGame() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("blinkboxBest", bestScore);
        bestEl.textContent = bestScore;
    }

    score = 0;
    scoreEl.textContent = score;
    gridSize = 3;
}

startBtn.addEventListener("click", startRound);
