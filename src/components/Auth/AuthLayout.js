import React from 'react'
import RegisterTab from './RegisterTab'
import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material'
import LoginTab from './LoginTab'
import { useSelector } from 'react-redux'
import { currentAuthShowState } from '../../features/utilities/showAuthSlice'

const AuthLayout = () => {
    const [value, setValue] = React.useState(0);
    const showAuth = useSelector(currentAuthShowState)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container sx={{ display: showAuth ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', flex: 1 }} >
            <Paper elevation={3}>
                <Box borderBottom={1} borderColor={'divider'}>
                    <Tabs variant='fullWidth' textColor='secondary' indicatorColor='secondary' value={value} onChange={handleChange}  >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <LoginTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RegisterTab />
                </TabPanel>
            </Paper>
        </Container>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`auth-tabpanel-${index}`}
            aria-labelledby={`auth-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export default AuthLayout