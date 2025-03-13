class Language{
    static all_languages = []

    constructor(iso,name){
        this._iso = iso;
        this._name = name;
    }

    toString(){return `${this._fullname} (${this._iso})`}

    
    static fill_languages(){
        countries.forEach(key =>
            key["languages"].forEach(languages =>{
                this.all_languages[languages["iso639_2"]] = new Language(languages.iso639_2,languages.name);
            })
        )

    }


}

Language.fill_languages();
//console.table(Language.all_languages)
