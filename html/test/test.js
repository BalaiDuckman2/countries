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
  let maxNeighbors = 0;

  Object.values(Country.all_countrie).forEach((pays) => {
    let neighborsCount = Object.values(pays.getBorders()).length;
    if (neighborsCount > maxNeighbors) {
      maxNeighbors = neighborsCount;
      result=[pays]
    } else if (neighborsCount === maxNeighbors) {
      result.push(pays);
    }
  });

  console.table(result);
  return result;
}

function moreLanguages() {
  let result = [];
  let maxLanguages = 0;

  Object.values(Country.all_countrie).forEach((pays) => {
    let languagesCount = Object.values(pays.getLanguages()).length;

    if (languagesCount > maxLanguages) {
      maxLanguages = languagesCount;
      result = [pays];
    } else if (languagesCount === maxLanguages) {
      result.push(pays);
    }
  });

  console.table(result);
  return result;
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


