function displayQuestion(card) {
    const { category, question, difficulty, correct_answer } = card
    const main = document.querySelector("main");
  
    const article = document.createElement('article')
    article.classList.add('card')
    article.classList.add(`difficulty-${difficulty}`)
    
    article.innerHTML = `
    <h2>${category}</h2>
    <p>Difficulty: ${difficulty}</p>
    <p>${question}</p>
    <button>Show Answer</button>
    <p class="hidden">${correct_answer}</p>`

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

    const selectedCategory = '&category=' + event.target.categories.value

    fetch(`https://opentdb.com/api.php?amount=10${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((question) => {
          displayQuestion(question);
        });
        form.reset();
      })
      .catch((error) => console.log(error));
});


