function displayError(error) {
     const section = document.querySelector("section.error");
     section.style.display = "block";
     section.innerHTML = `
     <p>Something went wrong!</p>
     <p class="error-message">${error}</p>
     `;
 }
 
 function displayCard(trivia) {
     const category = trivia.category;
     const question = trivia.question;
     const answer = trivia.correct_answer;
     const triviaClass = document.querySelector("main");
     triviaClass.innerHTML += `<article class="card">
     <h2>${category}</h2>
     <p>${question}</p>
     <button class="show">Show Answer</button>
     <p class="hidden">${answer}</p>
   </article>`;
 
     const answers = document.querySelectorAll(".show");
     answers.forEach((answer) => {
         answer.addEventListener('click', () => {
             answer.closest(".card").lastElementChild.style.display = 'block';
         })
     });
 }
 
 fetch("https://opentdb.com/api.php?amount=10")
     .then((response) => {
         return response.json();
     })
     .then((data) => {
         data.results.forEach((trivia) => displayCard(trivia));
     })
     .catch((error) => displayError(error));