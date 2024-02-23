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
            console.log("aca3")
            const userToRegister = {email, username, password}
            const registerRoute: boolean = await (await axios.post('http://localhost:3400/user/register', userToRegister)).data
            console.log("REGISTER = ",registerRoute)
            return registerRoute
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
        logout
    }

    const [state, dispatch] = useReducer(userReducer,initialState)

    return(
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    )
}