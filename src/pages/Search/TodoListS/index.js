import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";

const styles = {
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
};

function TodoListSearch({ ...props }) {
  const { todoList, number } = props;
 
  const navigate = useNavigate();
  const imageData = useFetchImageData(todoList);
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
            xs={matches ? number[0] : number[1]}
            key={todo.id}
            padding={1}
          >
            <Card
              elevation={0}
              sx={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            >
              <CardActionArea onClick={() => handleClickProduct(todo)}>
                <CardMedia
                  component="img"
                  image={imageData[todo.id] || ""}
                  alt="green iguana"
                  height={200}
                  sx={{
                    objectFit: "contain",
                    objectPosition: "center",
                    background: "gainsboro",
                    // backgroundImage: `url(${imageData[todo.id]})`,
                  }}
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
                <Typography
                  component={Link}
                  style={{
                    marginRight: "auto",
                    textDecoration: "none",
                    color: "#1976d2",
                  }}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                  href={`/About/${todo.name}`}
                  // to={`/About/${todo.userId}`}
                  key={index}
                  onMouseEnter={(e) => {
                    e.target.style.color = "blue";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "1976d2";
                  }}
                >
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
          {/* {result.slice(0, 3).map((item) => item)} */}
          {result.map((item) => item)}
        </Grid>
      </Box>
    </>
  );
}

export default TodoListSearch;
