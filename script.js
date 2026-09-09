// Elementos
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const playerChoiceElement = document.getElementById("player-choice");
const pcChoiceElement = document.getElementById("pc-choice");
const resultElement = document.getElementById("result");

const resetButton = document.getElementById("reset");

// Utilidades
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function translate(text) {
    return translationTable[text];
};

const translationTable = {
    "rock": "Pedra",
    "paper": "Papel",
    "scissors": "Tesoura",
    "win": "Você venceu!",
    "lose": "Você perdeu!",
    "tie": "Empate!"
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

// Jogo
let player;
function playerChoice(event) {
    player = event.target.id;
    playerChoiceElement.innerHTML = `Você escolheu: <span class="fw-medium">${translate(player)}</span>`;

    rockButton.removeEventListener("click", playerChoice);
    paperButton.removeEventListener("click", playerChoice);
    scissorsButton.removeEventListener("click", playerChoice);

    rockButton.classList.add("disabled");
    paperButton.classList.add("disabled");
    scissorsButton.classList.add("disabled");

    pcChoice();
};

rockButton.addEventListener("click", playerChoice);
paperButton.addEventListener("click", playerChoice);
scissorsButton.addEventListener("click", playerChoice);

let pc;
async function pcChoice() {
    pcChoiceElement.innerHTML = `Computador escolheu: <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;
    await sleep(1000);

    pc = Math.random();
    pc = pc < 1/3 ? "rock" : (pc < 2/3 ? "paper" : "scissors");
    pcChoiceElement.innerHTML = `Computador escolheu: <span class="fw-medium">${translate(pc)}</span>`;

    compareChoices();
};

async function compareChoices() {
    result = winConditions[player][pc];
    resultElement.innerText = translate(result);

    // Cor
    if (result == "win") {
        resultElement.style.color = "lime";
    } else if (result == "lose") {
        resultElement.style.color = "red";
    }
    
    resultElement.removeAttribute("hidden");

    // Animar botão de reiniciar
    await sleep(250);
    resetButton.parentElement.removeAttribute("hidden");
    resetButton.parentElement.classList.toggle("loadAnim");
};

// Reiniciar
resetButton.addEventListener("click", () => {
    document.body.classList.add("unloadAnim");
});

document.body.addEventListener("animationend", event => {
    if (event.target != document.body) return;
    if (event.animationName != "fadeOutUp") return;
    
    document.body.classList.add("hidden");
    window.location.reload();
});