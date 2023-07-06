import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register, selectRequestTime } from "~/slices/auth";
import { clearMessage } from "~/slices/message";

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Box,
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
import { strengthColor, strengthIndicator } from "~/utils/password-strength";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [level, setLevel] = useState();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const res = useSelector((state) => state.auth.res);
  // const requestTime = useSelector(selectRequestTime);
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordAgain, setShowPasswordAgain] = useState(false);

  //  useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(clearMessage());
    changePassword("");
  }, []);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
  const handleRegister = async (formValue) => {
    const { name, username, email, password } = formValue;
    // alert("Chờ xử lý");
    setSuccessful(false);
    // console.log(res);
    try {
      Swal.fire({
        title: "Đang xử lý...",
        timer: 15000, // Giới hạn thời gian chờ là 10 giây
        timerProgressBar: true, // Hiển thị thanh tiến trình chờ
        didOpen: () => {
          Swal.showLoading(); // Hiển thị icon loading
        },
      });
      const response = await dispatch(
        register({ name, username, email, password })
      );

      // message === ""
      // navigate("/verify");
      response.payload.message === "Create success!"
        ? navigate("/verify")
        : navigate("/register");
      console.log(response.payload.message);
      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowpasswordAgain = () => {
    setShowPasswordAgain(!showpasswordAgain);
  };

  const handleMouseDownpasswordAgain = (event) => {
    event.preventDefault();
  };
  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={1}
        mt={2}
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
              name: "",
              username: "",
              email: "",
              password: "",
              passwordAgain: "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is required"),
              username: Yup.string().max(255).required("Username is required"),
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string()
                .min(8)
                .max(255)
                .matches(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
                .required("Password is required"),
              passwordAgain: Yup.string()
                .min(8)
                .max(255)
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .matches(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
                .required("Password is required"),
            })}
            onSubmit={handleRegister}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              touched,
              values,
              isSubmitting,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name-login">Name</InputLabel>
                      <OutlinedInput
                        id="name-login"
                        type="text"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter name"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="username-login">username</InputLabel>
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
                      <InputLabel htmlFor="email-res">Email</InputLabel>
                      <OutlinedInput
                        id="email-res"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="-password-login"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
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
                        inputProps={{}}
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
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box
                            sx={{
                              bgcolor: level?.color,
                              width: 85,
                              height: 8,
                              borderRadius: "7px",
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="passwordconfirm-login">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(
                          touched.passwordAgain && errors.passwordAgain
                        )}
                        id="passwordAgain"
                        type={showpasswordAgain ? "text" : "password"}
                        value={values.passwordAgain}
                        name="passwordAgain"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle passwordAgain visibility"
                              onClick={handleClickShowpasswordAgain}
                              onMouseDown={handleMouseDownpasswordAgain}
                              edge="end"
                              size="large"
                            >
                              {showpasswordAgain ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        autocomplete="new-password"
                        placeholder="Enter Confirm Password"
                      />
                      {touched.passwordAgain && errors.passwordAgain && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-passwordAgain-login"
                        >
                          {errors.passwordAgain}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      // disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Create Account
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Register;
