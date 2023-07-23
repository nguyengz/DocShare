import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import useFetchImageData from "~/utils/useEffectIamge";
import StarIcon from "@mui/icons-material/StarBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const PricingCard = styled(Card)(({ theme }) => ({
  backgroundColor:
    theme && theme.palette && theme.palette.grey && theme.palette.grey[200]
      ? theme.palette.grey[200]
      : "#f5f5f5",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: `0px 0px 15px 5px`,
  },
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
}));
const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});
function TodoListTop({ ...props }) {
  const { todoList, number, handleClickPackage } = props;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
