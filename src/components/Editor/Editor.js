/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, IconButton, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import { baseURL } from '../../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../features/auth/authSlice';
import { addNotification } from '../../features/notifications/notificationSlice';
import { currentDocumentTitle, setTitle } from '../../features/utilities/titleSlice';
import { setIsPubliclyEditable, setOwner, setPubliclyViewed } from '../../features/utilities/accessSlice';
import { CloudDone, Error, IosShare, Sync, } from '@mui/icons-material';
import { AccessDrawer } from '../misc/AccessDrawer';
import EditOffIcon from '@mui/icons-material/EditOff';
const Editor = () => {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];

    const [value, setValue] = useState('<p>Loading...</p>');
    const [socket, setSocket] = useState();
    const title = useSelector(currentDocumentTitle)
    const [readOnly, setReadOnly] = useState(true);
    const dispatch = useDispatch()
    const [saving, setSaving] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(currentUser)
    const handleShare = async () => {
        if (navigator.share) {

            try {
                await navigator.share({
                    title: title,
                    text: 'Document Shared from Doxy',
                    url: window.location.href,
                });
            } catch (error) {
                dispatch(addNotification({ id: Date.now(), message: "Error Sharing Document Document!" }))
            }
        } else {
            dispatch(addNotification({ id: Date.now(), message: "Error Sharing!" }))

        }
    }
    const { id } = useParams()
    const handleEditorChange = (content, delta, source, editor) => {
        setValue(editor.getContents());

        if (source !== 'user') return
        socket && socket?.emit('change-content', editor?.getContents())

    };
    const modules = {
        toolbar: toolbarOptions
    }

    useEffect(() => {
        const socketServer = io(baseURL)
        setSocket(socketServer)

        return () => {
            socketServer?.disconnect()
        }
    }, [])

    useEffect(() => {
        socket && socket?.on('receive-changes', contents => {
            setValue(contents)

        })
        socket && socket?.on('load-document', ({ data, title, isPublic, publiclyEditable, }) => {

            setValue(data)
            setReadOnly(false)
            dispatch(setTitle(title))
            dispatch(setIsPubliclyEditable(publiclyEditable))
            dispatch(setPubliclyViewed(isPublic))
        })

        socket && socket.on('access-denied', ({ message }) => {
            dispatch(addNotification({ id: Date.now(), message }))
            navigate("/")
        })
        socket && socket.on("can-edit", canEdit => {
            setReadOnly(!canEdit)
            dispatch(setOwner(canEdit))
        })
        socket && socket?.emit('get-document', { id, userId: user?._id })
        let interval;


        return () => {
            clearInterval(interval)
            dispatch(setTitle(''))
            dispatch(setIsPubliclyEditable(false))
            dispatch(setPubliclyViewed(false))
        }
    }, [socket, id, user?._id])

    useEffect(() => {
        if (!readOnly) {
            setSaving(true)
            const saveInterval = setInterval(() => {
                socket && socket.emit('save-document', value);
            }, 2000);
            socket && socket.on('saved', () => {
                setSaving(false)
            })
            socket && socket.on('not-saved', () => {
                setSavingError(false)
            })
            return () => {
                clearInterval(saveInterval);
            };
        }
    }, [readOnly, value, socket]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                background: '#f5f5f5',
                position: 'relative'
            }}>
                <ReactQuill
                    style={{ width: '100vw' }}
                    theme="snow"
                    value={value}
                    onChange={handleEditorChange}
                    modules={modules}
                    readOnly={readOnly}
                />
            </Box>
            <Button
                onClick={() => {
                    handleShare()
                }}
                variant='contained'
                sx={{
                    position: 'fixed',
                    bottom: 15,
                    right: 15,

                }}
                startIcon={<IosShare fontSize='large' sx={{}} />}
            >
                Share
            </Button>
            {!readOnly ? <IconButton
                color='primary'
                size='large'
                sx={{
                    position: 'fixed',
                    bottom: 15,
                    left: 15,

                }} >
                {
                    (!savingError) ? (saving ?
                        <Sync
                            className='rotating-icon'
                            fontSize='3rem' color='secondary' /> :
                        <CloudDone
                            fontSize='3rem'
                            color='secondary' />) :
                        <Error
                            fontSize='3rem'
                            color='error' />
                }
            </IconButton> :
                <IconButton
                    size='large'
                    sx={{
                        position: 'fixed',
                        bottom: 15,
                        left: 15,

                    }}
                >
                    <EditOffIcon fontSize='3rem' disabled />
                </IconButton>}
            {(id && !readOnly) && <AccessDrawer id={id} />}

        </>
    )

}

export default Editor