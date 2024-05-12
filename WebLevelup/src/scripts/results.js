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



