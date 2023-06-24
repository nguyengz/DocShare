import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Example from "./Table";
import { fetchUser } from "~/slices/user";

function MyUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.userAbout.userAbout);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
    // console.log(userAbout);
  }, [currentUser, dispatch]);
  return (
    <>
      <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
        <Grid
          container
          xs={12}
          sm={8}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          wrap="nowrap"
          margin="auto"
        >
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: "20px",
              padding: 2,
            }}
          >
            <Typography
              variant="h1"
              color="initial"
              fontSize={28}
              fontWeight={50}
              padding="32px 0"
            >
              Acount Setting
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px dashed #b4bbd1",
              justifyContent: "center",
              justifyItems: "center",
              padding: 2,
            }}
          >
            <Example data={userAbout?.files} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyUpload;
