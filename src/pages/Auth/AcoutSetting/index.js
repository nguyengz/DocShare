import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
import { makeStyles } from "@mui/styles";
const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 1,
  textAlign: "left",
  minHeight: "20px",
  width: "300px",
  color: theme.palette.text.secondary,
}));
const style = {
  largeAvatar: {
    width: "150px",
    height: "150px",
    fontSize: "50px",
    margin: "auto",
  },
  input: {
    with: "300px",
    height: "40px",
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
};
const useStyles = makeStyles({
  input: {
    with: "300px",
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
});
function AcountSetting() {
  const classes = useStyles();
  const iconFile = new Blob([<AccountCircle />], { type: "image/svg+xml" });
  const iconUrl = URL.createObjectURL(iconFile);
  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("contained-button-file");
    fileInput.click();
  };
  return (
    <>
      <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
        <Grid
          container
          sm={8}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          wrap="nowrap"
          margin="auto"
        >
          <Typography
            variant="h1"
            color="initial"
            fontSize={50}
            fontWeight={50}
          >
            Acount Setting
          </Typography>

          <Grid
            container
            sm={8}
            sx={{
              display: "flex",
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
                filePath: "",
                shared: "",
                title: "",
                description: "",
                category: "",
                tags: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("username is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              // onSubmit={handleLogin}
            >
              {({ errors, handleBlur, handleChange, touched, values }) => (
                <Form>
                  <Grid container>
                    <Grid item xs={12}>
                      <Stack
                        direction={{ xs: "row" }}
                        spacing={3}
                        justifyContent="left"
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
                            <Avatar style={style.largeAvatar}>
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
                              }}
                              onClick={handleUploadButtonClick}
                            >
                              Select Image
                              <input
                                id="contained-button-file"
                                name="file"
                                type="file"
                                // onChange={(event) => {
                                //   const selectedFile = event.target.files[0];
                                //   // handle the selected file here
                                // }}
                                hidden
                                accept="image/*"
                              />
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
                        spacing={1}
                        justifyContent="space-between"
                      >
                        <Stack direction="column" spacing={4}>
                          <Item>
                            <InputLabel htmlFor="Email">Email</InputLabel>
                            <OutlinedInput
                              className={classes.input}
                              type="text"
                              fullWidth
                              //   value={title}
                              //   onChange={(e) => {
                              //     // handleChange(e);
                              //     setTitle(e.target.value);
                              //   }}
                            />
                          </Item>
                          <Item>
                            <InputLabel htmlFor="FirstName">
                              FirstName
                            </InputLabel>
                            <OutlinedInput
                              className={classes.input}
                              type="text"
                              fullWidth
                              //   value={title}
                              //   onChange={(e) => {
                              //     // handleChange(e);
                              //     setTitle(e.target.value);
                              //   }}
                            />
                          </Item>
                          <Item>
                            <InputLabel htmlFor="About">About</InputLabel>
                            <TextareaAutosize
                              style={{ height: "100px", width: "100%" }}
                              //   value={description}
                              //   onChange={(e) => {
                              //     // handleChange(e);
                              //     setDescription(e.target.value);
                              //   }}
                            />
                          </Item>
                        </Stack>
                        <Stack direction="column" spacing={4}>
                          <Item>
                            <Button>Change Password</Button>
                            {/* <InputLabel htmlFor="PassWord">PassWord</InputLabel>
                            <OutlinedInput
                              className={classes.input}
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
                              className={classes.input}
                              type="text"
                              fullWidth
                              //   value={title}
                              //   onChange={(e) => {
                              //     // handleChange(e);
                              //     setTitle(e.target.value);
                              //   }}
                            />
                          </Item>
                          <Item>
                            <InputLabel htmlFor="Title-login">
                              NumberPhone
                            </InputLabel>

                            <OutlinedInput
                              sx={useStyles.input}
                              className={classes.input}
                              type="text"
                              // value={selectedTags}
                              // onChange={(e) => {
                              //   // handleChange(e);
                              //   setSelectedTags(e.target.value);
                              // }}
                              fullWidth
                            ></OutlinedInput>
                          </Item>
                          <Item>
                            <InputLabel htmlFor="Privacy">Address</InputLabel>
                            <OutlinedInput
                              sx={useStyles.input}
                              className={classes.input}
                              type="text"
                              // value={selectedTags}
                              // onChange={(e) => {
                              //   // handleChange(e);
                              //   setSelectedTags(e.target.value);
                              // }}
                              fullWidth
                            ></OutlinedInput>
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
    </>
  );
}

export default AcountSetting;
