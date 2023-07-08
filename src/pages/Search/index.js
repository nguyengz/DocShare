import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory } from "~/slices/category";
import TodoSearch from "./TodoS";
import useSearchQuery from "~/utils/Filter";
const useStyles = {
  input: {
    with: "200px",
    height: "40px",
    borderRadius: "20px",
  },
};
const Item = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 1,

  minHeight: "20px",
  width: "300px",
  color: theme.palette.text.secondary,
}));
function SearchResutlt() {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Filter");
  const [searchQuery, setSearchQuery] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagName = searchParams.get("tagName");
  const categoryData = useSelector((state) => state.category.data);
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [nameCategory, setNameCategory] = useState();
  useEffect(() => {
    fetch(`/file/search?tagName=${tagName}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.log(error));
  }, [tagName]);
  useEffect(() => {
    setNameCategory(selectedCategory);
  }, [selectedCategory]);
  useEffect(() => {
    dispatch(fetchCategory());
    // pdf && renderPage();
  }, [dispatch]);

  useEffect(() => {
    const filteredData = searchResults.filter(
      (file) =>
        selectedCategory === "" ||
        selectedCategory === "Select a Category" ||
        file.category?.categoryName === selectedCategory ||
        ((nameCategory === "" ||
          file.category?.categoryName
            .toLowerCase()
            .includes(nameCategory.toLowerCase())) &&
          (selectedDateRange === null ||
            (new Date(file.uploadDate) >= selectedDateRange[0] &&
              new Date(file.uploadDate) <= selectedDateRange[1])))
    );
    if (selectedOption === "newest") {
      const sortedFiles = [...filteredData].sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
      setSearchQuery(sortedFiles);
    } else if (selectedOption === "oldest") {
      const sortedFiles = [...filteredData].sort(
        (a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)
      );
      setSearchQuery(sortedFiles);
    } else {
      setSearchQuery(filteredData);
    }
  }, [
    selectedCategory,
    searchResults,
    nameCategory,
    selectedOption,
    selectedDateRange,
  ]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "newest") {
      const currentDate = new Date();
      const oneMonthAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      );
      setSelectedDateRange([
        oneMonthAgo.toISOString(),
        currentDate.toISOString(),
      ]);
    } else if (event.target.value === "oldest") {
      const currentDate = new Date();
      const oneYearAgo = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      setSelectedDateRange([
        oneYearAgo.toISOString(),
        currentDate.toISOString(),
      ]);
    } else {
      setSelectedDateRange(null);
    }
  };

  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };
  const handleCategoryChange = (event) => {
    if (event.target.value !== "Clear") {
      setSelectedCategory(event.target.value);
    }
  };
  const getAlldata = () => {
    let datas = [];

    searchQuery.map((file) => {
      const data = {
        id: file.id,
        userId: file.userId,
        name: file.fileName,
        price: file.description,
        linkImg: file.linkImg,
        link: file.link,
        view: file.view,
        userName: file.userName,
      };
      datas = [...datas, data];
    });
    return datas;
  };
  const todoList = getAlldata();
  const numberProduct = [3, 12, 10];
  return (
    <>
      <Box minHeight={1000} sx={{ flexGrow: 1 }}>
        <Grid
          container
          sm={10}
          spacing={1}
          direction="column"
          sx={{ background: "", margin: "auto", marginTop: "50px" }}
        >
          <Grid item xs={8}>
            <Select
              style={useStyles.input}
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                width: "200px",
              }}
              displayEmpty
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                sx: {
                  marginTop: "8px",
                  "& li": {
                    fontSize: "10px",
                    padding: "8px",
                  },
                },
              }}
            >
              <MenuItem value="Select a Category" disabled>
                Select a Category
              </MenuItem>
              {categoryData.map((category) => (
                <MenuItem key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setSelectedCategory("Select a Category")}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={8} direction="row">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Item>
                <Typography variant="body2" sx={{ color: "#999" }}>
                  1 - 18 of {searchResults.length} results
                </Typography>
              </Item>

              <Item alignItems="right">
                <Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  displayEmpty
                  sx={{
                    border: "none",
                    width: "100px",
                    height: "30px",
                    alignContent: "center",
                    ml: "200px",
                  }}
                >
                  <MenuItem value="Filter" disabled>
                    Filter
                  </MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
              </Item>
            </Stack>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <TodoSearch todoList={todoList} number={numberProduct} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SearchResutlt;
