document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-quiz-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const scoreDisplay = document.getElementById("score");
    const quizQuestionDisplay = document.getElementById("quiz-question");
    const optionList = document.getElementById("options");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Madrid", "Berlin", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Earth", "Venus", "Mars", "Jupiter"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            choices: [
                "Harper Lee",
                "Jane Austen",
                "J.K. Rowling",
                "George Orwell",
            ],
            answer: "Harper Lee",
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: [
                "Indian Ocean",
                "Pacific Ocean",
                "Atlantic Ocean",
                "Arctic Ocean",
            ],
            answer: "Pacific Ocean",
        },
        {
            question: "What is 5 + 7?",
            choices: ["10", "11", "12", "13"],
            answer: "12",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz);

    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        score = 0;
        currentQuestionIndex = 0;
        startQuiz();
    })

    function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        quizQuestionDisplay.textContent =
            questions[currentQuestionIndex].question;
        optionList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach((choice) => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(choice));
            optionList.appendChild(li);
        });
    }

    function selectAnswer(choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) score++;
        nextBtn.classList.remove("hidden");
    }


    function showResult() {
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }    
});
