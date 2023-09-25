/* eslint-disable react-hooks/exhaustive-deps */
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SearchUsers } from './SearchUsers'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRemoveCollaboratorMutation } from '../../app/api/document/collaboratorApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notificationSlice';
import { useRemoveViewerMutation } from '../../app/api/document/viewerApiSlice';
import { setLoading, unsetLoading } from '../../features/utilities/loadingSlice';
const AccessContainer = ({ title, options, expanded, context, handleChange, refetch, setRefetch, id, data }) => {
    console.log(context);
    const [removeCollaborator, {
        isError: isCError,
        error: cerror,
        isLoading: cisLoading
    }] = useRemoveCollaboratorMutation()
    const [removeViewer, { isError, error, isLoading }] = useRemoveViewerMutation()
    const dispatch = useDispatch()
    const handleRemove = async (removeId) => {
        try {
            const { data } = context === 'collaborators' ?
                await removeCollaborator({ removeId, id }) : await removeViewer({ removeId, id })
            data && dispatch(addNotification({ message: data.message, id: Date.now() }))
            setRefetch(!refetch)
        } catch (error) {
            console.log(error.message);
            dispatch(addNotification({ message: "Error in removing", id: Date.now() }))
        }
    }
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
    return (

        <Accordion
            variant='elevation'
            sx={{
                width: '100%',
                backgroundColor: "#f5f5f5"
            }} expanded={expanded === context}
            onChange={handleChange(context)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography >
                    {title}
                </Typography>

            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <SearchUsers
                        options={options}
                        context={context}
                        refetch={refetch}
                        setRefetch={setRefetch}
                        id={id} />
                    <Box
                        sx={{
                            height: '50vh',
                            overflowY: 'scroll',
                            width: '100%'
                        }}>
                        <Stack sx={{ marginTop: 3 }} flexDirection={'row'} useFlexGap gap={1} flexWrap={'wrap'}>
                            {data?.length ? data?.map(x =>
                                <Chip key={x._id} variant='filled' color='primary'
                                    onDelete={() => {
                                        handleRemove(x?._id)
                                    }} label={x?.username} />
                            ) :
                                <>

                                    <Typography variant=''>
                                        {"No " + context + ",add some."}
                                    </Typography>
                                </>}


                        </Stack>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>


    )
}

export default AccessContainer