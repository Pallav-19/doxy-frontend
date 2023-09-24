import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { isLoading as currentLoadingState } from '../../features/utilities/loadingSlice';

export function Loader() {
    const isLoading = useSelector(currentLoadingState)
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
