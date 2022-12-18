import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import libBackground from "../../assests/libBackground.jpg";
import { Alert } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useFormik } from "formik";
import { loginSchema } from "./authSchemaYup";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const { error, handleLogin, loading, success } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await handleLogin(values.email, values.password);
    },
  });

  if (success) {
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage: `url(${libBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                id="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={formik.handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress
                    style={{ width: "30px", height: "30px", color: "red" }}
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/forget-password" variant="body2">
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
