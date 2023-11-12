const main = document.querySelector("main")
const form = document.querySelector("form")

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const {trivia_category} = event.target
    const category = trivia_category.value
    if(category ==="any"){
        fetch("https://opentdb.com/api.php?amount=10")
        .then((response)=> response.json())
        .then((data)=> data.results.forEach((trivia)=> displayCard(trivia)))
        .catch((error)=> console.log(error))    
    }else{
        fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
        .then((response)=> response.json())
        .then((data)=> data.results.forEach((trivia)=> displayCard(trivia)))
        .catch((error)=> console.log(error))
    }
    
})




function displayCard(trivia){
    const {category, difficulty, question,correct_answer, incorrect_answers} = trivia
    const article = document.createElement("article")
    article.classList.add("card")
    article.innerHTML += `
    <h2>${category}</h2>
    <p>${question}</p>`
    // Code for making choices options
    const choices = [correct_answer,...incorrect_answers]
    const choiceSelect = document.createElement("select")
    choices.sort((a,b)=>a.localeCompare(b))
    choices.forEach(choice => {
        const option = document.createElement("option");
        choice === correct_answer ? option.classList.add("correct","hide"):option.classList.add("incorrect")
        option.value = choice === correct_answer ? "true" : "false";
        option.textContent = choice;
        choiceSelect.appendChild(option);
    });
    article.append(choiceSelect);
    article.innerHTML+= `
    <button>Show Answer</button>
    <p class="hidden">${correct_answer}</p>`
    main.append(article)
    // 
    // --Code below highlights correct answer in select element with green--
    const showAnswer = article.querySelector("button");
    const answer = article.querySelector(".correct")
    showAnswer.addEventListener("click",()=>{
        const options = article.querySelectorAll("option")
        if(answer.classList.contains("hide")){
            answer.classList.replace("hide","shownAnswer")
            answer.selected = true
            showAnswer.textContent = "Hide Answer"
            for(let choice of options){
                if(choice.innerText !== correct_answer){
                    choice.style.display = "none"
                }
    
            }

        }else{
            answer.classList.replace("shownAnswer","hide")
            answer.selected = false
            showAnswer.textContent = "Show Answer"
            for(let choice of options){
                if(choice.innerText !== correct_answer){
                    choice.style.display = "block"
                }
    
            }
        }

    })

    // --Code below displays correct answer below question--
//     const showAnswer = article.querySelector("button")
//     const answer = article.querySelector(".hidden")
//     showAnswer.addEventListener("click",()=>{
//         if(answer.classList.contains("hidden")){
//             answer.classList.replace("hidden","shown")
//             answer.style.display = "block"
//         }else{
//             answer.style.display = "none"
//             answer.classList.replace("shown","hidden")
//         }
//     })
}
