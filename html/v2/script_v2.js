let debut = 0;
let fin = 25;

function displayCountries() {
    let start = debut;
    let end = fin;
    const pageCountries = Country.all_countrie;


    $("table tbody").empty();

    for (let i = start; i < end && i < pageCountries.length; i++) {
        let element = pageCountries[i];
        let colonne = $("tr").last().after("<tr></tr>");
        $("tr").last().append("<td>" + element.nom + "</td>");
        $("tr").last().append("<td>" + element.population + "</td>");
        $("tr").last().append("<td>" + element.superficie + "</td>");
        $("tr").last().append("<td>" + element.getPopDensity() + "</td>");
        $("tr").last().append("<td>" + element.continent + "</td>");
        $("tr").last().append("<td><img src=" + element.drapeau + "></td>");
    }

}

function NextbuttonPage() {
    debut = debut + 25;
    fin = fin + 25;
    displayCountries(Object.values(Country.all_countrie));
}

function PrevbuttonPage() {
    debut = debut - 25;
    fin = fin - 25;
    displayCountries(Object.values(Country.all_countrie));
}

displayCountries(Object.values(Country.all_countrie));
