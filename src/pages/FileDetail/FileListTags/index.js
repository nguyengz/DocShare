import React, { useEffect, useState } from "react";
import axios from "axios";
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

import { Link, useNavigate } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";
import LazyLoad from "react-lazyload";

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
  // const [imageData, setImageData] = useState("");
  const navigate = useNavigate();
  const [listtag, setListTag] = useState([]);
  const imageData = useFetchImageData(listtag);
  const options = { year: "numeric", month: "short", day: "numeric" };
  // const result = [];

  const handleClickFile = (todo) => {
    // Define the handleClickFile function here
    navigate(`/fileDetail/${todo.id}`);
    window.location.reload();
  };
  useEffect(() => {
    console.log(props.id);
    axios
      .get(`http://localhost:8080/file/list/tag?file_id=${props.id}`)
      .then((response) => {
        // Handle successful response
        setListTag(response.data);
        // In ra giá trị mới của listtag
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, [props.id]);
  const result =
    Array.isArray(listtag) && listtag.length > 0
      ? listtag.slice(1, 6)?.map((todo, index) => {
          const uploadDate = new Date(todo.uploadDate);
          const formattedDate = uploadDate.toLocaleDateString("en-US", options);

          return (
            <Grid item sm={12} key={todo.id} sx={{ width: "450px" }}>
              {/* <LazyLoad height={200} once> */}
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
                  onClick={() => handleClickFile(todo)}
                />{" "}
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
                      to={`/About/${todo.userId}`}
                      // key={todo.userId}
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
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 1,
                      pb: 1,
                    }}
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
              {/* </LazyLoad> */}
            </Grid>
          );
        })
      : null;

  return (
    <>
      {listtag && (
        <Swiper
          direction={"vertical"}
          slidesPerView={3}
          spaceBetween={0}
          mousewheel={true}
          modules={[Mousewheel, Pagination]}
          style={style.wrapper}
          lazy={{
            loadPrevNext: true,
            loadPrevNextAmount: 3,
          }}
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
