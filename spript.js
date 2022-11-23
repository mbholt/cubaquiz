// question array
const quizData = [
    {
        question: 'Cuba Gooding Jr was born on ______ in the Bronx, New York City, New York, USA.',
        a: 'January 1, 1968',
        b: 'January 2, 1968',
        c: 'January 3, 1968',
        d: 'January 4, 1968',
        correct: 'b'
    },
    {
        question: 'Cuba Gooding Jr’s dad, Cuba Gooding, was a lead vocalist for R&B group The Main Ingredient, who recorded the song ______.',
        a: 'Everybody Plays the Trumpet',
        b: 'Everybody Plays the Clarinet',
        c: 'Everybody Plays the Fool',
        d: 'Everybody Plays the Saxophone',
        correct: 'c'
    },
    {
        question: 'Cuba Gooding Jr’s family moved to LA in 1972 but Cuba Gooding Jr’s dad soon left and Cuba Gooding Jr was raised by a ______, who encouraged Cuba Gooding Jr to maintain Cuba Gooding Jr’s positive outlook on life.',
        a: 'Single Mom',
        b: 'Double Mom',
        c: 'Triple Mom',
        d: 'Quadruple Mom',
        correct: 'a'
    },
    {
        question: 'Cuba Gooding Jr ended up attending four different high schools because of frequent moves but was popular at all of them and was even elected to be the class president at ______ of them.',
        a: 'Zero',
        b: 'One',
        c: 'Two',
        d: 'Three',
        correct: 'd'
    },
    {
        question: 'While Cuba Gooding Jr was in high school, Cuba Gooding Jr fell in love with ______, whom Cuba Gooding Jr married in March of 1994.',
        a: 'Kara Sapfer',
        b: 'Rafer Sakap',
        c: 'Ferkap Rasa',
        d: 'Sara Kapfer',
        correct: 'd'
    },
    {
        question: 'Before Cuba Gooding Jr turned Cuba Gooding Jr’s focus towards acting, Cuba Gooding Jr studied ______ for three years after graduating from high school.',
        a: 'Japanese Martial Arts',
        b: 'Astrophysics',
        c: 'Cuba Gooding Jr',
        d: 'Dentistry',
        correct: 'a'
    },
    {
        question: 'As soon as Cuba Gooding Jr started thinking about acting, Cuba Gooding Jr was able to land guest roles in popular series like ______ and “MacGyver.',
        a: 'Hill Street Reds',
        b: 'Hill Street Pinks',
        c: 'Hill Street Blues',
        d: 'Hill Street Greens',
        correct: 'c'
    },
    {
        question: 'Cuba Gooding Jr’s first major role was in “Boyz in the Hood” in ______.',
        a: '2022',
        b: '1990',
        c: '1991',
        d: '1066',
        correct: 'c'
    },
    {
        question: 'Cuba Gooding Jr won the Academy Award for Cuba Gooding Jr’s portrayal of Rod Tidwell in the movie “Jerry Maguire,” produced by ______.',
        a: 'Cameron Crowe',
        b: 'Cameron Raven',
        c: 'Cameron Owl',
        d: 'Cameron Pelican',
        correct: 'a'
    },
    {
        question: 'Cuba Gooding Jr was a back up dancer for Paula Abdul for a while. Cuba Gooding Jr also performed in the closing ceremony of the 1984 Summer Olympics along with ______.',
        a: 'Edgar Allan Poe',
        b: 'Lionel Richie',
        c: 'Elvis Presley',
        d: 'George H.W. Bush',
        correct: 'b'
    },
];

// dom
const quiz = document.getElementById('quiz');
const landingEl = document.getElementById('landing');
const nameInputEl = document.getElementById('playername');
const answersEl = document.querySelector('.answer-container');
const answerBtns = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const gameOverEl = document.getElementById('game-over');
const highScoresEl = document.getElementById('high-scores');
const scoreChartEl = document.getElementById('scores-chart');
const noScoresEl = document.getElementById('no-scores');
const a_text = document.getElementById('a');
const b_text = document.getElementById('b');
const c_text = document.getElementById('c');
const d_text = document.getElementById('d');
const timerEl = document.getElementById('timer');
const message = document.getElementById('message');
const yourScore = document.getElementById('your-score');
const startBtn = document.getElementById('start');
const saveScoreBtn = document.getElementById('save-score');
const viewScoresBtn = document.getElementById('view-scores');
const clearScoresBtn = document.getElementById('clear-scores');

// animated background width
const wrap = document.querySelector('.wrap');
wrap.style.width = document.body.innerWidth;

// correct and incorrect responses
const correctAnswer = '<p>You answered correctly!</p>';
const incorrectAnswer = '<p>You answered <em>in</em>correctly!</p>';

// global variables
let questionNumber;
let score;
let time;
let playerName;
let highScores = JSON.parse(localStorage.getItem('highScore')) || [];

// start the quiz!
function startQuiz() {
    countdown();
    loadQuestion();
}

// display current question and answer choices
function loadQuestion() {
    const questionDisplay = quizData[questionNumber];
    questionEl.innerText = questionDisplay.question; 
    a_text.innerText = questionDisplay.a;
    b_text.innerText = questionDisplay.b;
    c_text.innerText = questionDisplay.c;
    d_text.innerText = questionDisplay.d;
}

// check if chosen answer is correct, iterate score and question number
function checkAnswer(answerChoice) {
    if (quizData[questionNumber].correct === answerChoice) {
        score++;
        displayMessage(correctAnswer);
    } else {
        displayMessage(incorrectAnswer);
    }

    questionNumber++;

    if (questionNumber < quizData.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// display message (answer correct or incorrect)
function displayMessage(correctOrNot) {
    message.innerHTML = correctOrNot;
    message.classList.remove('fade');
    clearMessage();
}

// message fades after two seconds
function clearMessage() {
    setTimeout(() => {
        message.classList.add('fade');
    }, 2000);
}

// timer countdown
function countdown() {
    timerEl.classList.remove('invisible');
    var interval = setInterval(function() {
        time--;
        timerEl.textContent = time;

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// saves your score to local storage
function saveScore() {
    localStorage.setItem('highScore', JSON.stringify(highScores));
    displayScores();
}

// renders high score list from local storage
function displayScores() {
    noScoresEl.classList.add('invisible');
    gameOverEl.classList.add('invisible');
    highScoresEl.classList.remove('invisible');
    
    var savedScores = localStorage.getItem('highScore');
    if (savedScores === null) {
        noScoresEl.classList.remove('invisible');

        return false;
    } else {
        savedScores = JSON.parse(savedScores).sort((a, b) => b.score - a.score);

        for (var i = 0; i < 5; i++) {
            const nameEl = document.createElement('h4');
            nameEl.textContent = 'Name: ' + savedScores[i].name;

            const scoreEl = document.createElement('h4');
            scoreEl.textContent = 'Score: ' + savedScores[i].score;
            scoreEl.style.borderBottom = "2px solid red";
            
            scoreChartEl.appendChild(nameEl);
            scoreChartEl.appendChild(scoreEl);
        }
        highScoresEl.insertBefore(scoreChartEl, clearScoresBtn);
    }   
}

// clears scores from local storage
function clearScores() {
    highScores = [];
    localStorage.setItem('highScore', JSON.stringify(highScores));
    displayScores();
}

function endGame() {
    timerEl.classList.add('invisible');
    quiz.classList.add('invisible');
    gameOverEl.classList.remove('invisible');

    cubaAnimation();

    if (time <= 0) {
        const timeUp = document.createElement('h2');
        timeUp.textContent = 'You ran out of time!';
        gameOverEl.insertBefore(timeUp, yourScore);
    }
    
    yourScore.textContent = `You have finished the quiz. Your score: ${score}/${quizData.length}`;
};

// bouncing Cuba
function cubaAnimation() {
    let speed = 60;
    let scale = 0.16;
    let canvas;
    let ctx;

    let cubaImg = {
        x: 800,
        y: 250,
        zindez: -1,
        xspeed: 10,
        yspeed: 10,
        img: new Image()
    };

    (function main() {
        canvas = document.getElementById('cuba-canvas');
        canvas.classList.remove('invisible');
        ctx = canvas.getContext('2d');
        cubaImg.img.src = 'cubalarger.png';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        update();
    })();

    function update() {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(cubaImg.img, cubaImg.x, cubaImg.y, cubaImg.img.width*scale, cubaImg.img.height*scale);
            cubaImg.x += cubaImg.xspeed;
            cubaImg.y += cubaImg.yspeed;

            checkHitBox();
            update();      
        }, speed)
    }

    function checkHitBox() {
        if (cubaImg.x + cubaImg.img.width*scale >= canvas.width || cubaImg.x <= 0) {
            cubaImg.xspeed *= -1;
        }

        if (cubaImg.y + cubaImg.img.height*scale >= canvas.height || cubaImg.y <= 0) {
            cubaImg.yspeed *= -1;
        }
    }
}

// save your score button event listener
saveScoreBtn.addEventListener('click', function() {
    playerName = nameInputEl.value.trim();
    if (!playerName) {
        const alertEl = document.createElement('h4');
        alertEl.style.color = '#FF0000';
        alertEl.style.fontStyle = 'italic';
        alertEl.textContent = 'Please enter your name to save your score!';
        const gameOverBtns = document.getElementById('game-over-btns');
        gameOverEl.insertBefore(alertEl, gameOverBtns);

    } else {
        let scoreObj = {
            name: playerName,
            score: score
        }
        highScores.push(scoreObj);
        console.log(highScores);
        saveScore();
    }
});

// answer choice event listener
answersEl.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        checkAnswer(e.target.id);
        loadQuestion();
    }
});

// display high scores button event listener
viewScoresBtn.addEventListener('click', function() {
    gameOverEl.classList.add('invisible');
    highScoresEl.classList.remove('invisible');
    displayScores();
});

// clear high scores button event listener
clearScoresBtn.addEventListener('click', clearScores);

// begin quiz button event listener
startBtn.addEventListener('click', function() {
    landingEl.classList.add('invisible');
    quiz.classList.remove('invisible');

    audio.play();
    
    time = 120;
    score = 0;
    questionNumber = 0;
    playerName = false;
    startQuiz();
});