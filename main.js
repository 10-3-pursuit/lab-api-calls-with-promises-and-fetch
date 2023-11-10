function displayQuestion(card) {
    const { category, question, difficulty, correct_answer } = card
    const main = document.querySelector("main");
  
    const article = document.createElement('article')
    article.classList.add('card')
    article.classList.add(`difficulty-${card.difficulty}`)
    
    article.innerHTML = `
    <h2>${card.category}</h2>
    <p>Difficulty: ${card.difficulty}</p>
    <p>${card.question}</p>
    <button>Show Answer</button>
    <p class="hidden">${card.correct_answer}</p>`

    const showAnswerButton = article.querySelector('button');
    showAnswerButton.addEventListener('click', () => {
        const answer = article.querySelector('.hidden')
        answer.classList.remove('hidden')
    });

    main.append(article)
}


const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((question) => {
          displayQuestion(question);
        });
      })
      .catch((error) => console.log(error));
});

