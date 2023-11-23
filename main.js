// TEMPLATE
/**
 <article class="card">
  <h2>CATEGORY</h2>
  <p>QUESTION</p>
  <button>Show Answer</button>
  <p class="hidden">CORRECT ANSWER</p>
</article>
 */

// event listener must go inside of the function?
// Function to display a card containing information from a book object
function displayError() {
  const main = document.querySelector("main");
  main.style.display = "block";
  main.innerHTML = `<p>Nah bruh something went wrong here!</p>
  <p class="error">${error}</p>
  `;
}
function displayCard(book) {
  const { category, question, correct_answer } = book;

  const main = document.querySelector("main");

  // Create a new article element for the card
  const card = document.createElement("article");
  card.classList.add("card");

  // Add HTML content for the card
  card.innerHTML = `
    <h2>${category}</h2>
    <p>${question}</p>
    <button class="show-answer">Show Answer</button>
    <p class="hidden">${correct_answer}</p>
  `;

  // Find button and hidden answer paragraph within the card
  const button = card.querySelector(".show-answer");
  const showAnswer = card.querySelector(".hidden");

  // Add click event listener to the button inside this specific card
  button.addEventListener("click", () => {
    showAnswer.classList.toggle("hidden");
  });

  // Append the card to the main container
  main.appendChild(card);
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch(
    "https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((book) => displayCard(book));
    })
    .catch((error) => {
      return displayError(error);
      // console.log(`Error fetching data`, error);
    });
});
