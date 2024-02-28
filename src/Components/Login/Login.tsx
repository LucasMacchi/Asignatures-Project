import "./Login.css";
import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext, UserContext } from '../../Context/Contexts';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {IUserLogin, emailRegex } from '../../interfaces/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Login () {

    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)
    const [formsError, setError] = useState({
        emailError: false,
        emailMsg: "",
        passwordError: false,
        passwordMsg: ""
    })
    const [userLogin, setUserLogin] = useState<IUserLogin>({
        email: "",
        password: ""
    })
    const [loginMode, setMode] = useState(false)
    const [loading, setLoad] = useState(false)

    const handleClose = () => {
        global?.changeDialogLogin(false)
    }

    const errorHandlerEmail = () => {
        if(userLogin.email === "") setError({...formsError, emailError: true, emailMsg: global?.translation.errors.email_valid || "error"})
        else if(!emailRegex.test(userLogin.email)) setError({...formsError, emailError: true, emailMsg: global?.translation.errors.email_valid || "error"})
        else setError({...formsError, emailError: false, emailMsg: ""})
    }
    const errorHandlerPassword = () => {
        if(userLogin.password === "") setError({...formsError, passwordError: true, passwordMsg: global?.translation.errors.password_valid || "error"})
        else setError({...formsError, passwordError: false, passwordMsg: ""})
    }
    useEffect(errorHandlerEmail,[userLogin.email])
    useEffect(errorHandlerPassword,[userLogin.password])

    const handleUser = (prop: string, payload: string) => {
        setUserLogin({
            ...userLogin,
            [prop]: payload
        })
    }

    const logButton = async () => {
        setLoad(true)
        const validation = await userCon?.login(userLogin.email, userLogin.password)
        setTimeout(() => {
            if(!validation) {
                global?.changeAlert({status: true, text: global.translation.alerts.login_error, type: "error"})
                setUserLogin({email: "", password: ""})
                setLoad(false)
            }
            else {
                global?.changeDialogLogin(false)
                global?.changeAlert({status: true, text: global.translation.alerts.login_success, type: "success"})
                /* MAYBE RELOAD PAGE ? */
            }
            setUserLogin({email: "", password: ""})
        }, 2500);

    }

    const registerBtn = () => {
        global?.changeDialogLogin(false)
        setUserLogin({email: "", password: ""})
        global?.changeDialogRegister(true)
    }

    const login_mode_textfields = () => {
        return(
           <Box>
                <Box>
                    <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={global?.translation.login.email} color="secondary" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)}/>
                </Box>
                <Box sx={{marginTop: 2}}>
                    <TextField type="password" error={formsError.passwordError} helperText={formsError.passwordMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.login.password} color="secondary" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)}/>
                </Box>
           </Box> 
        )
    }
    const restore_password_mode = () => {
        return(
            <Box>
                <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={global?.translation.login.email} color="secondary" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)}/>
            </Box>
        )
    }
    const title = () => {
        if(loginMode) return global?.translation.login.log_title
        else return global?.translation.login.restore_password
    }
    const restoreBtn = async () => {
        setLoad(true)
        const response = await userCon?.request_password_change_email(userLogin.email)
        setTimeout(() => {
            if(response){
                global?.changeAlert({status: true, type: "warning", text: global.translation.alerts.mail_password_reset})
                global?.changeDialogLogin(false)
                setLoad(false)
            }
            else{
                global?.changeAlert({status: true, type: "error", text: global.translation.alerts.password_changed_error})
                setUserLogin({password: "", email: ""})
                setLoad(false)
            }

        }, 2500);

    }
    const confimation_buttons = () => {
        if(loginMode){
            return(
                <Box sx={{marginTop: 1.5, display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={registerBtn} size="small" variant="outlined" color="secondary" startIcon={<HowToRegIcon/>}> {global?.translation.login.sign_up_btn} </Button>
                    <Button disabled={formsError.emailError || loading} size="small" variant="outlined" color="secondary" startIcon={<LoginIcon/>} onClick={logButton}> {global?.translation.login.log_btn} </Button>
                    {loading && <CircularProgress color="secondary"/>}
                </Box>
            )
        }
        else{
            return(
                <Box sx={{marginTop: 1.5, display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={() => setMode(true)} size="small" variant="outlined" color="secondary" startIcon={<LoginIcon/>}> {global?.translation.login.log_btn} </Button>
                    <Button disabled={formsError.emailError || loading} size="small" variant="outlined" color="secondary" startIcon={<LoginIcon/>} onClick={restoreBtn}> {global?.translation.login.restore_btn} </Button>
                    {loading && <CircularProgress color="secondary"/>}
                </Box>
            )
        }
    }

    return(
        <Backdrop open={global ? global.loginDialog : false}>
            <Paper>
                <Box component="form" width={300} padding={4}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h5" color="secondary">{title()}</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='secondary'/>
                        </IconButton>
                    </Box>
                    {loginMode ? login_mode_textfields() : restore_password_mode()}
                    {confimation_buttons()}
                </Box>
            </Paper>
        </Backdrop>
    )
}
