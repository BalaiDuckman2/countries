class Currency {
    static all_currencies = [];

    constructor(code, nom, symbole) {
        this.code = code;
        this.nom = nom;
        this.symbole = symbole;
    }

    toString() {
        return `${this.code}, ${this.name}, ${this.symbol}`;
    }

    static fill_currencies() {
        countries.forEach(key => {
            if (!key["currencies"]) {  
                //console.log("Aucune devise trouvée");
                
            }else{
                key["currencies"].forEach(element => {
                    
                    this.all_currencies[element.code] = new Currency(element.code, element.name, element.symbol);
                });
            }
        });
    }
}

Currency.fill_currencies();
//console.table(Currency.all_currencies);