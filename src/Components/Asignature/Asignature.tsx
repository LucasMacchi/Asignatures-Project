import './Asignature.css'
import { IAsignature } from '../../interfaces/interfaces'
import hoursParser from '../../utils/hourParser'
import GetDayofWeek from '../../utils/getDayOfWeek'
import {Card, CardContent, Typography, CardActions, IconButton} from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Asignature(prop: IAsignature){

    const asignature = prop
    const hour = hoursParser(asignature.hour,asignature.minutes).getHours()
    const minute = hoursParser(asignature.hour,asignature.minutes).getMinutes()


    
    return(
        <div id='cardAsignatureDiv'>
        <Card variant="outlined" sx={{width: 900 }}>
            <CardContent>
                <Typography variant='subtitle1' gutterBottom>{GetDayofWeek(asignature.day)} - {hour}:{minute}</Typography>
                <Typography variant='h5' >{asignature.title}</Typography>
                <Typography variant='body1'>{asignature.description}</Typography>
            </CardContent>
            <CardActions>
                <IconButton color='error'>
                    <DeleteForeverOutlinedIcon/>
                </IconButton>
                <IconButton color='error'>
                    <CancelOutlinedIcon/>
                </IconButton>
                <IconButton color='success'>
                    <CheckCircleOutlineOutlinedIcon/>
                </IconButton>
            </CardActions>
        </Card>
        </div>

    )

}