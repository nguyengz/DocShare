/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
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
import { TagsInput } from "react-tag-input-component";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import "./styles1.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "~/slices/category";
import { uploadfile } from "~/slices/file";
import { useNavigate } from "react-router-dom";
import LinearProgressWithLabel from "~/utils/LinearProgressWithLabel";
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
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
    width: "300px",
    height: "300px",
  },
  imageWrapper: {
    display: "block",
    width: "100%",
    height: "100%",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "1px",
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
    padding: "0",
    overflowX: "hidden",
  },
};

function InfomationUpload(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const categoryData = useSelector((state) => state.category.data);
  const fileType = props.selectedFile
    ? props.selectedFile.type.split("/").pop()
    : "";
  const fileSize = props.selectedFile ? props.selectedFile.size : 0;
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [tags, setSelectedTags] = useState([]);
  const [alignment, setAlignment] = useState("true");
  const [title, setTitle] = useState(props.nameFile);
  const [description, setDescription] = useState("");

  // const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [images, setImages] = useState([]);
  const [firstImage, setfirstImage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(10);
  // const [pdfRendering, setPdfRendering] = useState("");
  const [pageRendering, setPageRendering] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const pdf = props.pdf;
  const handleDelete = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setSelectedTags(newTags);
  };
  const handleChangePrivacy = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  function dataURLtoBlob(dataURL) {
    var arr = dataURL.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  async function renderPage(pageNumber) {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 0.5 });
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
    addFirstImage(imagesList[0]);
  }

  function addFirstImage(firstImage) {
    setfirstImage(firstImage);
  }

  useEffect(() => {
    dispatch(fetchCategory());
    pdf && renderPage();
  }, [pdf, dispatch]);

  const handleFileUpload = async () => {
    setIsUploading(true);
    const data = {
      filePath: currentUser.name,
      shared: alignment,
      title: title,
      description: description,
      category: selectedCategory,
      tags: tags,
      iduser: currentUser.id,
      fileImg: firstImage,
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
    const firstImageBlob = dataURLtoBlob(data.fileImg);
    formData.append("fileImg", firstImageBlob, "firstImage.png");
    try {
      // dispatch the uploadfile action
      await dispatch(uploadfile(formData)).then(() => {
        setIsUploading(false);
        navigate(`/currentUser.name/EditUpload`);
      });
    } catch (error) {
      console.log(error);
      setIsUploading(false); // set isUploading state to false if there is an error
    }
  };
  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  return (
    <>
      {isUploading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            zIndex: 9999,
          }}
        >
          <LinearProgressWithLabel value={progress} />
        </div>
      )}
      <Container minHeight="1000px">
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
                title: props.nameFile,
                description: "",
                category: "",
                tags: [],
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().max(200).required("FileName is required"),
                description: Yup.string()
                  .min(10)
                  .max(255)
                  .required("Description is required"),
                tags: Yup.array().required("Tags is required"),
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
                        justifyContent=""
                      >
                        <Item>
                          <Swiper
                            pagination={{
                              type: "progressbar",
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            style={styles.wrapper}
                          >
                            {images.map((image, idx) => (
                              <SwiperSlide
                                key={idx}
                                style={styles.imageWrapper}
                                // direction={"vertical"}
                                // slidesPerView={"auto"}
                              >
                                <img
                                  id="image-generated"
                                  src={image}
                                  alt="pdfImage"
                                  style={{
                                    width: width,
                                    height: height,
                                    margin: "auto",
                                    display: "block",
                                    // width: "100%",
                                    // height: "100%",
                                    objectFit: "cover",
                                  }}
                                />

                                {/* </div> */}
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Item>
                        <Item>
                          {/* <p style={{fontSize: "20px", display: "block"}}> {props.nameFile}<br/></p> */}
                          <Typography
                            variant="caption"
                            color="initial"
                            wordBreak="break-all"
                            whiteSpace="pre-line"
                            style={{
                              fontSize: "20px",
                              overflowWrap: "break-word",
                            }}
                          >
                            {props.nameFile}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: "15px",
                              marginLeft: "5px",
                            }}
                          >
                            Type: {fileType}
                            <br />
                            Size: {formatBytes(fileSize)}
                          </Typography>
                        </Item>
                      </Stack>
                      <Stack xs={2}></Stack>
                    </Grid>
                    <Grid item xs={12} direction="row">
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                      >
                        <Stack direction="column" spacing={4}>
                          <Item>
                            <InputLabel htmlFor="Title-login">
                              FileName
                            </InputLabel>
                            <OutlinedInput
                              className={classes.input}
                              type="text"
                              name="title"
                              onBlur={handleBlur}
                              placeholder="Enter FileName"
                              error={Boolean(touched.title && errors.title)}
                              value={title}
                              onChange={(e) => {
                                handleChange(e);
                                setTitle(e.target.value);
                              }}
                              fullWidth
                            />
                            {touched.title && errors.title && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.title}
                              </FormHelperText>
                            )}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="description-login">
                              Description*
                            </InputLabel>
                            <TextareaAutosize
                              style={{ height: "100px", width: "100%" }}
                              name="description"
                              onBlur={handleBlur}
                              placeholder="Enter FileName"
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              value={description}
                              onChange={(e) => {
                                handleChange(e);
                                setDescription(e.target.value);
                              }}
                            />
                            {touched.description && errors.description && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.description}
                              </FormHelperText>
                            )}
                          </Item>
                        </Stack>
                        <Stack direction="column" spacing={4}>
                          <Item>
                            <InputLabel>Category</InputLabel>
                            <Select
                              className={classes.input}
                              value={selectedCategory}
                              name="selectedCategory"
                              onBlur={handleBlur}
                              error={Boolean(
                                touched.selectedCategory &&
                                  errors.selectedCategory
                              )}
                              onChange={(e) => {
                                setSelectedCategory(e.target.value);
                              }}
                              sx={{ width: "100%" }}
                              // autoWidth
                              displayEmpty
                              required
                            >
                              <MenuItem value="Select a Category" disabled>
                                Select a Category
                              </MenuItem>
                              {categoryData.map((category) => (
                                <MenuItem
                                  sx={{}}
                                  key={category.id}
                                  value={category.categoryName}
                                >
                                  {category.categoryName}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.selectedCategory &&
                              errors.selectedCategory && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-text-email-login"
                                >
                                  {errors.selectedCategory}
                                </FormHelperText>
                              )}
                          </Item>
                          <Item>
                            <InputLabel htmlFor="Title-login">Tags</InputLabel>
                            <TagsInput
                              className={classes.input}
                              name="tags"
                              onBlur={handleBlur}
                              error={Boolean(touched.tags && errors.tags)}
                              value={tags}
                              onChange={(tags) => setSelectedTags(tags)}
                              placeHolder="enter tags"
                              required
                            />
                            {touched.tags && errors.tags && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.tags}
                              </FormHelperText>
                            )}
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
    </>
  );
}

export default InfomationUpload;
