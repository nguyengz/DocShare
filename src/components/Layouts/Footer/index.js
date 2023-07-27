import React, { useState } from "react";

import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import Rules from "~/pages/Rules";

function Footer() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const handleRulesOpen = () => {
    setRulesOpen(true);
  };

  const handleRulesClose = () => {
    setRulesOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          // height: "200px",
          width: "100%",
          mt: 10,
          position: "static",
          bottom: 0,
          color: "white",
        }}
      >
        {" "}
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                We are DocShare, dedicated to providing the best service to our
                customers.
              </Typography>
              <Typography variant="body2">Duong Ngoc Nguyen</Typography>
              <Typography variant="body2">Huynh Thanh Vi</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                180 Cao Lo, Quan 8, TP.HCM
              </Typography>
              <Typography variant="body2">Email: info@example.com</Typography>
              <Typography variant="body2">Phone: +1 234 567 8901</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Link
                href="https://www.facebook.com/docsharevn"
                color="inherit"
                target="_blank"
              >
                <Facebook />
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Điều khoản
              </Typography>
              <Button color="inherit" onClick={handleRulesOpen}>
                Điều khoản sử dụng
              </Button>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" align="center">
              {"Copyright © "}
              <Link color="inherit" href="">
                Nguyen Vi
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Rules open={rulesOpen} onClose={handleRulesClose} />
    </>
  );
}

export default Footer;
