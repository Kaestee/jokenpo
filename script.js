// Elementos
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const playerChoiceElement = document.getElementById("player-choice");
const pcChoiceElement = document.getElementById("pc-choice");
const resultElement = document.getElementById("result");

const resetButton = document.getElementById("reset");

// Jogo
const translationTable = {
    "rock": "Pedra",
    "paper": "Papel",
    "scissors": "Tesoura",
    "win": "Você venceu!",
    "lose": "Você perdeu!",
    "tie": "Empate!"
};
function translate(text) {
    return translationTable[text];
};

let player;
function playerChoice(event) {
    player = event.target.id;
    playerChoiceElement.innerHTML = `Você escolheu: <span class="fw-medium">${translate(player)}</span>`;

    rockButton.removeEventListener("click", playerChoice);
    paperButton.removeEventListener("click", playerChoice);
    scissorsButton.removeEventListener("click", playerChoice);

    pcChoice();
};

rockButton.addEventListener("click", playerChoice);
paperButton.addEventListener("click", playerChoice);
scissorsButton.addEventListener("click", playerChoice);

let pc;
function pcChoice() {
    pc = Math.random();
    pc = pc < 1/3 ? "rock" : (pc < 2/3 ? "paper" : "scissors");
    pcChoiceElement.innerHTML = `Computador escolheu: <span class="fw-medium">${translate(pc)}</span>`;

    compareChoices();
};

const winConditions = {
    "rock": {
        "rock": "tie",
        "paper": "lose",
        "scissors": "win"
    },
    "paper": {
        "rock": "win",
        "paper": "tie",
        "scissors": "lose"
    },
    "scissors": {
        "rock": "lose",
        "paper": "win",
        "scissors": "tie"
    }
};
function compareChoices() {
    result = winConditions[player][pc];
    resultElement.innerText = translate(result);

    // Cor
    if (result == "win") {
        resultElement.style.color = "lime";
    } else if (result == "lose") {
        resultElement.style.color = "red";
    }

    resultElement.removeAttribute("hidden");
    resetButton.parentElement.removeAttribute("hidden");
};

// Reiniciar
resetButton.addEventListener("click", () => {
    window.location.reload();
});