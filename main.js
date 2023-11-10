const url = "https://opentdb.com/api.php?amount=10";

fetch(url)
.then((response) => response.json())
.then((data) => data.results)
.catch((error) => displayError(error));

function displayError(error) {
    console.log(error);
}