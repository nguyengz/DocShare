import { Box, Grid, Typography } from "@mui/material";
import Todo from "./TodoE";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "~/slices/category";
import luanvan from "~/assets/images/luanvan.jpg";
import kinangmem from "~/assets/images/kinangmem.jpg";
import business from "~/assets/images/business.jpg";
import kinhte from "~/assets/images/kinhte.jpg";
import nganhang from "~/assets/images/nganhang.jpg";
import giaoducdaotao from "~/assets/images/giaoducdaotao.jpg";
import giaoan from "~/assets/images/giaoan.jpg";
import cntt from "~/assets/images/cntt.jpg";
import kythuat from "~/assets/images/kythuat.jpg";
import ngoaingu from "~/assets/images/ngoaingu.jpg";
import khoahoctunhien from "~/assets/images/khoahoctunhien.jpg";
import ytesuckhoe from "~/assets/images/ytesuckhoe.jpg";
import vanhoa from "~/assets/images/vanhoa.jpg";
import nonglamngu from "~/assets/images/nonglamngu.jpg";
import khac from "~/assets/images/khac.jpg";

// import {cntt } from
function ExpoleList() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.data);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    { id: 1, url: "~/assets/images/cntt.jpg" },
    { id: 2, url: luanvan },
    { id: 3, url: kinangmem },
    { id: 3, url: business },
    { id: 5, url: kinhte },
    { id: 6, url: nganhang },
    { id: 7, url: giaoducdaotao },
    { id: 8, url: giaoan },
    { id: 9, url: cntt },
    { id: 10, url: kythuat },
    { id: 11, url: ngoaingu },
    { id: 12, url: khoahoctunhien },
    { id: 13, url: ytesuckhoe },
    { id: 14, url: vanhoa },
    { id: 14, url: nonglamngu },
    { id: 14, url: khac },
  ];
  useEffect(() => {
    dispatch(fetchCategory())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  if (!category) return null;

  const getAlldata = () => {
    let datas = [];
    // eslint-disable-next-line array-callback-return
    category.forEach((categoryItem) => {
      const imageItem = images.find((image) => image.id === categoryItem.id);
      if (imageItem) {
        const data = {
          id: categoryItem.id,
          name: categoryItem.categoryName,
          image: imageItem.url,
        };
        datas.push(data);
      }
    });
    return datas;
  };

  let todoList = getAlldata();

  const numberProduct = [2.4, 12, 15];
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

export default ExpoleList;
