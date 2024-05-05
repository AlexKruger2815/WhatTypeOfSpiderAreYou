let questions = [];

fetch('http://localhost:3000/api/form')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const formattedQuestions = data.questions.map((questionData, index) => {
      return {
        question: questionData.question,
        options: questionData.options.map(option => option.option),
      };
    });
    questions=formattedQuestions;
    console.log(formattedQuestions);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });