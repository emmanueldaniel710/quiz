const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Which tag is used to create a paragraph in HTML?",
        answers: [
            { text: "<p>", correct: true },
            { text: "<h1>", correct: false },
            { text: "<div>", correct: false },
            { text: "<span>", correct: false }
        ]
    },
    {
        question: "Which attribute is used to add a link in HTML?",
        answers: [
            { text: "href", correct: true },
            { text: "src", correct: false },
            { text: "link", correct: false },
            { text: "alt", correct: false }
        ]
    },
    {
        question: "How many years does it take in learning Coding?",
        answers: [
            { text: "2", correct: false },
            { text: "6 months", correct: false },
            { text: "10 years", correct: false },
            { text: "Forever", correct: true }
        ]
    },
    {
        question: "what did i use to do this app?",
        answers: [
            { text: "AI", correct: true },
            { text: "Youtube", correct: false },
            { text: "PDF", correct: false },
            { text: "Code from my head", correct: false }
        ]
    }
];

function startQuiz() { 
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct) button.dataset.correct = "true";
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
            if(button.dataset.correct === "true") button.classList.add("correct");
        });

        nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "inline-block";
    nextButton.onclick = () => {
        nextButton.innerText = "Next";
        startQuiz();
    };
}

startQuiz();