/* eslint-disable no-unused-vars */
import React from 'react'
import Editor from './components/Editor'
import './App.css'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Home from './pages/Home'
import ViewDocs from './pages/ViewDocs'
import NotFound from './pages/NotFound'
import Auth from "./pages/Auth"
import AppThemeProvider from './theme/AppThemeProvider'
import { Provider } from 'react-redux'
import { store } from './app/store'
import RequireAuth from './guards/RequireAuth'
import Notifications from './components/services/Notifications'

const App = () => {

  return (
    <Provider store={store}>
      <AppThemeProvider >
        <Box sx={{ background: '#f5f5f5' }}>
          <Notifications />
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route element={<RequireAuth />}>
              <Route
                path='/'
                element={
                  <Home />
                } >
                <Route path='/' exact element={<ViewDocs />} />
                <Route path='/:id' exact element={<Editor />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
      </AppThemeProvider>
    </Provider>
  )
}

export default App