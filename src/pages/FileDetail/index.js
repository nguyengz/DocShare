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
} from "@mui/material";
import "./styles.css";
import { saveAs } from "file-saver";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { downLoadFile, fetchFileDetail } from "~/slices/file";
import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { downloadFile } from "~/slices/download";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
  imageWrapper: {
    display: "block",
    width: "100%",
    height: "100%",
    border: "1px solid rgba(0,0,0,0.15)",
    // borderRadius: "1px",
    // boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)",
    padding: "0",
    overflowX: "hidden",
    background: "aliceblue",
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
  const fileDetail = useSelector((state) => state.file.data);
  const uploadDate = new Date(fileDetail.uploadDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = uploadDate.toLocaleDateString("en-US", options);

  const tags = fileDetail.tags;
  // const link = state.link;
  // const file_id = id;

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
  const handleDownload = () => {
    const fileUrl = fileDetail.link;
    const fileName = fileDetail.fileName;
    dispatch(downloadFile({ fileUrl, fileName }));
  };
  // useEffect(() => {
  //   dispatch(fetchFileDetail(id));
  //   console.log("link" + fileDetail.link);
  //   const pdfUrl =
  //     "http://localhost:8080/file/download/" +
  //     fileDetail.link +
  //     "/" +
  //     fileDetail.userId +
  //     "/" +
  //     fileDetail.id;
  //   console.log(pdfUrl);
  //   if (pdfUrl && currentPage) {
  //     renderPage(pdfUrl, currentPage); // pass currentPage to renderPage function
  //   }
  // }, [id, currentPage, fileDetail.link, dispatch, fileDetail.userId, fileDetail.id]);
  useEffect(() => {
    dispatch(fetchFileDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    console.log("link" + fileDetail.link);
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
  return (
    <>
      <Box container sx={{ minHeight: "1000px" }}>
        <Card
          sx={{
            margin: "10px auto",
          }}
        >
          <Grid container direction="row">
            <Grid xs={12} sm={8} direction="column">
              <Grid
                item
                sx={{
                  height: 400,
                }}
              >
                {isLoading ? (
                  <CircularProgress /> // show CircularProgress when isLoading is true
                ) : images && images ? (
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
                            width: width,
                            height: height,
                            border: "2px ridge  ",
                            margin: "5px auto",
                          }}
                        />

                        {/* </div> */}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Typography variant="h1" color="initial">
                    None
                  </Typography>
                )}

                {/* <iframe
                  src="https://drive.google.com/file/d/1xdJ419aG8M_OZEhQksy0Ne3G1O_A1NJb/preview  "
                  allow="autoplay"
                  width="100%"
                  height="100%"
                ></iframe> */}
              </Grid>
              <Grid
                item
                sx={{
                  height: 300,
                  margin: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Stack item>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "26px", fontWeight: 600 }}
                    >
                      {fileDetail.fileName}
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
                  <FavoriteBorderIcon />
                  <ShareRoundedIcon />
                  <MoreHorizRoundedIcon />
                </Stack>
                <Stack direction="row" spacing={2}>
                  {tags &&
                    tags.map((tag, index) => (
                      <Chip
                        key={index}
                        sx={{
                          border: "1px solid",
                          borderRadius: "56px",
                          background: "",
                          padding: "0 16px",
                          lineHeight: "24px",
                        }}
                        label={tag.tagName}
                      />
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
                    <Typography> {fileDetail.userName} </Typography>
                    <Typography>About</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid>bb</Grid>
          </Grid>
        </Card>
        <Grid container spacing={2}>
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
          </Grid>
          <Grid
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FileDetail;
