import { Box, Grid, Typography } from "@mui/material";
import Todo from "./TodoF";
import { useEffect, useState } from "react";
import axios from "axios";

function Featured() {
  const [posts, setPosts] = useState([]);

  const baseURL = "https://clothesshop.herokuapp.com/api/auth/products";
  // const baseURL = 'https://clothes-shopvn.herokuapp.com/api/auth/products';

  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(baseURL);
      setPosts(res);
    };
    getPost();
  }, []);

  if (!posts) return null;

  const getAlldata = () => {
    let datas = [];
    // eslint-disable-next-line array-callback-return
    posts.map((value) => {
      const data = {
        id: value.product_id,
        name: value.product_name,
        price: value.price,
        image: value.image_url,
      };
      datas = [...datas, data];
    });
    return datas;
  };

  let todoList = getAlldata();

  const numberProduct = [4, 12, 7];
  //   const numberProduct1 = [3, 12, 7];
  return (
    <>
      <Box
        sx={{
          width: "auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "left",
          color: "white",
          margin: 0,
        }}
      >
        <Todo todoList={todoList} number={numberProduct} />
      </Box>
    </>
  );
}

export default Featured;
