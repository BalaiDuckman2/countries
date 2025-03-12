function outsideTheContinent(){
    let result=[];
    let compteur;
    
    Object.values(Country.all_countrie).forEach(pays1 => {
        compteur=0
        console.log(pays1)
        pays1.getBorders().forEach(pays2 => {
            console.log(pays2)
            if(pays1.region!=pays2.region&&compteur==0){
                result.push(pays1)
                compteur=1
            }
        });
    });
    
    return result;
}

function moreNeighbors(){
    
}

function moreLanguages(){

}

function withoutCommonCurrency(){

}

function moreTopLevelDomains(){

}


console.log(outsideTheContinent());