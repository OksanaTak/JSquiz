var currentQuestion = 0
var questionElement = document.getElementById('questions')
var option1 = document.getElementById('option1')
var option2 = document.getElementById('option2')
var option3 = document.getElementById('option3')
var option4 = document.getElementById('option4')
var checkAnswer = document.getElementById('checkAnswer')
var timerElement = document.getElementById('timer')
var summaryElement = document.getElementById('summary')

var saveUserScore = document.getElementById('save-user-score')

var timerCounter = 90 //360
var timerClock
var score = 0
option1.addEventListener('click', correctAnswer)
option2.addEventListener('click', correctAnswer)
option3.addEventListener('click', correctAnswer)
option4.addEventListener('click', correctAnswer)

var quizArray = [
  {
    question: 'Which of the following are included in arrays in JavaScript',
    option1: 'numbers and strings',
    option2: 'booleans',
    option3: 'other arrays',
    option4: 'all of the above',
    answer: 'all of the above'
  },
  {
    question: 'What is the correct way to create an object in JavaScript',
    option1: 'var obj = {}',
    option2: 'var obj = new Object()',
    option3: 'Both a and b are correct',
    option4: 'None of the above',
    answer: 'Both a and b are correct'
  },
  {
    question:
      'Which of the following is NOT a valid way to declare a variable in JavaScript',
    option1: 'var',
    option2: 'const',
    option3: 'let',
    option4: 'int',
    answer: 'int'
  },
  {
    question:
      'Which method is used to add elements to the end of an array in JavaScript?',
    option1: 'array.push()',
    option2: 'array.unshift()',
    option3: 'array.append()',
    option4: 'array.add()',
    answer: 'array.push()'
  },
  {
    question: 'What is the correct way to comment a single-line in JavaScript?',
    option1: '// comment',
    option2: '<!-- comment -->',
    option3: '/* comment */',
    option4: '** comment **',
    answer: '** comment **'
  },
  {
    question: 'What is the correct way to declare a function in JavaScript?',
    option1: 'myFunction()',
    option2: 'function myFunction()',
    option3: 'var myFunction = function()',
    option4: 'All of the above',
    answer: 'All of the above'
  }
]
var startbutton = document.getElementById('startQuiz')
startbutton.addEventListener('click', function () {
  quizContainer.style.display = 'block'
  displayQuestion()
  startbutton.style.display = 'none'
  timerClock = setInterval(function () {
    if (timerCounter > 0) {
      timerElement.innerText = timerCounter
      timerCounter--
    } else {
      timerCounter -= 3
      summary()
    }
  }, 1000)
})
function displayQuestion () {
  questionElement.innerText = quizArray[currentQuestion].question
  option1.innerText = quizArray[currentQuestion].option1
  option2.innerText = quizArray[currentQuestion].option2
  option3.innerText = quizArray[currentQuestion].option3
  option4.innerText = quizArray[currentQuestion].option4
}
var quizContainer = document.getElementById('quizContainer')
quizContainer.style.display = 'none'
summaryElement.style.display = 'none'

function correctAnswer (event) {
  var userSelection = event.target.innerText
  if (userSelection == quizArray[currentQuestion].answer) {
    score += 10
    checkAnswer.innerText = 'answer is correct'
  } else {
    checkAnswer.innerText = 'answer is wrong'
    timerCounter -= 5
  }
  if (currentQuestion < quizArray.length - 1) {
    currentQuestion++
    displayQuestion()
  } else {
    summary()
  }
}

function summary () {
  quizContainer.style.display = 'none'
  summaryElement.style.display = 'block'
  document.getElementById('final-score').innerText = score + timerCounter
  clearInterval(timerClock)
}

document
  .getElementById('save-user-score')
  .addEventListener('click', function (e) {
    e.preventDefault()
    var userName = document.getElementById('user-initials').value
    var previous_score = JSON.parse(localStorage.getItem('codequiz')) || []
    previous_score.push({ user: userName, score: score + timerCounter })
    localStorage.setItem('codequiz', JSON.stringify(previous_score))
    summaryElement.innerHTML =
      '<a href="./highscores.html">Check High Scores</a>'
  })
