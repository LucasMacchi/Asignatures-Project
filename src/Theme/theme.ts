import { createTheme } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary: {
            main: grey[50]
        },
        background:{
            paper: grey[900]
        },
        text:{
            primary: grey[50]
        }
    }
})

export default theme;