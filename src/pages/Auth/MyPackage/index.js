import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function MyPackage() {
  return (
    <>
      <Box
        sx={{
          width: "500px",
          height: "500px",
          margin: "50px auto",
          border: "1px solid",
          background: "white",
          //   position: "fixed",
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={() => console.log("Close modal")}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h1" color="initial" fontSize={28} fontWeight={50}>
          My Package
        </Typography>
        <Typography variant="body1" color="initial" fontSize={16}>
          This is my package content.
        </Typography>
      </Box>
    </>
  );
}

export default MyPackage;
