const form = document.querySelector('form');
const main = document.querySelector('main');
const categorySelect = document.getElementById('category');

// Fetch categories from the Open Trivia API and added it to the dropdown
fetch('https://opentdb.com/api_category.php')
.then((response) => response.json())
.then((data)=>{
    const categories = data.trivia_categories;
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.append(option);
    });
})
.catch((error) => console.error('Error fetching categories:', error));

form.addEventListener('submit', function(event){
    event.preventDefault();
    // Get the selected category
    const selectedCategory = categorySelect.value;
    // API URL
    let apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

    // Add the category if a category is selected
    if(selectedCategory !== 'any') {
        apiUrl += `&category=${selectedCategory}`;
    }
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        // Clear cards
        main.innerHTML = '';
        // Sort questions by difficulty by easy, medium, hard
        data.results.sort((a, b) => {
            const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });

        // Loop through each question and create a card
        data.results.forEach((question)=>{
            const card = document.createElement('article');
            card.classList.add('card');

            const category = question.category;
            const questionText = question.question;
            const correctAnswer = question.correct_answer;
            const difficulty = question.difficulty;
            const incorrectAnswers = question.incorrect_answers;

            // Combine correct and incorrect answers
            const allAnswers = [...incorrectAnswers, correctAnswer];
            // Shuffle the answers so they arn't always in the same spot.
            allAnswers.sort(() => Math.random() - 0.5);

            // card HTML
            card.innerHTML = `
                <h2>${category}</h2>
                <p>${questionText}</p>
                <div class="answers">
                    ${allAnswers.map((answer) => `<p>${answer}</p>`).join('')}
                </div>
                <button>Show Answer</button>
                <p class="difficulty">Difficulty: ${difficulty}</p>
                <p class="hidden">${correctAnswer}</p>
            `;
            main.append(card);

            // Add difficulty class to the cards
            card.classList.add(difficulty.toLowerCase());

            // Added highlight to correct answer and incorrect answers
            const answers = card.querySelectorAll('.answers p');
            answers.forEach((answer) => {
                answer.addEventListener('click', function () {
                    const selectedAnswer = this.textContent;
                    if(selectedAnswer === correctAnswer) {
                        this.classList.add('correct');
                    }else {
                        this.classList.add('incorrect')
                    }
                });
            });
            // Added show/hide answer
            const button = card.querySelector('button');
            const answer = card.querySelector('.hidden');
            button.addEventListener('click', function (){
            answer.classList.toggle('hidden');
            });
        });
    })
    .catch((error) => console.error('Error fetching trivia questions:', error));
});

