fetch("https://opentdb.com/api.php?amount=10&category=9")
.then((res) => res.json())
.then((data) => data.results.forEach((user) => generateQuestion(user)))
.catch((error) => displayError(error));

function displayError(error) {
    const section = document.querySelector("section.error");
    section.style.display = "block";
  
    section.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">${error}</p>
    `;
  }
    



const generateQuestion = (user) => {
    const centerquestions = document.querySelector(".centered");
    const difficultyClass = getDifficultyClass(user.difficulty);
    // const borderColor = getBorderColor(user.difficulty);


    centerquestions.innerHTML += `
    <article class="card ${difficultyClass}">
    <h2>CATEGORY: ${user.category}</h2>
    <p>QUESTION: ${user.question}</p>
    <button>Show Answer</button>
    <p class="hidden">CORRECT ANSWER: ${user.correct_answer}</p>
    </article>`
    const buttons = document.querySelectorAll(".card button");
    const answer = document.querySelectorAll(".card .hidden");
    
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            answer[index].classList.toggle("hidden");
        })
    })
}

const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 'easy-difficulty';
        case 'medium':
            return 'medium-difficulty';
        case 'hard':
            return 'hard-difficulty';
        default:
            return '';
    }
};

// const getBorderColor = (difficulty) => {
//     switch (difficulty) {
//         case 'easy-difficulty':
//             return 'green';
//         case 'medium-difficulty':
//             return 'yellow';
//         case 'hard-difficulty':
//             return 'red';
//         default:
//             return '';
//     }
// }
