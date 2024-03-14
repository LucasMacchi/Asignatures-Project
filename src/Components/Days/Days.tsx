import "./Days.css"
import { useState, useContext, useEffect } from "react"
import { AsignaturesContext, GlobalContext, UserContext } from "../../Context/Contexts"
import { Tabs, Tab, Box, Button } from "@mui/material"
import Asignature from "../Asignature/Asignature"
import SortByHour from "../../utils/sortByHour"
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

export default function Days(){

    //context
    const asignatures = useContext(AsignaturesContext)
    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)


    const changedTab = (e:any, value: number) => setDay(value)
    const currentDay = new Date().getDay()
    const [day, setDay] = useState(currentDay)

    const maxwidth_list_item = "95%"
    const maxwidth_list = "15%"

    //Loader
    useEffect(() => {
        if(!asignatures?.asignatures && userCon?.isLogged) asignatures?.getAllTasks(userCon.user.user_id)
    },[userCon?.isLogged])

    useEffect(() => {
        global?.changeCurrentDay(day)
    },[day])

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
            <Box sx={{ display: "flex", marginRight: 1, marginLeft: 1}}>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginRight: 1}}>
                    <List 
                    
                    subheader={<Typography variant="h4" color="secondary">{global?.translation.days[1]}</Typography>}
                    >
                        {day_activities(1)}
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1, marginRight: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[2]}</Typography>}
                        >
                            {day_activities(2)}
                        </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1, marginRight: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[3]}</Typography>}
                        >
                            {day_activities(3)}
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1, marginRight: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[4]}</Typography>}
                        >
                            {day_activities(4)}
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1, marginRight: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[5]}</Typography>}
                        >
                            {day_activities(5)}
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1, marginRight: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[6]}</Typography>}
                        >
                            {day_activities(6)}
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display: "flex", width: maxwidth_list, height: "100%", marginLeft: 1}}>
                    <List 
                        sx={{width: maxwidth_list_item}}
                        subheader={<Typography variant="h4" color="secondary">{global?.translation.days[0]}</Typography>}
                        >
                            {day_activities(0)}
                    </List>
                </Box>
                

            </Box>
            
            
            
            

        </div>
    )
}
/*
{day_activities(day)}

<Tabs value={day} centered variant="fullWidth" textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
<Tab value={1} label={global?.translation.days[1]}/>
<Tab value={2} label={global?.translation.days[2]}/>
<Tab value={3} label={global?.translation.days[3]}/>
<Tab value={4} label={global?.translation.days[4]}/>
<Tab value={5} label={global?.translation.days[5]}/>
<Tab value={6} label={global?.translation.days[6]}/>
<Tab value={0} label={global?.translation.days[0]}/>
</Tabs>
*/