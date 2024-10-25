//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const handleFormSubmit = (values) => {
        const { email, password } = values;
        
        // Hardcoded credentials check
        if (email === 'admin' && password === 'password') {
            navigate('/'); // Redirect to the dashboard
        } else {
            alert('Invalid email or password'); // Display an error message
        }
    };

    return (
        <Box m="20px">
            <h2>Login</h2>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialLoginValues}
                validationSchema={loginSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Validation schema
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialLoginValues = {
    email: "",
    password: "",
};

export default Login;
