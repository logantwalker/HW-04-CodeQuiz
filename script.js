// getting all my elements together
const container = document.querySelector('.container');
const homePage = document.querySelector('#home-block');
const quizPage = document.querySelector('#q-block');
const startBtn = document.querySelector('#start');
const currentQ = document.querySelector('.question');
const currentC = document.querySelector('.choices');
const contBtn = document.querySelector('#continue');
const score = document.querySelector('#userPts');
const ansAlert = document.querySelector('#alert');
const alertMsg = document.querySelector('#alert-message');
const userPage = document.querySelector('#enterUser');
const scoreDisp = document.querySelector('#finalScore');
const userSubmitBtn = document.querySelector('#userSubmit');
const userForm = document.querySelector('#initials');

// initializing var for later
let userPts = 0;
let penalty = false;
let index = 0;
let timeTotal = 120 * 1000;
let breakTime = 0;
let order = [0, 1, 2, 3];
let userData = [];
let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
console.log(leaderboard);
// initializing the page
init();
localStorage.clear();
function init() {

    index = 0;
    userPts = 0;
    homePage.setAttribute('style', 'display: flex');
    quizPage.setAttribute('style', 'display: none');
    minutesDisplay.textContent = '2';
    secondsDisplay.textContent = '00';

    if(!localStorage.getItem('leaderboard')){
        console.log('empty storage');
        leaderboard = {};
    }
    else{
        userData = leaderboard.scores;
    }
}
// start button functionality
startBtn.onclick = () => {
    breakTime = 0;
    homePage.setAttribute('style', 'display: none');
    quizPage.setAttribute('style', 'display: flex');
    container.setAttribute('style', 'padding-left: 10%');
    order = qOrder();
    timeManager();
    qLoad();
}
// continue button functionality
contBtn.onclick = () => {
    index++;
    $('.choices').empty();
    if (index > order.length - 1) {
        breakTime++;
    }
    qLoad();
}
//timer functionality
function timeManager() {
    let currentTime = new Date().getTime();
    let endTime = currentTime + timeTotal;
    let secondsInterval = setInterval(function () {

        let now = new Date().getTime();
        let timeRemain = endTime - now;

        let minutes = Math.floor((timeRemain % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeRemain % (1000 * 60)) / 1000);

        if (seconds < 10) {
            minutesDisplay.innerHTML = minutes;
            secondsDisplay.innerHTML = "0" + seconds;
        }
        else {
            minutesDisplay.innerHTML = minutes;
            secondsDisplay.innerHTML = seconds;
        }

        if (timeRemain < 0) {
            clearInterval(secondsInterval);
            loadUserPage();
        }
        if (breakTime > 0) {
            clearInterval(secondsInterval);
            loadUserPage();
        }

        //applies time penalty for incorrect answers
        if (penalty) {
            endTime = endTime - 25 * 1000;
            penalty = false;
        }
    }, 100);
};

// randomizing the question order before redering them to the question-block
function qOrder() {
    let order = [0, 1, 2, 3];
    // starting at the last index of the order array, we randomly switch the index value with one that occurs before it
    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = order[i];
        order[i] = order[j];
        order[j] = t;
    }
    return order;
}
// rendering the current question
function qLoad() {
    if (order[index] === 0) {
        currentQ.textContent = Q.q1;
        let choices = Q.choice1;
        for (let i = 0; i < choices.length; i++) {
            let li = document.createElement("li");
            li.setAttribute('id', i);
            li.setAttribute('class', 'choice-item');
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if (order[index] === 1) {
        currentQ.textContent = Q.q2;
        let choices = Q.choice2;
        for (let i = 0; i < choices.length; i++) {
            let li = document.createElement("li");
            li.setAttribute('id', i);
            li.setAttribute('class', 'choice-item');
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if (order[index] === 2) {
        currentQ.textContent = Q.q3;
        let choices = Q.choice3;
        for (let i = 0; i < choices.length; i++) {
            let li = document.createElement("li");
            li.setAttribute('id', i);
            li.setAttribute('class', 'choice-item');
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if (order[index] === 3) {
        currentQ.textContent = Q.q4;
        let choices = Q.choice4;
        for (let i = 0; i < choices.length; i++) {
            let li = document.createElement("li");
            li.setAttribute('class', 'choice-item');
            li.setAttribute('id', i);
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
}

function answerCheck(event) {
    if (event.target.tagName === 'LI') {
        let user = event.target.id;
        if (order[index] === 0) {
            let ans = Q.ans1;
            if (user === ans) {
                let j = parseInt(user);
                currentC.children[j].setAttribute('style', 'background-color: #008000');
                //updating user points
                userPts += 50;
                score.textContent = userPts;

                alertMsg.textContent = 'Correct!';
                Alerter();
            }
            else {
                let j = parseInt(user);
                let k = parseInt(ans);
                currentC.children[j].setAttribute('style', 'background-color: #ff0000');
                currentC.children[k].setAttribute('style', 'background-color: #008000');

                penalty = true;

                alertMsg.textContent = 'Wrong!';
                Alerter();
            }
        }
        else if (order[index] === 1) {
            let ans = Q.ans2;
            if (user === ans) {
                let j = parseInt(user);
                currentC.children[j].setAttribute('style', 'background-color: #008000');
                //updating user points
                userPts += 50;
                score.textContent = userPts;

                alertMsg.textContent = 'Correct!';
                Alerter();
            }
            else {
                let j = parseInt(user);
                let k = parseInt(ans);
                currentC.children[j].setAttribute('style', 'background-color: #ff0000');
                currentC.children[k].setAttribute('style', 'background-color: #008000');

                penalty = true;

                alertMsg.textContent = 'Wrong!';
                Alerter();
            }
        }
        else if (order[index] === 2) {
            let ans = Q.ans3;
            if (user === ans) {
                let j = parseInt(user);
                currentC.children[j].setAttribute('style', 'background-color: #008000');
                //updating user points
                userPts += 50;
                score.textContent = userPts;

                alertMsg.textContent = 'Correct!';
                Alerter();
            }
            else {
                let j = parseInt(user);
                let k = parseInt(ans);
                currentC.children[j].setAttribute('style', 'background-color: #ff0000');
                currentC.children[k].setAttribute('style', 'background-color: #008000');

                penalty = true;

                alertMsg.textContent = 'Wrong!';
                Alerter();
            }
        }
        else if (order[index] === 3) {
            let ans = Q.ans4;
            if (user === ans) {
                let j = parseInt(user);
                currentC.children[j].setAttribute('style', 'background-color: #008000');
                //updating user points
                userPts += 50;
                score.textContent = userPts;

                alertMsg.textContent = 'Correct!';
                Alerter();
            }
            else {
                let j = parseInt(user);
                let k = parseInt(ans);
                currentC.children[j].setAttribute('style', 'background-color: #ff0000');
                currentC.children[k].setAttribute('style', 'background-color: #008000');

                penalty = true;

                alertMsg.textContent = 'Wrong!';
                Alerter();
            }
        }
    }
    else {
        return;
    }
}
// activates/deactivates the answer alert message
function Alerter() {
    let alertHelp = 0;
    ansAlert.setAttribute('style', 'display: flex');
    let alertInterval = setInterval(function () {
        alertHelp++;
        if (alertHelp > 1) {
            clearInterval(alertInterval)
            ansAlert.setAttribute('style', 'display: none');
        }
    }, 1000);

}
currentC.addEventListener('click', answerCheck);

function loadUserPage() {
    scoreDisp.textContent = ' ' + userPts + '!';
    quizPage.setAttribute('style', 'display: none');
    userPage.setAttribute('style', 'display: flex');
}

function captureUser() {
    let newData = [userForm.value, userPts, `${minutesDisplay.innerHTML}:${secondsDisplay.innerHTML}`];
    userData.push(newData);
    leaderboard.scores = userData;
    localStorage.setItem('leaderboard',JSON.stringify(leaderboard));
}
userSubmitBtn.onclick = function () {
    captureUser();
}

function loadScores() {

}

// question object
const Q = {
    q1: 'What is the general purpose of a loop?',

    choice1: [
        'Loops read and recreate code automatically',
        'Loops iterate through arrays to find elements',
        'Loops automatically iterate a block of code based on conditions',
        'All loops help the computer make decisions automatically'
    ],
    ans1: '2',

    q2: 'Which of the following statements is correct?',
    choice2: [
        'Objects only store strings',
        'Objects store data in numbered positions',
        "Objects can't store other objects",
        'Objects store unordered data of any type as key-value pairs'
    ],
    ans2: '3',

    q3: 'Which of the methods below does NOT change the array it is called on?',
    choice3: [
        '.slice()',
        '.push()',
        '.pop()',
        '.shift()'
    ],
    ans3: '0',

    q4: 'Which of the following methods returns a new array?',
    choice4: [
        '.some()',
        '.every()',
        '.forEach()',
        '.filter()'
    ],
    ans4: '3',

};