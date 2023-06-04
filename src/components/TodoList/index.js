import React from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TodoList({ ...props }) {
    const { todoList, number } = props;

    const navigate = useNavigate();

    const result = [];

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleClickProduct = (todo) => {
        console.log(todo);
        navigate(`/chitietsanpham/${todo.id}`);
    };

    const handleListProducts = () => {
        // eslint-disable-next-line no-lone-blocks
        {
            // eslint-disable-next-line array-callback-return
            todoList.some((todo, index) => {
                if (index === number[2]) {
                    return true;
                }
                result.push(
                    <Grid item xs={matches ? number[0] : number[1]} key={todo.id}>
                        <Card sx={{ maxWidth: 300, marginX: 'auto' }} elevation={0} onClick={() => handleClickProduct(todo)}>
                            <CardActionArea>
                                <CardMedia component="img" height="300" image={todo.image} alt="photo product" />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" color={'rgba(0,0,0,0.5)'}>
                                        {todo.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ${todo.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            });
        }
    };
    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: 2 }}>
                <Grid container spacing={3}>
                    {handleListProducts()}
                    {result.map((item) => item)}
                </Grid>
            </Box>
        </>
    );
}

export default TodoList;
