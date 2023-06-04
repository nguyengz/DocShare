import React from 'react';

import ExpoleList from "~/components/Layouts/Main/ExpoleList";
const { Box, Typography, Grid, Divider } = require("@mui/material");
function Expole() {
  return (
    <>
      {" "}
      <Box
        sx={{
          width: "auto",
          height: 200,
          backgroundImage:
            "url(https://public.slidesharecdn.com/v2/assets/topics-2e964997b776e21cdd6f.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "blueviolet",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            margin: "auto",
            display: "block",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Grid item>
            <Typography
              variant="h1"
              sx={{
                fontSize: "50px",
                fontFamily: "inherit",
                margin: "auto",
              }}
            >
              <Divider
                orientation="horizontal"
                flexItem
                variant="middle"
                sx={{}}
                light={true}
              >
                Expole
              </Divider>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                margin: "auto",
              }}
            >
              Check out the latest on all your favorite topics
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <ExpoleList />
    </>
  );
}

export default Expole;
