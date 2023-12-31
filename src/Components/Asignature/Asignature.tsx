import './Asignature.css'
import { IAsignature } from '../../interfaces/interfaces'
import { GlobalContext, AsignaturesContext } from '../../Context/Contexts'
import { useState, useContext, useEffect } from 'react'
import hoursParser from '../../utils/hourParser'
import GetDayofWeek from '../../utils/getDayOfWeek'
import {Card, CardContent, Typography, CardActions, IconButton} from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Asignature(prop: IAsignature){

    //context
    const global = useContext(GlobalContext)
    const asignatureContext = useContext(AsignaturesContext)

    const asignature = prop
    const hour = hoursParser(asignature.hour,asignature.minutes).getHours()
    const minute = hoursParser(asignature.hour,asignature.minutes).getMinutes()

    const [status, setStatus] = useState("")

    useEffect(() => {
        asignatureContext?.taskUndone(asignature.id)
    },[])

    //functions
    const renderBtns = () => {
        if(!prop.isDone){
            return(
                <CardActions>
                <IconButton color='error' onClick={deleteBtn}>
                    <DeleteForeverOutlinedIcon/>
                </IconButton>
                <IconButton color='success' onClick={doneBtn}>
                    <CheckCircleOutlineOutlinedIcon/>
                </IconButton>
            </CardActions> 
            )
        }
    }

    //Buttons
    const doneBtn = () => {
        asignatureContext?.taskDone(prop.id)
        if(prop.isCheck) asignatureContext?.taskDelete(prop.id)
    }
    const deleteBtn = () => {
        asignatureContext?.taskDelete(prop.id)
    }
    
    return(
        <div id='cardAsignatureDiv'>
        <Card variant="outlined" sx={{width: 900 }}>
            <CardContent>
                {asignature.isCheck ? status : <Typography variant='subtitle1' gutterBottom>{global?.translation.days[asignature.day]} - {hour}:{minute}</Typography>}
                <Typography variant='h5' >{asignature.title}</Typography>
                <Typography variant='body1'>{asignature.description}</Typography>
                {prop.isDone && <CheckCircleOutlineOutlinedIcon color='success' fontSize='large'/>}
            </CardContent>
            {renderBtns()}
        </Card>
        </div>

    )

}