// function displayCard(person) {
//     const { title, first, last } = person.name;
//     const fullName = `${title} ${first} ${last}`;
//     const peopleClass = document.querySelector(".people");
  
//     peopleClass.innerHTML += `<section class="card">
//     <img src=${person.picture.large} alt="${fullName}"/>
//     <h2>${fullName}</h2>
//     <p>${person.email}</p>
//     </section>`;
//   }

//   fetch("https://randomuser.me/api/?results=5")
//   .then((response) => response.json())
//   .then((data) => data.results.forEach((user) => displayCard(user)))
//   .catch((error) => displayError(error));