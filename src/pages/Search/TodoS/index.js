import React from "react";

import TodoListSearch from "../TodoListS";

function TodoSearch({ ...props }) {
  const { todoList, number } = props;

 
  return (
    <>
        <TodoListSearch todoList={todoList} number={number} />
    </>
  );
}

export default TodoSearch;
