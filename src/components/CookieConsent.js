import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Container, Paper, Typography, Box } from '@mui/material';

const CookieConsent = () => {
    const [accepted, setAccepted] = useState(Cookies.get('cookieConsent'));

    const acceptCookies = () => {
        Cookies.set('cookieConsent', 'accepted', { expires: 365 });
        setAccepted(true);
    };

    const declineCookies = () => {
        Cookies.set('cookieConsent', 'declined', { expires: 30 });
        setAccepted(true);
    };

    if (accepted) {
        return null;
    }

    return (
        <Container
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                display: 'flex',
                width: '100vw',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper elevation={6}
                style={{
                    padding: '1rem',

                }}>


                <Typography>
                    We use cookies to improve your experience. By using our site, you consent to our use of cookies.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'flex-end',
                        mt: 2
                    }}>

                    <Button
                        size='small'
                        variant="contained"
                        color="primary"
                        onClick={acceptCookies}>
                        Accept
                    </Button>


                    <Button
                        size='small'
                        variant="contained"
                        color="error"
                        onClick={declineCookies}>
                        Decline
                    </Button>
                </Box>


            </Paper>
        </Container>
    );
};

export default CookieConsent;
