import { Box, Grid, Typography } from "@mui/material";
import Todo from "./TodoF";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchfileFeatured } from "~/slices/file";

function Featured() {
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.file.feaTured);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchfileFeatured())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [dispatch]);

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
  const numberProduct = [4, 12];
  //   const numberProduct1 = [3, 12, 7];
  return (
    <>
      <Box
        sx={{
          width: "auto",
          textAlign: "center",
          color: "white",
          marginTop: 5,
        }}
      >
        <Grid container xs={8} sm={8} margin="auto">
          <Typography variant="h5" color={"black"}>
            Top Likes DocShare
          </Typography>
        </Grid>
        <Todo todoList={todoList} number={numberProduct} />
      </Box>
    </>
  );
}

export default Featured;
