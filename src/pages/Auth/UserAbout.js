import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { fetchUser, followUser, unFollowUser } from "~/slices/user";
import FileList from "./ListComponent/FileList";
import TagList from "./ListComponent/TagList";
import { useRandomColor } from "~/utils/ramdomColor";

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
    maxWidth: "200px",
  },
  girdCard: {
    width: "200px",
    height: "200px",
  },
};

function AboutUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarBgColor = useRandomColor();
  const { userId } = useParams();
  const userAbout = useSelector((state) => state.userAbout.userAbout);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [imageData, setImageData] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const user_id = parseInt(currentUser?.id);
    dispatch(fetchUser([user_id, userId])).then((response) => {
      console.log(response); // log the fetched user data
    });
  }, [currentUser?.id, dispatch, userId]);
  function loadImage(link) {
    return fetch(`http://localhost:8080/file/review/${link}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
  // useEffect(() => {
  //   if (userAbout && userAbout.files) {
  //     // add a check for userAbout and userAbout.files
  //     userAbout.files.forEach((todo) => {
  //       fetch(`http://localhost:8080/file/review/${todo.linkImg}`)
  //         .then((response) => response.arrayBuffer())
  //         .then((buffer) =>
  //           setImageData((prevImageData) => ({
  //             ...prevImageData,
  //             [todo.id]: `data:image/jpeg;base64,${btoa(
  //               new Uint8Array(buffer).reduce(
  //                 (data, byte) => data + String.fromCharCode(byte),
  //                 ""
  //               )
  //             )}`,
  //           }))
  //         );
  //     });
  //   }
  // }, [userAbout]);
  useEffect(() => {
    if (userAbout && userAbout?.files) {
      userAbout.files?.forEach((file) => {
        // loadImageData(file);
        fetchImage(file.linkImg).then((blob) => {
          const url = URL.createObjectURL(blob);
          setImageData((prevImageData) => ({
            ...prevImageData,
            [file.id]: url,
          }));
        });
      });
    }
  }, [userAbout]);
  useEffect(() => {
    dispatch(fetchUser(userId));
    // call handleListTags to get list of tags
  }, [dispatch, userId]);
  useEffect(() => {
    if (userAbout?.avatar) {
      loadImage(userAbout?.avatar).then((url) => {
        setAvatarUrl(url);
      });
    }
    // console.log(userAbout);
  }, [dispatch, userAbout?.avatar]);
  function fetchImage(link) {
    return fetch(`http://localhost:8080/file/review/${link}`).then((response) =>
      response.blob()
    );
  }

  // function loadImageData(file) {
  //   fetchImage(file.linkImg).then((blob) => {
  //     const url = URL.createObjectURL(blob);
  //     setImageData((prevImageData) => ({
  //       ...prevImageData,
  //       [file.id]: url,
  //     }));
  //   });
  // }
  const handleFollow = () => {
    const data = {
      user_id: parseInt(currentUser?.id),
      friend_id: parseInt(userId),
    };
    currentUser?.id ? dispatch(followUser(data)) : console.log("err");
  };
  const handleUnFollow = () => {
    const data = {
      user_id: parseInt(currentUser?.id),
      friend_id: parseInt(userId),
    };
    console.log(data);
    currentUser?.id ? dispatch(unFollowUser(data)) : console.log("err");
  };
  const handleClickFile = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
    navigate(`/fileDetail/${todo.id}`);
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
                    sx={{ background: avatarBgColor }}
                  >
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                {/* <Avatar style={style.largeAvatar} src={avatarUrl}></Avatar> */}
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: "15px" }}>
              <Item>
                <Typography variant="h5">{userAbout?.username}</Typography>
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
                  {userAbout?.files?.length} DocShare
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
                  {userAbout?.friends?.length} Followers
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
                  {userAbout?.following ? userAbout?.following?.length : 0}{" "}
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
                  {userAbout?.linksocial}0 Likes
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
                  {userAbout?.linksocial} LinkSocial
                </Typography>
              </Item>
              <Item>
                <Button
                  variant="outlined"
                  sx={{ margin: "10px" }}
                  onClick={userAbout?.hasFollow ? handleUnFollow : handleFollow}
                >
                  {userAbout?.hasFollow ? "UnFollow" : "Follow"}
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
              More Related Content ({userAbout?.files?.length})
            </Typography>
            <Grid xs={12} sx={{ width: "100%", margin: "auto" }}>
              <FileList
                file={userAbout?.files}
                imageData={imageData}
                handleClickFile={handleClickFile}
              />
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content ( {userAbout?.files?.length})
            </Typography>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutUser;
