class Country {

    static all_countrie=[]
    constructor(alpha3, nom, capitale, continent, population, paysVoisin,drapeau,topLevelDomain,superficie,languages,currencies) {
        this.alpha3 = alpha3; 
        this.nom = nom; 
        this.capitale = capitale; 
        this.continent = continent; 
        this.population = population; 
        this.paysVoisin = paysVoisin; 
        this.drapeau=drapeau;
        this.topLevelDomain=topLevelDomain;
        this.superficie=superficie;
        this.languages=languages;
        this.currencies=currencies;
        
    }

    
    toString() {
        return `${this.alpha3}, ${this.nom}, ${this.capitale}, ${this.continent}, ${this.population} hab`;
    }

    static fill_countries(){
        countries.forEach(tout => {
            this.all_countrie[tout["alpha3Code"]]=new Country(tout["alpha3Code"],tout["translations"]["fr"],tout["capital"],tout["region"],tout["population"],tout["borders"],tout["flag"],tout["topLevelDomain"],tout["area"],tout["languages"],tout["currencies"])
        });
    }

    getPopDensity(){
        let resultat=0
        resultat=this.population/this.superficie
        return resultat;
    }

    getBorders(){
        let resultat=[]
        if(this.paysVoisin){
            this.paysVoisin.forEach(element => {
                resultat[element]=Country.all_countrie[element]
            });
        }else{
            return 0;
        }
        return resultat
    }
    getCurrencies(){
        let resultat=[]
        this.currencies.forEach(element => {
            resultat[element.code]=Currency.all_currencies[element.code]
        }
        );
        return resultat
    }

    getLanguages(){
        let resultat=[]
        this.languages.forEach(element => {
            resultat[element.iso639_1]=Language.all_languages[element.iso639_1]
        });
        return resultat
    }

    
}
Country.fill_countries()
//console.table(Country.all_countrie["FRA"].getCurrencies());
//console.table(Country.all_countrie["FRA"].getLanguages());
//console.table(Country.all_countrie["FRA"].getBorders());
//console.table(Country.all_countrie["FRA"].getPopDensity());
