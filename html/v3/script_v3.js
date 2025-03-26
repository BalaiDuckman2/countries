Object.values(Country.all_countrie).map(element => {
    let colonne = $("tr").last().after("<tr></tr>");
    $("tr").last().append("<td>" + element.nom + "</td>");
    $("tr").last().append("<td>" + element.population + "</td>");
    $("tr").last().append("<td>" + element.superficie + "</td>");
    $("tr").last().append("<td>" + element.getPopDensity() + "</td>");
    $("tr").last().append("<td>" + element.continent + "</td>");
    $("tr").last().append("<td><img src=" + element.drapeau + "></td>");
    $("tr").last().append("<td style='display:none;'>" + element.alpha3 + "</td>");
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
        "<p>Country: " + country.nom + "</p>" +
        "<p>Population: " + country.population + "</p>" +
        "<p>Superficie: " + country.superficie + "</p>" +
        "<p>Population Density: " + country.getPopDensity() + "</p>" +
        "<p>Continent: " + country.continent + "</p>"+
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