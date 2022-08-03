const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answer-buttons");
const answerBtns = document.querySelector(".btns");
const answerStatus = document.getElementById("aStatus");
const nextButton = document.getElementById("next-btn")
let shuffledQuestions, currentQuestionIndex;
var timerEl = document.getElementById("time");
var timeRemaining = 3; // for 5 questions, 15sec for each
var clockID = [];

const questions = [
  {
    question: "what is 2 + 2?",
    answers: [
      { text: "4", correct: true  },
      { text: "3", correct: false }, 
      { text: "8", correct: false }, 
      { text: "7", correct: false }
  ],
    correctAnswer: "4",
  },
  {
    question: "what is 1 + 1?",
    answers: [
      { text: "8", correct: false },
      { text: "2", correct: true },
      { text: "6", correct: false },
      { text: "7", correct: false}
  ],
    correctAnswer: "2",
  },
];

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
  
function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");
  clockID = setInterval(function () {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(clockID);
    }
  }, 1000);
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  DisplayQuestions(shuffledQuestions[currentQuestionIndex]);
}

function DisplayQuestions(questions) {
  questionEl.innerText = questions.question;
  questions.answers.forEach(answers => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("btn");
    if (answers.correct) {
        button.dataset.correct = answers.correct
        button.classList.add("right")
    }
    button.addEventListener("click", selectAnswer)
    answerBtnEl.appendChild(button);
  })
};

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtnEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}






  // for(var i = 0; i < questions.length; i++) {
  //     questionEl.innerText = questions[i].question;
  //     console.log(questions[i].question);

  //     for (let i = 0; i < 4; i++) {
  //         button.innerText = questions[i].answers[i].text
  //     }
  // }

  // questions.answers.forEach(answer => {
  //     const button = document.createElement('button')
  //     button.innerText = answer.text
  //     button.classList.add('btn')
  //     if (answer.correct) {
  //         button.dataset.correct = answer.correct
  //     }
  //     // button.addEventListener('click', selectAnswer)
  //     answerBtnEl.appendChild(button)
  // })



// answerBtns.addEventListener("click", startGame)
// answerBtnEl.addEventListener("click", startGame);

/*
step one: display start page - title, paragraph, start button

step two: create timer that will start when button is clicked, hide start page, display quesiton, four answer buttons. When selection is made, comapred to correct or wrong. Start clock at 75, wrong answer subtracts by 15 and shows wrong message; correct answer no penalty and shows correct message.

step three: Once finished with all quesitons, score page will be presented with an input of your initials and submit button. The timer should stop and time left becomes your score. when you click submit, should store in localstorage

step four: show dashboard of all scores.

*/
