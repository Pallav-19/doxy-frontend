/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import AuthLayout from '../components/Auth/AuthLayout';
import TextBox from '../components/Auth/TextBox';
import { useSelector } from 'react-redux';
import { currentToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const token = useSelector(currentToken)
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

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


