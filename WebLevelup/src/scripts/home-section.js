startBtn.onclick = () => {
    instructions.style.visibility = 'visible';
    main.classList.add('blur');
}

exitBtn.onclick = () => {
    instructions.style.visibility = 'hidden';
    main.classList.remove('blur');
}

continueBtn.onclick = () => {
    if (questions.length !== 0 ) {
        instructions.style.visibility = 'hidden';
        quiz.style.visibility = 'visible';
        showQuestions(0);
        questionNumberCounter(1);
    }
}