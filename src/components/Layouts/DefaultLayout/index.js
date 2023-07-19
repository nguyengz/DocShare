import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
// import About from '../Main/About';
import Slider from "../Main/Slider";
import { useMediaQuery, useTheme } from "@mui/material";
import TopView from "../Main/TopView";

function DefaultLayout({ children }) {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Main>
        <Slider />
        {children}
      </Main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
