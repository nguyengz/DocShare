import { Box, Grid, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { fetchfile, fetchfileTop } from "~/slices/file";

import { useDispatch, useSelector } from "react-redux";
import TodoT from "./TopView";

function TopView() {
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.file.topView);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchfileTop()).then(() => setIsLoading(false));
  }, []);

  const getAlldata = () => {
    let datas = [];
    if (fileData) {
      fileData.map((file) => {
        const data = {
          id: file.id,
          userId: file.userId,
          name: file.fileName,
          price: file.description,
          linkImg: file.linkImg,
          link: file.link,
          view: file.view,
          userName: file.userName,
          likeFile: file.likeFile,
          totalDownload: file.totalDownload,
          uploadDate: file.uploadDate,
        };
        datas = [...datas, data];
      });
    }
    return datas;
  };

  const todoList = isLoading ? [] : getAlldata();
  const numberProduct = [4, 12, 3];

  return (
    <>
      <Box
        sx={{
          width: "auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "30px",
        }}
      >
        <Grid container xs={8} sm={8} margin="auto">
          {" "}
          <Typography
            variant="h5"
            sx={
              {
                //   fontFamily: "inherit",
                //   padding: "20px 0 0 0",
              }
            }
          >
            View Top DocShare
          </Typography>
        </Grid>
        <TodoT todoList={todoList} number={numberProduct} />
      </Box>
    </>
  );
}

export default TopView;
