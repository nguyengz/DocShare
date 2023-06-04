import { Box, Grid, Paper, Typography } from "@mui/material";
import Todo from "./TodoT";
import { useEffect, useState } from "react";
import axios from "axios";

function Slider() {
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
  // const titleProduct = 'Những sản phẩm nổi bật';
  const numberProduct = [4, 12, 3];
  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: 300,
          backgroundImage:
            "url(https://public.slidesharecdn.com/v2/images/hp_desktop_header.jpg?cb=fc6a75b2c177cfad98518da43d3b385f38976fb4)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "blueviolet",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "white",
          margin: 0,
        }}
      >
        <Grid
          component={"div"}
          sx={{
            marginBottom: "20px",
          }}
        >
          {" "}
          <Typography
            variant="h1"
            sx={{
              fontSize: "50px",
              fontFamily: "inherit",
              padding: "20px 0 0 0",
            }}
          >
            Discover. Share. Learn.
          </Typography>
          <Typography>
            Share what you know and love through presentations, infographics,
            documents and more
          </Typography>
        </Grid>
        <Grid xs={8} component={"div"}>
          {" "}
          <Typography
            variant="caption"
            sx={{
              fontSize: "20px",
              fontWeight: "100px",
              //   fontFamily: "inherit",
              //   padding: "20px 0 0 0",
            }}
          >
            Today’s Top SlideShares
          </Typography>
        </Grid>
        <Todo todoList={todoList} number={numberProduct} />
      </Box>
    </>
  );
}

export default Slider;
