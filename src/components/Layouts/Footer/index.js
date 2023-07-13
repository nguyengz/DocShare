import React from "react";

import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "200px",
        width: "100%",
        mt: 20,
        // position: "absolute",
        bottom: 0,
        color: "white",
      }}
    >
      {" "}
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are XYZ company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">180 Cao Lo, Quan 8, TP.HCM</Typography>
            <Typography variant="body2">Email: info@example.com</Typography>
            <Typography variant="body2">Phone: +1 234 567 8901</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            {"Copyright © "}
            <Link color="inherit" href="">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
