import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Modal,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Example from "./Table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import InventoryIcon from "@mui/icons-material/Inventory";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MyPackage from "../MyPackage";
import { fetchUserAbout } from "~/slices/auth";
import { fetchMyPackage } from "~/slices/order";
function MyUpload() {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.auth.userAbout);
  const myPackage = useSelector((state) => state.order.data);
  const [showPackage, setShowPackage] = useState(false);

  let totalDownloads = 0;
  let totalDownloadsUnli = "";
  let storageSizes = 0;
  for (let i = 0; i < myPackage.length; i++) {
    const item = myPackage[i];
    const downloads = item.dowloads;
    const numOfAccess = item.numOfAccess;
    const storageSize = item.storageSize;
    if (downloads === 0) {
      totalDownloadsUnli = "Unlimit";
    }
    totalDownloads += numOfAccess;
    storageSizes += storageSize;
  }
  useEffect(() => {
    dispatch(fetchUserAbout(currentUser.id));
    dispatch(fetchMyPackage(currentUser.id));
    // console.log(userAbout);
  }, [currentUser, dispatch]);
  const handlClickPackage = () => {
    // navigate("/");
    setShowPackage(true);
  };
  const handlClickFileuploadTb = () => {
    // navigate("/");
    setShowPackage(false);
  };
  return (
    <>
      <Box sx={{ minHeight: "1000px", margin: "1px", background: "white" }}>
        <Grid
          container
          xs={12}
          sm={8}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          wrap="nowrap"
          margin="5px auto"
          sx={{
            border: "1px dashed #b4bbd1",
          }}
        >
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: "10px",
              padding: 2,
            }}
          >
            <Typography
              variant="h1"
              color="initial"
              fontSize={28}
              fontWeight={50}
              padding="0"
            >
              {showPackage ? "My Package" : "My Upload"}
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              // marginTop: "10px",
              padding: 2,
            }}
            gap={2}
          >
            <Typography
              variant="body"
              color="initial"
              fontSize={15}
              fontWeight={50}
              padding="0"
              sx={{
                display: "flex",
                alignItems: "center", //Thêm thuộc tính align-items vào đây
              }}
            >
              <CloudUploadIcon sx={{ marginRight: "5px" }} /> SizeCloud:{" "}
              {storageSizes > 1024 && storageSizes === 1024
                ? storageSizes / 1024 + " GB"
                : storageSizes + " MB"}
            </Typography>
            <Typography
              variant="body"
              color="initial"
              fontSize={15}
              fontWeight={50}
              padding="0"
              sx={{
                display: "flex",
                alignItems: "center", //Thêm thuộc tính align-items vào đây
              }}
            >
              <FileUploadIcon sx={{ marginRight: "5px" }} /> FileUpload:
              {userAbout?.files?.length}
            </Typography>
            <Typography
              variant="body"
              color="initial"
              fontSize={15}
              fontWeight={50}
              padding="0"
              sx={{
                display: "flex",
                alignItems: "center", //Thêm thuộc tính align-items vào đây
              }}
            >
              <DownloadIcon sx={{ marginRight: "5px" }} /> Downloads:{" "}
              {totalDownloadsUnli === "Unlimit"
                ? totalDownloadsUnli
                : totalDownloads}
            </Typography>
            <Button
              onClick={showPackage ? handlClickFileuploadTb : handlClickPackage}
            >
              {" "}
              {showPackage ? <UploadFileIcon /> : <InventoryIcon />}{" "}
              {showPackage ? "My upload" : "Package"}
            </Button>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
              padding: 2,
              justify: "center",
              alignItems: "center",
              //   alignContent="center"
              wrap: "nowrap",
            }}
          >
            {" "}
            {showPackage && showPackage ? (
              <MyPackage />
            ) : (
              <Box width="100%">
                <Example data={userAbout?.files} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyUpload;
