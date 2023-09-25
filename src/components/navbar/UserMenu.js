import { AccountCircle, Logout, Person } from '@mui/icons-material'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { addNotification } from '../../features/notifications/notificationSlice'
import { logout as StateLogout } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../app/api/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const UserMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logout] = useLoginMutation()
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ marginLeft: 'auto' }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    navigate("/profile")
                }}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    logout()
                    dispatch(StateLogout())
                    dispatch(addNotification({ id: Date.now(), message: 'Logged Out Successfully!' }))
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu