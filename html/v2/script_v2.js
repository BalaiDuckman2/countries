let debut2 = 0;
const perPage = 25;
let fin2 = perPage;
let countri = Object.values(Country.all_countrie);

//Cookie pour la pagination
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log("Cookie défin2i:", document.cookie); 
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
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
    let currentPage = Math.floor(debut2 / perPage) + 1;
    $("#page-number").text(currentPage);
}

$(document).ready(function () {
    displayCountries();
    //Pagination
    $("#next-button").click(function () {
        if (fin2 < countri.length) {
            debut2 += perPage;
            fin2 += perPage;
            setCookie("currentPage", Math.floor(debut2 / perPage), 7); 
            displayCountries();
        }
    });

    $("#prev-button").click(function () {
        if (debut2 > 0) {
            debut2 -= perPage;
            fin2 -= perPage;
            setCookie("currentPage", Math.floor(debut2 / perPage), 7); 
            displayCountries();
        }
    });
});
