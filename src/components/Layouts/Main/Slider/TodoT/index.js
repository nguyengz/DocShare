import React from "react";
import { Box, Typography } from "@mui/material";
import TodoListTop from "../TodoTop";
import { Padding } from "@mui/icons-material";

function Todo({ ...props }) {
  const { todoList, number } = props;

  return (
    <>
      <Box
        sx={{
          width: "70%",
          // height: "400px",
          margin: "0px auto ",
          backgroundColor: "#b1b1b1",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <TodoListTop todoList={todoList} number={number} />
      </Box>
    </>
  );
}

export default Todo;
