import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function TodoList({ ...props }) {
  const { todoList, number } = props;

  const navigate = useNavigate();

  const result = [];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
          <Grid
            item
            xs={matches ? number[0] : number[1]}
            key={todo.id}
            padding={1}
            sx={{ height: "250px" }}
          >
            <Card
              elevation={0}
              onClick={() => handleClickProduct(todo)}
              sx={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={todo.image}
                  // alt="green iguana"
                  // sx={{ height: "100%" }}
                  width={"50%"}
                  height={"70%"}
                />
                <CardContent sx={{height: "30%"}}>
                  <Typography variant="body2" color="text.secondary">
                    {todo.name}
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{ width: "100%", margin: "auto" }}>
          {handleListProducts()}
          {result.map((item) => item)}
        </Grid>
      </Box>
    </>
  );
}

export default TodoList;
