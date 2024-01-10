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

    const handleClose = () => {
        global?.changeDialogLogin(false)
    }

    const errorHandlerEmail = () => {
        if(userLogin.email === "") setError({...formsError, emailError: true, emailMsg: global?.translation.labels[8] || "error"})
        else if(!emailRegex.test(userLogin.email)) setError({...formsError, emailError: true, emailMsg: global?.translation.labels[8] || "error"})
        else setError({...formsError, emailError: false, emailMsg: ""})
    }
    const errorHandlerPassword = () => {
        if(userLogin.password === "") setError({...formsError, passwordError: true, passwordMsg: global?.translation.labels[10] || "error"})
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
        const validation = await userCon?.login(userLogin.email, userLogin.password)
        if(!validation) setError({...formsError, passwordError: true, passwordMsg: global?.translation.labels[9] || "error"})
        setUserLogin({email: "", password: ""})
    }

    const registerBtn = () => {
        global?.changeDialogLogin(false)
        global?.changeDialogRegister(true)
    }

    return(
        <Backdrop open={global ? global.loginDialog : false}>
            <Paper>
                <Box component="form" width={300} padding={4}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h5" color="secondary">Log in</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='secondary'/>
                        </IconButton>
                    </Box>
                    <Box>
                        <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={global?.translation.labels[4]} color="secondary" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField type="password" error={formsError.passwordError} helperText={formsError.passwordMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.labels[5]} color="secondary" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 1.5, display: "flex", justifyContent: "space-between"}}>
                        <Button onClick={registerBtn} size="small" variant="outlined" color="secondary" startIcon={<HowToRegIcon/>}> {global?.translation.labels[7]} </Button>
                        <Button disabled={formsError.emailError} size="small" variant="outlined" color="secondary" startIcon={<LoginIcon/>} onClick={logButton}> {global?.translation.labels[6]} </Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}

/*
                        <Typography variant="h5" color="secondary">
                            {global?.translation.labels[4]}
                        </Typography>
*/