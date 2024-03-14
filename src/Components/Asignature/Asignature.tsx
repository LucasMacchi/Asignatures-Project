import './Asignature.css'
import { IAsignature } from '../../interfaces/interfaces'
import { GlobalContext, AsignaturesContext, UserContext } from '../../Context/Contexts'
import { useState, useContext } from 'react'
import hoursParser from '../../utils/hourParser'
import {Box, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Asignature(prop: IAsignature){

    //context
    const global = useContext(GlobalContext)
    const asignatureContext = useContext(AsignaturesContext)
    const userCon = useContext(UserContext)

    const asignature = prop
    let hour = hoursParser(asignature.hour,asignature.minutes).getHours()
    let minute = hoursParser(asignature.hour,asignature.minutes).getMinutes()
    const maxwidth_list_item = "95%"
    let time: string = ""
    if(hour < 10){
        time = "0"+hour+":"
    }
    else time = hour+":"
    if(minute < 10){
        time = time + "0"+minute
    }
    else time = time + minute

    const [status, _setStatus] = useState("")



    const deleteBtn = async () => {
        if(userCon?.isLogged)  asignatureContext?.taskDelete(prop.id, userCon.user.user_id)
    }

    
    return(
    <ListItem  sx={{bgcolor: 'background.paper', borderRadius: 2, marginTop: 2, padding: 1, width: asignature.isCheck ?  "1000px" : maxwidth_list_item}} alignItems='flex-start'>
        
        <ListItemButton sx={{width: "10%", padding: 0, marginRight: 1.4}} dense alignItems='flex-start' onClick={deleteBtn}>
            <ListItemIcon>
                <DeleteIcon fontSize={asignature.isCheck ? "large" : "small"} color='error'/>
            </ListItemIcon>
        </ListItemButton>
        <ListItemText
        sx={{width: asignature.isCheck ? maxwidth_list_item : "100%"}}
         primary={<Typography gutterBottom paragraph={true} variant={asignature.isCheck ? "h3" : "subtitle1"} color="secondary">{ asignature.isCheck ? asignature.title : time}</Typography>}
         secondary={
            <Box>
                <Divider/>
                <Typography gutterBottom paragraph={true} variant={"subtitle1"} color="secondary" display={ asignature.isCheck ? "none" : "block"}>{asignature.title}</Typography>
                <Typography sx={{wordWrap: "break-word" }} gutterBottom paragraph={true} variant={asignature.isCheck ? "subtitle1" : "caption"} color="secondary">{asignature.description}</Typography>
            </Box>
         }
         
         >
            
         </ListItemText>
        


    </ListItem>

    )

}
/*
id='item-list' aria-haspopup="true" onClick={handleClick} aria-controls={menu ? 'item-menu' : undefined} aria-expanded={menu ? 'true' : undefined}
        <Menu
            id='item-menu'
            anchorEl={anchorEl}
            open={menu}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'item-list',
              }}
        >
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
        </Menu>

        <ListItemButton onClick={deleteBtn}><DeleteForeverOutlinedIcon color='error'/></ListItemButton>
        {renderBtns_done()}
        <Button id='item-list' onClick={handleClick} aria-haspopup="true" aria-controls={menu ? 'item-menu' : undefined} aria-expanded={menu ? 'true' : undefined} >aaaaaa</Button>
        */