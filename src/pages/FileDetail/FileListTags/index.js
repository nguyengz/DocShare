import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Mousewheel } from "swiper";

import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { Link } from "react-router-dom";
const style = {
  todoName: {
    // whiteSpace: "nowrap",
    overflow: "hidden",
    // textOverflow: "ellipsis",
    maxWidth: "200px",
  },
  wrapper: {
    display: "block",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // gap: "1px",
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    display: "grid",
    width: "100%",
    height: "200px",
    justifyContent: "center",
  },
};

function FileListTags(props) {
  const [imageData, setImageData] = useState("");

  const number = [4, 2];
  const options = { year: "numeric", month: "short", day: "numeric" };
  // const result = [];

  useEffect(() => {
    if (props && props.fileMore) {
      // add a check for userAbout and userAbout.files
      props.fileMore.forEach((todo) => {
        fetch(`http://localhost:8080/file/image/${todo.linkImg}`)
          .then((response) => response.arrayBuffer())
          .then((buffer) =>
            setImageData((prevImageData) => ({
              ...prevImageData,
              [todo.id]: `data:image/jpeg;base64,${btoa(
                new Uint8Array(buffer).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`,
            }))
          );
      });
    }
  }, [props.fileMore]);
  const handleClickFile = (todo) => {
    // Define the handleClickFile function here
  };

  const result =
    Array.isArray(props.fileMore) && props.fileMore.length > 0
      ? props.fileMore.slice(0, number[2])?.map((todo, index) => {
          const uploadDate = new Date(todo.uploadDate);
          const formattedDate = uploadDate.toLocaleDateString("en-US", options);

          return (
            <Grid item sm={12} key={todo.id} sx={{ width: "450px" }}>
              <Card
                sx={{
                  display: "flex",
                  height: "200px",
                }}
                spacing={1}
              >
                
                <CardMedia
                  component="img"
                  image={imageData[todo.id] || ""}
                  alt="green iguana"
                  sx={{
                    width: "200px",
                    // display: "block",
                    objectFit: "contain",
                    objectPosition: "center",
                    background: "gainsboro",
                    // height: "100%",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "250px",
                  }}
                >
                  <CardContent sx={{ height: "90%" }}>
                    <Typography
                      style={style.todoName}
                      gutterBottom
                      variant="body2"
                    >
                      {todo.fileName}
                    </Typography>
                    <Typography
                      component={Link}
                      style={{
                        marginTop: "30px",
                        textDecoration: "none",
                        color: "#1976d2",
                      }}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                      href={`/About/${todo.userId}`}
                      key={todo.userId}
                      onMouseEnter={(e) => {
                        e.target.style.color = "blue";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "1976d2";
                      }}
                    >
                      {todo.userName}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <CardActions
                      style={{
                        // display: "",
                        margin: "0px 1px",
                      }}
                    >
                      <Typography variant="caption">
                        {todo.view} views
                      </Typography>
                      <Typography variant="caption">{formattedDate}</Typography>
                    </CardActions>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })
      : null;

  return (
    <>
      {props.fileMore && (
        <Swiper
          direction={"vertical"}
          slidesPerView={3}
          spaceBetween={0}
          mousewheel={true}
          modules={[Mousewheel, Pagination]}
          style={style.wrapper}
        >
          {result?.map((item, idx) => (
            <SwiperSlide key={idx} style={style.imageWrapper}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default FileListTags;
