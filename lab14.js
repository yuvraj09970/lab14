

const questions = [
    {
        question: "Which data structure follows the LIFO principle?",
        answers: ["Queue", "Stack", "Linked List", "Tree"],
        correct: 1
    },
    {
        question: "Which HTML tag is used to insert an image?",
        answers: ["<image>", "<picture>", "<img>", "<src>"],
        correct: 2
    },
    {
        question: "Which SQL command is used to retrieve data from a table?",
        answers: ["INSERT", "UPDATE", "DELETE", "SELECT"],
        correct: 3
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: ["<p>", "<h1>", "<img>", "<a>"],
        correct: 3
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "##", "<!-- -->", "**"],
        correct: 0
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

// Display the current question and its answers
function showQuestion() {
    resetState();

    let q = questions[currentQuestion];

    questionElement.textContent = q.question;
    progressElement.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    answerButtons.forEach((button, index) => {
        button.textContent = q.answers[index];
        button.onclick = () => selectAnswer(index);
    });
}

// Reset buttons before displaying the next question
function resetState() {
    nextButton.style.display = "none";

    answerButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "wrong");
    });
}

// Check the selected answer and update the score
function selectAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestion].correct;

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextButton.style.display = "inline-block";
}

// Move to the next question or show the final result
nextButton.onclick = function () {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

// Display the final score
function showResult() {
    quizElement.classList.add("hide");
    resultElement.classList.remove("hide");

    scoreElement.textContent =
        "Your Score: " + score + " / " + questions.length;
}

// Restart the quiz from the beginning
function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hide");
    quizElement.classList.remove("hide");

    showQuestion();
}

// Start the quiz
showQuestion();
