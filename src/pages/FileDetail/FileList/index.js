import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchfile } from "~/slices/file";
import { Link } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";
const style = {
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "200px",
  },
  girdCard: {
    width: "200px",
    height: "200px",
  },
  imageWrapper: {
    display: "grid",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: "0",
    overflowX: "hidden",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
};

function FileListMore(props) {
  const dispatch = useDispatch();
  const imageData = useFetchImageData(props.fileMore);

  const [matches] = useState(false);
  const number = [4, 2];
  const options = { year: "numeric", month: "short", day: "numeric" };
  // const result = [];
  useEffect(() => {
    dispatch(fetchfile());
  }, [dispatch]);

  const handleClickFile = (todo) => {
    // Define the handleClickFile function here
  };
  
  const result = Array.isArray(props.fileMore)
    ? props.fileMore.slice(0, number[2])?.map((todo, index) => {
        const uploadDate = new Date(todo.uploadDate);
        const formattedDate = uploadDate.toLocaleDateString("en-US", options);

        return (
          <Grid
            item
            xs={matches ? number[0] : number[1]}
            key={todo.id}
            padding={1}
          >
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                width: "200px",
              }}
            >
              <CardActionArea
                sx={{ height: "100%" }}
                // onClick={() => props.handleClickFile(todo)}
              >
                <CardMedia
                  component="img"
                  image={imageData[todo.id] || ""}
                  alt="green iguana"
                  height={200}
                  sx={{
                    objectFit: "contain",
                    objectPosition: "top",
                    background: "gainsboro",
                  }}
                />
                <CardContent sx={{ height: "50px" }}>
                  <Typography
                    style={style.todoName}
                    gutterBottom
                    variant="body2"
                  >
                    {todo.fileName.length > 50
                      ? todo.fileName.slice(0, 50) + "..."
                      : todo.fileName}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
                <Typography
                  component={Link}
                  style={{
                    padding: "0px",
                    margin: "5px",
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
             

              <CardActions
                style={{
                  display: "flex",
                  margin: "0px 1px",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="caption">{todo.view} views</Typography>
                <Typography variant="caption">{formattedDate}</Typography>
              </CardActions>
            </Card>
          </Grid>
        );
      })
    : null;

  return (
    <>
      {props.fileMore && (
        <Swiper
          slidesPerView={6}
          slidesPerGroup={3}
          navigation={true}
          modules={[Pagination, Navigation]}
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

export default FileListMore;
