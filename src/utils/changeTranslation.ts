import { Ilabels } from "../interfaces/interfaces"
//Translation//------------------------------------------
const spanish: Ilabels = {
    days:["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    types: ["Tu Semana!", "Lista para Hacer!"]
}
const english: Ilabels = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    types: ["Your Week!", "To Do List!"]

}

export default function changeLanguage(language: string): Ilabels{

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