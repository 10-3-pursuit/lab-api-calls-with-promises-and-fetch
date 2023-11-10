const main = document.querySelector(".centered");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((data) => data.results.forEach((e) => createCard(e)))

})


function createCard(triviaQuestion){
    
    const { category, question, correct_answer } = triviaQuestion;
    
    const article = document.createElement("article");
    article.classList.add("card");
    
    article.innerHTML = `
    <h2>${category}</h2>
    <p>${question}</p>
    <button>Show Answer</button>
    <p class="hidden">${correct_answer}</p>
    `;
    
    main.append(article);
}
