// Fetch trivia questions from Open Trivia Database API with the specified options
fetch("https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple")
  // Parse the response as JSON
  .then((response) => response.json())
  // Process the data and display each question in a card format
  .then((data) => {
    data.results.forEach((question) => {
      displayCard(question); // Call displayCard function for each question
    });
  })
  // Catch and handle any errors that occur during the fetch process
  .catch((error) => {
    displayError(error); // Call displayError function if an error occurs
  });

// Select the form element from the DOM
const form = document.querySelector("form");
// Add a click event listener to the form
form.addEventListener("click", (event) => {
   event.preventDefault(); // Prevent the default form submit action
   console.log("it works!"); // Log a confirmation message
});

// Define a function to display each trivia question in a card format
function displayCard(question) {
  // Extract the category, question, and correct answer from the question object
  const category = question.category;
  const triviaQuestion = question.question;
  const correctAnswer = question.correct_answer;

  // Select the main element with class 'centered' from the DOM
  const main = document.querySelector("main.centered");

  // Create a new article element to serve as the card
  const card = document.createElement("article");
  card.classList.add("card"); // Add 'card' class to the new article element
  // Set the inner HTML of the card with question details and a button to show the answer
  card.innerHTML += `
    <h2>${category}</h2>
    <p>${triviaQuestion}</p>
    <button>Show Answer</button>
    <p class="hidden">${correctAnswer}</p>
  `;

  // Select the show answer button and the paragraph element for the answer text
  const showAnswerButton = card.querySelector("button");
  const answerText = card.querySelector(".hidden");

  // Add a click event listener to the show answer button
  showAnswerButton.addEventListener("click", () => {
    answerText.classList.toggle("hidden"); // Toggle visibility of the answer
  });
  main.appendChild(card); // Append the card element to the main container
}

// Define a function to display an error message
function displayError(error) {
  const main = document.querySelector("main"); // Select the main element from the DOM
  main.style.display = "block"; // Set the display style of the main element to 'block'
  // Set the inner HTML of the main element to display the error message
  main.innerHTML = `
  <p>Something went wrong!</p>
  <p class="error-message">${error}</p>`
}