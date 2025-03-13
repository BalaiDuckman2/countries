function neighborLess(){
    let paysSansVoisin = [];
    
    for (let countryCode in Country.all_countrie) {
        const country = Country.all_countrie[countryCode];
        
        if (country.getBorders() === 0) {
            paysSansVoisin.push(country.nom);
        }
    }
    
    return paysSansVoisin;

}


function withCommonLanguage(){
    let countriesWithCommonLanguage = [];
    
    
    for (let countryCode in Country.all_countrie) {
        const country = Country.all_countrie[countryCode];
        const borders = country.getBorders();
        
        
        if (borders === 0) {
            continue;
        }
        
        const countryLanguages = country.getLanguages();
        const commonLanguageNeighbors = [];
        const sharedLanguages = {};
        
        for (let neighborCode in borders) {
            const neighbor = borders[neighborCode];
            const neighborLanguages = neighbor.getLanguages();
            
           
            for (let langCode in countryLanguages) {
                if (neighborLanguages[langCode]) {
                   
                    if (!commonLanguageNeighbors.includes(neighbor)) {
                        commonLanguageNeighbors.push(neighbor);
                    }
                    
                  
                    if (!sharedLanguages[langCode]) {
                        sharedLanguages[langCode] = countryLanguages[langCode].nom || langCode;
                    }
                }
            }
        }
        
        if (commonLanguageNeighbors.length > 0) {
            countriesWithCommonLanguage.push({
                country: country.nom,
                neighbors: commonLanguageNeighbors.map(neighbor => neighbor.nom).join(','),
                languages: Object.keys(sharedLanguages).map(langCode => sharedLanguages[langCode]).join(',')
            });
        }
    }
    
    return countriesWithCommonLanguage;


}



function sortingDecreasingDensity(){
    let countriesWithDensity = [];

    for (let countryCode in Country.all_countrie) {
        
        const country = Country.all_countrie[countryCode];
        const population = country.population;
        const area = country.area;

        if (population && area) {
            const density = population / area;
            countriesWithDensity.push({
                country: country.nom,
                density: density
            });
        }
    }

    countriesWithDensity.sort((a, b) => b.density - a.density);

    return countriesWithDensity;

}

console.table(neighborLess());
console.table(withCommonLanguage());
console.table(sortingDecreasingDensity());