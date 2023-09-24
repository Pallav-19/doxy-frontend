import React from 'react'
import { Add, Search } from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'


const MenuBar = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <TextField
                color='secondary'
                variant='standard'
                placeholder='Search Document'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            >

            </TextField>
            <Button
                onClick={() => {
                    navigate(`/${uuid()}`)
                }}
                sx={{ marginLeft: 'auto' }}
                variant='contained'
                color='secondary'
                startIcon={<Add />}>
                New Document
            </Button>
        </Box>
    )
}

export default MenuBar