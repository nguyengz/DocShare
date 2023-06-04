/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  FreeMode,
  Scrollbar,
  Mousewheel,
} from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import "./styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "~/slices/category";

const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 1,
  textAlign: "left",
  minHeight: "20px",
  width: "300px",
  color: theme.palette.text.secondary,
}));
const useStyles = makeStyles({
  input: {
    with: "250px",
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
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
  imageWrapper: {
    width: "400px",
    height: "400px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "3px",
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
    padding: "0",
  },
});
// const styles = {
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "1px",
//   },
//   imageWrapper: {
//     width: "300px",
//     height: "350px",
//     border: "1px solid rgba(0,0,0,0.15)",
//     borderRadius: "3px",
//     boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
//     padding: "0",
//   },
// };
const category = [
  { id: "1", value: "Apple" },
  { id: "2", value: "Samsung" },
  { id: "3", value: "Apple" },
];
// const tags = ["React", "JavaScript", "Material-UI", "Web Development"];
function InfomationUpload(props) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const categoryData = useSelector((state) => state.category.data);
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [selectedTags, setSelectedTags] = useState([]);
  const [alignment, setAlignment] = useState("true");
  const [title, setTitle] = useState("Public");
  const [description, setDescription] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  const canvasRef = useRef(null);

  const pdf = props.pdf;

  const handleDelete = (tag) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
  };
  const handleChangePrivacy = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  async function renderPage(pageNumber) {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      console.log("page lenght", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
  }

  useEffect(() => {
    dispatch(fetchCategory());
    // alert(currentUser.id);
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf, currentPage, dispatch]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }
  const handleFileUpload = async () => {
    const data = {
      filePath: currentUser.name,
      shared: alignment,
      title: props.nameFile,
      description: description,
      category: selectedCategory,
      tags: selectedTags,
      iduser: currentUser.id,
    };
    const formData = new FormData();
    formData.append("fileUpload", props.selectedFile);
    formData.append("filePath", data.filePath);
    formData.append("shared", data.shared);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("iduser", data.iduser);
    console.log(data);
    try {
      const response = await axios.post("/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Box
        container
        sx={{
          width: "700px",
          minHeight: "100vh",
          margin: "40px auto ",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "28px", fontWeight: "600", textAlign: "center" }}
        >
          Add more information to your upload
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            textAlign: "center",
            color: "var(--blue-gray-600)",
            margin: "10px auto",
          }}
        >
          Tip: Better titles and descriptions lead to more readers
        </Typography>

        <Card
          container
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
              username: Yup.string().max(255).required("username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            // onSubmit={handleLogin}
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form>
                <Grid container>
                  <Grid item xs={12}>
                    <Stack
                      direction={{ xs: "row" }}
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <Item>
                        <Swiper
                          pagination={{
                            type: "progressbar",
                          }}
                          navigation={true}
                          modules={[Pagination, Navigation]}
                          className="mySwiper"
                          style={useStyles.wrapper}
                        >
                          {images.map((image, idx) => (
                            <SwiperSlide
                              key={idx}
                              style={useStyles.imageWrapper}
                              scrollbar={true}
                              direction={"vertical"}
                              slidesPerView={"auto"}
                            >
                              <img
                                id="image-generated"
                                src={image}
                                alt="pdfImage"
                                style={{
                                  width: "90%",
                                  height: "90%",
                                  margin: "0",
                                }}
                              />
                              {/* </div> */}
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Item>
                      <Item>
                        <Typography
                          variant="h4"
                          color="initial"
                          wordBreak="break-all"
                          whiteSpace="pre-line"
                        >
                          {props.nameFile}
                        </Typography>
                      </Item>
                    </Stack>
                    <Stack xs={2}></Stack>
                  </Grid>
                  <Grid item xs={12} direction="row">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <Stack direction="column" spacing={4}>
                        <Item>
                          <InputLabel htmlFor="Title-login">Title</InputLabel>
                          <OutlinedInput
                            className={classes.input}
                            type="text"
                            fullWidth
                            value={props.nameFile}
                          />
                        </Item>
                        <Item>
                          <InputLabel htmlFor="Title-login">
                            Description*
                          </InputLabel>
                          <TextareaAutosize
                            style={{ height: "100px", width: "100%" }}
                            value={description}
                            onChange={(e) => {
                              handleChange(e);
                              setDescription(e.target.value);
                            }}
                          />
                        </Item>
                      </Stack>
                      <Stack direction="column" spacing={4}>
                        <Item>
                          <InputLabel>Category</InputLabel>
                          <Select
                            className={classes.input}
                            value={selectedCategory}
                            onChange={(e) => {
                              handleChange(e);
                              setSelectedCategory(e.target.value);
                            }}
                            sx={{ width: "100%" }}
                            // autoWidth
                            displayEmpty
                          >
                            <MenuItem value="Select a Category" disabled>
                              Select a Category
                            </MenuItem>
                            {categoryData.map((category) => (
                              <MenuItem
                                sx={{
                                  
                                }}
                                key={category.id}
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </MenuItem>
                            ))}
                          </Select>
                        </Item>
                        <Item>
                          <InputLabel htmlFor="Title-login">Tags</InputLabel>
                          <OutlinedInput
                            sx={useStyles.input}
                            className={classes.input}
                            type="text"
                            value={selectedTags}
                            onChange={(e) => {
                              // handleChange(e);
                              setSelectedTags(e.target.value);
                            }}
                            fullWidth
                          ></OutlinedInput>
                        </Item>
                        <Item>
                          <InputLabel htmlFor="Privacy">Privacy</InputLabel>
                          <ToggleButtonGroup
                            color="primary"
                            backgroundColor="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChangePrivacy}
                            aria-label="Platform"
                          >
                            <ToggleButton value="true">Public</ToggleButton>
                            <ToggleButton value="false">Private</ToggleButton>
                          </ToggleButtonGroup>
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
                        Delete
                      </Button>
                      <Button
                        // disableElevation
                        // disabled={loading}

                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleFileUpload}
                      >
                        Publish
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>

          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          ></Grid>
        </Card>
      </Box>
    </Container>
  );
}

export default InfomationUpload;
