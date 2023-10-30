import "./Days.css"
import { useState, useContext } from "react"
import { AsignaturesContext, GlobalContext } from "../../Context/Contexts"
import { Tabs, Tab, Box } from "@mui/material"
import Asignature from "../Asignature/Asignature"
import SortByHour from "../../utils/sortByHour"

export default function Days(){

    //context
    const asignatures = useContext(AsignaturesContext)
    const global = useContext(GlobalContext)

    const changedTab = (e:any, value: number) => setDay(value)
    const currentDay = new Date().getDay()
    console.log(currentDay)
    const [day, setDay] = useState(currentDay)

    const day_activities = (day: number) => {
        if(asignatures?.asignatures){
            return(
                <div id="daysAsig">
                    {asignatures.asignatures.sort(SortByHour).map(asg => {
                        if(asg.day === day && !asg.isCheck) return( <Asignature {...asg}/>)
                    })}
                </div>
            )
        }

    }

    return (
        <div id="days_div">
            <Box sx={{bgcolor: 'background.paper'}}>
                <Tabs value={day} centered variant="fullWidth" textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
                    <Tab value={1} label={global?.translation.days[1]}/>
                    <Tab value={2} label={global?.translation.days[2]}/>
                    <Tab value={3} label={global?.translation.days[3]}/>
                    <Tab value={4} label={global?.translation.days[4]}/>
                    <Tab value={5} label={global?.translation.days[5]}/>
                    <Tab value={6} label={global?.translation.days[6]}/>
                    <Tab value={0} label={global?.translation.days[0]}/>
                </Tabs>
            </Box>
            
            {day_activities(day)}
            
            

        </div>
    )
}