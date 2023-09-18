/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'

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
    const [readOnly, setReadOnly] = useState(true);
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
        const socketServer = io('http://localhost:9000')
        setSocket(socketServer)

        return () => {
            socketServer?.disconnect()
        }
    }, [])

    useEffect(() => {
        socket && socket?.on('receive-changes', contents => {
            setValue(contents)

        })
        socket && socket?.on('load-document', document => {
            setValue(document)
            setReadOnly(false)
        })
        socket && socket?.emit('get-document', id)
        let interval;


        return () => {
            clearInterval(interval)
        }
    }, [socket, id])

    useEffect(() => {
        if (!readOnly) {
            const saveInterval = setInterval(() => {
                socket && socket.emit('save-document', value);
            }, 2000);

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
        </>
    )

}

export default Editor