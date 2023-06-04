import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TodoTop from "../TodoListE";

function Todo({ ...props }) {
  const { todoList, number } = props;

  return (
    <>
      <Box
        sx={{
          width: "70%",
          margin: "0px auto ",
          alignItems: "center",
          alignContent: "",
        }}
      >
        <TodoTop todoList={todoList} number={number} />
      </Box>
    </>
  );
}

export default Todo;
