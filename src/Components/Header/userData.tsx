import { useState, useContext } from "react";
import { GlobalContext, UserContext } from "../../Context/Contexts";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItem, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';

export default function UserData () {
    
    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)
    const navigate = useNavigate()

    const [loading, setLoad] = useState(false)
    const [alter, alternate] = useState<"pass" | "user">("pass")
    //buttons

    const change_password_btn = async () => {
        alternate("pass")
        setLoad(true)
        setTimeout( async () => {
            if(userCon && userCon.isLogged){

                const response = await userCon?.request_password_change(userCon.user.user_id)
                if(response){
                    global?.changeAlert({status: true, type: "warning", text: global.translation.alerts.mail_password_reset})
                }
                else{
                    global?.changeAlert({status: true, type: "error", text: global.translation.alerts.password_changed_error})
                }
           }
           else{
            global?.changeAlert({status: true, type: "error", text: global.translation.alerts.password_changed_error})
           }
           setLoad(false)
        }, 4000);

    }
    const change_username_btn = () => {
        alternate("user")
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
            if(userCon && userCon.isLogged){
                navigate("/urestoration")
            }
            else{
                global?.changeAlert({status: true, type: "error", text: global.translation.alerts.username_changed_error})
            }
        }, 4000);

    }
    const logout_btn = () => {
        userCon?.logout()
        document.location.reload()
    }

    const circleRender_user = () => {
        if(loading && alter === "user"){
            return(<CircularProgress color="secondary"/>)
        }
        else return(<EditIcon fontSize="small"/>)
    }
    const circleRender_pass = () => {
        if(loading && alter === "pass"){
            return(<CircularProgress color="secondary"/>)
        }
        else return(<EditIcon fontSize="small"/>)
    }

    return(
        <Box >
            <ListItem sx={{display: "flex", justifyContent: "space-between"}}>
                <ListItemText>{global?.translation.user_info.username + " "+ userCon?.user.username}</ListItemText>
                <ListItemButton color="primary" disableGutters onClick={change_username_btn} disabled={loading}>
                    <ListItemIcon>{circleRender_user()}</ListItemIcon>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemText>{global?.translation.user_info.email + " "+ userCon?.user.email}</ListItemText>
            </ListItem>
            <ListItem sx={{display: "flex", justifyContent: "space-between"}}>
                <ListItemText>{global?.translation.user_info.password + " **********"}</ListItemText>
                <ListItemButton color="primary" disableGutters onClick={change_password_btn} disabled={loading}>
                    <ListItemIcon>{circleRender_pass()}</ListItemIcon>
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton color="primary" disableGutters onClick={logout_btn}>
                    <ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon>
                    {global?.translation.user_info.logout}
                </ListItemButton>
            </ListItem>
        </Box>
    )
}