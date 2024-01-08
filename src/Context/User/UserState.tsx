import React, {useReducer, createContext} from "react";
import { IUserState, IAction, IPropsChildren } from "../../interfaces/interfaces";
import { UserContext } from "../Contexts";
import types from "../Types";
import axios from "axios";

//Reducer//------------------------------------------
const userReducer = (state: IUserState, action: IAction): IUserState => {
    const {payload, type} = action
    switch(type){
        case types.USER_LOG: 
            return state
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
            const access: boolean = await (await axios.post('http://localhost:3400/user/login', userToLog)).data
            console.log("USER ACCESS = ",access)
            return access
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }
    const register = async () => {}
    const logout = async () => {}

    //--------------
    const initialState: IUserState = {
        user: {email: "", username: ""},
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