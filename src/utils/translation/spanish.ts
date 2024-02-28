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
        sign_up_btn: "REGISTRARSE",
        log_title: "Ingresar",
        restore_password: "Escribe tu Email",
        restore_btn: "Recuperar",
        restore_password_text: "Haga click aqui para cambiar su contraseña"
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
        user_information: "Informacion del Usuario",
        email: "Email:",
        password: "Contraseña:",
        username: "Nombre de Usuario:",
        change_password: "Cambiar Contraseña",
        change_username: "Cambiar Nombre de Usuario",
        logout: "Cerrar Sesion"
    },
    alerts: {
        new_task: "NUEVA TAREA A SIDO CREADA",
        error_user_register: "ERROR AL CREAR USUARIO, INTENTA OTRO CORREO",
        new_user_register: "NUEVO USUARIO RESGISTRADO",
        login_success: "INGRESO EXITOSAMENTE",
        login_error: "ERROR AL INGRESAR, VERIFIQUE LOS DATOS",
        mail_password_reset: "Chequea tu correo para cambiar tu contraseña",
        password_changed_succ: "Password Succesfully changed",
        password_changed_error: "Error to change Password",
        username_changed_succ: "Username Succesfully changed",
        username_changed_error: "Error to change Username"

    },
    task:{
        title: "Titulo",
        description: "Descripcion",
        time: "Horario",
        create_task: "Crear Tarea"
    },
    changer: {
        password_btn: "Cambiar Contraseña",
        username: "Cambiar Nombre de Usuario",
        username_title: "Cambia tu Nombre de Usuario",
        password_title: "Cambia tu Contraseña"
    }
}