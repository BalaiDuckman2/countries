function outsideTheContinent(){
    result=[];
    let compteur;
    Country.all_countrie.forEach(pays1 => {
        element.getBorders().forEach(pays2 => {
            if(pays1.region!=pays2.region){
                result[pays1.alpha3Code]=pays1
            }
        });
    });
    return result;
}

function moreNeighbors(){}