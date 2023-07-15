import React from "react";

import TodoListTop from "~/components/TodoListTop";

function TodoSearch({ ...props }) {
  const { todoList, number } = props;

  return (
    <>
      <TodoListTop todoList={todoList} number={number} />
    </>
  );
}

export default TodoSearch;
