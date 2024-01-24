import { Ilanguages } from "../interfaces/interfaces"
import { spanish } from "./translation/spanish"
import { english } from "./translation/english"


export default function changeLanguage(language: string): Ilanguages{

    switch(language){
        case 'en':{
            return english
        }
        case 'spa':{
            return spanish
        }
        default: {
            return english
        }
    }
}