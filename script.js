// getting all my elements together
const homePage = document.querySelector('#home-block');
const quizPage = document.querySelector('#q-block');
const startBtn = document.querySelector('#start');
const currentQ = document.querySelector('.question');
const currentC = document.querySelector('.choices');

// initializing var for later
index = 0;

// initializing the page
init();
function init() {
    homePage.setAttribute('style', 'display: flex');
    quizPage.setAttribute('style', 'display: none');
}
// start button functionality
startBtn.onclick = () => {
    homePage.setAttribute('style', 'display: none');
    quizPage.setAttribute('style', 'display: flex');
    timeManager();
    qLoad();
}

//timer functionality
function timeManager() {
    let currentTime = new Date().getTime();
    let endTime = 120 * 1000 + currentTime;

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
        }
    }, 100);
};

// randomizing the question order before redering them to the question-block
function qOrder() {
    let order = [0, 1, 2, 3];
    // starting at the last index of the order array, we randomly switch the index value with one that occurs before it
    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        let t = order[i];
        order[i]=order[j];
        order[j]= t;
    }
    return order;
}
// rendering the current question
function qLoad() {
    order = qOrder();

    if(order[index] === 0){
        currentQ.textContent = Q.q1;
        let choices = Q.choice1;
        for(let i=0; i<choices.length; i++){
            let li = document.createElement("li");
            li.setAttribute('id',i);
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if(order[index] === 1){
        currentQ.textContent = Q.q2;
        let choices = Q.choice2;
        for(let i=0; i<choices.length; i++){
            let li = document.createElement("li");
            li.setAttribute('id',i);
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if(order[index] === 2){
        currentQ.textContent = Q.q3;
        let choices = Q.choice3;
        for(let i=0; i<choices.length; i++){
            let li = document.createElement("li");
            li.setAttribute('id',i);
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
    else if(order[index] === 3){
        currentQ.textContent = Q.q4;
        let choices = Q.choice4;
        for(let i=0; i<choices.length; i++){
            let li = document.createElement("li");
            li.setAttribute('id',i);
            li.textContent = choices[i];
            currentC.appendChild(li);
        }
    }
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
    ans1: 2,

    q2: 'Which of the following statements is correct?',
    choice2: [
        'Objects only store strings',
        'Objects store data in numbered positions',
        "Objects can't store other objects",
        'Objects store unordered data of any type as key-value pairs'
    ],
    ans2: 3,

    q3: 'Which of the methods below does NOT change the array it is called on?',
    choice3: [
        '.slice()',
        '.push()',
        '.pop()',
        '.shift()'
    ],
    ans3: 0,

    q4: 'Which of the following methods returns a new array?',
    choice4: [
        '.some()',
        '.every()',
        '.forEach()',
        '.filter()'
    ],
    ans4: 3,

};