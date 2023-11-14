function getTrivia() {
    const category = document.getElementById('category').value;
    const url = `https://opentdb.com/api.php?amount=10&category=${category}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          return new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => displayTrivia(data.results))
      .catch(error => console.error('Error:', error));
  }

  function displayTrivia(results) {
    const triviaContainer = document.getElementById('triviaContainer');
    triviaContainer.innerHTML = '';

    results.forEach((question) => {
      const difficultyClass = question.difficulty.toLowerCase();
      const card = document.createElement('article');
      card.classList.add('card', difficultyClass);

      const categoryElement = document.createElement('h2');
      categoryElement.textContent = question.category;
      card.appendChild(categoryElement);

      const difficultyElement = document.createElement('p');
      difficultyElement.textContent = `Difficulty: ${question.difficulty}`;
      card.appendChild(difficultyElement);

      const questionElement = document.createElement('p');
      questionElement.textContent = question.question;
      card.appendChild(questionElement);

      const answersList = document.createElement('ul');
      question.answers = shuffle([...question.incorrect_answers, question.correct_answer]);

      question.answers.forEach((answer) => {
        const answerItem = document.createElement('li');
        const answerRadio = document.createElement('input');
        answerRadio.type = 'radio';
        answerRadio.name = 'question_' + question.question; 
        answerRadio.value = answer;
        answerItem.appendChild(answerRadio);
        const answerText = document.createTextNode(answer);
        answerItem.appendChild(answerText);
        answersList.appendChild(answerItem);
      });

      card.appendChild(answersList);

      const button = document.createElement('button');
      button.textContent = 'Show Answer';
      button.addEventListener('click', function () {
        const selectedRadio = document.querySelector('input[name="question_' + question.question + '"]:checked');
        if (selectedRadio) {
          answersList.childNodes.forEach((answerItem) => {
            answerItem.classList.remove('correct');
            if (answerItem.innerText === question.correct_answer) {
              answerItem.classList.add('correct');
            }
          });
        }
      });
      card.appendChild(button);

      triviaContainer.appendChild(card);
    });
  }

  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }