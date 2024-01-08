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
import {IUserLogin, emailRegex } from '../../interfaces/interfaces';

import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Register () {

    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)

    return(
        <Backdrop open={global ? global.registerDialog : false}>

        </Backdrop>
    )
}