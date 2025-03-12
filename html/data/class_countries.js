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

    }

    getBorders(){
        let resultat=[]
        if(this.paysVoisin){
            this.paysVoisin.forEach(element => {
                resultat[element]=Country.all_countrie[element]
            });
        }else{
            resultat=null
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
        
    }
}
Country.fill_countries()
console.table(Country.all_countrie["AFG"].getCurrencies());