/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, IconButton } from '@mui/material';
import AccessContainer from './AccessContainer';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, currentAccessDrawerOpen } from '../../features/utilities/accessDrawerSlice';
import { Close } from '@mui/icons-material';
import { useGetCollaboratorsMutation, useGetCollaboratorsOptionsMutation } from "../../app/api/document/collaboratorApiSlice"
import { currentCollabOptions, currentCollaborators, currentViewers, currentViewersOptions, setCollaboratorOptions, setCollaborators, setViewerOptions, setViewers } from '../../features/utilities/accessSlice';
import { addNotification } from '../../features/notifications/notificationSlice';
import { useGetViewersMutation, useGetViewersOptionsMutation } from '../../app/api/document/viewerApiSlice';
export function AccessDrawer({ id }) {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState('collaborators');
    const open = useSelector(currentAccessDrawerOpen)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [refetch, setRefetch] = React.useState(false)
    const [refetchViewer, setRefetchViewer] = React.useState(false)

    const [getCollaboratorsOptions] = useGetCollaboratorsOptionsMutation()
    const [getCollaborators] = useGetCollaboratorsMutation()
    const collaboratorsOptions = useSelector(currentCollabOptions)
    const currentCollabs = useSelector(currentCollaborators)

    const [getViewersOptions] = useGetViewersOptionsMutation()
    const [getViewers] = useGetViewersMutation()
    const viewers = useSelector(currentViewers)
    const viewersOptions = useSelector(currentViewersOptions)

    React.useEffect(() => {
        const fetchCollaboratorOptions = async () => {
            try {
                const { data } = await getCollaboratorsOptions({ id });
                dispatch(setCollaboratorOptions({ collaboratorsOptions: data?.result }))

            } catch (error) {
                dispatch(addNotification({ message: "Error", id: Date.now() }))
            }
        }
        const fetchCollaborators = async () => {
            try {
                const { data } = await getCollaborators({ id });
                dispatch(setCollaborators({ collaborators: data?.result[0]?.collaborators }))

            } catch (error) {
                dispatch(addNotification({ message: "Error", id: Date.now() }))
            }
        }
        open && fetchCollaborators()
        open && fetchCollaboratorOptions()
    }, [refetch, id, open])
    React.useEffect(() => {
        const fetchViewerOptions = async () => {
            try {
                const { data } = await getViewersOptions({ id });
                dispatch(setViewerOptions({ viewersOptions: data?.result }))

            } catch (error) {
                dispatch(addNotification({ message: "Error", id: Date.now() }))
            }
        }
        const fetchViewers = async () => {
            try {
                const { data } = await getViewers({ id });
                dispatch(setViewers({ viewers: data?.result[0]?.viewers }))

            } catch (error) {
                dispatch(addNotification({ message: "Error", id: Date.now() }))
            }
        }
        open && fetchViewers()
        open && fetchViewerOptions()
    }, [refetchViewer, refetch, id, open])
    return (
        <div>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => {
                    dispatch(closeDrawer())
                    setExpanded('collaborators')
                }}
            >
                <Box
                    sx={{
                        width: { md: 350, xs: '100vw' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        alignItems: 'center',
                        height: '100vh',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        padding: 2
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%'
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                dispatch(closeDrawer())
                                setExpanded('collaborators')
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    <AccessContainer
                        expanded={expanded}
                        handleChange={handleChange}
                        context={'viewers'}
                        title={'Manage Viewers'}
                        refetch={refetchViewer}
                        setRefetch={setRefetchViewer}
                        id={id}
                        options={viewersOptions}
                        data={viewers}

                    />
                    <AccessContainer
                        expanded={expanded}
                        handleChange={handleChange}
                        context={'collaborators'}
                        title={'Manage Collaborators'}
                        refetch={refetch}
                        setRefetch={setRefetch}
                        options={collaboratorsOptions}
                        data={currentCollabs}
                        id={id}
                    />
                </Box>
            </Drawer>
        </div>
    );
}
