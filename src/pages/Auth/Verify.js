import { Box, Link, Typography } from "@mui/material";
import React from "react";

function Verify() {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "block",
        margin: "20px auto",
        paddingTop: "5px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "40px",
          fontWeight: "20px",
        }}
      >
        You have signed up successfully!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "20px",
        }}
        color="initial"
      >
        Please check your email to verify your account
      </Typography>
      <Typography
        variant="body1"
        component={Link}
        href={"/login"}
        underline="none"
        sx={{
          mr: 2,
          textDecoration: "none",
          color: "blue",
          ":hover": { color: "blanchedalmond" },
        }}
      >
        Click here to Login
      </Typography>
    </Box>
  );
}

export default Verify;
