import React, {useReducer, createContext} from "react";
import { IGlobalState, IPropsChildren,IAction, Ilabels } from "../../interfaces/interfaces";
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
    //--------------
    const initialState: IGlobalState = {
        language: 'en',
        type: 'week',
        translation: changeTranslation('en'),
        changeLanguage,
        changeType
    }
    const [state, dispatch] = useReducer(globalRed,initialState)
    
    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    )

}