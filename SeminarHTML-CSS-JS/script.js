const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: 'Who invented Rubik,s cube?',
    answers: {
      a: 'Feliks Zerndegs',
      b: 'Max Park',
      c: 'Erno Rubik',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Who holds the record for fastest Rubik cube solve?',
    answers: {
      a: 'Max Park',
      b: 'Sean Patrick',
      c: 'Yusheng Du',
    },
    correctAnswer: 'c',
  },
  {
    question: 'How many combinations does Rubik cube have?',
    answers: {
      a: '15000',
      b: '1000000',
      c: '3000000',
      d: '43000000000000000000',
    },
    correctAnswer: 'd',
  },
];

const buildQuiz = () => {
  const output = [];

  myQuestions.map((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
      );
    }

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
};

const showResults = () => {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  let correctAnswers = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      answerContainer.querySelectorAll('label').forEach((label) => {
        if (label.innerText.charAt(1) === currentQuestion.correctAnswer) {
          label.style.color = 'green';

        }
      });
      correctAnswers++;
    } else {
      answerContainer.querySelectorAll('label').forEach((label) => {
        if (label.innerText.charAt(1) !== currentQuestion.correctAnswer) {
          label.style.color = 'red';
        }
      });
    }
  });

  resultsContainer.innerHTML = `${correctAnswers} out of ${myQuestions.length}`;
};

buildQuiz();

submitButton.addEventListener('click', showResults);