Object.values(Country.all_countrie).map(element => {
    let colonne = $("tr").last().after("<tr></tr>");
    $("tr").last().append("<td>" + element.nom + "</td>");
    $("tr").last().append("<td>" + element.population + "</td>");
    $("tr").last().append("<td>" + element.superficie + "</td>");
    $("tr").last().append("<td>" + element.getPopDensity() + "</td>");
    $("tr").last().append("<td>" + element.continent + "</td>");
    $("tr").last().append("<td><img src=" + element.drapeau + "></td>");
});
