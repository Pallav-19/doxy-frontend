/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDocumentTitle, setTitle } from '../../features/utilities/titleSlice'
import { Edit } from '@mui/icons-material'
import { addNotification } from '../../features/notifications/notificationSlice'
import { useRenameMutation } from '../../app/api/document/documentApiSlice'
import { isWoner } from '../../features/utilities/accessSlice'

const Title = ({ id }) => {
    const dispatch = useDispatch()
    const [viewEdit, setViewEdit] = useState(false)
    const title = useSelector(currentDocumentTitle)
    const [rename, { isError, error, isLoading }] = useRenameMutation()
    const [isEditing, setIsEditing] = React.useState(false)
    const [residualTitle, setResidualTitle] = React.useState('') 
    const focusRef = React.useRef(null)

    React.useEffect(() => {
        if (isError) {
            dispatch(addNotification({ id: Date.now(), message: error?.data?.message || "Error" }))
            setResidualTitle(error?.data?.title)
        }
        console.log(isOwner);
    }, [isError])
    const handleTitleChange = async (title) => {
        dispatch(setTitle(title))
        const handleChange = async () => {
            try {
                const { data } = await rename({ title, id })
            } catch (error) {
                dispatch(addNotification({ id: Date.now(), message: error.message }))
            }
        }
        setTimeout(() => {
            handleChange()
        }, 0)
    }
    const isOwner = useSelector(isWoner)
    return (
        <TextField
            onMouseEnter={() => { setViewEdit(true) }}
            onMouseLeave={() => setViewEdit(false)}
            size='small'
            color='info'
            sx={{
                '& .MuiInputBase-root': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                },


            }}
            variant='outlined'
            onChange={(e) => {
                handleTitleChange(e.target.value)
            }}
            onClick={() => {
                setIsEditing(true)
                focusRef.current.focus()
            }}
            onBlur={() => {
                setIsEditing(false)
                !title && dispatch(setTitle(residualTitle))
            }}
            id="outlined-read-only-input"
            value={title}
            InputProps={{
                style: { fontSize: '1.2rem' },
                readOnly: !isEditing || !isOwner,
                inputRef: focusRef,
                endAdornment:
                    (
                        <InputAdornment
                            sx={{ display: (!viewEdit || !isOwner) && 'none' }}
                            position='start'>
                            {isLoading ? <CircularProgress
                                size={20}
                                color='info' /> : <Edit
                                color='info' />}
                        </InputAdornment>
                    ),

            }}
        />
    )
}

export default Title