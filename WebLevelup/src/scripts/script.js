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

let spiderIds = [];

document.addEventListener("DOMContentLoaded", authorizeUser);

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionNumberCounter(1);
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
}

function optionSelected(answer) {
    // Logic for spider type here
    // (maybe assign possible score related to spider)
    
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

    const spiderIdsSum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const averageSpider=Math.floor(spiderIdsSum/questions.length);
    spiderIds=[];
    fetch(`http://localhost:3000/api/spiders/${averageSpider}`)
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
        if (!data.isLoggedIn) {
            popupLogin.classList.add('logged-in');
            main.classList.add('active');
        } 
    })
    .catch((error) => {
        console.log('poop');
        console.log(error);
      });
}

function authorizeClicked() {
    window.location.href = '/auth/github';
    popupLogin.classList.remove('logged-in');
    main.classList.remove('active');
}