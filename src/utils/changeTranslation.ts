import { Ilabels } from "../interfaces/interfaces"
//Translation//------------------------------------------
const spanish: Ilabels = {
    days:["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    types: ["Tu Semana!", "Lista para Hacer!"],
    labels: ["Titulo", "Descripcion", "Horario", "Crear Tarea", "Email", 
    "Contraseña", "INGRESAR", "REGISTRARSE", 
    "Ingrese un email valido", "Confirmar Contraseña", "Nombre de Usuario",
    "Las contraseñas no coinciden", "Ingresa un usuario valido", "Eres mayor de edad?*"],
    alerts: ["NUEVA TAREA A SIDO CREADA", "ERROR AL CREAR USUARIO", "NUEVO USUARIO RESGISTRADO"]
}
const english: Ilabels = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    types: ["Your Week!", "To Do List!"],
    labels: ["Title", "Description", "Time", "Create Task", "Email", 
    "Password", "LOGIN", "SIGN UP", "Type a valid email", 
    "Wrong Email or Password", "Type a valid password",
     "Confirm Password", "Username", "Password confimation does not match",
    "Type a valid username", "Are you at least 18 years old?*"],
    alerts: ["NEW TASK CREATED", "ERROR TO CREATE NEW USER", "NEW USER CREATED"]

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