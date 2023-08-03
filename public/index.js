const questionsContainer = document.getElementById('questions-container');
const checkButton = document.getElementById('check-button');
const resultDiv = document.getElementById('result');

async function fetchQuestions() {
  const response = await fetch('/api/questions');
  const questions = await response.json();
  return questions;
}

async function checkAnswers(answers) {
  const response = await fetch('/api/check-answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });
  const result = await response.json();
  return result;
}

function renderQuestions(questions) {
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
      <p>Питання ${index + 1}: ${question.caption}</p>
      <label><input type="radio" name="q${index}" value="true"> Так</label>
      <label><input type="radio" name="q${index}" value="false"> Ні</label>
    `;
    questionsContainer.appendChild(questionDiv);
  });

  checkButton.addEventListener('click', async () => {
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
      const radioButton = document.querySelector(`input[name=q${i}]:checked`);
      if (radioButton) {
        answers.push(radioButton.value === 'true');
      } else {
        answers.push(false);
      }
    }

    const result = await checkAnswers(answers);

    resultDiv.textContent = `Ваш результат: ${result.correctCount} з ${result.totalQuestions}`;
  });

  checkButton.removeAttribute('disabled');
}

(async () => {
  const questions = await fetchQuestions();
  renderQuestions(questions);
})();
