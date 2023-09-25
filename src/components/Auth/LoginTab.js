/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    FormControl,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginMutation } from '../../app/api/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notificationSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { setLoading, unsetLoading } from '../../features/utilities/loadingSlice';
import { toggleShow } from '../../features/utilities/showAuthSlice';

const LoginTab = () => {
    const [login, { isLoading, error, isError }] = useLoginMutation()
    const dispatch = useDispatch()
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    useEffect(() => {
        isLoading ? dispatch(setLoading()) : dispatch(unsetLoading())
    }, [isLoading])
    useEffect(() => {
        if (isError) {
            dispatch(addNotification({ id: Date.now(), message: error?.data?.message }))
        }
    }, [isError])
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            handleLogin(values)
        },
    });
    const handleLogin = async ({ username, password }) => {
        try {
            const { data } = await login({ username, password })
            dispatch(setCredentials({ token: data?.token, user: data?.user }))

        } catch (err) {
            dispatch(addNotification({ id: Date.now(), message: "Error occured!" }))
        }
    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <FormControl fullWidth margin="normal">
                <TextField
                    label='Password'
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={!formik.isValid}
                sx={{ mt: 3 }}
            >
                Login
            </Button>
            <Button
                onClick={() => {
                    dispatch(toggleShow())
                }}
                variant='outlined'
                color='error'
                fullWidth
                sx={{ mt: 3 }}
            >
                Cancel
            </Button>
        </form>
    );
};

export default LoginTab;
