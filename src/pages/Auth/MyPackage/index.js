import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import Table from "./Table";
function MyPackage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [listOder, setlistOder] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/order/access/list?user_id=${currentUser.id}`)
      .then((response) => {
        // Handle successful response
        setlistOder(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, [currentUser.id]);

  return (
    <>
      <Box
        sx={{
          // width: "90%",
          height: "500px",
          margin: "0px auto",
          border: "1px solid",
          background: "white",
          //   position: "fixed",
        }}
      >
        <Typography variant="h1" color="initial" fontSize={28} fontWeight={50}>
          My Package
        </Typography>
        <Table data={listOder}/>
      </Box>
    </>
  );
}

export default MyPackage;
