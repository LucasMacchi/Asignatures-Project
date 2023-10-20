import "./Days.css"
import { useState } from "react"
import { GlobalContext } from "../Context/Contexts"
import { Card, CardContent, Typography, Tabs, Tab, Box } from "@mui/material"


export default function Days(){

    const changedTab = (e:any, value: number) => setDay(value)
    const [day, setDay] = useState(1)

    return (
        <div id="days_div">
            <Box sx={{bgcolor: 'background.paper'}}>
                <Tabs value={day} centered variant="fullWidth" textColor="secondary" indicatorColor="secondary" onChange={changedTab}>
                    <Tab value={1} label="Lunes"/>
                    <Tab value={2} label="Martes"/>
                    <Tab value={3} label="Miercoles"/>
                    <Tab value={4} label="Jueves"/>
                    <Tab value={5} label="Viernes"/>
                    <Tab value={6} label="Sabado"/>
                    <Tab value={7} label="Domingo"/>
                </Tabs>
            </Box>

        </div>
    )
}