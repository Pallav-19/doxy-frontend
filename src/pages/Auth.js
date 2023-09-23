import React from 'react';
import { Box } from '@mui/material';
import AuthLayout from '../components/Auth/AuthLayout';
import TextBox from '../components/Auth/TextBox';

export default function Auth() {


  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: "100vh",
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 5

    }}>
      <TextBox />
      <AuthLayout />
    </Box>
  );
}


