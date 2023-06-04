import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TodoTop from "../TodoListF";
import { Padding } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: "blue",
    height: 3,
  },
}));
function Todo({ ...props }) {
  const { todoList, number } = props;

  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          width: "70%",
          // height: "400px",
          margin: "0px auto ",
          alignItems: "center",
          alignContent: "",
        }}
      >
        <Grid container display={"flex"}>
          <Grid xs={3} item>
            <Typography variant="h5" color={"black"}>
              Featured SlideShares
            </Typography>
          </Grid>
          <Grid xs={6} item></Grid>
          <Grid xs={3} item>
            <Typography
              variant="subtitle2"
              color={"black"}
              display="block"
              sx={{ marginRight: "-10px" }}
            >
              See all
            </Typography>
          </Grid>
        </Grid>

        <TodoTop todoList={todoList} number={number} />
      </Box>
    </>
  );
}

export default Todo;
