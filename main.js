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
}