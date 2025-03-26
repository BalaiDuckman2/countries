let debutv3 = 0;  // Déclaration globale de 'debutv3'
const perPage = 25;
let fin = perPage;
let countri = Object.values(Country.all_countrie);

// Fonction pour définir un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log("Cookie défini:", document.cookie); 
}

// Fonction pour obtenir un cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Récupérer la page sauvegardée dans le cookie
let savedPage = getCookie("currentPage");
if (savedPage !== null && !isNaN(parseInt(savedPage))) {
    debutv3 = parseInt(savedPage) * perPage; // Affectation de la valeur à 'debutv3'
    fin = debutv3 + perPage;
    console.log("Page chargée depuis le cookie:", savedPage);
} else {
    console.log("Aucun cookie trouvé, début à 0"); 
}

function displayCountries() {
    let tableBody = $("#country-list");
    tableBody.empty();
    let paginatedCountries = countri.slice(debutv3, fin);

    paginatedCountries.forEach(element => {
        let row = `<tr>
            <td>${element.nom}</td>
            <td>${element.population}</td>
            <td>${element.superficie}</td>
            <td>${element.getPopDensity()}</td>
            <td>${element.continent}</td>
            <td><img src="${element.drapeau}" alt="Drapeau"></td>
        </tr>`;
        tableBody.append(row);
    });

    let currentPage = Math.floor(debutv3 / perPage) + 1;
    $("#page-number").text(currentPage);
}

$(document).ready(function () {
    displayCountries();

    $("#next-button").click(function () {
        if (fin < countri.length) {
            debutv3 += perPage;
            fin += perPage;
            setCookie("currentPage", Math.floor(debutv3 / perPage), 7); 
            displayCountries();
        }
    });

    $("#prev-button").click(function () {
        if (debutv3 > 0) {
            debutv3 -= perPage;
            fin -= perPage;
            setCookie("currentPage", Math.floor(debutv3 / perPage), 7); 
            displayCountries();
        }
    });
});


$("tr").on("click", function() {
    let alpha3 = $(this).find("td").last().text();
    
    info(alpha3);
});

$("img").on("click", function() {
    event.stopPropagation();
    let drapeau = $(this).attr("src");
    
    imageGrand(drapeau);

});



function info(alpha3) {
    $("#image").remove();  
    let country = Country.all_countrie[alpha3];
    let infoDiv = $("#info");
    if (infoDiv.length === 0) {
        infoDiv = $("<div id='info' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black;'></div>").insertBefore("table");
    }
    infoDiv.html(
        "<p>Country: " + (country.nom || "Nom inconnu") + "</p>" +
        "<p>Population: " + (country.population || "Inconnue") + "</p>" +
        "<p>Superficie: " + (country.superficie || "Inconnue") + "</p>" +
        "<p>Population Density: " + (country.getPopDensity ? country.getPopDensity() : "Inconnue") + "</p>" +
        "<p>Continent: " + (country.continent || "Inconnu") + "</p>" +
        "<button id='fermer'>fermer</button>"
    );

    $("#fermer").on("click", function() {
        $("#info").remove();        
    });
}

function imageGrand(drapeau){
    $("#info").remove();
    let imageDiv = $("#image");
    if (imageDiv.length === 0) {
        imageDiv = $("<div id='image' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black;'></div>").insertBefore("table");
    }
    imageDiv.html(
        "<img src=" + drapeau + "></img>"+
        "<button id='fermer2'>fermer</button>"
    );

    $("#fermer2").on("click", function() {
        $("#image").remove();        
    });
}