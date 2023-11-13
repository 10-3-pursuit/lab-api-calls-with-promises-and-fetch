const newTrivia = document.querySelector("form");
newTrivia.addEventListener("click", (event) => {
        event.preventDefault();
        fetch("https://opentdb.com/api.php?amount=10&difficulty=easy")
            .then((response) => {
                return response.json(); 
            })
            .then((data) => {
                data.results.forEach((trivia) => {
                    const article = document.createElement("article");
                    article.classList.add("card");
                    article.innerHTML = `<h2>${trivia.category}</h2>
                    <p>${trivia.question}</p>
                    <button>Show Answer</button>
                    <p class="hidden">${trivia.correct_answer}</p>`
                    const centered = document.querySelector("main");
                    centered.append(article);
                    const answer = article.querySelector("button");
                    answer.addEventListener("click", () => {
                    const p = article.querySelector(".hidden") 
                    p.classList.remove("hidden");
                    }); 
                });
            });
    });

//   <article class="card">
//      <h2>CATEGORY</h2>
//      <p>QUESTION</p>
//      <button>Show Answer</button>
//      <p class="hidden">CORRECT ANSWER</p>
//   </article>