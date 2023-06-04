/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
function FileDetail() {
  return (
    <>
      <Box container sx={{ minHeight: "1000px" }}>
        <Card
          sx={{
            margin: "10px auto",
          }}
        >
          <Grid container direction="row">
            <Grid xs={12} sm={9} direction="column">
              <Grid
                item
                sx={{
                  height: 400,
                }}
              >
                <iframe
                  src="https://drive.google.com/file/d/1HUm563Yi1ifK0UyIQX6X_r5ms8DUFF9f/preview  "
                  allow="autoplay"
                  width="100%"
                  height="100%"
                ></iframe>
              </Grid>
              <Grid
                item
                sx={{
                  height: 300,
                  margin: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Stack item>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "26px", fontWeight: 600 }}
                    >
                      4 Strategies to Renew Your Career Passion
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      Jul. 21, 2015 • 273 likes • 82.708 views
                    </Typography>
                  </Stack>
                  <Stack item>
                    <Button variant="contained" color="primary">
                      <DownloadIcon />
                      Upload Now
                    </Button>
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                      Download to read offline
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FavoriteBorderIcon />
                  <ShareRoundedIcon />
                  <MoreHorizRoundedIcon />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>Tag</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography>
                    Take time to reflect on your career path. It's worth the
                    effort. Full LinkedIn article: http://bit.ly/4Strategies
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ margin: "10px 5px" }}>
                  <Stack item>
                    {" "}
                    <Avatar></Avatar>
                  </Stack>
                  <Stack item>
                    <Typography>Nguyên </Typography>
                    <Typography>About</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid>bb</Grid>
          </Grid>
        </Card>
        <Grid container spacing={2} sx={{ margin: "5px 5px" }}>
          <Grid
            item
            xs={12}
            sx={{
              margin: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              color="initial"
              sx={{ fontSize: 40, fontWeight: 700 }}
            >
              More Related Content
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginY: "20px",
            }}
          >
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content (20)
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginY: "20px",
            }}
          >
            <Typography
              variant="h2"
              color="initial"
              sx={{ fontSize: 20, fontWeight: 700 }}
            >
              More Related Content (20)
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FileDetail;
