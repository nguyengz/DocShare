import { useEffect, useState } from "react";

import {
  Button,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Stack,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  FormControl,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { strengthColor, strengthIndicator } from "~/utils/password-strength";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePass, logout } from "~/slices/auth";
import Swal from "sweetalert2";
import message from "~/slices/message";
import { useNavigate } from "react-router-dom";

const FormChangePass = ({ onCancel, email }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordAgain, setShowPasswordAgain] = useState(false);

  useEffect(() => {
    changePassword("");
  }, []);
  const handleSave = async (formValue, { setSubmitting }) => {
    const { username, password } = formValue;
    // const data = { username, password };
    // alert(password);
    try {
      Swal.fire({
        title: "Checking information...",
        timer: 15000, // Giới hạn thời gian chờ là 10 giây
        timerProgressBar: true, // Hiển thị thanh tiến trình chờ
        didOpen: () => {
          Swal.showLoading(); // Hiển thị icon loading
        },
      });
      await dispatch(changePass({ username, password }));
      onCancel();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Infomation updated error",
        text: "Username or email not found",
        timer: 3000,
      });
    }
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        backgroundColor: "white",
        padding: "2rem",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
        width: "70%",
        maxWidth: "600px",
      }}
    >
      <Formik
        initialValues={{
          username: email,
          password: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(5)
            .max(255)
            .required("username is required"),
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
        onSubmit={handleSave}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          touched,
          values,
          isValid,
          isSubmitting,
        }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">
                    Username or Email
                  </InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Username or Email"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                    defaultValue={email}
                    readOnly
                    disabled={true}
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
                  <InputLabel htmlFor="password-login">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(
                      touched.passwordAgain && errors.passwordAgain
                    )}
                    id="-passwordAgain-login"
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
              <Grid item xs={12} spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={onCancel}
                  sx={{ marginLeft: 5 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormChangePass;
