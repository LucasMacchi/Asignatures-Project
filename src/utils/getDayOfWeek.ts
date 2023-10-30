import { Tdays } from "../interfaces/interfaces"
export default function GetDayofWeek(day: Tdays): string{
    switch(day){
        case 0: return 'Lunes'
        case 1: return 'Martes'
        case 2: return 'Miercoles'
        case 3: return 'Jueves'
        case 4: return 'Viernes'
        case 5: return 'Sabado'
        case 6: return 'Domingo'
        default: return 'null'
    }
}