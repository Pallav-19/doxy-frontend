/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ViewDocs from './pages/ViewDocs'
import NotFound from './pages/NotFound'
import Auth from "./pages/Auth"
import AppThemeProvider from './theme/AppThemeProvider'
import { Provider } from 'react-redux'
import { store } from './app/store'
import RequireAuth from './guards/RequireAuth'
import Notifications from './components/services/Notifications'
import { Loader } from './components/misc/Loader'
import PersistentUserLogin from './components/misc/PersistentUserLogin'
import Editor from './components/Editor/Editor'

const App = () => {

  return (
    <Provider store={store}>
      <AppThemeProvider >
        <Box sx={{ background: '#f5f5f5' }}>
          <Notifications />
          <Loader />
          <Routes>
            <Route element={<PersistentUserLogin />}>
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
            </Route>
          </Routes>
        </Box>
      </AppThemeProvider>
    </Provider>
  )
}

export default App