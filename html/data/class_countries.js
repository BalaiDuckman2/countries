class Country {

    static all_countrie=[]
    constructor(alpha3, nom, capitale, continent, population, paysVoisin) {
        this.alpha3 = alpha3; 
        this.nom = nom; 
        this.capitale = capitale; 
        this.continent = continent; 
        this.population = population; 
        this.paysVoisin = paysVoisin; 
    }

    
    toString() {
        return `${this.alpha3}, ${this.nom}, ${this.capitale}, ${this.continent}, ${this.population} hab, (${this.paysVoisin.join(", ")})`;
    }

    static fill_countries(){
        countries.forEach(tout => {
            this.all_countrie[tout["alpha3Code"]]=new Country(tout["alpha3Code"],tout["translations"]["fr"],tout["capital"],tout["region"],tout["population"],tout["borders"])
        });
    }

    getPopDensity(){
        let resultat=0
        countries.forEach(element => {
            if(element["name"]==this.nom){
                resultat=element["population"]/element["area"]
            }
        });
        return resultat;
    }

    getBorders(){
        let resultat=[]
        if(this.paysVoisin){
            this.paysVoisin.forEach(element => {
                resultat[element]=Country.all_countrie[element]
            });
        }else{
            resultat="pas d'amis ahahah"
        }
        return resultat
    }
    getCurrencies(){
        let resultat=[]
        countries.forEach(element => {
            if(element["name"]==this.nom){
                element["currencies"].forEach(element => {
                    resultat[element.code]=Currency.all_currencies[element.code]
                });
                
            }
        });
        return resultat
    }

    getLanguages(){
        let resultat=[]
        countries.forEach(element => {
            if(element["name"]==this.nom){
                element["languages"].forEach(element => {
                    resultat[element.iso639_2]=Currency.all_currencies[element.iso639_2]
                });
                
            }
        });
        return resultat
    }
}
Country.fill_countries()
console.table(Country.all_countrie["FRA"].getCurrencies());
console.table(Country.all_countrie["FRA"].getLanguages());
console.table(Country.all_countrie["FRA"].getBorders());
console.table(Country.all_countrie["FRA"].getPopDensity());