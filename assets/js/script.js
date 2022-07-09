const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerBtnEl = document.getElementById("answer-buttons")
const answerBtns = document.querySelector(".btns")
const aStatus = document.getElementById('aStatus')
let shuffledQuestions, currentQuestionIndex
var timerEl = document.getElementById('time')
var timeRemaining = 75 // for 5 questions, 15sec for each
var clockID = []

function startGame() {
    console.log("started")
    startButton.classList.add("hide")
    questionContainerEl.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    clockID = setInterval(countDown, 1000)
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    DisplayQuestions(shuffledQuestions[currentQuestionIndex])
}

function DisplayQuestions(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    })

}
function resetState() {
    while (answerBtnEl.firstElementChild) {
        answerBtnEl.removeChild(answerBtnEl.firstElementChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (selectedButton === correct) {
        setNextQuestion()
        aStatus.append("Correct!")
    }

}

const questions = [
    {
        question: "what is 2 + 2?",
        answers: [
            {text: "4", correct: true},
            {text: "33", correct: false},
            {text: "44", correct: false},
            {text: "77", correct: false},
        ]
    },

    {
        question: "what is 1 + 1?",
        answers: [
            {text: "4", correct: false},
            {text: "2", correct: true},
            {text: "6", correct: false},
            {text: "7", correct: false},
        ]
    }
]

function countDown() {
    timerEl.textContent = timeRemaining
    timeRemaining--

    if (timeRemaining < 0) {
        questionEl.classList.add("hide");
        answerBtnEl.classList.add("hide");
        answerBtns.classList.add("hide");
        clearTimeout(clockID)
    }

}



// answerBtns.addEventListener("click", startGame)
startButton.addEventListener("click", startGame)
answerBtnEl.addEventListener("click", startGame)



/*
step one: display start page - title, paragraph, start button

step two: create timer that will start when button is clicked, hide start page, display quesiton, four answer buttons. When selection is made, comapred to correct or wrong. Start clock at 75, wrong answer subtracts by 15 and shows wrong message; correct answer no penalty and shows correct message.

step three: Once finished with all quesitons, score page will be presented with an input of your initials and submit button. The timer should stop and time left becomes your score. when you click submit, should store in localstorage

step four: show dashboard of all scores.

*/





