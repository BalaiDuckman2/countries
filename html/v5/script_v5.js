let debut2 = 0;
const perPage = 25;
let fin2 = perPage;
let countri = Object.values(Country.all_countrie);

//Filtres
//Creation des langues
let langue = [];
Object.values(Language.all_languages).map((element) => {
  langue.push({ name: element._name, iso: element._iso });
});

//Creation des continents
let continents = [];
Object.values(Country.all_countrie).map((element) => {
  if (!continents.includes(element.continent)) {
    continents.push(element.continent);
  }
});

// Création des filtres
$("table").last().before("<select id='continent'></select>");
$("#continent").append("<option value=''>--Choisir un continent--</option>");
continents.map((element) => {
  $("#continent").append(
    "<option value='" + element + "'>" + element + "</option>"
  );
});

$("table").last().before("<select id='langue'></select>");
$("#langue").append("<option value=''>--Choisir une langue--</option>");
langue.map((element) => {
  $("#langue").append(
    "<option value='" + element.iso + "'>" + element.name + "</option>"
  );
});

$("table")
  .last()
  .before(
    "<input type='text' id='search' placeholder='Rechercher un pays'></input>"
  );

$("table").last().before("<button id='reset-button'>Réinitialiser</button>");

//Cookie pour la pagination
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
  console.log("Cookie défin2i:", document.cookie);
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let savedPage = getCookie("currentPage");
if (savedPage !== null && !isNaN(parseInt(savedPage))) {
  debut2 = parseInt(savedPage) * perPage;
  fin2 = debut2 + perPage;
  console.log("Page chargée depuis le cookie:", savedPage);
} else {
  console.log("Aucun cookie trouvé, début à 0");
}

//Affiche le tableau des pays
function displayCountries() {
  let tableBody = $("#country-list");
  tableBody.empty();
  let paginatedCountries = countri.slice(debut2, fin2);

  paginatedCountries.forEach((element) => {
    let population = isNaN(element.population) || element.population === undefined ? 0 : element.population;
    let superficie = isNaN(element.superficie) || element.superficie === undefined ? 0 : element.superficie;
    let popDensity = isNaN(element.getPopDensity()) || element.getPopDensity() === undefined ? 0 : element.getPopDensity();

    let row = `<tr>
            <td>${element.nom}</td>
            <td>${population}</td>
            <td>${superficie}</td>
            <td>${popDensity}</td>
            <td>${element.continent}</td>
            <td><img src="${element.drapeau}" alt="Drapeau"></td>
            <td style='display:none;'>${element.alpha3}</td>
        </tr>`;
    tableBody.append(row);
  });
  let currentPage = Math.floor(debut2 / perPage) + 1;
  $("#page-number").text(currentPage);
}

//Réinitialise les écouteurs d'événements
function resetEventListeners() {
  $("tr:not(:first)")
    .off("click")
    .on("click", function () {
      let alpha3 = $(this).find("td").last().text();
      info(alpha3);
    });

  $("img")
    .off("click")
    .on("click", function (event) {
      event.stopPropagation();
      let drapeau = $(this).attr("src");
      imageGrand(drapeau);
    });

  $("th")
    .off("click")
    .on("click", function () {
      let column = $(this).data("column");
      if (column && column !== "drapeau") {
        sortCountries(column);
      }
    });
}

$("#next-button").click(function () {
  $("#image").remove();
  $("#info").remove();
  if (fin2 < countri.length) {
    debut2 += perPage;
    fin2 += perPage;
    setCookie("currentPage", Math.floor(debut2 / perPage), 7);
    displayCountries();
    resetEventListeners();
  }
});

$("#prev-button").click(function () {
  $("#image").remove();
  $("#info").remove();
  if (debut2 > 0) {
    debut2 -= perPage;
    fin2 -= perPage;
    setCookie("currentPage", Math.floor(debut2 / perPage), 7);
    displayCountries();
    resetEventListeners();
  }
});

let trieColumn = null;
let trieOrdre = "asc";

//Fonction de tri
function sortCountries(column) {
  if (trieColumn === column) {
    trieOrdre = trieOrdre === "asc" ? "desc" : "asc";
  } else {
    trieColumn = column;
    trieOrdre = "asc";
  }

  countri.sort((a, b) => {
    let valueA = column === "getPopDensity" ? a.getPopDensity() : a[column];
    let valueB = column === "getPopDensity" ? b.getPopDensity() : b[column];

    if (valueA === valueB) {
      return a.nom.localeCompare(b.nom);
    }

    if (trieOrdre === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  $("th").css("font-weight", "normal");
  $(`th[data-column='${column}']`).css("font-weight", "bold");

  debut2 = 0;
  fin2 = perPage;
  displayCountries();
  resetEventListeners(); // Réinitialise les événements après le tri
}

//Aplique les filtres
function applyFilters() {
  let selectedContinent = $("#continent").val();
  let selectedLangue = $("#langue").val();
  let recherche = $("#search").val().toLowerCase();
  let filteredCountries = Object.values(Country.all_countrie).filter(
    (country) => {
      let matchesContinent =
        selectedContinent === "" || country.continent === selectedContinent;
      let matchesLanguage =
        selectedLangue === "" ||
        country.languages.some((lang) => lang.iso639_2 === selectedLangue);
      let matchesSearch =
        recherche === "" || country.nom.toLowerCase().includes(recherche);

      return matchesContinent && matchesLanguage && matchesSearch;
    }
  );

  countri = filteredCountries;
  debut2 = 0;
  fin2 = perPage;
  displayCountries();
  resetEventListeners();
}

// Fonction pour réinitialiser les filtres, tri et pagination
function resetAll() {
  $("#continent").val("");
  $("#langue").val("");
  $("#search").val("");
  trieColumn = null;
  trieOrdre = "asc";
  countri = Object.values(Country.all_countrie);
  debut2 = 0;
  fin2 = perPage;
  displayCountries();
  resetEventListeners();
}

//Evenement sur les filtres
$("#continent, #langue, #search").on("change keyup", function () {
  applyFilters();
});

//Evenement sur le bouton Réinitialiser
$("#reset-button").on("click", function () {
  resetAll();
});

//fonction des informations sur le pays
function info(alpha3) {
  $("#image").remove();
  let country = Country.all_countrie[alpha3];
  let infoDiv = $("#info");
  if (infoDiv.length === 0) {
    infoDiv = $(
      "<div id='info' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black;'></div>"
    ).insertBefore("table");
  }
  infoDiv.html(
    "<p>Country: " +
      country.nom +
      "</p>" +
      "<p>Population: " +
      country.population +
      "</p>" +
      "<p>Superficie: " +
      country.superficie +
      "</p>" +
      "<p>Population Density: " +
      country.getPopDensity() +
      "</p>" +
      "<p>Continent: " +
      country.continent +
      "</p>" +
      "<button id='fermer'>fermer</button>"
  );

  $("#fermer").on("click", function () {
    $("#info").remove();
  });
}

//fonction pour agrandir le drapeau
function imageGrand(drapeau) {
  $("#info").remove();
  let imageDiv = $("#image");
  if (imageDiv.length === 0) {
    imageDiv = $(
      "<div id='image' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black;'></div>"
    ).insertBefore("table");
  }
  imageDiv.html(
    "<img src=" + drapeau + "></img>" + "<button id='fermer2'>fermer</button>"
  );

  $("#fermer2").on("click", function () {
    $("#image").remove();
  });
}

// --- Initialisation ---
$(document).ready(function () {
  displayCountries();
  resetEventListeners();

  $("#next-button").click(function () {
    $("#image").remove();
    $("#info").remove();
    if (fin2 < countri.length) {
      debut2 += perPage;
      fin2 += perPage;
      setCookie("currentPage", Math.floor(debut2 / perPage), 7);
      displayCountries();
      resetEventListeners();
    }
  });

  $("#prev-button").click(function () {
    $("#image").remove();
    $("#info").remove();
    if (debut2 > 0) {
      debut2 -= perPage;
      fin2 -= perPage;
      setCookie("currentPage", Math.floor(debut2 / perPage), 7);
      displayCountries();
      resetEventListeners();
    }
  });

  $("tr:not(:first)").on("click", function () {
    let alpha3 = $(this).find("td").last().text();
    info(alpha3);
  });

  $("img").on("click", function () {
    event.stopPropagation();
    let drapeau = $(this).attr("src");

    imageGrand(drapeau);
  });

  $("th").on("click", function () {
    let column = $(this).data("column");
    if (column && column !== "drapeau") {
      sortCountries(column);
    }
  });

  // Ajout de l'événement au bouton Réinitialiser
  $("#reset-button").on("click", function () {
    resetAll();
  });
});
