//Types
export type Tdays = 0|1|2|3|4|5|6;
export type Thours = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|20|21|22|23;
export type Tminutes = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20 
|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45
|46|47|48|49|50|51|52|53|54|55|56|57|58|59;


//Interfaces------------------------------------------------------------
export interface IGlobalState {
    language: 'en' | 'spa',
    type: 'week' | "check",
    loginDialog: boolean,
    addTaskDialog: boolean,
    registerDialog: boolean,
    alert: boolean,
    alertText: string,
    alertType: "error" | "warning" | "success" 
    translation: Ilanguages,
    changeLanguage: (payload: string) => void;
    changeType: (payload: string) => void;
    changeDialogLogin: (payload: boolean) => void;
    changeDialogAddTask: (payload: boolean) => void;
    changeDialogRegister: (payload: boolean) => void;
    changeAlert: (payload: IAlert) => void;

}
export interface IAsigantureState{
    asignatures: IAsignature[] | null,
    getAllTasks: () => void;
    taskDone: (id: number) => void;
    taskDelete: (id: number) => void;
    taskUndone: (id: number) => void;
    taskAdd: (task: IAsignature_add) => void;
    
}

export interface IUserState {
    user: IUser,
    isLogged: boolean,
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, username: string, password: string) => Promise<Boolean>;
    logout: () => void;
}
export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
}
export interface IAction{
    type: string,
    payload: any
}

export interface IAsignature{
    title: string,
    description: string,
    hour: Thours,
    minutes: Tminutes,
    isDone: boolean,
    isExpire: boolean,
    day: Tdays,
    isCheck: boolean,
    id: number
}
export interface IAsignature_add{
    title: string,
    description: string,
    hour: number,
    minutes: number,
    isDone: boolean,
    isExpire: boolean,
    day: number,
    isCheck: boolean,
}
export interface Ilanguages {
    days: {
        0: string,
        1: string,
        2: string,
        3: string,
        4: string,
        5: string,
        6: string,
    },
    types:{
        week: string,
        todo: string
    },
    errors: {
        password_min: string,
        password_match: string,
        user_valid: string,
        email_valid: string,
        password_valid: string
    },
    login: {
        email: string,
        password: string,
        log_btn: string,
        sign_up_btn: string
    },
    register: {
        title: string,
        email: string,
        password: string,
        username: string,
        password_con: string,
        adult: string,
        register_btn: string
    },
    user_info: {
        user_information: string
    },
    alerts: {
        new_task: string,
        error_user_register: string,
        new_user_register: string,
        login_success: string,
        login_error: string
    },
    task:{
        title: string,
        description: string,
        time: string,
        create_task: string
    }
}
export interface IAlert{
    status: boolean,
    text: string,
    type: "error" | "warning" | "success"
}

export interface IUserLogin{
    email: string,
    password: string
}

export interface IUserRegister{
    email: string,
    password: string,
    passwordCon: string,
    user: string,
    adult: boolean
}

export interface IUser {
    username: string,
    email: string,
    createdAt: Date
}

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const minutes: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
,41,42,43,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59] 
export const hours: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

