
/* NAVIGATION */

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
}

function gotoletter() {
    showScreen("letter");
}

function gohome() {
    showScreen("homepage");
}

function showGameMenu() {
    showScreen("games");
}

function openGame(id) {
    showScreen(id);

    if (id === "guessGame") {
        resetGuessGame();
    }

    if (id === "wordleGame" && !targetWord) {
        resetWordle();
    }
}


/* GUESS THE NUMBER */

let secretNumber = 0;
let guessCount = 0;
let guessFinished = false;

function resetGuessGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    guessFinished = false;

    document.getElementById("numberInput").value = "";
    document.getElementById("numberInput").disabled = false;
    document.getElementById("guessAttempts").textContent = "Attempts: 0";
    document.getElementById("guessResult").textContent =
        "Can you figure it out?";
}

document.getElementById("guessForm").addEventListener("submit", event => {
    event.preventDefault();

    if (guessFinished) return;

    const input = document.getElementById("numberInput");
    const guess = Number(input.value);
    const result = document.getElementById("guessResult");

    if (
        input.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        result.textContent = "Enter a whole number from 1 to 100!";
        return;
    }

    guessCount++;

    document.getElementById("guessAttempts").textContent =
        `Attempts: ${guessCount}`;

    if (guess === secretNumber) {
        result.textContent =
            `You got it! The number was ${secretNumber}! 🎉`;
        guessFinished = true;
        input.disabled = true;
    } else if (guess < secretNumber) {
        result.textContent = "Too low! Try a higher number. 💜";
    } else {
        result.textContent = "Too high! Try a lower number. 💙";
    }

    input.value = "";
});

resetGuessGame();


/* ROCK, PAPER, SCISSORS */

let rpsWins = 0;
let rpsLosses = 0;
let rpsTies = 0;

function playRPS(player) {
    const choices = ["rock", "paper", "scissors"];
    const computer =
        choices[Math.floor(Math.random() * choices.length)];

    let result;

    if (player === computer) {
        rpsTies++;
        result = "It's a tie! 🤝";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        rpsWins++;
        result = "You win! 🎉";
    } else {
        rpsLosses++;
        result = "The computer wins this round!";
    }

    document.getElementById("rpsResult").textContent =
        `You chose ${player}. Computer chose ${computer}. ${result}`;

    updateRPSScore();
}

function updateRPSScore() {
    document.getElementById("rpsScore").textContent =
        `Wins: ${rpsWins} | Losses: ${rpsLosses} | Ties: ${rpsTies}`;
}

function resetRPS() {
    rpsWins = 0;
    rpsLosses = 0;
    rpsTies = 0;

    document.getElementById("rpsResult").textContent =
        "Ready? Choose your move!";

    updateRPSScore();
}


/* WORDLE */

const wordList = [
    "APPLE", "BLOOM", "BRAIN", "BRAVE", "BREAD",
    "CHAIR", "CHARM", "CHEER", "CLOUD", "DANCE",
    "DREAM", "EARTH", "FLAME", "FLORA", "GHOST",
    "GRACE", "GRAPE", "GREEN", "HEART", "HONEY",
    "HOUSE", "LAUGH", "LIGHT", "MAGIC", "MATCH",
    "MIGHT", "NIGHT", "OCEAN", "PEACE", "PIANO",
    "PLANT", "PRIDE", "QUIET", "RADIO", "SHINE",
    "SMILE", "SPACE", "SWEET", "TIGER", "WATER",
    "WHALE", "WORLD", "YOUTH"
];

let targetWord = "";
let wordAttempts = 0;
let wordFinished = false;

function resetWordle() {
    targetWord =
        wordList[Math.floor(Math.random() * wordList.length)];

    wordAttempts = 0;
    wordFinished = false;

    document.getElementById("wordInput").value = "";
    document.getElementById("wordInput").disabled = false;
    document.getElementById("wordResult").textContent = "Good luck! 💜";

    const board = document.getElementById("wordBoard");
    board.innerHTML = "";

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
            const tile = document.createElement("div");

            tile.className = "word-tile";
            tile.id = `tile-${row}-${col}`;

            board.appendChild(tile);
        }
    }
}

function getWordColors(guess, target) {
    const colors = Array(5).fill("absent");
    const remaining = target.split("");

    // First pass: exact matches.
    for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
            colors[i] = "correct";
            remaining[i] = null;
        }
    }

    // Second pass: matching letters in other positions.
    for (let i = 0; i < 5; i++) {
        if (colors[i] === "correct") continue;

        const index = remaining.indexOf(guess[i]);

        if (index !== -1) {
            colors[i] = "present";
            remaining[index] = null;
        }
    }

    return colors;
}

document.getElementById("wordForm").addEventListener("submit", event => {
    event.preventDefault();

    if (wordFinished) return;

    const input = document.getElementById("wordInput");
    const guess = input.value.trim().toUpperCase();
    const result = document.getElementById("wordResult");

    if (!/^[A-Z]{5}$/.test(guess)) {
        result.textContent = "Enter a five-letter word!";
        return;
    }

    if (!wordList.includes(guess)) {
        result.textContent =
            "That word isn't in this game's word list. Try another!";
        return;
    }

    const colors = getWordColors(guess, targetWord);

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(
            `tile-${wordAttempts}-${i}`
        );

        tile.textContent = guess[i];
        tile.classList.add(colors[i]);
    }

    wordAttempts++;
    input.value = "";

    if (guess === targetWord) {
        result.textContent = "You got it! Great job! 🎉";
        wordFinished = true;
        input.disabled = true;
    } else if (wordAttempts === 6) {
        result.textContent = `Game over! The word was ${targetWord}.`;
        wordFinished = true;
        input.disabled = true;
    } else {
        result.textContent =
            `${6 - wordAttempts} attempt(s) remaining. Keep going!`;
    }
});

resetWordle();


/* COMPLIMENTS */

const compliments = [
    "You make a difference in more ways than you know. 💜",
    "You deserve kindness and appreciation, too.",
    "Your efforts matter, even when nobody says it out loud.",
    "I hope something makes you smile today. ♡",
    "You deserve a peaceful day and a good rest.",
    "Thank you for being part of our memories.",
    "You are appreciated more than you might realize.",
    "I hope life gives you plenty of reasons to laugh.",
    "You deserve good things, Ma'am Cherry! 💙",
    "Never forget to take care of yourself, too.",
    "You make ordinary days a little more meaningful.",
    "Your kindness can leave a lasting impression.",
    "I hope you are proud of the things you do.",
    "You deserve to feel appreciated without asking for it.",
    "May your day have more smiles than worries.",
    "Thank you for all the little things you do.",
    "You deserve happiness on ordinary days, too.",
    "I hope you get time to do things you love.",
    "Your presence can mean more than you realize.",
    "Please remember to take care of yourself, too."
];

let previousCompliment = -1;

function getcompliment() {
    let index;

    do {
        index = Math.floor(Math.random() * compliments.length);
    } while (
        compliments.length > 1 &&
        index === previousCompliment
    );

    previousCompliment = index;

    document.getElementById("complimentText").textContent =
        compliments[index];

    showScreen("compliments");
}


/* BIRTHDAY SURPRISE: JUNE 5 */

function checkBirthday() {
    const today = new Date();

    const isBirthday =
        today.getMonth() === 5 &&
        today.getDate() === 5;

    document.getElementById("birthdayButton").hidden = !isBirthday;
}

function showBirthday() {
    document.getElementById("birthdayMessage").hidden = false;
}

checkBirthday();


/* DAY SUMMARY FORMS */

function setupSummaryForm(formId, inputId, statusId) {
    document.getElementById(formId).addEventListener("submit", event => {
        event.preventDefault();

        const message = document.getElementById(inputId).value.trim();
        const status = document.getElementById(statusId);

        if (!message) {
            status.textContent = "Write something before sending!";
            return;
        }

        status.textContent =
            "Your summary is ready, but email sending hasn't been configured yet.";

        // EmailJS integration will go here once its service,
        // template, public key, and recipient details are configured.
    });
}

setupSummaryForm(
    "cherrySummaryForm",
    "cherryDay",
    "cherryStatus"
);

setupSummaryForm(
    "lourSummaryForm",
    "lourDay",
    "lourStatus"
);


/* REGISTER THE SERVICE WORKER */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            await navigator.serviceWorker.register("./service-worker.js");
            console.log("Ma'am Cherry's PWA is ready!");
        } catch (error) {
            console.error("Service worker registration failed:", error);
        }
    });
}
