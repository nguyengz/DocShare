import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Pagination, Stack } from "@mui/material";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import usePagination from "~/utils/PaginatedList";
import Pricing from "~/pages/Payment/Package";
import { setShowPricing } from "~/slices/download";
// import { addPackage, fetchPackages } from "store/reducers/slices/package";
// import { useDispatch, useSelector } from 'react-redux';
// import { registerPackage } from '~/slices/paypal';

const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});
const PricingCard = styled(Card)(({ theme }) => ({
  backgroundColor:
    theme && theme.palette && theme.palette.grey && theme.palette.grey[200]
      ? theme.palette.grey[200]
      : "#f5f5f5",
  transition: "box-shadow 0.3s",
  height: "100%",
  "&:hover": {
    boxShadow: `0px 0px 15px 5px`,
  },
}));

// const tiers = [
//   {
//     tiers_id: 1,
//     title: 'Free',
//     price: '0',
//     description: ['10 downloads', '1 GB of storage'],

//     buttonVariant: 'outlined'
//   },
//   {
//     tiers_id: 2,
//     title: 'Pro',
//     subheader: 'Most popular',
//     price: '15',
//     description: ['20 downloads', '2 GB of storage'],

//     buttonVariant: 'contained'
//   },
//   {
//     tiers_id: 3,
//     title: 'Enterprise',
//     price: '30',
//     description: ['50 downloads', '5 GB of storage'],

//     buttonVariant: 'outlined'
//   }
// ];
function MyOrder() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  //   const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [listOder, setlistOder] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(listOder.length / PER_PAGE);
  const _DATA = usePagination(listOder, PER_PAGE);
  // let totalOrderPrice = 0;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/order/list?user_id=${currentUser.id}`)
      .then((response) => {
        // Handle successful response
        setlistOder(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleAddPackage = () => {
    setShowForm(true); // show the form when the button is clicked
  };

  const totalOrderPrice = listOder.reduce(
    (total, order) => total + order.orderDetail.price,
    0
  );

  return (
    <Container
      maxWidth="12"
      // component="main"
      spacing={2}
      justify="center"
      alignItems="center"
      alignContent="center"
      sx={{ minHeight: 1000 }}
    >
      <Grid
        container
        sm={8}
        spacing={1}
        wrap="wrap"
        sx={{ margin: "20px auto" }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPackage}
            >
              New order
            </Button>
          </Grid>
          <Grid item md={6} sx={{ textAlign: "right" }}>
            <Typography variant="caption" color="initial">
              Total Order: {listOder.length} * Total price: {totalOrderPrice}
            </Typography>
          </Grid>
        </Grid>
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
              name={currentUser.name}
            />
          </div>
        )}
        <Box minHeight="900px" width="90%" mt={5} mx="auto">
          {_DATA?.currentData().map((listOder) => (
            <>
              <Grid
                container
                key={listOder.id}
                xs={12}
                sm={12}
                spacing={2}
                direction="row"
                sx={{
                  border: "1px dashed #b4bbd1",
                  margin: "5px",
                  padding: "5px",
                  backgroundColor: "white",
                  height: "150px",
                }}
              >
                <PricingCard
                  sx={{
                    width: "250px",
                    boxShadow: listOder.orderStatus
                      ? "0 0 10px rgba(0, 255, 0, 0.5)"
                      : "0 0 10px rgb(255 1 1)",
                    fontSize: "14px",
                  }}
                >
                  <CardHeader
                    title={listOder.packages.name}
                    subheader={listOder.packages.subheader}
                    titleTypographyProps={{ align: "center" }}
                    height="10%"
                    action={
                      listOder.packages.name === "Pro" ? <StarIcon /> : null
                    }
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                    sx={{
                      padding: "1px",
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: "1px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        padding: "0px",
                      }}
                    >
                      <Typography
                        component="body1"
                        variant="h4"
                        color="text.primary"
                      >
                        ${listOder.packages.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>
                    <PricingList>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        {listOder.packages.dowloads} Download
                      </Typography>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        {listOder.packages.storageSize} GB storageSize
                      </Typography>
                    </PricingList>
                  </CardContent>
                </PricingCard>

                <Grid item xs={12} sm={6} ml={5} sx={{ paddingTop: "1px" }}>
                  <Typography>
                    Start_date: {listOder.orderDetail.start_date}
                  </Typography>
                  <Typography>
                    End_date: {listOder.orderDetail.end_date}
                  </Typography>
                  <Typography> OrderCode: {listOder.orderCode} </Typography>
                  <Typography>
                    OrderStatus: {listOder.orderStatus}{" "}
                    <CircleIcon
                      sx={{
                        color: listOder.orderStatus ? "green" : "red",
                        borderRadius: "50%",
                        width: "10px",
                        height: "10px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginLeft: "5px",
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}{" "}
        </Box>
        <Grid
          sm={12}
          mt={2}
          width="100%"
          justifyContent="center"
          justifyItems="center"
        >
          <Stack my="auto" alignItems="center">
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
export default MyOrder;
