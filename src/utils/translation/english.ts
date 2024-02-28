import { Ilanguages } from "../../interfaces/interfaces"
export const english: Ilanguages = {
    days: {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    },
    types:{
        week: "Your Week!",
        todo: "To Do List!"
    },
    errors: {
        password_min: "You password need to have at least 8 characters",
        password_match: "Password confimation does not match",
        user_valid: "Type a valid username",
        email_valid: "Type a valid email",
        password_valid: "Type a valid password"
    },
    login: {
        email: "Email",
        password: "Password",
        log_btn: "LOGIN",
        sign_up_btn: "SIGN UP",
        log_title: "Log in",
        restore_password: "Type your Email",
        restore_btn: "Restore",
        restore_password_text: "Click here to restore your password"
    },
    register: {
        title: "SIGN UP",
        email: "Email",
        password: "Password",
        username: "Username",
        password_con: "Confirm Password",
        adult: "Are you at least 18 years old?*",
        register_btn: "SIGN UP"
    },
    user_info: {
        user_information: "User Information",
        email: "Email:",
        password: "Password:",
        username: "Username:",
        change_password: "Change Password",
        change_username: "Change Username",
        logout: "LOGOUT"

    },
    alerts: {
        new_task: "NEW TASK CREATED",
        error_user_register: "ERROR TO CREATE NEW USER, TRY OTHER EMAIL",
        new_user_register: "NEW USER CREATED",
        login_success: "LOGGED SUCCESSFULLY",
        login_error: "ERROR TO LOGIN, CHECK CREDENTIALS",
        mail_password_reset: "Check your email to continue changing your password",
        password_changed_succ: "Password Succesfully changed",
        password_changed_error: "Error to change Password",
        username_changed_succ: "Username Succesfully changed",
        username_changed_error: "Error to change Username"
    },
    task:{
        title: "Title",
        description: "Description",
        time: "Time",
        create_task: "Create Task"
    },
    changer: {
        password_btn: "Change Password",
        username: "Change Username",
        username_title: "Change your Username",
        password_title: "Change your Password"
    }
}