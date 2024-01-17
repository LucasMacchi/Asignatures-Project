import "./Resgister.css";
import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext, UserContext } from '../../Context/Contexts';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {IUserRegister, emailRegex } from '../../interfaces/interfaces';

import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Checkbox from '@mui/material/Checkbox';


export default function Register () {

    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)

    const [formsError, setError] = useState({
        emailError: false,
        emailMsg: "",
        passwordError: false,
        passwordMsg: "",
        passwordConError: false,
        passwordConMsg: "",
        userError: false,
        userMsg: "",
        adultError: false

    })

    const [userRegister, setUserRegister] = useState<IUserRegister>({
        email: "",
        password: "",
        passwordCon: "",
        user: "",
        adult: false,
    })

    const handleUser = (prop: string, payload: string | boolean) => {
        setUserRegister({
            ...userRegister,
            [prop]: payload
        })
    }

    const handleClose = () => {
        emptyState()
        global?.changeDialogRegister(false)
    }

    const errorHandlerEmail = () => {
        if(userRegister.email === "") setError({...formsError, emailError: true, emailMsg: global?.translation.labels[8] || "error"})
        else if(!emailRegex.test(userRegister.email)) setError({...formsError, emailError: true, emailMsg: global?.translation.labels[8] || "error"})
        else setError({...formsError, emailError: false, emailMsg: ""})
    }

    const errorHandlerPassword = () => {
        if(userRegister.password === "") setError({...formsError, passwordError: true, passwordMsg: global?.translation.labels[10] || "error"})
        else setError({...formsError, passwordError: false, passwordMsg: ""})
    }

    const errorHandlerPasswordConfirmation = () => {
        if(userRegister.passwordCon !== userRegister.password) setError({...formsError, passwordConError: true, passwordConMsg: global?.translation.labels[13] || "error"})
        else setError({...formsError, passwordConError: false, passwordConMsg: ""})
    }
    
    const errorHandlerUsername = () => {
        if(userRegister.user === "") setError({...formsError, userError: true, userMsg: global?.translation.labels[14] || "error"})
        else setError({...formsError, userError: false, userMsg: ""})
    }

    useEffect(errorHandlerEmail,[userRegister.email])
    useEffect(errorHandlerPassword,[userRegister.password])
    useEffect(errorHandlerPasswordConfirmation,[userRegister.passwordCon])
    useEffect(errorHandlerUsername,[userRegister.user])

    const checked = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleUser("adult", event.target.checked)
    }

    const emptyState = () => {
        setUserRegister({
            email: "",
            user: "",
            password: "",
            passwordCon: "",
            adult: false
        })
    }

    const register = async () => {
        const user = userRegister
        console.log("aca ",user)
        const validation = await userCon?.register(user.email, user.user, user.password)
        console.log("aca2 ",validation)
        if(!validation) {
            emptyState()
            global?.changeAlert({status: true, text: global.translation.alerts[1], type: "error"})
        }
        else{
            global?.changeAlert({status: true, text: global.translation.alerts[2], type: "success"})
            emptyState()
            global?.changeDialogRegister(false)
        }
    }

    return(
        <Backdrop open={global ? global.registerDialog : false}>
            <Paper>
                <Box component="form" width={300} padding={4}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h5" color="secondary">{global?.translation.labels[7]}</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='secondary'/>
                        </IconButton>
                    </Box>
                    <Box>
                        <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={global?.translation.labels[4]} color="secondary" value={userRegister.email} onChange={(e) => handleUser("email", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField  error={formsError.userError} helperText={formsError.userMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.labels[12]} color="secondary" value={userRegister.user} onChange={(e) => handleUser("user", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField type="password" error={formsError.passwordError} helperText={formsError.passwordMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.labels[5]} color="secondary" value={userRegister.password} onChange={(e) => handleUser("password", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField type="password" error={formsError.passwordConError} helperText={formsError.passwordConMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.labels[11]} color="secondary" value={userRegister.passwordCon} onChange={(e) => handleUser("passwordCon", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <Typography variant="subtitle2">{global?.translation.labels[15]}</Typography>
                        <Checkbox checked={userRegister.adult} color="secondary" onChange={(e) => checked(e)} />
                    </Box>
                    <Box sx={{marginTop: 1.5, display: "flex", justifyContent: "flex-end"}}>
                        <Button onClick={register} disabled={formsError.adultError || formsError.emailError || formsError.passwordConError || formsError.passwordError || formsError.userError || !userRegister.adult} size="small" variant="outlined" color="secondary" startIcon={<HowToRegIcon/>}> {global?.translation.labels[7]} </Button>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )
}