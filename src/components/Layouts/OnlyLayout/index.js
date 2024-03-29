import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
