/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Link,
  Snackbar,
} from "@mui/material";
// import "./styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { fetchFileDetail, fetchfile } from "~/slices/file";
import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { downloadFile } from "~/slices/download";
import FileListMore from "./FileList";
import FileListTags from "./FileListTags";
import Pricing from "../Payment/Package";
import { registerPackage } from "~/slices/paypal";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    border: "1px solid rgba(0,0,0,0.15)",
    // borderRadius: "1px",
    // boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)",
    padding: "0",
    overflowX: "hidden",
    background: "aliceblue",
    /* width: 100px; */
    objectfit: "cover",
  },
};
function FileDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { state } = window.history;
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfRendering, setPdfRendering] = React.useState("");
  const [pageRendering, setPageRendering] = React.useState("");
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const fileDetail = useSelector((state) => state.file.detailList);
  const fileList = useSelector((state) => state.file.fileList);
  const uploadDate = new Date(fileDetail.uploadDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = uploadDate.toLocaleDateString("en-US", options);

  const buttonColor = isFollowing ? "paleturquoise" : "#FFFFFF";
  const iconColor = isLiked ? "#FF0000" : "#000000";
  const tags = fileDetail.tags;
  // const link = state.link;
  // const file_id = id;
  useEffect(() => {
    dispatch(fetchFileDetail(id));
    dispatch(fetchfile());
  }, []);
  async function renderPage(pdfUrl, pageNumber) {
    setPageRendering(true);
    setIsLoading(true);
    const _pdf = await pdfjs.getDocument(pdfUrl).promise;
    setPdf(_pdf);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.className = "canv";
    const context = canvas.getContext("2d");

    for (let i = 1; i <= _pdf.numPages; i++) {
      const page = await _pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      setWidth(viewport.width);
      setHeight(viewport.height);
      const renderContext = { canvasContext: context, viewport };
      await page.render(renderContext).promise;
      const img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
    setIsLoading(false); // set isLoading to false when pages are rendered
  }
  const showSubscriptionPopup = () => {
    // Display a popup with a message and a button to subscribe
    const popup = window.confirm(
      "Please subscribe to a package to download this file."
    );
    if (popup) {
      // Redirect the user to a subscription page
      window.location.href = "/subscription";
    }
  };
  const handleDownload = () => {
    // Check if the user has an active subscription
    const hasSubscription = true;
    if (!hasSubscription) {
      // Show the pricing page
      setShowPricing(true);
      return;
    }

    // If the user has an active subscription, allow them to download the file
    // const fileUrl =
    //   fileDetail.link + "/" + fileDetail.userId + "/" + fileDetail.id;
    // const fileName = fileDetail.fileName;
    // dispatch(downloadFile({ fileUrl, fileName }));
  };

  useEffect(() => {
    console.log("link: " + fileDetail.link);
    const pdfUrl =
      "http://localhost:8080/file/download/" +
      fileDetail.link +
      "/" +
      fileDetail.userId +
      "/" +
      fileDetail.id;

    console.log(pdfUrl);
    if (pdfUrl && currentPage) {
      renderPage(pdfUrl, currentPage); // pass currentPage to renderPage function
    }
  }, [currentPage, fileDetail.link, fileDetail.userId, fileDetail.id]);
  const handleLikeFile = () => {
    fetch("http://localhost:8080/file/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: currentUser.id,
        fileid: fileDetail.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setIsLiked(true);
          // xử lý khi like thành công
          toast.success("Liked file!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          // xử lý khi like thất bại
          toast.error("Failed to like file.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFollow = () => {
    fetch("http://localhost:8080/api/auth/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        friend_id: fileDetail.userId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsFollowing(!isFollowing);
          response.json().then((data) => {
            toast.success(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          response.json().then((error) => {
            toast.error(error.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      {" "}
      <ToastContainer />
      {showPricing && (
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <Pricing onBack={() => setShowPricing(false)} />
        </div>
      )}
      <Box container sx={{ minHeight: "1000px" }}>
        <Card
          sx={{
            margin: "5px ",
          }}
        >
          <Grid sm={12} container direction="row">
            <Grid xs={12} sm={8} direction="column">
              <Grid
                item
                sx={{
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <CircularProgress /> // show CircularProgress when isLoading is true
                ) : images && images.length > 0 ? (
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
                      <SwiperSlide key={idx} style={styles.imageWrapper}>
                        <img
                          id="image-generated"
                          src={image}
                          alt="pdfImage"
                          style={{
                            display: "block",
                            width: width,
                            height: height,
                            border: "2px ridge  ",
                            margin: "5px auto",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Typography variant="h1" color="initial">
                    None
                  </Typography>
                )}
              </Grid>
              <Grid
                xs={12}
                sm={8}
                item
                sx={{
                  height: 300,
                  margin: 1,
                }}
                spacing={4}
              >
                <Stack
                  sm={8}
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Stack sm={4} item sx={{ width: "80%" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "26px",
                        fontWeight: 200,
                        wordWrap: "break-word",
                      }}
                    >
                      {fileDetail.fileName > 100
                        ? fileDetail.fileName.slice(0, 100) + "..."
                        : fileDetail.fileName}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      {formattedDate} • {fileDetail.likeFile} likes •{" "}
                      {fileDetail.view} views
                    </Typography>
                  </Stack>
                  <Stack item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownload}
                      height="50px"
                    >
                      <DownloadIcon />
                      Download Now
                    </Button>
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      Download to read offline
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                  {isLiked ? (
                    <FavoriteBorderIcon
                      style={{ color: iconColor }}
                      onClick={handleLikeFile}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{ color: iconColor }}
                      onClick={handleLikeFile}
                    />
                  )}
                  <ShareRoundedIcon />
                  <MoreHorizRoundedIcon />
                </Stack>
                <Stack direction="row" spacing={2}>
                  {tags &&
                    tags.map((tag, index) => (
                      <Button
                        key={index}
                        component={Link}
                        href={`/`}
                        sx={{
                          border: "1px solid",
                          borderRadius: "56px",
                          background: "",
                          padding: "0 16px",
                          lineHeight: "24px",
                        }}
                        label={tag.tagName}
                      >
                        {tag.tagName}
                      </Button>
                    ))}
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>
                    Take time to reflect on your career path. It's worth the
                    effort. Full LinkedIn article: http://bit.ly/4Strategies
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ margin: "10px 5px" }}>
                  <Stack item>
                    {" "}
                    <Avatar></Avatar>
                  </Stack>
                  <Stack item>
                    <Typography
                      component={Link}
                      style={{
                        marginRight: "auto",
                        textDecoration: "none",
                        color: "#1976d2",
                      }}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                      href={`/About/${fileDetail.userId}`}
                      key={fileDetail.userId}
                      onMouseEnter={(e) => {
                        e.target.style.color = "blue";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "1976d2";
                      }}
                    >
                      {fileDetail.userName}
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        margin: "0px",
                        fontSize: "10px",
                        backgroundColor: buttonColor,
                      }}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "UnFollow" : "Follow"}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid
              item
              // xs={12}
              sm={4}
              sx={{
                height: 700,
                background: "whitesmoke",
              }}
            >
              <Typography>Recommended</Typography>
              <FileListTags fileMore={fileList} />
            </Grid>
          </Grid>
        </Card>
        <Grid
          container
          spacing={2}
          sx={{
            background: "whitesmoke",
            borderTop: "1px solid",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              margin: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              color="initial"
              sx={{ fontSize: 40, fontWeight: 700 }}
            >
              More Related Content
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: "20px",
            }}
          >
            <FileListMore fileMore={fileList} />
            {/* <FileList
                file={userAbout?.files}
                imageData={imageData}
                handleClickFile={handleClickFile}
              /> */}
          </Grid>
          {/* <Grid
            item
            xs={12}
            sx={{
              marginY: "20px",
            }}
          >
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content (20)
            </Typography>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default FileDetail;
