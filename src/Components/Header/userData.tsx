import { useState, useContext, useEffect } from "react";
import { GlobalContext, UserContext } from "../../Context/Contexts";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useNavigate } from "react-router";


export default function UserData () {
    
    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)
    const navigate = useNavigate()

    const [loading, setLoad] = useState(false)
    //buttons

    const change_password_btn = async () => {
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

    }

    return(
        <Box >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                    <AccountBoxIcon/>
                    <Typography variant="subtitle1">{userCon?.user.username}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Typography variant="subtitle1">{global?.translation.user_info.username}</Typography>
                        <Typography variant="subtitle2">{userCon?.user.username}</Typography>
                        <Button disabled={loading} variant="contained" color="secondary" size="small" onClick={change_username_btn}>{global?.translation.user_info.change_username}</Button>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">{global?.translation.user_info.email}</Typography>
                        <Typography variant="subtitle2">{userCon?.user.email}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">{global?.translation.user_info.password}</Typography>
                        <Button disabled={loading} variant="contained" color="secondary" size="small" onClick={change_password_btn}>{global?.translation.user_info.change_password}</Button>
                    </Box>
                    <Box>
                        <Button startIcon={<LogoutIcon />} variant="contained" color="secondary" size="small" sx={{marginTop: 2}}>{global?.translation.user_info.logout}</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}