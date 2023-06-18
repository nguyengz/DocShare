import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { AccountCircle } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { fetchUser } from "~/slices/user";
import PdfToImage from "~/components/Layouts/pdftoimage";
import { useParams } from "react-router-dom";

const Item = styled(Grid)(({ theme }) => ({
  margin: 2,
  textAlign: "left",
  color: theme.palette.text.secondary,
  flexDirection: "column",

  sx: {
    "&:hover": {
      color: "blue",
    },
    "&:hover a": {
      color: "blue",
    },
  },
}));

const useStyles = makeStyles({
  largeAvatar: {
    width: "100px",
    height: "100px",
    fontSize: "50px",
  },
  gridUser: {
    margin: "auto",
    width: "70%",
  },
});
const style = {
  largeAvatar: {
    width: "100px",
    height: "100px",
    fontSize: "50px",
  },
  gridUser: {
    margin: "auto",
    width: "70%",
    padding: "5px",
  },
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
  girdCard: {
    width: "200px",
    height: "200px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
  imageWrapper: {
    display: "grid",
    width: "100%",
    height: "100%",
    // borderRadius: "1px",
    // boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)",
    justifyContent: "center",
    padding: "0",
    overflowX: "hidden",
  },
};
function Profile() {
  const dispatch = useDispatch();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  let userAbout = useSelector((state) => state.userAbout.userAbout);
  // const handleListProducts = () => {
  // eslint-disable-next-line no-lone-blocks
  // {
  // eslint-disable-next-line array-callback-return
  //     todoList.some((todo, index) => {
  //       if (index === number[2]) {
  //         return true;
  //       }
  //       result.push(
  //         <Grid
  //           item
  //           xs={matches ? number[0] : number[1]}
  //           key={todo.id}
  //           padding={1}
  //         >
  //           <Card elevation={0}>
  //             <CardActionArea
  //               sx={{ height: "300px" }}
  //               onClick={() => handleClickProduct(todo)}
  //             >
  //               <PdfToImage
  //                 link={todo.link}
  //                 userId={todo.userId}
  //                 id={todo.id}
  //               />
  //               <CardContent sx={{ height: "100px" }}>
  //                 <Typography style={styles.todoName} gutterBottom variant="h6">
  //                   {todo.name}
  //                 </Typography>
  //                 <Typography variant="body2" color="text.secondary">
  //                   <Typography>
  //                     {todo.name.length > 50
  //                       ? todo.name.slice(0, 50) + "..."
  //                       : todo.name}
  //                   </Typography>
  //                 </Typography>
  //               </CardContent>
  //             </CardActionArea>
  //             <CardActions
  //               style={{
  //                 display: "flex",
  //                 margin: "0px 1px",
  //                 justifyContent: "space-between",
  //               }}
  //             >
  //               <Typography
  //                 component={Link}
  //                 style={{
  //                   marginRight: "auto",
  //                   textDecoration: "none",
  //                   color: "#1976d2",
  //                 }}
  //                 onClick={() => {
  //                   // setidlink(page.id);
  //                   // alert(page.title);
  //                 }}
  //                 href={`/${todo.id}`}
  //                 key={index}
  //                 onMouseEnter={(e) => {
  //                   e.target.style.color = "blue";
  //                 }}
  //                 onMouseLeave={(e) => {
  //                   e.target.style.color = "1976d2";
  //                 }}
  //               >
  //                 {todo.userName}
  //               </Typography>
  //               <Typography variant="caption">{todo.view} views</Typography>
  //               <Button size="small" color="primary">
  //                 Share
  //               </Button>
  //             </CardActions>
  //           </Card>
  //         </Grid>
  //       );
  //     });
  //   }
  // };
  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
    // console.log(userAbout);
  }, [currentUser, dispatch]);
  const result = [];
  const matches = useMediaQuery("(min-width:100px)");
  const number = [4, 2]; // replace with your desired values

  const handleListProducts = () => {
    // eslint-disable-next-line no-lone-blocks
    {
      // eslint-disable-next-line array-callback-return

      if (userAbout && userAbout.files) {
        userAbout.files.some((todo, index) => {
          // if (index === number[2]) {
          //   return true;
          // }
          result.push(
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
                  // onClick={() => handleClickProduct(todo)}
                >
                  <PdfToImage
                    link={todo.link}
                    userId={todo.userId}
                    id={todo.id}
                    height={100}
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
                    {/* <Typography variant="body2" color="text.secondary">
                      <Typography>
                        {todo.fileName.length > 50
                          ? todo.fileName.slice(0, 50) + "..."
                          : todo.fileName}
                      </Typography>
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
                <CardActions
                  style={{
                    display: "flex",
                    margin: "0px 1px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption">{todo.view} views</Typography>
                </CardActions>
              </Card>
            </Grid>
          );
        });
      }
    }
  };
  // useEffect(() => {
  //   console.log("link" + userAbout.link);
  //   const pdfUrl =
  //     "http://localhost:8080/file/download/" +
  //     userAbout.link +
  //     "/" +
  //     userAbout.userId +
  //     "/" +
  //     userAbout.id;
  //   console.log(pdfUrl);
  //   // if (pdfUrl && currentPage) {
  //   //   renderPage(pdfUrl, currentPage); // pass currentPage to renderPage function
  //   // }
  // }, [currentPage, fileDetail.link, fileDetail.userId, fileDetail.id]);
  return (
    <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
      <Grid container spacing={2} style={style.gridUser}>
        <Grid item xs={4}>
          <Stack direction="row">
            <Stack item>
              <Item>
                <Avatar style={style.largeAvatar}>
                  <AccountCircle />
                </Avatar>
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: "5px" }}>
              <Item>
                <Typography variant="h5">{userAbout?.name}</Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                  href={`/`}
                >
                  {userAbout?.files.length} DocShare
                </Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  {userAbout?.friends.length} Followers
                </Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  Followings
                </Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  Likes
                </Typography>
              </Item>
              <Item>
                <Button
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  href={"/login"}
                >
                  Edit
                </Button>
              </Item>
            </Stack>
          </Stack>
          <Stack item>
            <Typography variant="h5" color="initial">
              Tags
            </Typography>
            <Item>
              <Button
                // key={index}
                component={Link}
                href={"/"}
                sx={{
                  border: "1px solid",
                  borderRadius: "16px",
                  background: "",
                  padding: "0 16px",
                  lineHeight: "24px",
                }}
                label={"tag."}
              >
                Nguyen
              </Button>
            </Item>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Grid xs={12}>
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content ({userAbout?.files.length})
            </Typography>
            <Grid xs={12} sx={{ width: "100%", margin: "auto" }}>
              <Swiper
                // pagination={{
                //   type: "progressbar",
                // }}
                slidesPerView={3}
                slidesPerGroup={3}
                navigation={true}
                modules={[Pagination, Navigation]}
                style={style.wrapper}
              >
                {handleListProducts()}
                {result.map((item, idx) => (
                  <SwiperSlide key={idx} style={style.imageWrapper}>
                    {item}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content (20)
            </Typography>
            <Grid
              item
              // xs={matches ? number[0] : number[1]}
              // key={todo.id}
              style={style.girdCard}
            ></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
