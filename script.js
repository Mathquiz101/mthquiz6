const questions = [
    {
        question: "In a Venn diagram, the overlapping region between two sets represents:",
        options: ["Intersection", "Union", "Complement", "Difference"],
        correct: 0
    },
    {
        question: "If A ∪ B = {1, 2, 3, 4, 5} and A ∩ B = {3}, what is A and B combined without repetition?",
        options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2, 3}", "{4, 5}"],
        correct: 0
    },
    {
        question: "In a class of 50 students, 20 study Math, 30 study English, and 10 study both. How many students study only Math?",
        options: ["10", "20", "30", "40"],
        correct: 0
    },
    {
        question: "What is the total number of elements in the union of two sets A and B if |A| = 15, |B| = 10, and |A ∩ B| = 5?",
        options: ["20", "25", "15", "10"],
        correct: 0
    },
    {
        question: "A survey shows 70 people like tea, 50 like coffee, and 30 like both. How many people like either tea or coffee?",
        options: ["90", "120", "100", "70"],
        correct: 0
    },
    {
        question: "If A and B are disjoint sets, what is A ∩ B?",
        options: ["{}", "{A, B}", "U", "A"],
        correct: 0
    },
    {
        question: "A Venn diagram with three sets contains how many distinct regions?",
        options: ["7", "8", "6", "5"],
        correct: 1
    },
    {
        question: "In a class of 40 students, 25 study Physics, 18 study Chemistry, and 10 study both. How many students study neither?",
        options: ["7", "10", "12", "15"],
        correct: 0
    },
    {
        question: "In a Venn diagram, the shaded region outside all sets represents:",
        options: ["The universal set", "The complement", "The empty set", "None of the above"],
        correct: 1
    },
    {
        question: "How many subsets are there in a set with 3 elements?",
        options: ["8", "6", "9", "7"],
        correct: 0
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let quizEnded = false;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.querySelector('.timer');
const progressBar = document.querySelector('.progress');
const questionNumber = document.querySelector('.question-number');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
    startTimer();
}

function startTimer() {
    timeLeft = 60;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft/60) * 100}%`;
        
        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectIncorrect();
        }
    }, 1000);
}

function autoSelectIncorrect() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.style.pointerEvents = 'none');
    options[questions[currentQuestion].correct].classList.add('correct');
    nextBtn.classList.remove('hide');
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    progressBar.style.width = '100%';
}

function selectOption(index) {
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    
    if (index === questions[currentQuestion].correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[questions[currentQuestion].correct].classList.add('correct');
    }
    
    nextBtn.classList.remove('hide');
    options.forEach(option => option.style.pointerEvents = 'none');
}

function nextQuestion() {
    currentQuestion++;
    nextBtn.classList.add('hide');
    
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizEnded = true;
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    const resultEl = document.querySelector('.result');
    const percentage = (score / questions.length) * 100;
    
    resultEl.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score} out of ${questions.length}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Performance Rating: ${getPerformanceRating(percentage)}</p>
    `;

    // Show next level link if score is above 50%
    if (percentage > 50) {
        const nextLevelContainer = document.getElementById('next-level-container');
        const nextLevelLink = document.getElementById('next-level-link');
        const link = 'https://mathquiz101.github.io/mathquizzy7/';
        
        nextLevelLink.href = link;
        nextLevelLink.textContent = link;
        nextLevelContainer.classList.remove('hide');
        
        // Add celebration animation
        nextLevelContainer.classList.add('celebration');
        setTimeout(() => {
            nextLevelContainer.classList.remove('celebration');
        }, 1000);
    }
}

function getPerformanceRating(percentage) {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Keep Practicing! 📚";
    return "Need More Practice 💪";
}

function copyLink() {
    const link = document.getElementById('next-level-link').href;
    navigator.clipboard.writeText(link).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
            copyBtn.style.backgroundColor = '#2ecc71';
        }, 2000);
    });
}
