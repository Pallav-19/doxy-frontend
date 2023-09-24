/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Add, Search } from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentAllDocuments, loadDocuments } from '../../features/documents/documentSlice'


const MenuBar = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const allDocuments = useSelector(currentAllDocuments)
    const handleChange = (value) => {
        setSearch(value)
    }
    useEffect(() => {

        dispatch(loadDocuments({ result: allDocuments?.filter(x => JSON.stringify(x)?.toLowerCase()?.includes(search.toLowerCase())) }))
    }, [search])
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%', gap: 5
        }}>
            <TextField
                onChange={(e) => {
                    handleChange(e.target.value)
                }}
                value={search}
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
                New
            </Button>
        </Box>
    )
}

export default MenuBar