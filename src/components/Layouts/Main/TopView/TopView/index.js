import React from "react";
import { Box, Typography } from "@mui/material";

// import TodoListTopView from "../TopListView";
import TodoListTop from "~/components/TodoListTop";

function TodoT({ ...props }) {
  const { todoList, number } = props;

  return (
    <>
      <Box
        sx={{
          width: "70%",
          // height: "400px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
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

export default TodoT;
