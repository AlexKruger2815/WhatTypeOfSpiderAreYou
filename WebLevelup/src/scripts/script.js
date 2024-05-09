const startBtn = document.querySelector('.take-quiz-btn');
const popupInfo = document.querySelector('.popup-info');
const popupLogin = document.querySelector('.popup-login');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.retake-btn');
const goHomeBtn = document.querySelector('.go-home-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const authorizeButton = document.getElementById("loginButton");

const imageSources = [
    "walking-spider.gif",
    "weaving-spider.gif",
    "dancing-spider.gif",
    "dropping-spider.gif",
    "knitting-spider.gif",
];
let spiderIds = [];

document.addEventListener("DOMContentLoaded", authorizeUser);
window.addEventListener("popstate", authorizeUser);

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    if(questions.length !== 0 ){
        quizSection.classList.add('active');
        popupInfo.classList.remove('active');
        main.classList.remove('active');
        quizBox.classList.add('active'); 
        showQuestions(0);
        questionNumberCounter(1);
    }
}

let questionCount = 0;
let questionNumber = 1;

nextBtn.onclick = () => {
    if (questionCount < questions.length-1) {

        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionNumberCounter(questionNumber);

        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    showQuestions(questionCount);
    questionNumberCounter(questionNumber);
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    showQuestions(questionCount);
    questionNumberCounter(questionNumber);
}

authorizeButton.onfocus = () => {
    window.location.href = '/auth/github';
}

function showQuestions(index) {

    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index+1}. ${questions[index].question}`;
    let optionTag = '';

    questions[index].options.forEach(option => {
        optionTag += `<div class="option" data-spider-id="${option.spiderID}"><span>${option.option}</span></div>`;
    });
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
    resetResultBox();
}

function optionSelected(answer) {

    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.classList.remove('selected');
    });
    let userAnswer = answer.textContent;
    answer.classList.add('selected')
    nextBtn.classList.add('active');

    const spiderID = questions[questionCount].options.find(option => option.option === userAnswer).spiderID;

    spiderIds.push(spiderID);
}

function questionNumberCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}

function showResultBox() {
    quizBox.classList.remove('active');
    
    const numbers = spiderIds.map(Number);
    console.log('spiderIds',spiderIds);
    const modeSpider = numbers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        if (acc[curr] > acc.modeCount) {
            acc.mode = curr;
            acc.modeCount = acc[curr];
        }
        return acc;
    }, { mode: null, modeCount: -1 }).mode;

    spiderIds=[];
    
    console.log('mode',modeSpider);
    fetch(`http://localhost:3000/api/spiders/${modeSpider}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(spiderData => {
                const name = spiderData.Name;
                const description = spiderData.Description;
                const imageLink = spiderData.ImageLink;

                const resultBox = document.querySelector('.result-box');
                const spiderImage = resultBox.querySelector('.spider-image');
                const resultText = resultBox.querySelector('.result-text');
                const spiderDescription = resultBox.querySelector('.spider-description');

                spiderImage.src = imageLink;
                spiderImage.alt = name;
                resultText.textContent = `Your Spider Type: ${name}`;
                spiderDescription.textContent = description;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    resultBox.classList.add('active');
}

function authorizeUser() {
    fetch('/check-session')
    .then(response => response.json())
    .then(data => {
        if (data.isLoggedIn) {
            popupLogin.classList.remove('logged-out');
            main.classList.remove('active');
        } else {
            popupLogin.classList.add('logged-out');
    main.classList.add('active');
        }
    })
    .catch((error) => {
        popupLogin.classList.add('logged-out');
        main.classList.add('active');
        console.error(error);
      });
}

function getRandomSource(sources) {
    return sources[Math.floor(Math.random() * sources.length)];
}

function resetResultBox(){
    const spiderImage = resultBox.querySelector('.spider-image');
    const randomSource = getRandomSource(imageSources);
    spiderImage.src = randomSource;
    spiderImage.alt = "spider gif";
    var resultText = document.querySelector('.result-text');
    resultText.textContent = "🕷️ Loading...";
    var spiderDescription = document.querySelector('.spider-description');
    spiderDescription.textContent = "";
}