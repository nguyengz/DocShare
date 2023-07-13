import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { login } from "~/slices/auth";
import { clearMessage, setMessage } from "~/slices/message";
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
  Snackbar,
} from "@mui/material";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Window } from "@mui/icons-material";
import FormChangePass from "./FormChangePass";
import FormChangePassLogin from "./FormChangePassLogin";
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { message, isError } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openFormPass, setOpenFormPass] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = async (formValue, { setSubmitting }) => {
    const { username, password } = formValue;
    setLoading(true);
    dispatch(login({ username, password }));

    //   const queryParams = new URLSearchParams(window.location.search);
    //   const returnUrl = queryParams.get("returnUrl");
    //   if (returnUrl) {
    //     navigate(returnUrl); // Navigate to the returnUrl directly
    //   } else {
    //     // navigate("/");
    //   }
    // })
  };
  if (currentUser?.token) {
    navigate("/");
  }
  const handleCloseSnackbar = () => {
    dispatch(clearMessage());
  };
  // if (isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCloseForm = () => {
    setOpenFormPass(false);
  };
  const handleOpenForm = () => {
    setOpenFormPass(true);
  };
  return (
    <>
      {" "}
      <Snackbar
        open={isError && message}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
        severity="error"
      />
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
                  .required("Username is required"),
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
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="username-login">
                          Username
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
                          onClick={handleOpenForm}
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
                        {isSubmitting ? "Loading..." : "Login"}
                      </Button>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            {openFormPass && <FormChangePassLogin onCancel={handleCloseForm} />}
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
