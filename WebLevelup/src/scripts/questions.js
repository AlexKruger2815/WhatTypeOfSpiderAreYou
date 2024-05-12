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
      continueBtn.innerText = "Continue";
      continueBtn.style.pointerEvents = "auto";
      return question;
    });
    questions=formattedQuestions;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
