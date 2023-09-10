/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from 'socket.io-client'
const Editor = () => {
    const [value, setValue] = useState('');
    const [socket, setSocket] = useState('')
    const handleEditorChange = (content, delta, source, editor) => {
        setValue(editor.getHTML());
        console.log("Delta:", JSON.stringify(delta));
        console.log(source)
        console.log(content);
    };
    var toolbarOptions = [
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
    const modules = {
        toolbar: toolbarOptions
    }

    useEffect(() => {
        const socketServer = io('http://localhost:9000')
        setSocket(socketServer)
        return () => {
            socketServer.disconnect()
        }
    }, [])
    useEffect(() => {

    }, [value])
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', background: '#f5f5f5' }}>
                <ReactQuill style={{ width: '100vw' }} theme="snow" value={value} onChange={handleEditorChange} modules={modules} />
            </Box>
        </>
    )

}

export default Editor