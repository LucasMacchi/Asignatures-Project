import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#35374B"
        },
        secondary: {
            main: "#EEEEEE"
        },
        background:{
            paper: "#35374B"
        },
        text:{
            primary: "#EEEEEE",
            
        }
    }
})

export default theme;