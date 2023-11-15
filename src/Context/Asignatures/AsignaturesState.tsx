import React, {useReducer} from "react";
import { IAsigantureState, IPropsChildren,IAction } from "../../interfaces/interfaces";
import { AsignaturesContext } from "../Contexts";
import t from "../Types";
import axios from "axios";

//Reducer//------------------------------------------
const asignatureRed = (state: IAsigantureState, action: IAction) : IAsigantureState => {
    const {payload, type} = action
    switch(type){
        case t.GET_ALL_TASK:
            return {...state, asignatures: payload}
        case t.TASK_DONE:
            const newState = state.asignatures?.map(as => {
                if(as.id === payload) as.isDone = true
                return as
            })
            if(newState) return {...state, asignatures: newState}
            else return state
        case t.TASK_DELETE:
            const delState = state.asignatures?.filter((as) => as.id !== payload)
            if(delState) return {...state, asignatures: delState}
            else return state
        default:
            return state
    }
}
//------------------------------------------

export default function AsignaturesState(props: IPropsChildren){
    //actions//--------------
    const getAllTasks = async () => {
        const tasks = await axios.get('http://localhost:3400/task/all')
        console.log("LOADING TASKS",tasks)
        dispatch({
            type: t.GET_ALL_TASK,
            payload: tasks.data
        })
    }
    const taskDone = async (id: number) => {
        await axios.patch('http://localhost:3400/task/done/'+id)
        console.log("TASK "+id+" DONE")
        dispatch({
            type: t.TASK_DONE,
            payload: id
        })
    }
    const taskDelete = async (id: number) => {
        await axios.delete('http://localhost:3400/task/delete/'+id)
        console.log("TASK "+id+" DELETED")
        dispatch({
            type: t.TASK_DELETE,
            payload: id
        })
    }
    //--------------

    const initialState: IAsigantureState = {
        asignatures: null,
        getAllTasks,
        taskDone,
        taskDelete
    }
    const [state, dispatch] = useReducer(asignatureRed,initialState)

    return(
        <AsignaturesContext.Provider value={state}>
            {props.children}
        </AsignaturesContext.Provider>
    )
}