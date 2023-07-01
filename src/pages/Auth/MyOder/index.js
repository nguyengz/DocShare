import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { BuildTwoTone } from "@mui/icons-material";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [download, setDownload] = useState("");
  const [cloud, setCloud] = useState(0);
  const [showDetailsId, setShowDetailsId] = useState(null);
  // const [isActive, setIsActive] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [listOder, setlistOder] = useState([]);
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
  }, [currentUser.id]);
  useEffect(() => {
    console.log(listOder);
  }, [currentUser.id, listOder]);
  const handleDialogClose = () => {
    setShowDialog(false);
    // hide the dialog box
    // reset input value to initial value // reset switch value to initial value
  };
  const handleSwitchChange = async () => {
    setShowDialog(true);
  };
  // const payLink = useSelector((state) => state.package.data);
  const handleResgisterPackage = (tier) => {
    setShowDetailsId(tier.tiers_id);
  };

  const handlClickThongKe = () => {
    setShowDetailsId(null);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDownloadChange = (event) => {
    setDownload(event.target.value);
  };

  const handleCouldChange = (event) => {
    setCloud(event.target.value);
  };
  const handleSubmit = () => {
    alert("Thanh cong");
  };
  const handleAddPackage = () => {
    setShowForm(true); // show the form when the button is clicked
  };

  const handleDialogSubmit = async (id) => {
    try {
      const updatedPackage = { id };
      await axios.put(`http://localhost:8080/package/active`, updatedPackage);
      // setIsActive(!isActive);
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const totalOrderPrice = listOder.reduce(
    (total, order) => total + order.orderDetail.price,
    0
  );

  return (
    <Container
      maxWidth="12"
      component="main"
      spacing={2}
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid
        container
        sm={8}
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        sx={{ margin: "20px auto" }}
      >
        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPackage}
          >
            New oder
          </Button>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="caption" color="initial">
            Total Order: {listOder.length} * Total price: {totalOrderPrice}
          </Typography>
        </Grid>
        {listOder?.map((listOder) => (
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

              <Grid item xs={12} sm={6} ml={10}>
                <Typography>
                  {" "}
                  Start_date: {listOder.orderDetail.start_date}
                </Typography>
                <Typography>
                  {" "}
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
        ))}
      </Grid>
    </Container>
  );
}
export default MyOrder;
