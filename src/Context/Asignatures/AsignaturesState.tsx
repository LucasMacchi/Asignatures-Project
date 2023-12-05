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
        case t.TASK_UNDONE:
            const date = new Date()
            const day = date.getDay()
            const hour = date.getHours()
            const undoneStates = state.asignatures?.map(as => {
                if(as.id === payload && as.isDone) {
                    if(day === as.day) if(hour < as.hour) as.isDone = false
                    else as.isDone = false
                }
                return as
            })
            if(undoneStates) return {...state, asignatures: undoneStates}
            else return state
        default:
            return state
    }
}
//------------------------------------------

export default function AsignaturesState(props: IPropsChildren){
    //actions//--------------
    const getAllTasks = async () => {
        try {
            const tasks = await axios.get('http://localhost:3400/task/all')
            console.log("LOADING TASKS",tasks)
            dispatch({
                type: t.GET_ALL_TASK,
                payload: tasks.data
            })        
        } catch (error) {
            console.log("ERROR: ",error)
        }

    }
    const taskDone = async (id: number) => {
        try {
            await axios.patch('http://localhost:3400/task/done/'+id)
            console.log("TASK "+id+" DONE")
            dispatch({
                type: t.TASK_DONE,
                payload: id
            })        
        } catch (error) {
            console.log("ERROR: ",error)
        }

    }
    const taskDelete = async (id: number) => {
        try {
            await axios.delete('http://localhost:3400/task/delete/'+id)
            console.log("TASK "+id+" DELETED")
            dispatch({
                type: t.TASK_DELETE,
                payload: id
            })
        } catch (error) {
            console.log("ERROR: ",error)
        }

    }
    const taskUndone = async (id: number) => {
        try {
            await axios.patch('http://localhost:3400/task/undone/'+id)
            console.log("TASK "+id+" UNDONE")
            dispatch({
                type: t.TASK_UNDONE,
                payload: id
            })
        } catch (error) {
            console.log("ERROR: ",error)
        }
    }

    //--------------

    const initialState: IAsigantureState = {
        asignatures: null,
        getAllTasks,
        taskDone,
        taskDelete,
        taskUndone
    }
    const [state, dispatch] = useReducer(asignatureRed,initialState)

    return(
        <AsignaturesContext.Provider value={state}>
            {props.children}
        </AsignaturesContext.Provider>
    )
}