import React from "react";

import TodoListTop from "~/components/TodoListTop";

function TodoSearch({ ...props }) {
  const { todoList, number, pages } = props;

  return (
    <>
      <TodoListTop todoList={todoList} number={number} pages={pages} />
    </>
  );
}

export default TodoSearch;
