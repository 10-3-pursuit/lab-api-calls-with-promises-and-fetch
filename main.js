function displayError(error) {
  const main = document.querySelector("main");
  main.style.display = "block";
  main.innerHTML = `
  <p>Something went wrong!</p>
  <p class="error-message">${error}</p>
  `
}

function displayCard(triviaQuestion) {
  const {category, difficulty, question, correct_answer} = triviaQuestion
  const main = document.querySelector("main");
  main.innerHTML += 
  `<article class="card ${difficulty}">
  <h2>${category}</h2>
  <h3>Difficulty: ${difficulty}</h3>
  <p>${question}</p>
  <button>Show Answer</button>
  <p class="hidden">${correct_answer}</p>
  </article>`
  const button = main.querySelector('button')
  const answer = main.querySelector('.hidden')
  button.addEventListener('click', ()=>{
    answer.classList.remove('hidden')
  })
}

const form = document.querySelector('form')
form.addEventListener('submit', (event)=>{
  event.preventDefault()
  const selectedCategory = event.target.category.value
  fetch(`https://opentdb.com/api.php?amount=10` + `&category=${selectedCategory}`)
  .then((response) => response.json())
  .then((data) => data.results.forEach((triviaQuestion) => displayCard(triviaQuestion)))
  .catch((error) => displayError(error))
})
