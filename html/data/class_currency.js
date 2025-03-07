

class Currency {
    constructor(code, nom, symbole) {
        this.code = code;
        this.nom = nom;
        this.symbole = symbole;
    }

    fill_currencies() {
        console.log(countries)
    }
}

const currencyInstance = new Currency("USD", "Dollar américain", "$");

currencyInstance.fill_currencies();
