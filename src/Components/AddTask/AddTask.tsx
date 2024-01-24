import './AddTask.css'
import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext, AsignaturesContext } from '../../Context/Contexts';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { minutes, hours, IAsignature_add } from '../../interfaces/interfaces';

import CloseIcon from '@mui/icons-material/Close';

export default function AddTask () {

    const global = useContext(GlobalContext)
    const asignatureCont = useContext(AsignaturesContext)
    const currentDay = new Date().getDay()
    const currentHour = new Date().getHours()
    const currentMinutes = new Date().getMinutes()

    const [btn, setBtn] = useState(true)
    const [task, setTask] = useState<IAsignature_add>({
        title:"",
        description: "",
        hour: currentHour,
        minutes: currentMinutes,
        isDone: false,
        isExpire: false,
        day: currentDay,
        isCheck: false
    })

    useEffect(() => {
        emptyState()
    },[global?.changeDialogAddTask])


    useEffect(() => {
        if(task.day && task.title && task.hour && task.description) setBtn(false)
        else{setBtn(true)}
    },[task])

    const handleClose = () => {
        emptyState()
        global?.changeDialogAddTask(false)
    }

    const emptyState = () => {
        task.description = ""
        task.title = ""
    }

    const createTask = () => {
        if(!btn){
            console.log("TASK CREATED",task)
            asignatureCont?.taskAdd(task)
            global?.changeAlert({status: true, text: global?.translation.alerts.new_task, type: "success"})
            global?.changeDialogAddTask(false)  
            emptyState()
        }

    }

    const onChange = (prop: string, payload: string | number) => {
        setTask({
            ...task,
            isCheck: global?.type === "check" ? true : false,
            [prop]: payload
        })
    }
    

    return(
        <Backdrop open={global ? global.addTaskDialog : false}>
            <Paper>
                <Box component="form" width={600} padding={4}>
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='secondary'/>
                        </IconButton>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <Box>
                            <Typography variant="h5" color="secondary">{global?.translation.task.title}</Typography>
                            <TextField id='title' onChange={(e) => onChange("title",e.target.value)} value={task.title}></TextField>
                        </Box>
                        <Box marginLeft={5} display={global?.type === "check" ? "none" : "block"}>
                            <Typography variant="h5" color="secondary">{global?.translation.task.time}</Typography>
                            <TextField id='hour' onChange={(e) => onChange("hour",e.target.value)} value={task.hour} select>
                                {hours.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField id='minutes' onChange={(e) => onChange("minutes",e.target.value)} value={task.minutes} select>
                            {minutes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                    <Typography variant="h5" color="secondary">{global?.translation.task.description}</Typography>
                    <TextField id='body' onChange={(e) => onChange("description",e.target.value)} value={task.description} multiline fullWidth rows={5}>  </TextField>
                    <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: 2}}>
                        <Button variant="contained" onClick={createTask} disabled={btn} color='secondary'>{global?.translation.task.create_task}</Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>

    )
}