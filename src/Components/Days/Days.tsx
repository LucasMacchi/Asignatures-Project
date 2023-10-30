import "./Days.css"
import { useState, useContext } from "react"
import { AsignaturesContext } from "../../Context/Contexts"
import { Tabs, Tab, Box } from "@mui/material"
import Asignature from "../Asignature/Asignature"
import SortByHour from "../../utils/sortByHour"

export default function Days(){

    //context
    const asignatures = useContext(AsignaturesContext)

    const changedTab = (e:any, value: number) => setDay(value)
    const [day, setDay] = useState(1)

    const day_activities = (day: number) => {
        if(asignatures?.asignatures){
            return(
                <div id="daysAsig">
                    {asignatures.asignatures.sort(SortByHour).map(asg => {
                        if(asg.day === day) return( <Asignature {...asg}/>)
                    })}
                </div>
            )
        }

    }

    return (
        <div id="days_div">
            <Box sx={{bgcolor: 'background.paper'}}>
                <Tabs value={day} centered variant="fullWidth" textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
                    <Tab value={0} label="Lunes"/>
                    <Tab value={1} label="Martes"/>
                    <Tab value={2} label="Miercoles"/>
                    <Tab value={3} label="Jueves"/>
                    <Tab value={4} label="Viernes"/>
                    <Tab value={5} label="Sabado"/>
                    <Tab value={6} label="Domingo"/>
                </Tabs>
            </Box>
            
            {day_activities(day)}
            
            

        </div>
    )
}