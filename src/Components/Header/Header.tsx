import "./Header.css"
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/Contexts";

//Material import
import { AppBar, Menu } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from "@mui/material/Button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from "@mui/material";

function Header(){

    
    //context
    const global = useContext(GlobalContext)
    
    //states
    const[tabPos, setTabPos] = useState(0);
    
    useEffect(() => {
        if(tabPos === 0) global?.changeType('week')
        else global?.changeType('check')
    },[tabPos])

    //functions
    const changedTab = async (e:any, value: number) => {
        setTabPos(value)
    }
    const changeLanguage = (event: SelectChangeEvent) => {
        global?.changeLanguage(event.target.value)
    }

    return(
        <AppBar position="static">
            <div id="navBar-Tab">
                <div>
                    <h3>Logo here</h3>
                    
                </div>
                
                <Tabs value={tabPos} centered textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
                    <Tab icon={<CalendarMonthIcon/>} iconPosition="start" label={global?.translation.types[0]} value={0}/>
                    <Tab icon={<CheckBoxIcon/>} iconPosition="start" label={global?.translation.types[1]} value={1}/>
                </Tabs>
                <div id="Login-button">
                    <LanguageIcon fontSize="large"/>
                        <FormControl sx={{minWidth: 120}}>
                            <Select id="language_selector" value={global?.language} onChange={changeLanguage}>
                                <MenuItem color="secondary" value={'en'}>EN</MenuItem>
                                <MenuItem value={'spa'}>SPA</MenuItem>
                            </Select>
                        </FormControl>
                    <Button variant="outlined" color="secondary" size="large">Login</Button>
                </div>
            </div>

        </AppBar>
    )
}

export default Header;