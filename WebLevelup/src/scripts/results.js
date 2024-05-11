const header = document.querySelector('.header');
const tryAgainBtn = document.querySelector('.retake-btn');
const goHomeBtn = document.querySelector('.go-home-btn');
const nextBtn = document.querySelector('.next-btn');

tryAgainBtn.onclick = () => {
    quizBox.style.display = "flex";
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
    header.style.display = 'flex';
}



