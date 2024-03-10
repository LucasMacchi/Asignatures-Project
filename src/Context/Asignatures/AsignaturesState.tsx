import {useReducer} from "react";
import { IAsigantureState, IPropsChildren,IAction, IAsignature_add } from "../../interfaces/interfaces";
import { AsignaturesContext } from "../Contexts";
import t from "../Types";
import axios from "axios";
import { getJWT } from "../../utils/sessionJwt";

const serverUrl = process.env.REACT_APP_SERVER_URL

//Reducer//------------------------------------------
const asignatureRed = (state: IAsigantureState, action: IAction) : IAsigantureState => {
    const {payload, type} = action
    switch(type){
        case t.GET_ALL_TASK:
            return {...state, asignatures: payload}
        case t.TASK_DONE:
            const newState = state.asignatures?.map(task => {
                if(task.id === payload) task.isDone = true
                return task
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
    const getAllTasks = async (user_id: string) => {
        try {
            const tasks = await axios.get(serverUrl+'/task/all/'+user_id, {headers: {Authorization: getJWT()}})
            dispatch({
                type: t.GET_ALL_TASK,
                payload: tasks.data
            })        
        } catch (error) {
        }

    }
    const taskDone = async (task_id: string, user_id: string) => {
        try {
            await axios.patch(serverUrl+'/task/done', {task_id, user_id}, {headers: {Authorization: getJWT()}})
            dispatch({
                type: t.TASK_DONE,
                payload: task_id
            })        
        } catch (error) {
            console.log("ERROR: ",error)
        }

    }
    const taskDelete = async (task_id: string, user_id: string) => {
        try {
            await axios.delete(serverUrl+'/task/delete', {data: {task_id, user_id}, headers: {Authorization: getJWT()}})
            dispatch({
                type: t.TASK_DELETE,
                payload: task_id
            })
        } catch (error) {
            console.log("ERROR: ",error)
        }

    }
    const taskUndone = async (task_id: string, user_id: string) => {
        try {
            await axios.patch(serverUrl+'/task/undone', {task_id, user_id}, {headers: {Authorization: getJWT()}})
            console.log("TASK "+task_id+" UNDONE")
            dispatch({
                type: t.TASK_UNDONE,
                payload: task_id
            })
        } catch (error) {
            console.log("ERROR: ",error)
        }
    }
    const taskAdd = async (task: IAsignature_add): Promise<boolean> => {
        try {
            const res: boolean = await (await axios.post(serverUrl+'/task/add', task, {headers: {Authorization: getJWT()}})).data
            return res
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }

    }

    //--------------

    const initialState: IAsigantureState = {
        asignatures: null,
        getAllTasks,
        taskDone,
        taskDelete,
        taskUndone,
        taskAdd
    }
    const [state, dispatch] = useReducer(asignatureRed,initialState)

    return(
        <AsignaturesContext.Provider value={state}>
            {props.children}
        </AsignaturesContext.Provider>
    )
}