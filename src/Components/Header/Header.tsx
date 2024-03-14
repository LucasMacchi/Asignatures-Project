import "./Header.css"
import { useState, useContext, useEffect } from "react";
import { GlobalContext, UserContext } from "../../Context/Contexts";
import UserData from "./userData";
//Material import
import { AppBar, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from "@mui/material/Typography";
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuList from '@mui/material/MenuList';
import Switch from '@mui/material/Switch';

function Header(){

    //menu

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    //context
    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)
    //states    
    const [check, setChecked] = useState(false)
    //functions
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(event.target.checked === true) global?.changeLanguage("spa")
        else global?.changeLanguage("en")
    };
    const changedTab = (value: number) => {
        if(value === 1) global?.changeType("check")
        else global?.changeType("week")
    }
    const changeLanguage = (event: SelectChangeEvent) => {
        global?.changeLanguage(event.target.value)
    }

    const loginBtn = () => {
        global?.changeDialogLogin(true)
    }

    const loginDisplay = () => {
        if(userCon?.isLogged){
            return(
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList>
                    <UserData/>
                </MenuList>
                
            </Menu>
            )
        }
    }

    return(
        <AppBar position="static">
            <div id="navBar-Tab">
                <Box sx={{display: "flex", alignItems: "center"}}>
                <EventNoteIcon/>
                <Button color="secondary" onClick={() => changedTab(0)}>{global?.translation.types.week}</Button>
                <Button color="secondary" onClick={() => changedTab(1)}>{global?.translation.types.todo}</Button>
                <Button color="secondary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={userCon?.isLogged ? handleClick : loginBtn}>
                    {userCon?.isLogged ? global?.translation.user_info.user_information : global?.translation.login.log_btn}
                </Button>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    <Typography>ENG</Typography>
                        <Switch checked={check} onChange={(handleChange)} color="secondary"/>
                    <Typography>SPA</Typography>
                </Box>
                {loginDisplay()}
            </div>

        </AppBar>
    )
}

export default Header;

/*
                <Tabs value={tabPos} textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
                    <Tab label={global?.translation.types.week} value={0}/>
                    <Tab label={global?.translation.types.todo} value={1}/>
                </Tabs>
                */