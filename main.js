function displayError(error) {
    const section = document.querySelector("section.error");
    section.style.display = "block";
  
    section.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">${error}</p>
    `;
  }

function displayCard(trivia) {
    const { question, correct_answer } = trivia;
    const eachQuestion = `${question} ${correct_answer}`;
    const cardClass = document.querySelector(".card");
  
    cardClass.innerHTML += `<section class="card">
    <h2>${eachQuestion}</h2>
    <p>${trivia}</p>
    </section>`;
  }
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const numUser = event.target.quantity.value;
    console.log(numUser)
} )

  fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=boolean")
  .then((response) => response.json())
  .then((data) => data.results.forEach((user) => displayCard(user)))
  .catch((error) => displayError(error));