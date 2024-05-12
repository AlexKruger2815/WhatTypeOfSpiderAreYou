tryAgainBtn.onclick = () => {
    nextBtn.classList.remove('active');
    nextBtn.style.visibility = 'visible';
    quiz.style.visibility = 'visible';
    results.style.visibility = 'hidden';
    questionCount = 0;
    showQuestions(questionCount);
    questionNumberCounter(questionCount+1);
}

goHomeBtn.onclick = () => {
    nextBtn.classList.remove('active');
    main.classList.remove('blur');
    results.style.visibility = 'hidden';
    questionCount = 0;
    showQuestions(questionCount);
    questionNumberCounter(questionCount+1);
}