const continueBtn = document.querySelector('.continue-btn');
let questions = [];

fetch('/form')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const formattedQuestions = data.questions.map(questionData => {
      const question = {
        question: questionData.question,
        options: questionData.options.map(option => ({
          spiderID: option.spiderID,
          option: option.option
        }))
      };
      continueBtn.style.backgroundColor = "black";
      continueBtn.style.color = "white";
      continueBtn.innerText = "Continue";
      return question;
    });
    questions=formattedQuestions;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

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