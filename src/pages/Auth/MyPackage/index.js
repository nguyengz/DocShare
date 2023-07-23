import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import Table from "./Table";
function MyPackage() {
  const myPackage = useSelector((state) => state.order.data);
  // const [listOder, setlistOder] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/order/access/list?user_id=${currentUser.id}`)
  //     .then((response) => {
  //       // Handle successful response
  //       setlistOder(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // }, [currentUser.id]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          // height: "500px",
          margin: "0px auto",
          background: "white",
          //   position: "fixed",
        }}
      >
        <Table data={myPackage} />
      </Box>
    </>
  );
}

export default MyPackage;
