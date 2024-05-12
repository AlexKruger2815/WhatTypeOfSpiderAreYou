let spiderIds = [];
let questionCount = 0;
let questionNumber = 1;

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumber++;
        questionNumberCounter(questionNumber);
        nextBtn.classList.remove('active');
    }
    else {
        resultBox.style.display = 'flex';
        showResultBox();
    }
}

function showQuestions(index) {
    header.style.display = 'none';
    resultBox.style.display = 'none';
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${index + 1}. ${questions[index].question}`;

    const optionList = document.querySelector('.option-list');
    Array.from(optionList.children).forEach(child => {
        optionList.removeChild(child);
    });

    questions[index].options.forEach(option => {
        const optionDiv = document.createElement('section');
        const optionSpan = document.createElement('span');

        optionDiv.classList.add('option');
        optionDiv.setAttribute('data-spider-id', option.spiderID);
        optionSpan.textContent = option.option;
        optionDiv.appendChild(optionSpan);
        optionList.appendChild(optionDiv);
    });

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('click', function () {
            optionSelected(this);
        });
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
    nextBtn.classList.add('active');

    const spiderID = questions[questionCount].options.find(option => option.option === userAnswer).spiderID;

    spiderIds.push(spiderID);
}

function questionNumberCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}
function resetResultBox() {
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
    
    fetch(`/spiders/${modeSpider}`)
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