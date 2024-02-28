import React, {useReducer, createContext} from "react";
import { IUserState, IAction, IPropsChildren, IUser } from "../../interfaces/interfaces";
import { UserContext } from "../Contexts";
import types from "../Types";
import axios from "axios";

//Reducer//------------------------------------------
const userReducer = (state: IUserState, action: IAction): IUserState => {
    const {payload, type} = action
    switch(type){
        case types.USER_LOG: 
            return {...state,isLogged: payload.log, user:{user_id: payload.user_id, email: payload.email, username: payload.username, createdAt: payload.createdAt}}
        case types.CHANGE_USERNAME:
            const newState = state
            newState.user.username = payload
            return newState
        default:
            return state
    }
}

//------------------------------------------

//------------------------------------------

export default function UserState(props: IPropsChildren) {
    //actions//--------------
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const userToLog = {email,password}
            const access: IUser = await (await axios.post('http://localhost:3400/user/login', userToLog)).data
            console.log("USER ACCESS = ",access)
            if(access && access.email && access.username){
                dispatch({
                    type: types.USER_LOG,
                    payload: {user_id: access.user_id, email: access.email, username: access.username, createdAt: access.createdAt, log: true}
                })
                return true
            }
            else{
                return false
            }
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }

    const register = async (email: string, username: string, password: string): Promise<Boolean> => {
        try {
            const userToRegister = {email, username, password}
            const registerRoute: boolean = await (await axios.post('http://localhost:3400/user/register', userToRegister)).data
            return registerRoute
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }

    const request_password_change_email = async (email: string): Promise<boolean> => {
        try {
            const response: boolean = await (await axios.post('http://localhost:3400/user/email/password/'+email)).data
            return response
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }

    const request_password_change = async (user_id: string): Promise<boolean> => {
        try {
            const response: boolean = await (await axios.post('http://localhost:3400/user/password/token/'+user_id)).data
            return response
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }

    const change_password = async (token_id: string, user_id: string, new_password: string): Promise<boolean> => {
        try {
            const body = {
                token_id,
                user_id,
                new_password
            }
            const response: boolean = await  (await axios.patch('http://localhost:3400/user/password', body)).data
            return response
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }
    const change_username = async (user_id: string, new_username: string): Promise<boolean> => {
        try {
            const response = await (await axios.patch('http://localhost:3400/user/username/'+user_id+'/'+new_username)).data
            dispatch({payload: new_username, type: types.CHANGE_USERNAME})
            return response
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }


    const logout = async () => {}

    //--------------
    const initialState: IUserState = {
        user: {email: "", username: "", createdAt: new Date, user_id: ""},
        isLogged: false,
        login,
        register,
        logout,
        change_username,
        request_password_change,
        request_password_change_email,
        change_password
    }

    const [state, dispatch] = useReducer(userReducer,initialState)

    return(
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    )
}