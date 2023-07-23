import React from "react";

import { Box } from "@mui/material";
import Featured from "~/components/Layouts/Main/Featured";
import TopView from "~/components/Layouts/Main/TopView";

function Home() {
  return (
    <>
      <Box
        sx={{
          backgroundRepeat: "no-repeat",
          minHeight: 1000,
          backgroundPosition: "center",
          textAlign: "center",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <TopView />
        <Featured />
      </Box>
    </>
  );
}

export default Home;
