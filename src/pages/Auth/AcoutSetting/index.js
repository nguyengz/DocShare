import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAbout, updateUser } from "~/slices/auth";
import FormChangePass from "../FormChangePass";

const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 1,
  textAlign: "left",
  minHeight: "30px",
  // width: "300px",
  color: theme.palette.text.secondary,
}));
const style = {
  largeAvatar: {
    width: "150px",
    height: "150px",
    fontSize: "50px",
    margin: "auto",
  },

  gridUser: {
    margin: "auto",
    width: "70%",
    padding: "5px",
  },
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
  girdCard: {
    width: "200px",
    height: "200px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
  imageWrapper: {
    display: "grid",
    width: "100%",
    height: "100%",
    // borderRadius: "1px",
    // boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)",
    justifyContent: "center",
    padding: "0",
    overflowX: "hidden",
  },
  input: {
    // with: "350px",
    height: "40px",
  },
  TextareaAutosize: {
    height: "200px",
    width: "100%",
    backgroundColor: "red",
  },
  tag: {
    margin: "5px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontWeight: "bold",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  selectedTag: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
};
// const useStyles = makeStyles({
//   input: {
//     // with: "350px",
//     height: "40px",
//   },
//   TextareaAutosize: {
//     height: "200px",
//     width: "100%",
//     backgroundColor: "red",
//   },
//   tag: {
//     margin: "5px",
//     backgroundColor: "#f0f0f0",
//     color: "#333",
//     fontWeight: "bold",
//     borderRadius: "5px",
//     "&:hover": {
//       backgroundColor: "#e0e0e0",
//     },
//   },
//   selectedTag: {
//     backgroundColor: "#3f51b5",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "#3f51b5",
//     },
//   },
// });
function AcountSetting() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.auth.userAbout);
  const [email, setEmail] = useState(null);
  const [firtName, setFirtName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [about, setAbout] = useState(null);
  const [numberPhone, setNumberPhone] = useState(null);
  const [linksocial, setLinksocial] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState();
  const [image, setImage] = useState();
  const [preAvatarUrl, setPreAvatarUrl] = useState();
  const [openFormPass, setOpenFormPass] = useState(false);
  useEffect(() => {
    try {
      dispatch(fetchUserAbout(currentUser.id));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser?.id, dispatch]);
  useEffect(() => {
    if (userAbout?.name) {
      const { firstName, lastName } = splitName(userAbout.name);
      setFirtName(firstName);
      setLastName(lastName);
    }
    setEmail(userAbout?.email);
    setAbout(userAbout?.about);
    setNumberPhone(userAbout?.phone);
    setLinksocial(userAbout?.linksocial);
    if (userAbout?.avatar) {
      loadImage(userAbout.avatar).then((url) => {
        setAvatarUrl(url);
        setPreAvatarUrl(url);
      });
    }
    // setNumberPhone(userAbout?.phone);
  }, [userAbout]);
  function loadImage(link) {
    return fetch(`http://localhost:8080/file/review/${link}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  }

  useEffect(() => {}, [userAbout?.avatar]);
  function splitName(name) {
    const nameArray = name.split(" ");
    let firstName = "";
    let lastName = "";

    // Nếu tên có nhiều hơn 1 từ, tất cả các từ trừ từ cuối cùng sẽ là first name
    if (nameArray.length > 1) {
      firstName = nameArray.slice(0, -1).join(" ");
      lastName = nameArray[nameArray.length - 1];
    }
    // Nếu tên chỉ có 1 từ, tên đó sẽ được đặt là last name
    else {
      lastName = name;
    }

    return { firstName, lastName };
  }
  const handleUploadButtonClick = () => {
    const MAX_FILE_SIZE = 500 * 1024;
    const fileInput = document.getElementById("contained-button-file");
    fileInput.click();
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      setImage(file);
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          title: "Error!",
          text: "File size should not exceed 500KB",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    });
  };
  const hanleUpdateInfomation = async () => {
    const data = {
      fileImg: image,
      user_id: currentUser?.id,
      name: `${firtName} ${lastName}`,
      about: about,
      phone: numberPhone,
      linksocial: linksocial,
    };
    console.log(image);
    const formData = new FormData();
    formData.append("fileImg", data.fileImg);
    formData.append("user_id", data.user_id);
    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("numberPhone", data.phone);
    formData.append("linksocial", data.linksocial);
    try {
      dispatch(updateUser(formData));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseForm = () => {
    setOpenFormPass(false);
  };
  const handleOpenForm = () => {
    setOpenFormPass(true);
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "1000px",
          margin: "1px",
          background: "white",
          width: "100%",
        }}
      >
        <Grid
          container
          sm={8}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          margin="auto"
        >
          <Typography
            variant="h2"
            // color="initial
            fontSize={40}
            fontWeight={50}
            mt={5}
            ml={-45}
          >
            Acount Setting
          </Typography>

          <Grid
            container
            sm={8}
            sx={{
              flexDirection: "column",
              border: "1px dashed #b4bbd1",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: "20px",
              padding: 2,
            }}
          >
            {/* <input type="file" name="file" /> */}
            <Formik
              initialValues={{
                name: "",
                about: "",
                phone: "",
                linksocial: "",
              }}
              validationSchema={Yup.object().shape({
                firtName: Yup.string().max(255),
                lastName: Yup.string().max(255),
                about: Yup.string().max(255),
                phone: Yup.string()
                  .matches(/^[0-9+()-]{10,}$/gm, "Invalid phone number")
                  .max(255),
                linksocial: Yup.string().url("Invalid URL").max(255),
              })}
              onSubmit={hanleUpdateInfomation}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  <Grid container>
                    <Grid item xs={12}>
                      <Stack
                        direction={{ xs: "row" }}
                        spacing={1}
                        // justifyContent="left"
                        justifyItems="center"
                        height="200px"
                      >
                        <Card
                          direction="row"
                          sx={{
                            width: "100%",
                            display: "flex",
                            // padding: "10px",
                          }}
                        >
                          <CardMedia
                            title="My Account"
                            sx={{
                              width: "150px",
                              height: "150px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              margin: "auto",
                            }}
                          >
                            <Avatar
                              style={{
                                width: "150px",
                                height: "150px",
                                fontSize: "50px",
                                margin: "auto",
                                objectFit: "cover", // add this line
                              }}
                              src={avatarUrl}
                            >
                              <AccountCircle />
                            </Avatar>
                          </CardMedia>

                          <CardContent sx={{}}>
                            <Typography
                              variant="body2"
                              style={{
                                fontSize: "15px",
                              }}
                            >
                              Supported formats: jpg, png, gif
                              <br />
                              Maximum size: 500KB
                              <br />
                              Tip: For best results, use a square image (96 X 96
                              pixels)
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                marginBottom: 0,
                                mt: 8,
                                mr: 2,

                                borderRadius: "10px",
                                textTransform: "none",
                              }}
                              onClick={handleUploadButtonClick}
                            >
                              Select Image
                              <input
                                id="contained-button-file"
                                name="file"
                                type="file"
                                hidden
                                accept="image/*"
                              />
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              sx={{
                                marginBottom: 0,
                                mt: 8,
                                borderRadius: "10px",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setAvatarUrl(preAvatarUrl);
                                const fileInput = document.getElementById(
                                  "contained-button-file"
                                );
                                fileInput.value = null;
                              }}
                            >
                              Clear Image
                            </Button>
                          </CardContent>
                        </Card>
                        {/* <CardMedia title="My Account" image={iconUrl} /> */}
                      </Stack>
                      <Stack xs={2}></Stack>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      direction="row"
                      sx={{ marginTop: "10px" }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="space-around"
                      >
                        <Stack direction="column" spacing={4} md={5}>
                          <Item>
                            <InputLabel htmlFor="Email">Email</InputLabel>
                            <OutlinedInput
                              style={style.input}
                              type="text"
                              fullWidth
                              value={email}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              disabled={true}
                            />
                          </Item>
                          <Item>
                            <InputLabel htmlFor="FirstName">
                              FirstName
                            </InputLabel>
                            <OutlinedInput
                              style={style.input}
                              type="text"
                              id="firtName"
                              name="firtName"
                              onBlur={handleBlur}
                              placeholder="Enter firtName"
                              error={Boolean(
                                touched.firtName && errors.firtName
                              )}
                              fullWidth
                              value={firtName}
                              onChange={(e) => {
                                handleChange(e);
                                setFirtName(e.target.value);
                              }}
                            />
                            {touched.firtName && errors.firtName && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.firtName}
                              </FormHelperText>
                            )}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="About">About</InputLabel>
                            <TextareaAutosize
                              style={{ height: "100px", width: "100%" }}
                              id="about"
                              name="about"
                              onBlur={handleBlur}
                              placeholder="Enter about"
                              error={Boolean(touched.about && errors.about)}
                              value={about}
                              onChange={(e) => {
                                handleChange(e);
                                setAbout(e.target.value);
                              }}
                            />
                            {touched.about && errors.about && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.about}
                              </FormHelperText>
                            )}
                          </Item>
                        </Stack>
                        <Stack direction="column" spacing={4}>
                          <Item>
                            <InputLabel htmlFor="About">Password</InputLabel>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ borderRadius: "10px" }}
                              onClick={handleOpenForm}
                            >
                              Change Password
                            </Button>
                            {/* <InputLabel htmlFor="PassWord">PassWord</InputLabel>
                            <OutlinedInput
                              style={style.input}
                              type="text"
                              fullWidth
                              //   value={title}
                              //   onChange={(e) => {
                              //     // handleChange(e);
                              //     setTitle(e.target.value);
                              //   }}
                            /> */}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="LastName">LastName</InputLabel>
                            <OutlinedInput
                              style={style.input}
                              id="lastName"
                              name="lastName"
                              type="text"
                              fullWidth
                              onBlur={handleBlur}
                              placeholder="Enter lastName"
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              value={lastName}
                              onChange={(e) => {
                                handleChange(e);
                                setLastName(e.target.value);
                              }}
                            />
                            {touched.lastName && errors.lastName && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.lastName}
                              </FormHelperText>
                            )}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="Title-login">
                              NumberPhone
                            </InputLabel>

                            <OutlinedInput
                              style={style.input}
                              id="phone"
                              name="phone"
                              type="text"
                              onBlur={handleBlur}
                              placeholder="Enter numberPhone"
                              error={Boolean(touched.phone && errors.phone)}
                              value={numberPhone}
                              onChange={(e) => {
                                handleChange(e);
                                setNumberPhone(e.target.value);
                              }}
                              fullWidth
                            />
                            {touched.phone && errors.phone && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="Privacy">
                              {" "}
                              Link social
                            </InputLabel>
                            <OutlinedInput
                              style={style.input}
                              id="linksocial"
                              name="linksocial"
                              type="text"
                              onBlur={handleBlur}
                              placeholder="Enter linksocial"
                              error={Boolean(
                                touched.linksocial && errors.linksocial
                              )}
                              value={linksocial}
                              onChange={(e) => {
                                handleChange(e);
                                setLinksocial(e.target.value);
                              }}
                              fullWidth
                            />
                            {touched.linksocial && errors.linksocial && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.linksocial}
                              </FormHelperText>
                            )}
                          </Item>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ padding: 2, alignItems: "right" }}
                      justifyItems="right"
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="flex-end"
                      >
                        {" "}
                        <Button
                          // disableElevation
                          // disabled={loading}
                          size="large"
                          type="submit"
                          variant="outlined"
                          color="primary"
                        >
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
      {openFormPass && (
        <FormChangePass onCancel={handleCloseForm} email={email} />
      )}
    </>
  );
}

export default AcountSetting;
