import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { styled } from "@mui/system";

import StarIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import Pricing from "~/pages/Payment/Package";
import { setShowPricing } from "~/slices/download";
import { registerPackage } from "~/slices/paypal";
import Swal from "sweetalert2";

const PricingCard = styled(Card)(({ theme }) => ({
  backgroundColor:
    theme && theme.palette && theme.palette.grey && theme.palette.grey[200]
      ? theme.palette.grey[200]
      : "#f5f5f5",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: `0px 0px 15px 5px`,
  },
}));
const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});
const style = {
  imageWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: "0",
    overflowX: "hidden",
  },
  wrapper: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  },
};
function Slider() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [tiers, setTiers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/packages`)
      .then((response) => {
        const sortedTiers = response.data.sort((a, b) => a.price - b.price);
        // const duplicatedFirstTier = { ...sortedTiers[2] };
        // sortedTiers.push(duplicatedFirstTier);

        // Thiết lập giá trị của state tiers
        setTiers(sortedTiers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setTiers]);
  const handleClickPackage = () => {
    if (!currentUser?.token) {
      Swal.fire({
        icon: "error",
        title: "Please Sign in !",
        text: "You can't download the file right now.",
        confirmButtonText: "OK",
      }).then(() => {
        setShowForm(true);
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
        <Grid
          container
          spacing={5}
          sm={6}
          alignItems="flex-end"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            margin: "10px auto",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
          onClick={handleClickPackage}
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            initialSlide={0}
            // onSlideChange={handleSlideChange}
          >
            {tiers.map((tier) => (
              <SwiperSlide key={tier}>
                <Grid item key={tier.id}>
                  <PricingCard
                    sx={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    }}
                  >
                    <CardHeader
                      title={tier.name}
                      // subheader={tier.name}
                      titleTypographyProps={{ align: "center" }}
                      action={tier.name === "Vip" ? <StarIcon /> : null}
                      // subheaderTypographyProps={{
                      //   align: "center",
                      // }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h3"
                          color="text.primary"
                        >
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {tier?.duration &&
                            (Number.isInteger(tier?.duration / 365)
                              ? `/${tier?.duration / 365}year`
                              : Number.isInteger(tier?.duration / 30)
                              ? `/${tier?.duration / 30}month`
                              : Number.isInteger(tier?.duration / 7)
                              ? `/${tier?.duration / 7}week`
                              : `/${tier?.duration}day`)}
                        </Typography>
                      </Box>
                      <PricingList>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          {tier?.price === 0
                            ? "1 Upload = 1"
                            : tier.dowloads === 0
                            ? "Unlimit"
                            : tier.dowloads}{" "}
                          Download
                        </Typography>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          {tier.storageSize} GB storageSize
                        </Typography>
                      </PricingList>
                    </CardContent>
                    {/* <CardActions>
                      <Button
                        fullWidth
                        variant={tier.name === "Pro" ? "contained" : "outlined"}
                        onClick={() => handleResgisterPackage(tier)}
                      >
                        Get started
                      </Button>
                    </CardActions> */}
                  </PricingCard>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* <Todo todoList={todoList} number={numberProduct} /> */}
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
