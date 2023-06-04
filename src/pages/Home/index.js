import React from "react";

import { Box } from "@mui/material";
import Featured from "~/components/Layouts/Main/Featured";

function Home() {
  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: "auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "white",
          marginTop: 40,
          marginBottom: 10,
        }}
      >
        <Featured />
      </Box>
    </>
  );
}

export default Home;
