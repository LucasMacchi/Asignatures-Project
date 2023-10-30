import React, {useReducer} from "react";
import { IAsigantureState, IPropsChildren,IAction } from "../../interfaces/interfaces";
import { AsignaturesContext } from "../Contexts";
import types from "../Types";
import { asignatures_mock } from "../../Mocks/asignatures.mocks";

//Reducer//------------------------------------------
const asignatureRed = (state: IAsigantureState, action: IAction) : IAsigantureState => {
    const {payload, type} = action
    switch(type){
        default:
            return state
    }
}
//------------------------------------------

export default function AsignaturesState(props: IPropsChildren){
    //actions//--------------

    //--------------

    const initialState: IAsigantureState = {
        asignatures: asignatures_mock
    }
    const [state, dispatch] = useReducer(asignatureRed,initialState)

    return(
        <AsignaturesContext.Provider value={state}>
            {props.children}
        </AsignaturesContext.Provider>
    )
}