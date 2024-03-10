import {useReducer} from "react";
import { IGlobalState, IPropsChildren,IAction, IAlert } from "../../interfaces/interfaces";
import { GlobalContext } from "../Contexts";
import types from "../Types";
import changeTranslation from "../../utils/changeTranslation";

//Reducer//------------------------------------------
const globalRed =  (state: IGlobalState, action: IAction): IGlobalState => {
    const {payload, type} = action
    switch(type){
        case types.CHANGE_LANGUAGE:
            return{
                ...state,
                language: payload,
                translation: changeTranslation(payload)
            }
        case types.CHANGE_TYPE: 
            return{
                ...state,
                type: payload
            }
        case types.CHANGE_DIALOG_ADD_TASK: 
            return{
                ...state,
                addTaskDialog: payload
            }
        case types.CHANGE_DIALOG_LOGIN: 
            return{
                ...state,
                loginDialog: payload
            }
        case types.CHANGE_DIALOG_REGISTER: 
            return{
                ...state,
                registerDialog: payload
            }
        case types.CHANGE_ALERT:
            return{
                ...state,
                alert: payload.status,
                alertText: payload.text,
                alertType: payload.type
            }
        case types.CHANGE_CURRENT_DAY:
            return{
                ...state,
                daySelected: payload
            }
        default:
            return state
    }
}

//------------------------------------------

//------------------------------------------


export default function GlobalState(props: IPropsChildren){
    //actions//--------------
    const changeLanguage = (payload: string) => {
        dispatch({
            type: types.CHANGE_LANGUAGE,
            payload: payload
        })
    }
    const changeType = (payload: string) => {
        dispatch({
            type: types.CHANGE_TYPE,
            payload: payload
        })

    }
    const changeDialogLogin = (payload: boolean) => {
        dispatch({
            type: types.CHANGE_DIALOG_LOGIN,
            payload: payload
        })
    }
    const changeDialogAddTask = (payload: boolean) => {
        dispatch({
            type: types.CHANGE_DIALOG_ADD_TASK,
            payload: payload
        })
    }
    const changeDialogRegister = (payload: boolean) => {
        dispatch({
            type: types.CHANGE_DIALOG_REGISTER,
            payload: payload
        })
    }
    const changeAlert = (payload: IAlert) => {
        dispatch({
            type: types.CHANGE_ALERT,
            payload: payload
        })
    }
    const changeCurrentDay = (payload: number) => {
        dispatch({
            type: types.CHANGE_CURRENT_DAY,
            payload: payload
        })
    }
    //--------------
    const initialState: IGlobalState = {
        language: 'en',
        type: 'week',
        loginDialog: false,
        addTaskDialog: false,
        registerDialog: false,
        alert: false,
        alertText: "",
        alertType: "success",
        daySelected: new Date().getDay(),
        translation: changeTranslation('en'),
        changeLanguage,
        changeType,
        changeDialogLogin,
        changeDialogAddTask,
        changeDialogRegister,
        changeAlert,
        changeCurrentDay
    }
    const [state, dispatch] = useReducer(globalRed,initialState)
    
    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    )

}