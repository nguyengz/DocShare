import React from 'react';
import { Box, Typography } from '@mui/material';
import TodoList from '../TodoList';

function Todo({ ...props }) {

  const { todoList, title, number } = props;


    return (
        <>
            <Box sx={{ width: '90%', minHeight: 500, marginX: 'auto' }} >
                <Typography variant="h5" component="h5" align='center' sx={{ marginTop: 1, padding: 1, textTransform: 'uppercase' }}>
                    {title}
                </Typography>
                <TodoList todoList={todoList} number={number}/>
            </Box>
        </>
    );
}

export default Todo;
