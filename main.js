const url = "https://opentdb.com/api.php?amount=10";

function displayError(error) {
    console.log(error);
}

function createTriviaQuestion(category, question, answer) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const p1 = document.createElement("p");
    const button = document.createElement("button");
    const p2 = document.createElement("p");

    h2.textContent = category;
    p1.textContent = question;
    p1.setAttribute("class", "card");

    button.textContent = "Show Answer";

    button.addEventListener("click", (event) => {
        event.preventDefault();

        const art = event.target.closest("article");
        const p = art.querySelector(".hidden");
        p.classList.remove("hidden");
    })

    p2.setAttribute("class", "hidden");
    p2.textContent = answer;

    article.append(h2);
    article.append(p1);
    article.append(button);
    article.append(p2);

    const main = document.querySelector("main.centered");
    main.append(article);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(url)
    .then((response) => response.json())
    .then((data) => data.results.forEach((elt) => {
        createTriviaQuestion(elt.category, elt.question, elt.correct_answer);
    }))
    .catch((error) => displayError(error));
})