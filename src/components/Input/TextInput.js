import { TextField } from '@mui/material'
import React from 'react'

const TextInput = ({ formik, name }) => {
    return (
        <TextField
            fullWidth
            margin="normal"
            label="Username"
            name='name'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
        />
    )
}

export default TextInput