/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { useAddCollaboratorsMutation } from '../../app/api/document/collaboratorApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notificationSlice';
import { useAddViewersMutation } from '../../app/api/document/viewerApiSlice';
import { setLoading, unsetLoading } from '../../features/utilities/loadingSlice';


export function SearchUsers({ options, context, refetch, setRefetch, id }) {
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [addCollaborators, {
        isError: isCError,
        error: cerror,
        isLoading: cisLoading
    }] = useAddCollaboratorsMutation()
    const [addViewer, { isError, error, isLoading }] = useAddViewersMutation()
    useEffect(() => {
        if (isError) {
            dispatch(addNotification({ message: error?.data?.message, id: Date.now() }))
        }
        if (isCError) {
            dispatch(addNotification({ message: cerror?.data?.message, id: Date.now() }))
        }

    }, [isError, isCError])
    useEffect(() => {
        isLoading || cisLoading ? dispatch(setLoading()) : dispatch(unsetLoading())
    }, [isLoading, cisLoading])
    const dispatch = useDispatch()
    const handleClick = async () => {

        try {
            if (context) {
                if (context === "collaborators") {
                    const result = await addCollaborators({ collaborators: selectedOptions.map(x => x?._id), id })
                    setRefetch(!refetch)
                    setSelectedOptions([])
                    dispatch(addNotification({ message: result?.data?.message, id: Date.now() }))
                }
                if (context === 'viewers') {
                    const result = await addViewer({ viewers: selectedOptions.map(x => x?._id), id })
                    setRefetch(!refetch)
                    setSelectedOptions([])
                    dispatch(addNotification({ message: result?.data?.message, id: Date.now() }))
                }
            }
        } catch (error) {
            dispatch(addNotification({ message: "Error!", id: Date.now() }))
        }
    }
    return (
        <>
            <Autocomplete
                value={selectedOptions}
                fullWidth
                multiple
                options={options || []}
                onChange={(_, newValue) => {
                    setSelectedOptions(newValue);
                    console.log(selectedOptions);
                }}
                getOptionLabel={(option) => option.username}
                renderInput=
                {(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        label="Search users to add"
                        variant="standard"
                    />
                )}
            />
            <Button
                onClick={() => {
                    handleClick()
                }}
                disabled={!selectedOptions.length}
                variant='contained'
                color='secondary'
                fullWidth
                sx={{ marginTop: 2 }}>
                Add
            </Button>
        </>
    );
}
