import "./Changer.css"

import { GlobalContext, UserContext } from "../../Context/Contexts";
import React, { useState, useContext, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useNavigate } from "react-router";
import { Alert } from "@mui/material";
export default function Changer () {

    const displayAlert = () => {
        setTimeout(() => {
          global?.changeAlert({status: false, text: "", type: "success"})
        }, 4000);
        return(<Alert variant="filled" severity={global?.alertType}>{global?.alertText}</Alert>)
      }

        //context
        const global = useContext(GlobalContext)
        const userCon = useContext(UserContext)
        const navigate = useNavigate()
        const {token_id, user_id} = useParams()
        

        const [formsError, setError] = useState({
            passwordError: false,
            passwordMsg: "",
            passwordConError: false,
            passwordConMsg: "",
            userError: false,
            userMsg: "",
        })

        const [dataChange, setData] = useState({
            password: "",
            passwordCon: "",
            user: "",
        })

        const [loading, setLoad] = useState(false)
        const [isPassword, setType] = useState(true)

        useEffect(() => {
            if(token_id && user_id) {
                setType(true)
            }
            else{
                setType(false)
            }
        },[])

        const handleData = (prop: string, payload: string | boolean) => {
            setData({
                ...dataChange,
                [prop]: payload
            })
        }

        const errorHandlerPassword = () => {
            if(dataChange.password === "") setError({...formsError, passwordError: true, passwordMsg: global?.translation.errors.password_valid || "error"})
            else if(dataChange.password.length < 8) setError({...formsError, passwordError: true, passwordMsg: global?.translation.errors.password_min || "error"})
            else setError({...formsError, passwordError: false, passwordMsg: ""})
        }
    
        const errorHandlerPasswordConfirmation = () => {
            if(dataChange.passwordCon !== dataChange.password) setError({...formsError, passwordConError: true, passwordConMsg: global?.translation.errors.password_match || "error"})
            else setError({...formsError, passwordConError: false, passwordConMsg: ""})
        }
        
        const errorHandlerUsername = () => {
            if(dataChange.user === "") setError({...formsError, userError: true, userMsg: global?.translation.errors.user_valid || "error"})
            else setError({...formsError, userError: false, userMsg: ""})
        }
        useEffect(errorHandlerPassword,[dataChange.password])
        useEffect(errorHandlerPasswordConfirmation,[dataChange.passwordCon])
        useEffect(errorHandlerUsername,[dataChange.user])


        const handleClose = () => {
            navigate("/")
        }

        const confirm = async () => {
            if(isPassword){
                if(userCon && token_id && user_id && dataChange.password){
                    const response = await userCon.change_password(token_id, user_id, dataChange.password)
                    if(response){
                        setLoad(true)
                        setTimeout(() => {
                            global?.changeAlert({status: true, type: "success", text: global.translation.alerts.password_changed_succ})
                            navigate("/")
                        }, 4000);
                    }
                    else{
                        global?.changeAlert({status: true, type: "error", text: global.translation.alerts.password_changed_error})
                    }
                }
                else{
                    global?.changeAlert({status: true, type: "error", text: global.translation.alerts.password_changed_error})

                }
            }
            else{
                if(userCon && userCon.isLogged){
                    const response = await userCon.change_username(userCon.user.user_id, dataChange.user)
                    if(response){
                        setLoad(true)
                        setTimeout(() => {
                            global?.changeAlert({status: true, type: "success", text: global.translation.alerts.username_changed_succ})
                            navigate("/")
                        }, 4000);
                    }
                    else{
                        global?.changeAlert({status: true, type: "error", text: global.translation.alerts.username_changed_error})
                    }
                }
                else{
                    global?.changeAlert({status: true, type: "error", text: global.translation.alerts.username_changed_error})
                }
            }
        }

        const password_restoration = () => {
            
            return(
                <Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField type="password" error={formsError.passwordError} helperText={formsError.passwordMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.register.password} color="secondary" value={dataChange.password} onChange={(e) => handleData("password", e.target.value)}/>
                    </Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField type="password" error={formsError.passwordConError} helperText={formsError.passwordConMsg} fullWidth id="password" size="small" variant="filled" label={global?.translation.register.password_con} color="secondary" value={dataChange.passwordCon} onChange={(e) => handleData("passwordCon", e.target.value)}/>
                    </Box>
                </Box>
            )
        }
        const username_restoration = () => {
            return(
                <Box>
                    <Box sx={{marginTop: 2}}>
                        <TextField  error={formsError.userError} helperText={formsError.userMsg} fullWidth id="username" size="small" variant="filled" label={global?.translation.register.username} color="secondary" value={dataChange.user} onChange={(e) => handleData("user", e.target.value)}/>
                    </Box>
                </Box>
            )
        }

        const button_selection = () => {
            if(isPassword){
                return(
                    <Button onClick={confirm} disabled={formsError.passwordConError || formsError.passwordError || loading} size="small" variant="outlined" color="secondary" > {global?.translation.changer.password_btn} </Button>
                )
            }
            else{
                return(
                    <Button onClick={confirm} disabled={formsError.userError || loading} size="small" variant="outlined" color="secondary" > {global?.translation.changer.username} </Button>
                )
            }
        }

    return (
        <Backdrop open={true}>
            <Paper>
                <Box component="form" width={300} padding={4}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h5" color="secondary">{isPassword ? global?.translation.changer.password_title : global?.translation.changer.username_title}</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='secondary'/>
                        </IconButton>
                    </Box>
                    {isPassword ? password_restoration() : username_restoration()}
                    <Box sx={{marginTop: 1.5, display: "flex", justifyContent: "flex-end"}}>
                        {button_selection()}
                        {loading && <CircularProgress color="secondary"/>}
                    </Box>
                </Box>
            </Paper>
            <div id='alert'>
              {global?.alert && displayAlert()}
            </div>
        </Backdrop>
        
    )
}