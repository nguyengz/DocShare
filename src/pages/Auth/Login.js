import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { login } from "~/slices/auth";
import { clearMessage } from "~/slices/message";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Window } from "@mui/icons-material";
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checked, setChecked] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);
  //   // eslint-disable-next-line no-unused-vars
  //   const error = useSelector((state) => state.auth.error);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = async (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    try {
      await dispatch(login({ username, password }));
      navigate("/login");
      window.location.reload();
      toast.success("Invalid username or password");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="xs">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent={"center"}
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("username is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={handleLogin}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  <Grid container spacing={3}>
                    {/* {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )} */}
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="username-login">
                          username
                        </InputLabel>
                        <OutlinedInput
                          id="username-login"
                          type="text"
                          value={values.username}
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter username"
                          fullWidth
                          error={Boolean(touched.username && errors.username)}
                        />
                        {touched.username && errors.username && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.username}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="-password-login"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <EyeOutlined />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter password"
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(event) =>
                                setChecked(event.target.checked)
                              }
                              name="checked"
                              color="primary"
                              size="small"
                            />
                          }
                          label={
                            <Typography variant="h6" fontSize={15}>
                              Keep me sign in
                            </Typography>
                          }
                        />
                        <Link
                          variant="h6"
                          component={RouterLink}
                          to=""
                          color="text.primary"
                          fontSize={15}
                        >
                          Forgot Password?
                        </Link>
                      </Stack>
                    </Grid>
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button
                        // disableElevation
                        // disabled={loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Login
                      </Button>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
