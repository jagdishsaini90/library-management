import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import { Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { signupSchema } from "./authSchemaYup";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const { error, loading, handleRegister, success } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      await handleRegister(
        values.email,
        values.password,
        values.firstname + " " + values.lastname
      );
    },
  });

  if (success) {
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      {error && <Alert severity="error">{error}</Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  name="firstname"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formik.handleSubmit}
            >
              {loading ? (
                <CircularProgress
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "red",
                  }}
                />
              ) : (
                "Sign up"
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
