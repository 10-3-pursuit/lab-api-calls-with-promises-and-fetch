function displayError(error) {
    const section = document.querySelector("section.error")
    section.style.display = "block"
    section.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">${error}</p>`
}

function displayCard(singleQ){
    const {question, category, correct_answer, difficulty} = singleQ
    const main = document.querySelector("main")

    main.innerHTML += `<article class="card">
    <h2>${category}</h2>
    </br>
    <h3>Difficulty: ${difficulty}<h3>
    <p>${question}</p>
    <button>Show Answer</button>
    <p class="hidden">${correct_answer}</p>
    </article>`
}

const form = document.querySelector("form")
form.addEventListener("click", (event) => {
    event.preventDefault()
    fetch(`https://opentdb.com/api.php?amount=10`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((singleQ) => displayCard(singleQ)))
    .catch((error) => displayError(error))
})

const main = document.querySelector("main")
main.addEventListener("click", function(event) {
    if (event.target.textContent === 'Show Answer'){
        const card = event.target.closest('.card')
        const hiddenAnswer = card.querySelector('.hidden')
        hiddenAnswer.classList.remove('hidden')
    }
})
