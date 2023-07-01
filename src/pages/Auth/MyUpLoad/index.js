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
import { fetchUser } from "~/slices/user";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InventoryIcon from "@mui/icons-material/Inventory";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MyPackage from "../MyPackage";
function MyUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.userAbout.userAbout);
  const [imageData, setImageData] = useState("");
  const [showPackage, setShowPackage] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(currentUser.id));
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
  const handleClosePackage = () => {
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
              My Upload
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
              <CloudUploadIcon sx={{ marginRight: "5px" }} /> SizeCloud: 1GB
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
              <FileUploadIcon sx={{ marginRight: "5px" }} /> SizeCloud:{" "}
              {userAbout?.files.length}
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
            }}
          >
            {" "}
            {showPackage && showPackage ? (
              <MyPackage />
            ) : (
              <Example data={userAbout?.files} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MyUpload;
