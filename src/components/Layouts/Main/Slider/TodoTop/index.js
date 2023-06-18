import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
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
import { Link, useNavigate } from "react-router-dom";
import PdfToImage from "../../../pdftoimage";

const styles = {
  todoName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "300px",
  },
};
function TodoListTop({ ...props }) {
  const { todoList, number } = props;

  const navigate = useNavigate();

  const result = [];

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClickProduct = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
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
            <Card elevation={0}>
              <CardActionArea
                sx={{ height: "300px" }}
                onClick={() => handleClickProduct(todo)}
              >
                <PdfToImage
                  link={todo.link}
                  userId={todo.userId}
                  id={todo.id}
                  height={200}
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
                  component={RouterLink}
                  style={{
                    marginRight: "auto",
                    textDecoration: "none",
                    color: "#1976d2",
                  }}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                  // href={`/About/${todo.userId}`}
                  to={`/About/${todo.userId}`}
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
          {result.map((item) => item)}
        </Grid>
      </Box>
    </>
  );
}

export default TodoListTop;
