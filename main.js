fetch("https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((question) => {
      displayCard(question);
    });
  })
  .catch((error) => {
    displayError (error);
  });

  const form = document.querySelector("form");
form.addEventListener("click", (event) => {
   event.preventDefault()
     console.log ("it works!")}
     );

  function displayCard(question) {


    const category = question.category;
    const triviaQuestion = question.question;
    const correctAnswer = question.correct_answer;
  
    const main = document.querySelector("main.centered");
  
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML += `
      <h2>${category}</h2>
      <p>${triviaQuestion}</p>
      <button>Show Answer</button>
      <p class="hidden">${correctAnswer}</p>
    `;
  
    const showAnswerButton = card.querySelector("button");
    const answerText = card.querySelector(".hidden");

    // event listener for show button
    showAnswerButton.addEventListener("click", () => {
      answerText.classList.toggle("hidden"); // toggle is used to toggle the button from hidden content to unhidden content
    });
    main.appendChild(card);
  }

  function displayError (error) {
    const main = document.querySelector("main");
    main.style.display = "block";
    main.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">${error}</p>`
  }