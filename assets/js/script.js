const startButton = document.getElementById("start-btn")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerBtnEl = document.getElementById("answer-buttons")
var timerEl = document.getElementById('time')
var timeRemaining = 75 // for 5 questions
var clockid
let shuffledQuestions, currentQuestionIndex

const questions = [
    {
        question: "what is 2 + 2?",
        answers: [
            {text: "4", correct: true},
            {text: "33", correct: false},
            {text: "44", correct: false},
            {text: "77", correct: false}
        ]
    },

    {
        question: "what is 1 + 1?",
        answers: [
            {text: "4", correct: false},
            {text: "2", correct: true}
        ]
    }
]

function countDown() {
    timerEl.textContent = timeRemaining
    timeRemaining--

}

function startGame() {
    console.log("started")
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    clockid = setInterval(countDown, 1000)
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerBtnEl.appendChild(button)
    })
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button. dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function resetState() {
    while (answerBtnEl.firstChild) {
      answerBtnEl.removeChild(answerBtnEl.firstChild)  
    }
}


startButton.addEventListener("click", startGame)



/*
step one: display start page - title, paragraph, start button

step two: create timer that will start when button is clicked, hide start page, display quesiton, four answer buttons. When selection is made, comapred to correct or wrong. Start clock at 75, wrong answer subtracts by 15 and shows wrong message; correct answer no penalty and shows correct message.

step three: Once finished with all quesitons, score page will be presented with an input of your initials and submit button. The timer should stop and time left becomes your score. when you click submit, should store in localstorage

step four: show dashboard of all scores.

*/





