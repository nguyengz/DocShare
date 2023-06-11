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
import PdfToImage from "../../pdftoimage";

const styles = {
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
};

function TodoList({ ...props }) {
  const { todoList, number } = props;

  const navigate = useNavigate();

  const result = [];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClickProduct = (todo) => {
    console.log(todo);
    navigate(`/fileDetail/${todo.id}`);
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
            xs={matches ? (index > 2 ? 3 : number[0]) : number[1]}
            key={todo.id}
            padding={1}
          >
            <Card
              elevation={0}
              onClick={() => handleClickProduct(todo)}
              sx={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
              <CardActionArea>
                <PdfToImage
                  link={todo.link}
                  userId={todo.userId}
                  id={todo.id}
                />
                <CardContent sx={{ height: "100px" }}>
                  <Typography style={styles.todoName} gutterBottom variant="h6">
                    {todo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Typography>
                      {todo.name.length > 50
                        ? todo.name.slice(0, 50) + "..."
                        : todo.name}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: "flex",
                  margin: "0px 1px",
                  justifyContent: "space-between",
                }}
              >
                <Typography style={{ marginRight: "auto" }}>
                  {todo.userName}
                </Typography>
                <Typography variant="caption">{todo.view} views</Typography>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
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
          {result.slice(0, 3).map((item) => item)}
          {result.slice(3).map((item) => item)}
        </Grid>
      </Box>
    </>
  );
}

export default TodoList;
