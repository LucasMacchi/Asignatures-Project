import { Ilanguages } from "../../interfaces/interfaces"
export const spanish: Ilanguages = {
    days: {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado",
    },
    types:{
        week: "Tu Semana!",
        todo: "Lista para Hacer!"
    },
    errors: {
        password_min: "Tu contraseña debe tener al menos 8 caracteres",
        password_match: "Las contraseñas no coinciden",
        user_valid: "Ingresa un usuario valido",
        email_valid: "Ingrese un email valido",
        password_valid: "Ingrese una contraseña valida"
    },
    login: {
        email: "Email",
        password: "Contraseña",
        log_btn: "INGRESAR",
        sign_up_btn: "REGISTRARSE"
    },
    register: {
        title: "REGISTRARSE",
        email: "Email",
        password: "Contraseña",
        username: "Nombre de Usuario",
        password_con: "Confirmar Contraseña",
        adult: "Eres mayor de edad?*",
        register_btn: "REGISTRARSE"
    },
    user_info: {
        user_information: "Informacion del Usuario"
    },
    alerts: {
        new_task: "NUEVA TAREA A SIDO CREADA",
        error_user_register: "ERROR AL CREAR USUARIO, INTENTA OTRO CORREO",
        new_user_register: "NUEVO USUARIO RESGISTRADO",
        login_success: "INGRESO EXITOSAMENTE",
        login_error: "ERROR AL INGRESAR, VERIFIQUE LOS DATOS"
    },
    task:{
        title: "Titulo",
        description: "Descripcion",
        time: "Horario",
        create_task: "Crear Tarea"
    }
}