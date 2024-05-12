tryAgainBtn.onclick = () => {
    nextBtn.classList.remove('active');
    quiz.style.visibility = 'visible';
    results.style.visibility = 'hidden';
    questionCount = 0;
    questionNumber = 1;
    showQuestions(questionCount);
    questionNumberCounter(questionNumber);
}

goHomeBtn.onclick = () => {
    nextBtn.classList.remove('active');
    main.classList.remove('blur');
    results.style.visibility = 'hidden';
}