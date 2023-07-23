import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import moment from "moment/moment";
import { format } from "date-fns";
import { FacebookShareButton } from "react-share";
import usePagination from "~/utils/PaginatedList";
const data = [];
const formatDate = (dateString) => {
  const date = moment.utc(dateString).toDate();
  return format(date, "dd/MM/yy HH:mm");
};
const styles = {
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
};
function TodoListTop({ ...props }) {
  const { todoList, number, pages } = props;

  const navigate = useNavigate();

  const result = [];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const imageData = useFetchImageData(todoList);
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const count = Math.ceil(todoList.length / PER_PAGE);
  const _DATA = usePagination(todoList, PER_PAGE);
  const height = pages ? 1000 : 0;
  const handleClickProduct = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
    navigate(`/fileDetail/${todo.id}`);
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  // useEffect(() => {
  //   todoList.forEach((todo) => {
  //     fetch(`http://localhost:8080/file/review/${todo.image}`)
  //       .then((response) => response.arrayBuffer())
  //       .then((buffer) =>
  //         setImageData((prevImageData) => ({
  //           ...prevImageData,
  //           [todo.id]: `data:image/jpeg;base64,${btoa(
  //             new Uint8Array(buffer).reduce(
  //               (data, byte) => data + String.fromCharCode(byte),
  //               ""
  //             )
  //           )}`,
  //         }))
  //       );
  //   });
  // }, [todoList]);
  const handleListProducts = () => {
    // eslint-disable-next-line no-lone-blocks
    {
      _DATA?.currentData().map((todoList, index) =>
        result.push(
          <Grid
            item
            xs={matches ? (index > 2 ? 3 : number[0]) : number[1]}
            key={todoList.id}
            padding={1}
            textAlign="center"
          >
            <Card
              elevation={0}
              sx={{
                height: "100%",
                boxShadow: "0 0 20px rgb(126 162 247 / 42%)",
              }}
            >
              <CardActionArea onClick={() => handleClickProduct(todoList)}>
                <Box
                  height={200}
                  // sx={{
                  //   backgroundImage: `url(${imageData[todoList.id]})`,
                  //   // filter: "blur(10px)",
                  // }}
                >
                  <CardMedia
                    component="img"
                    image={imageData[todoList.id] || ""}
                    alt="green iguana"
                    height={200}
                    sx={{
                      objectFit: "contain",
                      objectPosition: "center",
                      background: "gainsboro",
                      position: "absolute",
                      // backgroundImage: `url(${imageData[todoList.id]})`,
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    height: "100px",
                    background: "#f8f8f8",
                    alignContent: "center",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <Typography style={styles.todoName} gutterBottom variant="h6">
                    {todoList.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {todoList.name.length > 50
                      ? todoList.name.slice(0, 50) + "..."
                      : todoList.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",

                  background: "#f8f8f8",
                  padding: 0,
                }}
              >
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  width="100%"
                  margin="0px 2px"
                >
                  <Stack item>
                    <Typography
                      component={Link}
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                      }}
                      to={`/About/${todoList.userId}`}
                      onMouseEnter={(e) => {
                        e.target.style.color = "blue";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "1976d2";
                      }}
                    >
                      {todoList.userName}
                    </Typography>
                  </Stack>
                  <Stack
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignSelf="stretch"
                  >
                    <Stack direction="row">
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                      >
                        {formatDate(todoList.uploadDate)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                      >
                        {todoList.view} <RemoveRedEyeOutlinedIcon />
                      </Typography>
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                      >
                        {todoList.likeFile}{" "}
                        <FavoriteIcon sx={{ color: "#ff6666" }} />
                      </Typography>
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                      >
                        {todoList.totalDownload} <DownloadIcon />
                      </Typography>
                      <IconButton aria-label="">
                        <FacebookShareButton
                          url={`http://localhost:3000/fileDetail/${todoList.id}`}
                          quote={todoList.name}
                          hashtag={"#DocShare"}
                          description={todoList.name}
                          className="Demo__some-network__share-button"
                        >
                          <ShareIcon />
                        </FacebookShareButton>
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        )
      );

      // eslint-disable-next-line array-callback-return
      // todoListList.some((todo, index) => {

      // });
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, minHeight: height }}>
        <Grid container sx={{ width: "100%", margin: "auto" }}>
          {handleListProducts()}
          {result.map((item) => item)}
        </Grid>
      </Box>
      {pages && (
        <Grid
          sm={12}
          mt={2}
          width="100%"
          justifyContent="center"
          justifyItems="center"
        >
          <Stack my="auto" alignItems="center">
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </Grid>
      )}
    </>
  );
}

export default TodoListTop;
