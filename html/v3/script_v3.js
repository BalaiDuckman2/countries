let debut2 = 0;
const perPage = 25;
let fin2 = perPage;
let countri = Object.values(Country.all_countrie);

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
    let row = `<tr>
            <td>${element.nom}</td>
            <td>${element.population}</td>
            <td>${element.superficie}</td>
            <td>${element.getPopDensity()}</td>
            <td>${element.continent}</td>
            <td><img src="${element.drapeau}" alt="Drapeau"></td>
            <td style='display:none;'>${element.alpha3}</td>

        </tr>`;
    tableBody.append(row);
  });
  let currentPage = Math.floor(debut2 / perPage) + 1;
  $("#page-number").text(currentPage);
}

function resetEventListeners() {
  $("tr:not(:first)")
    .on("click", function () {
      let alpha3 = $(this).find("td").last().text();
      info(alpha3);
    });

  $("img")
    .on("click", function (event) {
      event.stopPropagation();
      let drapeau = $(this).attr("src");
      imageGrand(drapeau);
    });
}

$(document).ready(function () {
  displayCountries();
  resetEventListeners();
  //Pagination
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
  //Information sur le pays
  $("tr:not(:first)").on("click", function () {
    let alpha3 = $(this).find("td").last().text();
    info(alpha3);
  });
  //Drapeau du pays
  $("img").on("click", function () {
    event.stopPropagation();
    let drapeau = $(this).attr("src");

    imageGrand(drapeau);
  });
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

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      $("#info").remove();
    }
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

    $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      $("#image").remove();
    }
  });
}
