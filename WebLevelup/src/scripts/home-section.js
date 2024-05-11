const startBtn = document.querySelector('.take-quiz-btn');
const popupInfo = document.querySelector('.popup-info');
const popupLogin = document.querySelector('.popup-login');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
// const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const optionList = document.querySelector('.option-list');
const authorizeButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
