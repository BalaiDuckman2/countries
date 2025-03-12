function outsideTheContinent(){
    let result=[];
    let compteur;
    Country.all_countrie.forEach(pays1 => {
        
        compteur=0
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


console.log(outsideTheContinent());