import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pricing from "~/pages/Payment/Package";
import { setShowPricing } from "~/slices/download";
import Swal from "sweetalert2";
import TodoListTop from "./TodoTop";

function Slider() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [tiers, setTiers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const numberProduct = [4, 12];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/packages`)
      .then((response) => {
        const sortedTiers = response.data.sort((a, b) => a.price - b.price);
        // Thiết lập giá trị của state tiers
        setTiers(sortedTiers);
      })
      .catch((error) => {});
  }, [setTiers]);
  const handleClickPackage = () => {
    if (!currentUser?.token) {
      Swal.fire({
        icon: "error",
        title: "Please Sign in !",
        text: "You can't register package right now.",
        confirmButtonText: "OK",
      }).then(() => {
        setShowForm(false);
      });
    } else {
      setShowForm(true);
    }
    // show the form when the button is clicked
  };
  // const handleResgisterPackage = async (tier) => {
  //   if (!currentUser?.token) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Please Sign in !",
  //       text: "You can't download the file right now.",
  //       confirmButtonText: "OK",
  //     });
  //   } else {
  //     const data = {
  //       user_id: currentUser.id,
  //       package_id: tier.id,
  //       file_id: "",
  //       name: encodeURIComponent(currentUser.name),
  //     };

  //     try {
  //       // dispatch the uploadfile action
  //       const response = await dispatch(registerPackage(data));
  //       const payLink = response.payload;
  //       console.log(data);
  //       window.location.href = payLink;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          width: "auto",
          // height: "300px",
          backgroundImage:
            "url(https://public.slidesharecdn.com/v2/images/hp_desktop_header.jpg?cb=fc6a75b2c177cfad98518da43d3b385f38976fb4)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "blueviolet",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "white",
          margin: 0,
          padding: "1px",
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
        <TodoListTop
          todoList={tiers}
          number={numberProduct}
          handleClickPackage={handleClickPackage}
        />
      </Box>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center ",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <Pricing
            onBack={() => {
              if (showForm) {
                setShowForm(false);
              } else {
                dispatch(setShowPricing(false));
              }
            }}
            fileDetail_id={undefined}
            name={currentUser?.name}
          />
        </div>
      )}
    </>
  );
}
export default Slider;
