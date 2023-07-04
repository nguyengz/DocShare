import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import randomColor from "randomcolor";

import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { fetchUser } from "~/slices/user";
import PdfToImage from "~/components/Layouts/pdftoimage";
import { useNavigate, useParams } from "react-router-dom";
import FileList from "./ListComponent/FileList";
import TagList from "./ListComponent/TagList";

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
    background: randomColor(),
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
  const navigate = useNavigate();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  let userAbout = useSelector((state) => state.userAbout.userAbout);
  const [imageData, setImageData] = useState("");
  const firstLetter = userAbout?.username.charAt(0).toUpperCase();

  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
    // console.log(userAbout);
  }, [currentUser, dispatch]);
  useEffect(() => {
    if (userAbout && userAbout.files) {
      // add a check for userAbout and userAbout.files
      userAbout.files.forEach((todo) => {
        fetch(`http://localhost:8080/file/review/${todo.linkImg}`)
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
  }, [userAbout]);
  const handleClickFile = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
    navigate(`/fileDetail/${todo.id}`);
  };
  const handleClickAcountSetting = (todo) => {
    navigate(`/AcountSetting/${currentUser.name}`);
  };
  const handleClickMyFile = (todo) => {
    navigate(`/${currentUser.name}/EditUpload`);
  };

  return (
    <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
      <Grid container spacing={2} style={style.gridUser}>
        <Grid item xs={4}>
          <Stack direction="row">
            <Stack item>
              <Item>
                <Avatar style={style.largeAvatar}>{firstLetter}</Avatar>
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: "5px" }}>
              <Item>
                <Typography variant="h5">{userAbout?.username}</Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  // onClick={handleClickMyFile}
                  href={`/${currentUser.name}/EditUpload`}
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
                  onClick={handleClickAcountSetting}
                >
                  Edit
                </Button>
              </Item>
            </Stack>
          </Stack>
          <Stack item>
            <TagList userAbout={userAbout} />
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
              <FileList
                file={userAbout?.files}
                imageData={imageData}
                handleClickFile={handleClickFile}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              {/* More Related Content (20) */}
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
