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
getQuestions()

// const button = document.querySelector('button')

// button.addEventListener('submit', (event) => {
//     event.preventDefault()
//     // I need to gr ab the value given in the form
//     const numUser = event.target.quantity.value
//     // console.log(numUser)

//     // add the fetch
//     fetch("https://opentdb.com/api.php?amount=10")
//     // fetch(`https://randomuser.me/api/?results=${numUser}`)
//       .then((response) => response.json())
//       .then((data) => data.results.forEach((user) => displayCard(user)))
//       .catch((error) => displayError(error));
// })


// //i am making a call to the randomuser api using the fetch function
// fetch("https://randomuser.me/api/?results=5")
//   .then((response) => {
//     // i use the .then for my success and am converting my results into JSON I must return the json in order to pass it to the next .then
//     return response.json();
//   })
//   .then((data) => {
//     // i use the .then to view the actual data I am receiving. I am the one to name the variable name in the argument. 

//     // in fetch every data object has a results key that holds an array. so i must key into it.

//     // I must loop through the array to manipulate and render each user object
//     data.results.forEach((user) => displayCard(user));
//   })
//   .catch((error) => displayError(error));









