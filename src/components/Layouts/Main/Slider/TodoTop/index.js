import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
// import { Link, useNavigate } from "react-router-dom";
// import useFetchImageData from "~/utils/useEffectIamge";
import StarIcon from "@mui/icons-material/StarBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
const PricingCard = styled(Card)(({ theme }) => ({
  backgroundColor:
    theme && theme.palette && theme.palette.grey && theme.palette.grey[200]
      ? theme.palette.grey[200]
      : "#f5f5f5",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: `0px 0px 15px 5px`,
  },
  height: "230px",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  [theme.breakpoints.down("md")]: {
    height: "300px",
    margin: 0,
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
    margin: 0,
  },
}));
const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    margin: 0,
  },
});
const style = {
  p1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      margin: 0,
    },
  },
  p2: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      margin: 0,
    },
  },
};
function TodoListTop({ ...props }) {
  const { todoList, number, handleClickPackage } = props;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          // spacing={5}
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
            {todoList.map((tier) => (
              <SwiperSlide key={tier} style={{ width: 200 }}>
                <Grid item key={tier.id}>
                  <PricingCard>
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
                          sx={style.p1}
                        >
                          ${tier.price}
                        </Typography>
                        <Typography
                          component="h6"
                          variant="h6"
                          color="text.secondary"
                          sx={style.p1}
                        >
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
                          sx={style.p2}
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
                          sx={style.p2}
                        >
                          {tier?.storageSize > 1024 ||
                          tier?.storageSize === 1024
                            ? tier.storageSize / 1024 + " GB"
                            : tier?.storageSize + " MB"}{" "}
                          storageSize
                        </Typography>
                      </PricingList>
                    </CardContent>
                  </PricingCard>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Box>
    </>
  );
}

export default TodoListTop;
