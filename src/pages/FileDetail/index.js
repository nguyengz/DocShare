/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Link,
} from "@mui/material";
// import "./styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FlagIcon from "@mui/icons-material/Flag";

import FileListMore from "./FileList";
import FileListTags from "./FileListTags";
import Pricing from "../Payment/Package";

import { LikeFile, fetchFileDetail, unLike } from "~/slices/file";
import { downloadFile, setShowPricing } from "~/slices/download";
import { fetchUser, followUser, unFollowUser } from "~/slices/user";

import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { format } from "date-fns";
import moment from "moment/moment";
import { FacebookShareButton } from "react-share";
import { useRandomColor } from "~/utils/ramdomColor";
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
    boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)",
    padding: "0",
    overflowX: "hidden",
    background: "gainsboro",
    /* width: 100px; */
    objectfit: "cover",
  },
};
function FileDetail() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const SERICE_API = process.env.REACT_APP_SERVICE_API;
  const avatarBgColor = useRandomColor();
  const location = useLocation();
  const { pathname, search } = location;
  const { id } = useParams();
  // const { state } = window.history;
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [images, setImages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState();
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [pdfRendering, setPdfRendering] = React.useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.userAbout.userAbout);
  const showPricing = useSelector((state) => state.download.showPricing);
  const fileDetail = useSelector((state) => state.file.detailList);

  const formatDate = (dateString) => {
    const date = moment.utc(dateString).toDate();
    return format(date, "dd/MM/yy HH:mm");
  };

  const [tags, setTags] = useState([]);
  const firstLetter = userAbout?.username.charAt(0).toUpperCase();
  useEffect(() => {
    const file_id = id;
    const user_id = parseInt(currentUser?.id);
    dispatch(fetchFileDetail([file_id, user_id]));
  }, [dispatch, id, currentUser?.id]);
  useEffect(() => {
    if (fileDetail?.userId) {
      const user_id = parseInt(currentUser?.id);
      const friend_id = fileDetail?.userId;
      dispatch(fetchUser([user_id, friend_id]));
      if (userAbout?.avatar) {
        loadImage(userAbout?.avatar).then((url) => {
          setAvatarUrl(url);
        });
      }
    }
  }, [currentUser?.id, dispatch]);
  useEffect(() => {
    if (fileDetail && fileDetail?.link) {
      const pdfUrl = SERICE_API + "/file/review/" + fileDetail.link;
      if (pdfUrl && currentPage) {
        renderPage(pdfUrl); // pass currentPage to renderPage function
      }
    }
  }, [dispatch, fileDetail.link]);
  useEffect(() => {
    if (fileDetail && fileDetail.tags) {
      const tagsArr = fileDetail.tags.reduce((accumulator, tag) => {
        if (!accumulator.some((t) => t.tagId === tag.tagId)) {
          accumulator.push(tag);
        }
        return accumulator;
      }, []);
      setTags(tagsArr);
    }
  }, [dispatch, fileDetail?.tags]);

  async function loadImage(link) {
    const response = await fetch(SERICE_API + `/file/review/${link}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  async function renderPage(pdfUrl) {
    setIsLoading(true);
    const _pdf = await pdfjs.getDocument(pdfUrl).promise;
    setPdf(_pdf);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.className = "canv";
    const context = canvas.getContext("2d");
    let maxPagesToRender;
    if (_pdf.numPages > 30) {
      maxPagesToRender = 15; // Giới hạn số trang render là 15 nếu tài liệu có hơn 30 trang
    } else {
      maxPagesToRender = Math.ceil(_pdf.numPages * 0.3); // Giới hạn số trang render là 30% nếu tài liệu có ít hơn hoặc bằng 30 trang
    }
    for (let i = 1; i <= maxPagesToRender; i++) {
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
    setIsLoading(false); // set isLoading to false when pages are rendered
  }
  function handleSlideChange(swiper) {
    const nextPage = swiper.activeIndex + 1;
    setCurrentPage(nextPage);

    let maxPagesToShow;
    if (pdf.numPages > 30) {
      maxPagesToShow = 15; // Giới hạn số trang hiển thị là 15 nếu tài liệu có hơn 30 trang
    } else {
      maxPagesToShow = Math.ceil(pdf.numPages * 0.3); // Giới hạn số trang hiển thị là 30% nếu tài liệu có ít hơn hoặc bằng 30 trang
    }

    if (nextPage === maxPagesToShow) {
      Swal.fire({
        text: "Please download the document to continue viewing!",
        icon: "info",
        confirmButtonText: "OK",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }
  const handleDownload = () => {
    const userLc = JSON.parse(localStorage.getItem("user"));
    // Check if the user has an active subscription
    if (!userLc) {
      const downloadUrl = window.location.href; // Get the current URL as the download URL
      const queryParams = new URLSearchParams({
        returnUrl: downloadUrl,
      }).toString();
      Swal.fire({
        icon: "error",
        title: "Please Sign in !",
        text: "You can't download the file right now.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(`/login?${queryParams}`);
      });
      return;
    }
    const adminRole = userLc.roles.find((role) => role.authority === "USER");
    const adminAuthority = adminRole ? adminRole?.authority : null;
    // const adminAuthority = "";
    const hasSubscription = adminAuthority === "USER";
    console.log(adminAuthority);
    if (hasSubscription) {
      const fileName = fileDetail.fileName;
      const fileUrl = `${fileDetail?.link}/${currentUser?.id}/${fileDetail?.id}`;
      console.log(fileUrl);
      dispatch(downloadFile({ link: fileUrl, fileName }));
      setShowPricing(false);
    } else {
      dispatch(setShowPricing(true));
    }
  };

  const handleUnLikeFile = () => {
    const data = { fileid: id, userid: parseInt(currentUser?.id) };
    currentUser?.id ? dispatch(unLike(data)) : console.log("err");
  };
  const handleLikeFile = () => {
    const data = { fileid: id, userid: parseInt(currentUser?.id) };
    currentUser?.id ? dispatch(LikeFile(data)) : console.log("err");
  };
  const handleFollow = () => {
    const data = {
      user_id: parseInt(currentUser?.id),
      friend_id: parseInt(fileDetail?.userId),
    };
    currentUser?.id ? dispatch(followUser(data)) : console.log("err");
  };
  const handleUnFollow = () => {
    const data = {
      user_id: parseInt(currentUser.id),
      friend_id: parseInt(fileDetail.userId),
    };
    console.log(data);
    currentUser?.id ? dispatch(unFollowUser(data)) : console.log("err");
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const status = searchParams.get("status");
    if (status === "true") {
      Swal.fire({
        icon: "success",
        title: "Payment success!",
        text: "You can download the file right now.",
      });
      // localStorage.setItem("messageShown", "true");
      searchParams.delete("status");
      const newUrl = `${pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
      console.log(currentUser);
      const user = JSON.parse(localStorage.getItem("user"));
      // const user = { ...currentUser }; // Lấy thông tin user từ Redux store
      user.roles = [{ authority: "USER" }];
      localStorage.setItem("user", JSON.stringify(user)); // Cập nhật giá trị roles
      // dispatch(updateRoles({ roles: user.roles })); // Gửi action updateRoles đến reducer của slice auth
      // Lưu giá trị mới vào localStorage // Lưu thông tin user vào localStorage
    } else if (status === "false") {
      Swal.fire({
        icon: "error",
        title: "Payment error!",
        text: "Please check your information again.",
      });
      // localStorage.setItem("messageShown", "true");
      searchParams.delete("status");
      const newUrl = `${pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [search, pathname, currentUser, dispatch]);
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
            alignItems: "center ",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <Pricing
            onBack={() => dispatch(setShowPricing(false))}
            fileDetail_id={id}
          />
        </div>
      )}
      <Box container sx={{ minHeight: "1000px" }}>
        <Card
          sx={{
            margin: "5px ",
          }}
        >
          <Grid xs={12} sm={12} container direction="row">
            <Grid xs={12} sm={8} direction="column">
              <Grid
                item
                sx={{
                  height: { xs: 250, sm: 400, md: 400, lg: 400 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                }}
              >
                {" "}
                {isLoading ? (
                  <CircularProgress /> // show CircularProgress when isLoading is true
                ) : pdf && images.length > 0 ? (
                  <>
                    <Swiper
                      spaceBetween={30}
                      hashNavigation={{
                        watchState: true,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Pagination, Navigation, HashNavigation]}
                      className="mySwiper"
                      style={styles.wrapper}
                      onSlideChange={handleSlideChange}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "5px",
                          right: "20px",
                          zIndex: 1,
                          // backgroundColor: "rgba(255, 255, 255, 0.8)",
                          // boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                          borderRadius: "4px",
                          padding: "8px",
                        }}
                      >
                        <Typography variant="body1" color="initial">
                          {currentPage}/{pdf.numPages}
                        </Typography>
                      </Box>
                      {images.map((image, idx) => (
                        <SwiperSlide key={idx} style={styles.imageWrapper}>
                          <img
                            id="image-generated"
                            src={image}
                            alt="pdfImage"
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              height: "auto",
                              border: "2px ridge  ",
                              margin: "auto",
                              boxShadow: "0px 4px 5px 5px rgb(194 219 246)",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </>
                ) : (
                  <Typography
                    variant="h1"
                    color="initial"
                    sx={{
                      fontSize: 20,
                      "@media (max-width: 600px)": {
                        fontSize: 15,
                      },
                    }}
                  >
                    {fileDetail?.fileName}
                  </Typography>
                )}
              </Grid>
              <Grid
                xs={12}
                sm={8}
                item
                sx={{
                  height: { sm: 400, md: 300 },
                  marginTop: 2,
                }}
                spacing={4}
              >
                <Stack
                  sm={8}
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  sx={{
                    "@media (max-width: 600px)": {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Stack
                    sm={4}
                    item
                    sx={{ width: { xs: "100%", sm: "80%" }, marginLeft: "5px" }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "26px",
                        fontWeight: 150,
                        wordWrap: "break-word",
                      }}
                    >
                      {fileDetail.fileName > 100
                        ? fileDetail.fileName.slice(0, 100) + "..."
                        : fileDetail.fileName}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="flex"
                      alignItems="center"
                      sx={{ fontSize: "15px", marginLeft: "10px" }}
                    >
                      {formatDate(fileDetail.uploadDate)} •{" "}
                      {fileDetail.likeFile}{" "}
                      <FavoriteIcon sx={{ color: "red" }} /> • {fileDetail.view}
                      <RemoveRedEyeOutlinedIcon /> • {fileDetail.totalDownload}
                      <DownloadIcon />
                    </Typography>
                  </Stack>
                  <Stack item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownload}
                      height="50px"
                      sx={{
                        fontSize: { sm: "10px" },
                      }}
                    >
                      <DownloadIcon />
                      Download Now
                    </Button>
                    {/* {downloadUrl && (
                      <a href={downloadUrl} download={fileDetail.fileName}>
                        Downloaded File
                      </a>
                    )} */}

                    {/* {status === "loading" && <span>Downloading...</span>}
                    {status === "failed" && <span>Error: {error}</span>} */}
                    <Typography
                      variant="caption"
                      sx={{ fontSize: { sm: "10px" }, marginX: "auto" }}
                    >
                      Download to read offline
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ margin: "10px" }}>
                  <FavoriteIcon
                    sx={{
                      color: fileDetail.like ? "red" : "blue",
                      "&:hover": {
                        cursor: "pointer",
                        color: fileDetail.like ? "darkred" : "darkblue",
                      },
                    }}
                    onClick={
                      fileDetail.like ? handleUnLikeFile : handleLikeFile
                    }
                  />

                  <FacebookShareButton
                    url={`http://localhost:3000/fileDetail/${fileDetail?.id}`}
                    quote={fileDetail?.name}
                    hashtag={"#DocShare"}
                    description={fileDetail?.description}
                    className="Demo__some-network__share-button"
                  >
                    <ShareRoundedIcon />
                  </FacebookShareButton>

                  <FlagIcon />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {tags &&
                      tags.slice(0, 6).map((tag, index) => (
                        <Button
                          key={index}
                          component={Link}
                          href={`/Search?tagName=${tag.tagName}`}
                          sx={{
                            border: "1px solid",
                            borderRadius: "56px",
                            background: "",
                            padding: "0 16px",
                            lineHeight: "24px",
                            whiteSpace: "nowrap", // add this CSS property
                            fontSize: { xs: "10px", sm: "10px" },
                            margin: "5px",
                          }}
                          label={tag.tagName}
                        >
                          {tag.tagName}
                        </Button>
                      ))}
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ margin: "10px" }}>
                  <Typography>{fileDetail?.category?.categoryName}</Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ margin: "10px" }}>
                  <Typography>{fileDetail?.description}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ margin: "10px 10px" }}>
                  <Stack item>
                    {" "}
                    {avatarUrl ? (
                      <Avatar
                        sx={{
                          width: "50px",
                          height: "50px",
                        }}
                        src={avatarUrl}
                      ></Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          width: "50px",
                          height: "50px",
                          background: avatarBgColor,
                        }}
                      >
                        {firstLetter}
                      </Avatar>
                    )}
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
                      href={`/About/${fileDetail?.userId}`}
                      key={userAbout?.id}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#a1a1ff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#1976d2";
                      }}
                    >
                      {fileDetail?.userName}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        margin: "0",
                        fontSize: "10px",
                        height: "20px",
                        padding: "6px 12px",
                        borderRadius: "15px",
                        boxShadow: "none",
                      }}
                      onClick={
                        userAbout?.hasFollow ? handleUnFollow : handleFollow
                      }
                      startIcon={
                        userAbout?.hasFollow ? (
                          <EmojiEmotionsIcon />
                        ) : (
                          <AddReactionIcon />
                        )
                      }
                    >
                      {userAbout?.hasFollow ? "UnFollow" : "Follow"}
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
                height: 650,
                // background: "whitesmoke",
                marginX: "auto",
                "@media (max-width: 1000px)": {
                  height: 750,
                },
              }}
            >
              <Typography
                variant="h1"
                color="initial"
                sx={{
                  margin: "5px",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                List of similar tags
              </Typography>
              <FileListTags tagid={id} />
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
              More Related Category
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: "20px",
            }}
          >
            <FileListMore category={fileDetail.category} />
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
