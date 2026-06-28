import { quizData } from "./question.js";
console.log(quizData);

// Question
const question = document.querySelector(".question");

// Options
const options = document.querySelectorAll(".option");

// Progress
const currentQuestion = document.querySelector(".current-question");
const totalQuestion = document.querySelector(".total-question");
const progressPercent = document.querySelector(".progress-percent");
const progressFill = document.querySelector(".progress-fill");

// Score
const scoreValue = document.querySelector(".score-value");

// Timer
const time = document.querySelector(".time");

// Navigation Buttons
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Result Screen
const resultScreen = document.querySelector(".result-screen");
const quizCard = document.querySelector(".quiz-card");
const navigation = document.querySelector(".navigation");

// Result Values
const finalScore = document.querySelector(".final-score");
const percentage = document.querySelector(".percentage");
const correctValue = document.querySelector(".correct-value");
const wrongValue = document.querySelector(".wrong-value");

// Restart Button
const restartBtn = document.querySelector(".restart-btn");

// Result Message
const resultMessage = document.querySelector(".result-message");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 30;
let timer;

function showQuestion(){
    const currentQuiz = quizData[currentQuestionIndex];

    question.innerHTML = currentQuiz.question;

    options.forEach((option, index) => {
        option.innerHTML = currentQuiz.options[index];
    });

    currentQuestion.innerText = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

    progressPercent.innerText = `${progress}%`;
    progressFill.style.width = `${progress}%`;
}

showQuestion();

options.forEach((option) => {
    option.addEventListener(('click'))
}); 