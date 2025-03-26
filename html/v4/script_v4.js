//v4 filtrage
let langue = [];
Object.values(Language.all_languages).map(element => {
    langue.push(element._name);

}
);
let continents = [];
Object.values(Country.all_countrie).map(element => {
    if (!continents.includes(element.continent)) {
        continents.push(element.continent);
    }
});

//creation des filtres
$("table").last().before("<select id='continent'></select>");
$("#continent").append("<option value=''>--Choisir un continent--</option>");
continents.map(element => {
    $("#continent").append("<option value='" + element + "'>" + element + "</option>");
}
);

$("table").last().before("<select id='langue'></select>");
$("#langue").append("<option value=''>--Choisir une langue--</option>");
langue.map(element => {
    $("#langue").append("<option value='" + element + "'>" + element + "</option>");
}
);

$("table").last().before("<input type='text' id='search' placeholder='Rechercher un pays'></input>");
$("#search").on("keyup", function() {
    let search = $(this).val().toLowerCase();
    $("tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
    });
}
);

//filtrage
$("#continent").on("change", function() {
    let continent = $(this).val();
    if (continent === "") {
        $("tr").show();
    } else {
        $("tr").hide();
        $("tr").first().show();
        $("tr").filter(function() {
            return $(this).find("td").eq(4).text() === continent;
        }).show();
    }
}
);

$("#langue").on("change", function() {
    let langue = $(this).val();
    if (langue === "") {
        $("tr").show();
    } else {
        $("tr").hide();
        $("tr").first().show();
        $("tr").filter(function() {
                
            return $(this).find("td").eq(4).text() == langue;
        }).show();
    }
}
);


Object.values(Country.all_countrie).map(element => {
    $("tr").last().after("<tr></tr>");
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



