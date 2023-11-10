// grab form
const form = document.querySelector("form")

// add event listener to form
form.addEventListener("submit", (event) => {
    //prevent the default 
    event.preventDefault();
    
    
    // fetch the API
    fetch(`https://opentdb.com/api.php?amount=10`)
    // Convert data to json
    .then(response => response.json())
    .then(data => {
        data.results.forEach(e => {
            const main = document.querySelector(".centered");

            // i used a switch statement that checks the difficulty and changes a variable called borderColor.
            let borderColor = '';
            switch(e.difficulty) {
                case "easy":
                    borderColor = 'green';
                    break;
                case "medium":
                    borderColor = 'yellow';
                    break;
                case "hard":
                    borderColor = "red";
                    break;
                default:
                    borderColor = "none"
            }
            // Implemented the borderColor in the style
            main.innerHTML += `<article class="card" style="border-color: ${borderColor}">
            <h2>${e.category}</h2>
            <p>${e.question}</p>
            <button class="answer-button">Show Answer</button>
            <p class="hidden">${e.correct_answer}</p>
            </article>`


        })

        
        // Grab all the answer buttons
        const answerButtons = document.querySelectorAll(".answer-button")
        // For Each button, if any of them are pressed, it should toggle the classlist hidden to show the answer
        answerButtons.forEach(b => {
            b.addEventListener("click", () => {
                // nextElementSibling is basically a way to get the next sibling element, in this case it is the p element which i need.
                const answer = b.nextElementSibling;
                // This line toggles the presence of the "hidden" class in the classList of the answer element. If the "hidden" class is present, it will be removed; if it's not present, it will be added. 
                answer.classList.toggle("hidden")
            })
        })
    })
    .catch(err => console.log(err))
})

