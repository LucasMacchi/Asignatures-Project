import { useState, useContext, useEffect } from "react";
import { GlobalContext, UserContext } from "../../Context/Contexts";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function UserData () {
    
    const global = useContext(GlobalContext)
    const userCon = useContext(UserContext)

    return(
        <Box width={300}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                    <Typography variant="h6">{global?.translation.user_info.user_information}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="subtitle1"></Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}