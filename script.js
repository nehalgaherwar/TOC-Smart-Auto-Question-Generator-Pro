let currentAnswer = "";
let timeLeft = 30;
let timer;

const questions = {
    dfa: {
        easy: [
            {q: "Define DFA formally.", a: "A DFA is a 5-tuple (Q, Σ, δ, q0, F)"},
            {q: "What is deterministic in DFA?", a: "Each state has exactly one transition for each input symbol."}
        ],
        medium: [
            {q: "Design a DFA for strings ending with 01.", a: "Minimum 3 states required."}
        ],
        hard: [
            {q: "Prove equivalence between DFA and NFA.", a: "Subset construction method."}
        ]
    },
    pumping: {
        easy: [
            {q: "State Pumping Lemma for Regular Languages.", a: "For any regular language L, there exists p such that any string s..."}
        ],
        hard: [
            {q: "Use Pumping Lemma to prove L = {a^n b^n} is not regular.", a: "Assume regular and derive contradiction."}
        ]
    }
};

function generateQuestion() {
    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;

    const topicQuestions = questions[topic][difficulty];
    const random = Math.floor(Math.random() * topicQuestions.length);
    const selected = topicQuestions[random];

    document.getElementById("questionBox").innerHTML =
        `<p>${selected.q}</p><textarea id="answer" rows="4" cols="50"></textarea>`;

    currentAnswer = selected.a;
    startTimer();
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const result = document.getElementById("result");

    if (userAnswer.toLowerCase().includes(currentAnswer.toLowerCase().split(" ")[0])) {
        result.innerHTML = "✅ Correct!";
        saveScore(1);
    } else {
        result.innerHTML = "❌ Wrong! Correct Answer: " + currentAnswer;
    }
    clearInterval(timer);
}

function startTimer() {
    timeLeft = 30;
    document.getElementById("time").innerText = timeLeft;
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerHTML = "⏰ Time's Up!";
        }
    }, 1000);
}

function saveScore(score) {
    let total = localStorage.getItem("tocScore") || 0;
    total = parseInt(total) + score;
    localStorage.setItem("tocScore", total);
}

function downloadPDF() {
    window.print();
}
