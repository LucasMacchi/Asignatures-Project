import './ToDoList.css'
import { useState, useContext } from "react"
import { AsignaturesContext } from "../../Context/Contexts"
import Asignature from '../Asignature/Asignature'
export default function ToDoList(){
    //context
    const asignatures = useContext(AsignaturesContext)

    const day_activities = () => {
        if(asignatures?.asignatures){
            return(
                <div id="daysAsig">
                    {asignatures.asignatures.map(asg => {
                        if(asg.isCheck) return( <Asignature {...asg}/>)
                    })}
                </div>
            )
        }

    }

    return(
        <div>
            {day_activities()}
        </div>
    )
}