/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel, IconButton, ListItemIcon, Menu, MenuItem, Switch } from '@mui/material'
import React, { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { currentPubliclyEditable, currentPubliclyViewed, isWoner, setIsPubliclyEditable, setPubliclyViewed } from '../../features/utilities/accessSlice';
import { useEditAccessMutation, useViewAccessMutation } from '../../app/api/document/documentApiSlice';
import { addNotification } from '../../features/notifications/notificationSlice';
import { setLoading, unsetLoading } from '../../features/utilities/loadingSlice';
import PublicIcon from '@mui/icons-material/Public';
import { toggleAccessDrawer } from '../../features/utilities/accessDrawerSlice';

const ActionsMenu = ({ id }) => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isUserOwner = useSelector(isWoner)
    const isPublic = useSelector(currentPubliclyViewed)
    const isPubliclyEditable = useSelector(currentPubliclyEditable)
    const [viewAccess,
        { isLoading: accessLoading,
            error: accessError,
            isError: isAccessError }] = useViewAccessMutation()
    const [editAccess,
        { isLoading: editLoading,
            error: editError,
            isError: isEditError }] = useEditAccessMutation()
    useEffect(() => {
        if (accessError) {
            dispatch(addNotification({ id: Date.now(), message: accessError?.data?.message || "Error" }))
        }
        if (editError) {
            dispatch(addNotification({ id: Date.now(), message: editError?.data?.message || "Error" }))
        }
    }, [isAccessError, accessError, isEditError, editError])
    useEffect(() => {
        accessLoading || editLoading ? dispatch(setLoading()) : dispatch(unsetLoading())
    }, [accessLoading, editLoading])
    const handleViewChange = async (value) => {
        try {
            const result = await viewAccess({
                id,
                isPublic: value
            })
            dispatch(setPubliclyViewed(result?.data?.isPublic))
            dispatch(addNotification({
                id: Date.now(),
                message: result.data?.message || "Changed"
            }))

        } catch (error) {
            dispatch(addNotification({
                id: Date.now(),
                message: error?.message || "Changed"
            }))
        }
    }
    const handleEditChange = async (value) => {
        try {
            const result = await editAccess({
                id,
                isPubliclyEditable: value
            })
            dispatch(setIsPubliclyEditable(result?.data?.publiclyEditable))
            dispatch(addNotification({
                id: Date.now(),
                message: result.data?.message || "Error"
            }))

        } catch (error) {
            dispatch(addNotification({
                id: Date.now(),
                message: error?.message || "Error"
            }))
        }
    }
    return (
        <div style={{ marginLeft: 'auto' }}>
            <IconButton
                disabled={isUserOwner === false}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <MenuIcon />
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
                <MenuItem >
                    <FormControlLabel
                        control={<Switch
                            checked={!!isPublic}
                            onChange={(e) => { handleViewChange(e?.target?.checked) }} />}
                        label="Anyone Can View"
                        labelPlacement='start' />
                </MenuItem>
                <MenuItem >
                    <FormControlLabel
                        control={<Switch
                            checked={!!isPubliclyEditable}
                            onChange={(e) => { handleEditChange(e?.target?.checked) }} />}
                        label="Anyone Can Edit"
                        labelPlacement='start' />
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        dispatch(toggleAccessDrawer({ event: e, isOpen: true }))
                        handleClose()
                    }}
                >
                    <ListItemIcon >
                        <PublicIcon />
                    </ListItemIcon>
                    Manage Access
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ActionsMenu