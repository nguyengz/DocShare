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

import randomColor from "randomcolor";

import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { useNavigate } from "react-router-dom";
import FileList from "./ListComponent/FileList";
import TagList from "./ListComponent/TagList";
import { fetchUserAbout } from "~/slices/auth";

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
  const navigate = useNavigate();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.auth.userAbout);
  const [imageData, setImageData] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    dispatch(fetchUserAbout(currentUser?.id));
    // console.log(userAbout);
  }, [currentUser?.id, dispatch]);
  useEffect(() => {
    if (userAbout?.avatar) {
      loadImage(userAbout.avatar).then((url) => {
        setAvatarUrl(url);
      });
    }
    // console.log(userAbout);
  }, [dispatch, userAbout?.avatar]);
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
  function loadImage(link) {
    return fetch(`http://localhost:8080/file/review/${link}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
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
                {avatarUrl ? (
                  <Avatar src={avatarUrl} style={style.largeAvatar}></Avatar>
                ) : (
                  <Avatar
                    style={style.largeAvatar}
                    sx={{ background: randomColor() }}
                  >
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: "5px", width: 200 }}>
              <Item>
                <Typography variant="h5">{userAbout?.username}</Typography>
              </Item>
              <Item>
                <Typography
                  component={Link}
                  // onClick={handleClickMyFile}
                  href={`/${currentUser?.name}/EditUpload`}
                >
                  {userAbout?.files?.length} DocShare
                </Typography>
              </Item>
              <Item>
                <Typography
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  {userAbout.friends?.length} Followers
                </Typography>
              </Item>
              <Item>
                <Typography
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  {userAbout.following?.length} Followings
                </Typography>
              </Item>
              <Item>
                <Typography
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                >
                  0 Likes
                </Typography>
              </Item>
              <Item>
                <Typography
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  LinkSocial:{" "}
                  <a
                    href={userAbout?.linksocial}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userAbout?.linksocial}
                  </a>
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
            <Typography variant="h5" color="initial">
              About:
            </Typography>
            <Typography variant="body2" color="initial">
              {" "}
              {userAbout?.about}
            </Typography>
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
              More Related Content ({userAbout.files?.length})
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
