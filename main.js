const category = document.querySelector("h2");
const question = document.querySelector("p");
const answer = document.querySelector("p.hidden");
const answerButton = document.querySelector("#answer-button");
const form = document.querySelector("form");


answerButton.addEventListener("click", (event) => {
    answer.classList.remove("hidden");
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
})


function displayBox(param){
    category.innerHTML = `${param.category}`;
    question.innerHTML = `${param.question}`;
    answer.textContent = `${param.correct_answer}`;
}

// fetch the api
fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy")

// transform the api request to a json file
.then((response) => response.json())

// 
.then((data) => data.results.forEach((triviaQuestion) => displayBox(triviaQuestion)))

