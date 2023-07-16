import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import TodoListTop from "~/components/TodoListTop";

function Todo({ ...props }) {
  const { todoList, number } = props;

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
              Top Likes DocShare
            </Typography>
          </Grid>
          <Grid xs={6} item></Grid>
          <Grid xs={3} item>
            <Typography
              variant="subtitle2"
              color={"black"}
              display="block"
              sx={{ marginRight: "-10px" }}
            ></Typography>
          </Grid>
        </Grid>

        <TodoListTop todoList={todoList} number={number} />
      </Box>
    </>
  );
}

export default Todo;
