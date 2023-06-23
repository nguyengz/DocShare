import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { AccountCircle } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Example from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "~/slices/user";
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
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid",
  borderColor: "blue",
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    borderColor: "black",
  },
  marginLeft: theme.spacing(2),
  width: "300px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function MyUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.userAbout.userAbout);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
    // console.log(userAbout);
  }, [currentUser, dispatch]);
  return (
    <>
      <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
        <Grid
          container
          xs={12}
          sm={8}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          wrap="nowrap"
          margin="auto"
        >
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: "20px",
              padding: 2,
            }}
          >
            <Typography
              variant="h1"
              color="initial"
              fontSize={28}
              fontWeight={50}
              padding="32px 0"
            >
              Acount Setting
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px dashed #b4bbd1",
              justifyContent: "center",
              justifyItems: "center",
              padding: 2,
            }}
          >
            <Example data={userAbout?.files} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyUpload;
