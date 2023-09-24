/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom';
import Title from '../navbar/Title';
import UserMenu from '../navbar/UserMenu';
import ActionsMenu from '../navbar/ActionsMenu';
import { Typography } from '@mui/material';

export const Navbar = () => {
    const { id } = useParams()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar variant='outlined' position="sticky" sx={{ top: 0, left: 0 }} color="primary" >
                <Toolbar>
                    {id && <div>
                        <ActionsMenu id={id} />

                    </div>}

                    {id ?
                        <Title
                            id={id}
                        />
                        :
                        <Typography variant='h4'>
                            Doxy.
                        </Typography>
                    }
                    <div style={{ marginLeft: 'auto' }}>

                        <UserMenu />
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
