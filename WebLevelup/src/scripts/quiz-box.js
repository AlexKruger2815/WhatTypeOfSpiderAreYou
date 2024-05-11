const nextBtnQuiz = document.querySelector('.next-btn');
const header2 = document.querySelector('.header');
const prevBtnQuiz = document.querySelector('.prev-btn');

let spiderIds = [];
let questionCount = 0;
let questionNumber = 1;

prevBtnQuiz.style.display = 'none';

prevBtnQuiz.onclick = () => {
    if (questionCount > 0) {
        questionCount--;
        showQuestions(questionCount);
        
        questionNumber--;
        questionNumberCounter(questionNumber);

        nextBtnQuiz.classList.remove('active');

        nextBtnQuiz.style.display = 'block';
    }
        
    if (questionCount == 0 ){
        prevBtnQuiz.style.display = 'none';
    }
}


nextBtnQuiz.onclick = () => {

    if (questionCount < questions.length-1) {

        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionNumberCounter(questionNumber);

        nextBtnQuiz.classList.remove('active');
    }

    if (questionCount > 0 ){
        prevBtnQuiz.style.display = 'block';
    }

    if (questionCount == questions.length-1){
        prevBtnQuiz.style.display = 'none';
        resultBox.style.display = 'flex';
        showResultBox();
    }
}


function showQuestions(index) {
    header2.style.display = 'none';
    resultBox.style.display = 'none';
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index+1}. ${questions[index].question}`;
    let optionTag = '';

    questions[index].options.forEach(option => {
        optionTag += `<div class="option" data-spider-id="${option.spiderID}"><span>${option.option}</span></div>`;
    });
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
    resetResultBox();
}

function optionSelected(answer) {

    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.classList.remove('selected');
    });
    let userAnswer = answer.textContent;
    answer.classList.add('selected')
    nextBtnQuiz.classList.add('active');

    const spiderID = questions[questionCount].options.find(option => option.option === userAnswer).spiderID;

    spiderIds.push(spiderID);
}

function questionNumberCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}
function resetResultBox(){
    const spiderImage = resultBox.querySelector('.spider-image');
    const randomSource = "weaving-spider.gif";
    spiderImage.src = randomSource;
    spiderImage.alt = "spider gif";
    var resultText = document.querySelector('.result-text');
    resultText.textContent = "🕷️ Loading...";
    var spiderDescription = document.querySelector('.spider-description');
    spiderDescription.textContent = "";
}

function showResultBox() {
    quizBox.style.display = 'none';
    const numbers = spiderIds.map(Number);
    const modeSpider = numbers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        if (acc[curr] > acc.modeCount) {
            acc.mode = curr;
            acc.modeCount = acc[curr];
        }
        return acc;
    }, { mode: null, modeCount: -1 }).mode;

    spiderIds=[];
    
    fetch(`http://ec2-52-17-61-207.eu-west-1.compute.amazonaws.com:3000/api/spiders/${modeSpider}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(spiderData => {
                const name = spiderData.Name;
                const description = spiderData.Description;
                const imageLink = spiderData.ImageLink;

                const resultBox = document.querySelector('.result-box');
                const spiderImage = resultBox.querySelector('.spider-image');
                const resultText = resultBox.querySelector('.result-text');
                const spiderDescription = resultBox.querySelector('.spider-description');

                spiderImage.src = imageLink;
                spiderImage.alt = name;
                resultText.textContent = `Your Spider Type: ${name}`;
                spiderDescription.textContent = description;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    resultBox.classList.add('active');

}