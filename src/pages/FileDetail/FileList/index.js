import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import moment from "moment/moment";
import { format } from "date-fns";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";
import axios from "axios";
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
  const navigate = useNavigate();
  const [listcategory, setListCategory] = useState([]);
  const imageData = useFetchImageData(listcategory);

  const [matches] = useState(false);
  const number = [4, 2];

  // const result = [];
  const formatDate = (dateString) => {
    const date = moment.utc(dateString).toDate();
    return format(date, "dd/MM/yy HH:mm");
  };
  const handleClickFile = (todo) => {
    // Define the handleClickFile function here
    navigate(`/fileDetail/${todo.id}`);
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/file/list/category?id=${props.category?.id}`)
      .then((response) => {
        // Handle successful response
        setListCategory(response.data);
        // In ra giá trị mới của listtag
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, [props.category?.id]);
  const result =
    Array.isArray(listcategory) && listcategory.length > 0
      ? listcategory.slice(1, 6)?.map((todo, index) => {
          return (
            <Grid item key={todo.id} padding={1}>
              <Card
                elevation={0}
                sx={{
                  border: "1px solid",
                }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  onClick={() => handleClickFile(todo)}
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
                  to={`/About/${todo.userId}`}
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
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                  >
                    {formatDate(todo.uploadDate)}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                  >
                    {todo.view} <RemoveRedEyeOutlinedIcon />
                  </Typography>
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                  >
                    {todo.likeFile} <FavoriteIcon sx={{ color: "red" }} />
                  </Typography>
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                  >
                    {todo.totalDownload} <DownloadIcon />
                  </Typography>
                  <IconButton aria-label="">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      : null;

  return (
    <>
      {listcategory && (
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
