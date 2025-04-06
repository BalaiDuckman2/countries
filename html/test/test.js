function outsideTheContinent() {
  let result = [];
  let compteur;

  Object.values(Country.all_countrie).forEach((pays1) => {
    compteur = 0;
    if (pays1.getBorders()) {
      Object.values(pays1.getBorders()).forEach((pays2) => {
        if (pays1.continent != pays2.continent && compteur == 0) {
          result.push(pays1);
          compteur = 1;
        }
      });
    }
  });

  console.table(result);
  return result;
}




function moreNeighbors() {
  let result = [];
  let payVoisin = [];
  let maxNeighbors = 0;

  Object.values(Country.all_countrie).forEach((pays) => {
    let neighborsCount = Object.values(pays.getBorders()).length;
    if (neighborsCount > maxNeighbors) {
      maxNeighbors = neighborsCount;
      result=[pays]
      payVoisin=[pays.paysVoisin]
    } else if (neighborsCount === maxNeighbors) {
      result.push(pays);
      payVoisin.push(pays.paysVoisin);
    }
  });

  console.table(result);
  console.table(payVoisin);
  return result;
}



function neighborLess(){
  let paysSansVoisin = [];
  
  for (let countryCode in Country.all_countrie) {
      const country = Country.all_countrie[countryCode];
      
      if (country.getBorders() === 0) {
          paysSansVoisin.push(country.nom);
      }
  }
  
  console.table(paysSansVoisin)
  return paysSansVoisin;

}




function moreLanguages() {
  let result = [];
  let langue = [];
  let maxLanguages = 0;

  Object.values(Country.all_countrie).forEach((pays) => {
    let languagesCount = Object.values(pays.getLanguages()).length;

    if (languagesCount > maxLanguages) {
      maxLanguages = languagesCount;
      result = [pays];
      langue = [pays.getLanguages()]
    } else if (languagesCount === maxLanguages) {
      result.push(pays);
      langue.push(pays.getLanguages());
    }
  });

  console.table(result);
  langue.forEach(elmt =>{
    console.table(elmt);
    });
  return result;
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
  

  console.table(countriesWithCommonLanguage);
  return countriesWithCommonLanguage;


}







function withoutCommonCurrency() {
  let result = [];
  Object.values(Country.all_countrie).forEach((pays1) => {
    let commun = false;
    if (pays1.getBorders()) {
      Object.values(pays1.getBorders()).forEach((pays2) => {
        Object.values(pays1.getCurrencies()).forEach((devise1) => {
          Object.values(pays2.getCurrencies()).forEach((devise2) => {
            if (devise1.code == devise2.code) {
              commun = true;
            }
          });
        });
      });
    }
    if (!commun) {
      result.push(pays1);
    }
  });
  console.table(result);
  return result;
}



function sortingDecreasingDensity(){
  let countriesWithDensity = [];

  for (let countryCode in Country.all_countrie) {
      const country = Country.all_countrie[countryCode];
      const population = country.population;
         
          const density = country.getPopDensity(); 
          if( !isNaN(density) ){
              countriesWithDensity.push({
                  country: country.nom,
                  density: density
              });
          }else {
              countriesWithDensity.push({
                  country: country.nom,
                  density: 0
              });
          }
      
  }

  countriesWithDensity.sort((a, b) => b.density - a.density);

  console.table(countriesWithDensity);
  return countriesWithDensity;

}

function moreTopLevelDomains() {
  let result = [];

  Object.values(Country.all_countrie).forEach((pays) => {
    if (pays.topLevelDomain.length > 1) {
      result.push(pays);
    }
  });

  console.table(result);
  return result;
}












