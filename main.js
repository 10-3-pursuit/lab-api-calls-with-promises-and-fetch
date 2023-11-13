const url = "https://opentdb.com/api.php?amount=10";

function displayError(error) {
    console.log(error);
}

function createTriviaQuestion(category, question, answer, difficulty, type, incorrectAnswers = []) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const p0 = document.createElement("p");
    const p1 = document.createElement("p");
    const button = document.createElement("button");
    const p2 = document.createElement("p");

    h2.innerHTML = category;
    p0.textContent = `Difficulty: ${difficulty}`;
    p1.innerHTML = question;
    article.setAttribute("class", `card ${difficulty}`);

    button.textContent = "Show Answer";

    button.addEventListener("click", (event) => {
        event.preventDefault();

        const article = event.target.closest("article");
        const ps = article.querySelectorAll("p");

        if (ps.length > 3) {
            const correctP = event.target.closest("article").querySelector(".correct-answer");
            correctP.setAttribute("style", "border: 1px solid green");
        } else {
            const art = event.target.closest("article");
            const p = art.querySelector(".hidden");
            p.classList.remove("hidden");
        }
    })

    p2.setAttribute("class", "hidden");
    p2.textContent = answer;
    
    article.append(h2);
    article.append(p0);
    article.append(p1);
    article.append(button);
    article.append(p2);
    
    if (type == "multiple") {
        for (const answer of incorrectAnswers) {
            const p = document.createElement("p");
            p.innerHTML = answer;
            article.append(p);
        }
        p2.classList.remove("hidden");
        p2.setAttribute("class", "correct-answer");
    }

    const main = document.querySelector("main.centered");
    main.prepend(article);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const cat = event.target.category.value;

    fetch(`${url}&category=${cat}`)
    .then((response) => response.json())
    .then((data) => data.results.forEach((elt) => {
        createTriviaQuestion(elt.category, elt.question, elt.correct_answer, elt.difficulty, elt.type, elt.incorrect_answers);
    }))
    .catch((error) => displayError(error));
})