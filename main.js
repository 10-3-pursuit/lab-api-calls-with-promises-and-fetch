// //making call to randomuser api using fetch function
// fetch("https://opentdb.com/api.php?amount=10")
// //If successful, result gets converted to json using '.then'. Return is implicit
//   .then((response) => response.json())
//   //then you loop through the data to manipulate
//   .then((data) => data.results.forEach((user) => displayCard(user)))
//   //use .catch to catch errors and assign to displayError
//   .catch((error) => displayError(error));



function displayCard(info){
let main = document.querySelector("main")
let article = document.createElement("article")

article.classList.add("card")

const {category, question, correct_answer, difficulty} = info

article.innerHTML += `<h2>${category}</h2>
<br>
<h3>Difficulty: ${difficulty}<h3>
<p>${question}</p>
<button>Show Answer</button>
<p class="hidden">${correct_answer}</p>`

article.classList.add(`${difficulty}`)
main.append(article)
}


let button = document.querySelector("button")

button.addEventListener("click", (event) => {
    event.preventDefault()
    
let level = document.getElementById("level")
let selectedLevel = level.options[level.selectedIndex].value

fetch("https://opentdb.com/api.php?amount=10" + `&category=${selectedLevel}`)
  .then((response) => response.json())
  .then((data) => data.results.forEach((trivia) => displayCard(trivia)))
})

const main = document.querySelector("main")
main.addEventListener("click", function(event) {
    if (event.target.textContent === "Show Answer") {
        const card = event.target.closest('.card')
        const hiddenAnswer = card.querySelector('.hidden')
        hiddenAnswer.classList.remove("hidden")
    }
})