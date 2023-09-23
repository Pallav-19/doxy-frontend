import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentAuthShowState, toggleShow } from '../../app/utilities/showAuthSlice'

const TextBox = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleShow())
    }
    const showAuthState = useSelector(currentAuthShowState)
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: !showAuthState ? 'center' : ' flex-start', justifyContent: 'center', flex: 2, transition: 'all 1s linear', textAlign: !showAuthState ? 'center' : 'left', padding: 5 }}>
            <Typography sx={{ fontWeight: 700, textTransform: 'capitalize', color: 'primary.main', letterSpacing: 2 }} variant='h1'>
                Doxy.
            </Typography>
            <Typography color={'secondary.dark'} variant='h5'>Collaborative Document Creation Made Effortless</Typography>
            <Typography color={'secondary'}>"Doxy is the ultimate solution for modern document creation and collaborative work. Our platform empowers users to craft, edit, and collaborate on documents with unparalleled ease. Say goodbye to the complexities of traditional document editing and embrace a streamlined experience that lets you focus on your content. With real-time collaboration, multiple team members can work seamlessly together, regardless of their locations. Doxy's version control ensures that you never lose track of changes, making it easy to compare and revert to previous versions. Our commitment to top-notch security ensures that your data remains protected. Join Doxy and elevate your document productivity today."</Typography>
            <Button startIcon={showAuthState && <ArrowBack />} onClick={() => { handleClick() }} color='secondary' endIcon={!showAuthState && <ArrowForward />} variant='contained'>{showAuthState ? "Maybe Later":"Get Started"}</Button>
        </Container>
    )
}

export default TextBox