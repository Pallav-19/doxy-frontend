/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import AuthLayout from '../components/Auth/AuthLayout';
import TextBox from '../components/Auth/TextBox';
import { useSelector } from 'react-redux';
import { currentToken } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
  const token = useSelector(currentToken)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  useEffect(() => {
    if (token) {
      navigate(from)
    }
  }, [token])
  const scrollRef = useRef(null)
  return (
    <Box
      ref={scrollRef}
      sx={{
        display: 'flex',
        width: '100vw',
        height: { md: "100vh" },
        minHeight: { xs: '100vh' },
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: { md: 5, xs: 3 },
        flexDirection: { md: 'row', xs: 'column' }
      }}>
      <TextBox scrollRef={scrollRef} />
      <AuthLayout />
    </Box>
  );
}


