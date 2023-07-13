import { Box, Button } from "@mui/material";
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
import { registerPackage } from "~/slices/paypal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
  "&:hover": {
    boxShadow: `0px 0px 15px 5px`,
  },
}));

// const tiers = [
//   {
//     tiers_id: 1,
//     title: "Free",
//     price: "0",
//     description: ["10 downloads", "1 GB of storage"],
//     buttonText: "Get started",
//     buttonVariant: "outlined",
//   },
//   {
//     tiers_id: 2,
//     title: "Pro",
//     subheader: "Most popular",
//     price: "15",
//     description: ["20 downloads", "2 GB of storage"],
//     buttonText: "Get started",
//     buttonVariant: "contained",
//   },
//   {
//     tiers_id: 3,
//     title: "Enterprise",
//     price: "30",
//     description: ["50 downloads", "5 GB of storage"],
//     buttonText: "Get started",
//     buttonVariant: "outlined",
//   },
// ];
export default function Pricing({ onBack, fileDetail_id, name }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { id } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [tiers, setTiers] = useState([]);
  // const payLink = useSelector((state) => state.package.data);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/packages`)
      .then((response) => {
        const sortedTiers = response.data.sort((a, b) => a.price - b.price);
        setTiers(sortedTiers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setTiers]);
  const handleResgisterPackage = async (tier) => {
    setIsUploading(true);
    const data = {
      user_id: currentUser.id,
      package_id: tier.id,
      file_id: parseInt(fileDetail_id) ? parseInt(fileDetail_id) : "",
      name: encodeURIComponent(name),
    };

    try {
      // dispatch the uploadfile action
      const response = await dispatch(registerPackage(data));
      const payLink = response.payload;
      console.log(data);
      window.location.href = payLink;
    } catch (error) {
      console.log(error);
      setIsUploading(false); // set isUploading state to false if there is an error
    }
  };

  return (
    <Container maxWidth="md" component="main" sx={{}}>
      <Grid
        container
        spacing={5}
        alignItems="flex-end"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.id}
            xs={12}
            sm={tier.name === "Vip" ? 12 : 8}
            md={4}
          >
            <PricingCard>
              <CardHeader
                title={tier.name}
                // subheader={tier.name}
                titleTypographyProps={{ align: "center" }}
                action={tier.name === "Pro" ? <StarIcon /> : null}
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
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <PricingList>
                  <Typography component="li" variant="subtitle1" align="center">
                    {" "}
                    {tier.dowloads} Download
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    {tier.storageSize} GB storageSize
                  </Typography>
                </PricingList>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.name === "Pro" ? "contained" : "outlined"}
                  onClick={() => handleResgisterPackage(tier)}
                >
                  Get started
                </Button>
              </CardActions>
            </PricingCard>
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button variant="contained" color="primary" onClick={onBack}>
            X
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
