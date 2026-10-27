
const questions = [
    "Love pa ba ka niya? 🥹",
    "Gimingaw pa ba siya nimo? 💭",
    "Ikaw pa ba iyang gihunahuna? ❤️",
    "Gusto pa ba niya makig-chat nimo? 📱",
    "Naa pa ba siyay feelings nimo? 💗",
    "Ikaw ba iyang gipangita kung mingawon siya? 🥺",
    "Malipay ba ka kung mo-message siya? 💌",
    "Motubag ba ka dayon kung mo-chat siya? 😭",
    "Gusto pa ba nimo siya makita? 👀",
    "Dawaton pa ba nimo kung mobalik siya? 💕",
    "Gihulat pa ba nimo iyang message? 📲",
    "Mo-smile ba ka kung makita iyang pangalan? 😊",
    "Naa pa ba kay feelings para niya? 💘",
    "Maminaw pa ba ka kung mag-explain siya? 🫶",
    "Gusto pa ba nimo nga magka-okay mo? 🥹",
    "Hatagan pa ba nimo siyag chance? ❤️‍🩹",
    "Siya gihapon imong favorite person? 💖",
    "do you still miss him? 🌙",
    "Andam pa ba ka nga sulayan ninyo pag-usab? 💞",
    "FINAL QUESTION: LOVE PA BA NIMO SIYA DILI MAN TANTADO Ayaw na oi? 😭❤️"

];

let current = 0;
let yesCount = 0;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const game = document.getElementById("game");
const resultScreen = document.getElementById("resultScreen");
const emoji = document.getElementById("emoji");

// Move YES to a new position on the screen
function runYes() {
    yesBtn.classList.add("running");

    const padding = 12;
    const maxX = Math.max(
        padding,
        window.innerWidth - yesBtn.offsetWidth - padding
    );
    const maxY = Math.max(
        padding,
        window.innerHeight - yesBtn.offsetHeight - padding
    );

    let x, y;
    let attempts = 0;
    const noRect = noBtn.getBoundingClientRect();

    do {
        x = padding + Math.random() * (maxX - padding);
        y = padding + Math.random() * (maxY - padding);
        attempts++;
    } while (
        attempts < 30 &&
        x < noRect.right &&
        x + yesBtn.offsetWidth > noRect.left &&
        y < noRect.bottom &&
        y + yesBtn.offsetHeight > noRect.top
    );

    yesBtn.style.left = `${x}px`;
    yesBtn.style.top = `${y}px`;
}

// Run when a mouse approaches YES
yesBtn.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") {
        runYes();
    }
});

// On touch devices, move YES before its click can happen
yesBtn.addEventListener("pointerdown", event => {
    event.preventDefault();
    runYes();
});

// Extra protection: YES never submits an answer
yesBtn.addEventListener("click", event => {
    event.preventDefault();
    runYes();
});

// NO is the only answer button that advances the quiz
noBtn.addEventListener("click", () => {
    current++;
    makeHearts(3);

    if (current < questions.length) {
        question.textContent = questions[current];
        progress.textContent =
            `Question ${current + 1} of ${questions.length}`;

        progressFill.style.width =
            `${(current / questions.length) * 100}%`;

        emoji.textContent = "💔";
    } else {
        showResult();
    }
});

function showResult() {
    game.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    yesBtn.classList.remove("running");
    yesBtn.style.left = "";
    yesBtn.style.top = "";

    document.getElementById("resultTitle").textContent =
        "HAHAHAHA, YOU DID IT! 💖";

    document.getElementById("result").textContent =
        `Naka-answer ka sa tanang ${questions.length} questions! 😂\n\n` +
        `YES answers: ${yesCount}\n` +
        `NO answers: ${questions.length}\n\n` +
        "GRABE, WALAY NAKADAKOP SA YES BUTTON! 😭💗\n\n" +
        "Prank ra ni, bestie! Ang tinuod nga feelings " +
        "dili masukod sa usa ka game. ❤️‍🩹";

    emoji.textContent = "🥰";
    progressFill.style.width = "100%";
    makeHearts(25);
}

function restart() {
    current = 0;
    yesCount = 0;

    game.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    question.textContent = questions[0];
    progress.textContent = "Question 1 of 20";
    progressFill.style.width = "0%";
    emoji.textContent = "💗";

    yesBtn.classList.remove("running");
    yesBtn.style.left = "";
    yesBtn.style.top = "";

    makeHearts(5);
}

document.getElementById("restartBtn").addEventListener(
    "click",
    restart
);

function makeHearts(amount) {
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "heart";
        heart.textContent = ["💗", "💖", "💕", "💘"][
            Math.floor(Math.random() * 4)
        ];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 7500);
    }
}

setInterval(() => makeHearts(1), 1200);

// Keep YES within the visible screen when resized
window.addEventListener("resize", () => {
    if (yesBtn.classList.contains("running")) {
        runYes();
    }
});
