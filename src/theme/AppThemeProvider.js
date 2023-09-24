import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196F3",
        },
        secondary: {
            main: "#607D8B"
        },
        background: {
            default: "#F5F5F5",
            paper: "#fff",
        },
        textColors: {
            default: "#333333",
            contrast: "#ffffff",
            asterisk: "#d32f2f",
        },
        info: {
            main: '#fff'
        }
    },
});

const AppThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default AppThemeProvider