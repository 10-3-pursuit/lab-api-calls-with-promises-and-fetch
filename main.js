// console.log("js connected")
const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple"

const main = document.querySelector("main")

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    main.innerHTML = ""
    getQuestions()
})


function createQuestion(obj) {
    const {category, question, correct_answer} = obj
    //create html element article tag
    const questionElement = document.
    createElement("article")

questionElement.innerHTML = `<article class="card">
<h2>${category}</h2>
<p>${question}</p>
<button>Show Answer</button>
<p class="hidden correct">CORRECT ANSWER:${correct_answer}</p>
</article>`
main.append(questionElement)

const answerButton = questionElement.querySelector("button")
answerButton.addEventListener("click", (event) => {
    const answer = questionElement.querySelector(".correct")
    if(answerButton.textContent === "Show Answer") {
    answerButton.textContent = "Hide Answer"
    answer.classList.remove("hidden")
}    else {
    answerButton.textContent = "Show Answer"
    answer.classList.add("hidden")
}


})
};

function getQuestions() {
    fetch(apiUrl).then(response => response.json()).then(data => {
        data.results.forEach(question => createQuestion(question))
    })
    
}
getQuestions();








