const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true 
let score = 0
let questionCounter = 0
let availableQuestions =[]

let questions = [
    {
        question: " What is the name of the song played at the intro of the movie?",
        choice1: "Don't get it - lil Wayne ",
        choice2: 'Misunderstood -Yung pt',
        choice3: 'Downfall - Fadale the barber',
        choice4: 'Show up - Akon ft OG Boo Dirty',
        answer: 1,
    },
    {
    question: "How many bottles and glasses were on the table in the room where Melinda and the therapist discussed?",
    choice1: "Two bottles and two glasses",
    choice2: "One bottle and one glass",
    choice3: "None",
    choice4: "One bottle and one glass", 
    answer: 1,
    },
    {
        question: "What did Melinda wear on her first date with Robert?",
        choice1: 'A satin dress',
        choice2: 'A little black dress',
        choice3: 'A denim gown',
        choice4: 'A white dress',
        answer: 3,

    },

     {
    question: " Taraji p Henson stars in the movie as...?",
    choice1: "Melinda June Gayle",
    choice2: "Melinda Moore Gayle",
    choice3: "Melinda Casey Gayle",
    choice4: "Melinda Robert Gayle", 
    answer: 2,
    },

    {
        question: "Lyriq Bent stars in the movie as what character?",
        choice1: "Mr Prescott",
        choice2: "Kalvin",
        choice3: "Robert Gayle",
        choice4: "Diana Wells",
        answer: 3,
    },

    {
        question: "On what occassion did Melinda and Robert first have intercourse?",
        choice1: "Melinda's mother's funeral",
        choice2: "Their first date",
        choice3: "Their wedding night",
        choice4: "Their honeymoon",
        answer: 1,
    },

    {
        question: "What's the name of the venture capitalist Robert was determined to build a prototype for?",
        choice1: "Boyscott",
        choice2: "Prescott",
        choice3: "Girlscott",
        choice4: "Shield",
        answer: 2,
    },
    {
        question: "What prototype was Robert trying to build?",
        choice1: "Time Machine",
        choice2: "Revolutionary battery",
        choice3: "Capsule",
        choice4: "Television",
        answer: 2,
    },

    {
        question: "After Melinda filed for divorce from Robert, where did Robert move to?",
        choice1: "To a church",
        choice2: "With his family",
        choice3: "With Melinda's sisters",
        choice4: "To a homeless shelter",
        answer: 4,
    },
    {
        question: "What is the meaning of acrimony?",
        choice1: "Sweetness",
        choice2: "Bitterness",
        choice3: "Loyalty",
        choice4: "A drug",
        answer: 2,
    }



]
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions= [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach((choice) => {
    choice.addEventListener('click', e =>{
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        
        }, 1000)
    })
})

incrementScore = (num) =>  {
    score +=num
    scoreText.innerText = score;
}

startGame();