import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Link, List, ListItem } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { logout } from "~/slices/auth";
import EventBus from "~/common/EventBus";
import { useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid",
  borderColor: "blue",
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    borderColor: "white",
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const mobileMenuId = "search-account-menu-mobile";
// const renderMobileMenu = (
// //   <Menu
// //     anchorEl={mobileMoreAnchorEl}
// //     anchorOrigin={{
// //       vertical: "top",
// //       horizontal: "right",
// //     }}
// //     id={mobileMenuId}
// //     keepMounted
// //     transformOrigin={{
// //       vertical: "top",
// //       horizontal: "right",
// //     }}
// //     open={isMobileMenuOpen}
// //     onClose={handleMobileMenuClose}
// //   >
// //     <MenuItem>
// //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
// //         <Badge badgeContent={4} color="error">
// //           <MailIcon />
// //         </Badge>
// //       </IconButton>
// //       <p>Messages</p>
// //     </MenuItem>
// //     <MenuItem>
// //       <IconButton
// //         size="large"
// //         aria-label="show 17 new notifications"
// //         color="inherit"
// //       >
// //         <Badge badgeContent={17} color="error">
// //           <NotificationsIcon />
// //         </Badge>
// //       </IconButton>
// //       <p>Notifications</p>
// //     </MenuItem>
// //     <MenuItem onClick={handleProfileMenuOpen}>
// //       <IconButton
// //         size="large"
// //         aria-label="account of current user"
// //         aria-controls="primary-search-account-menu"
// //         aria-haspopup="true"
// //         color="inherit"
// //       >
// //         <AccountCircle />
// //       </IconButton>
// //       <p>Profile</p>
// //     </MenuItem>
// //   </Menu>
// );
const titlePages = [
  { id: "", title: "Home" },
  { id: "expole", title: "Expole" },
];
export default function Header() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickProfile = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
    navigate(`/profile/${currentUser.name}`);
  };
  const handleClickAcountSetting = (todo) => {
    // console.log(todo.link);
    // const state = { link: todo.link };
    // const title = "";
    // const url = `/fileDetail/${todo.link}`;
    // window.history.pushState(state, title, url);
    navigate(`/AcountSetting/${currentUser.name}`);
  };
  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account setting</MenuItem>
      <MenuItem onClick={logOut}>Log out</MenuItem>
    </Menu>
  );
  // const [idlink, setidlink] = useState("");

  const checkUpload = () => {
    const link = currentUser ? "/uploadfile" : "/login";
    console.log(link);
    navigate(link);
  };
  // const onchangeColorLink = () => {
  //   setidlink("expole");
  //   // console.log(idlink);
  // };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 4 }}>
            DocShare
          </Typography>
          <List sx={{ display: "flex" }}>
            <ListItem>
              {titlePages.map((page, index) => {
                return (
                  <Typography
                    component={Link}
                    variant="h7"
                    sx={{
                      mr: 2,
                      textDecoration: "none",
                      // color: idlink === page.id ? "red" : "white",
                      ":hover": { color: "blue" },
                    }}
                    onClick={() => {
                      // setidlink(page.id);
                      // alert(page.title);
                    }}
                    // underline="none"
                    href={`/${page.id}`}
                    value={page.id}
                    key={index}
                  >
                    {page.title}
                  </Typography>
                );
              })}
            </ListItem>
          </List>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "", md: "flex" } }}>
            <Button
              variant="contained"
              sx={{ mr: "10px" }}
              onClick={checkUpload}
            >
              {" "}
              <FileUploadIcon />
              <Typography variant="caption">Upload</Typography>
            </Button>

            {currentUser && currentUser.name ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  id={menuId}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleClickProfile}>
                    {currentUser.name}
                  </MenuItem>
                  <MenuItem onClick={handleClickAcountSetting}>
                    My account setting
                  </MenuItem>
                  <MenuItem onClick={logOut}>Log out</MenuItem>
                </Menu>
                {/* {renderMenu} */}
                {/* <Button sx={{ mr: "10px" }} onClick={logOut}>
                  Log out
                </Button> */}
              </>
            ) : (
              <>
                <Button variant="outlined" sx={{ mr: "10px" }} href={"/login"}>
                  Sign in
                </Button>
                <Button sx={{ mr: "10px" }} href={"/register"}>
                  Sign up
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
    </Box>
  );
}
