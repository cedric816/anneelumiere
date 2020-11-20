"use strict";

// définir votre clé d'accès à l'API de OMDb
let APIkey = "4f1d0ddb";

// création d'une fonction `dbSearch`
let dbSearch = async function(movieTitle) {
  try { 
    let url = `https://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle}&plot=full`;
    let response = await fetch(url, { cache: "no-cache" });
    let json = await response.json();
    if (json.Response != "False") {
      document.querySelector(".resultat").innerHTML =
        `<fieldset>`
       +`<img class="img-resultat" src="${json.Poster}" alt="affiche du film">`
       +`<ul>`
       +`<h1>${json.Title}</h1>`
       +`<br>`
       +`<li>Réalisateur : ${json.Director}</li>`
       +`<br>`
       +`<li>Année de sortie : ${json.Year}</li>`
       +`<br>`
       +`<li>Durée : ${json.Runtime}</li>`
       +`<br>`
       +`<li>Avec : ${json.Actors}</li>`
       +`<br>`
       +`<li>Genre (en anglais) : ${json.Genre}</li>`
       +`<br>`
       +`<li>Intrigue (en anglais) : ${json.Plot}</li>`
       +`<br>`
       +`</ul>`
       +`</fieldset>`;
    } else {
      document.querySelector(".resultat").innerHTML =
        `<fieldset>`
       +`<legend>Résultat de la recherche "${movieTitle}"</legend>`
       +`<p>Désolé mais je n'ai pas de résultat pour cette recherche (${json.Error})</p>`
       +`</fieldset>`;
    }
  } catch (error) {
    alert(`Aïe!\nZut!\nUne erreur (diabolique, forcément) est survenue :\n${error}`);
  }
}

// écoute l'envoi du formulaire
document.querySelector("form").addEventListener("submit", (event) => {
  document.querySelector("footer").style.display = "none";
  document.querySelector("header").style.height = "20%";
  document.querySelector("main").style.height = "50px";
  event.preventDefault(); // bloque l'envoi par défaut
  dbSearch(event.target[0].value); // récupère la valeur du premier élément et la transmet à notre fonction `dbSearch`
});

