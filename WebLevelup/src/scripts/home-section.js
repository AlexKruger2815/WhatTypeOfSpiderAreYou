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
        quizBox.style.display = "flex";
        quizSection.classList.add('active');
        popupInfo.classList.remove('active');
        main.classList.remove('active');
        quizBox.classList.add('active'); 
        showQuestions(0);
        questionNumberCounter(1);
    }
  }