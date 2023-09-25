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
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notificationSlice';
import { useRegisterMutation } from '../../app/api/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { setLoading, unsetLoading } from '../../features/utilities/loadingSlice';
import { toggleShow } from '../../features/utilities/showAuthSlice';

const RegisterTab = () => {
    const dispatch = useDispatch()
    const [register, { isLoading, isError, error }] = useRegisterMutation()
    useEffect(() => {
        isLoading ? dispatch(setLoading()) : dispatch(unsetLoading())
    }, [isLoading])
    useEffect(() => {
        if (isError) {
            dispatch(addNotification({ id: Date.now(), message: error?.data?.message }))
        }
    }, [isError])
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    const handleSignUp = async ({ username, password }) => {
        try {
            const { data } = await register({
                username, password
            })
            dispatch(setCredentials({ token: data?.token, user: data?.user }))
            dispatch(addNotification({ id: Date.now(), message: "Welcome to Doxy." }))


        } catch (err) {
            dispatch(addNotification({ id: Date.now(), message: "Error Occured!" }))
        }

    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...restValues } = values
            handleSignUp({ ...restValues })
        },
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showCPassword, setShowCPassword] = React.useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleCShowPassword = () => {
        setShowCPassword(!showCPassword);
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
                    label="Password"
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
            <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                }
                helperText={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleCShowPassword}>
                                {showCPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}

            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={!formik.isValid}
                sx={{ mt: 3 }}
            >
                Register
            </Button>
            <Button
                fullWidth
                sx={{ mt: 3 }}
                variant='outlined'
                color='error'
                onClick={() => {
                    dispatch(toggleShow())
                }}
            >
                Cancel
            </Button>
        </form>
    );
};

export default RegisterTab;
