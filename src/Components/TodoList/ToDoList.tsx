import './ToDoList.css'
import { useContext } from "react"
import { AsignaturesContext, GlobalContext} from "../../Context/Contexts"
import Asignature from '../Asignature/Asignature'
import List from '@mui/material/List';
import { Tabs, Tab, Box, Button } from "@mui/material"
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';


export default function ToDoList(){
    //context
    const asignatures = useContext(AsignaturesContext)
    const global = useContext(GlobalContext)


    const day_activities = () => {
        if(asignatures?.asignatures){
            return(
                <div id="daysAsig">
                    {asignatures.asignatures.map(asg => {
                        if(asg.isCheck && !asg.isDone) return( <Asignature {...asg}/>)
                    })}
                </div>
            )
        }

    }

    return(
        <Box sx={{ display: "flex", height: "100%", marginRight: 1}}>
        <List 
            sx={{width: 10000}}
            subheader={<Typography variant="h3" color="secondary">{global?.translation.types.todo}</Typography>}
        >
            <Divider component="li"/>
            {day_activities()}
        </List>
        
        </Box>
    )
}