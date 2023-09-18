import React from 'react'
import Editor from './components/Editor'
import './App.css'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { Navbar } from "./components/Navbar"
const App = () => {
  return (
    <Box sx={{ background: '#f5f5f5' }}>
      <Navbar />
      <Routes>
        <Route
          index
          path='/'
          exact
          element={
            <Navigate
              replace
              to={`/docs/${uuid()}`}
            />
          } />
        <Route path='/docs/:id' exact element={<Editor />} />
      </Routes>
    </Box>
  )
}

export default App