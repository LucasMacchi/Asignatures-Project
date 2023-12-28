import { Ilabels } from "../interfaces/interfaces"
//Translation//------------------------------------------
const spanish: Ilabels = {
    days:["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    types: ["Tu Semana!", "Lista para Hacer!"],
    labels: ["Titulo", "Descripcion", "Horario", "Crear Tarea"],
    alerts: ["NUEVA TAREA A SIDO CREADA"]
}
const english: Ilabels = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    types: ["Your Week!", "To Do List!"],
    labels: ["Title", "Description", "Time", "Create Task"],
    alerts: ["NEW TASK CREATED"]

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