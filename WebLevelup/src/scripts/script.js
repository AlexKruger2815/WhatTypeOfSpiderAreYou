const startBtn = document.querySelector('.take-quiz-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');



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
    if (questionCount < questions.length) {

        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionNumberCounter(questionNumber);

        nextBtn.classList.remove('active');
    }
    else {

    }
}



function showQuestions(index) {

    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index+1}. ${questions[index].question}`;
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div> <div class="option"><span>${questions[index].options[1]}</span></div> <div class="option"><span>${questions[index].options[2]}</span></div> <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    // Logic for spider type here
    // (maybe assign possible score related to spider)
    let userAnswer = answer.textContent;
    let allOptions = optionList.children.length;

    answer.classList.add('selected')
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}
function questionNumberCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}