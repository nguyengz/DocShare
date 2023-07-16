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
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { fetchUserAbout, logout } from "~/slices/auth";
import EventBus from "~/common/EventBus";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import SearchResutlt from "~/pages/Search";
import Swal from "sweetalert2";
import randomColor from "randomcolor";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  border: "1px solid blue",
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    borderColor: "white",
    borderRadius: "20px",
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  "& .suggestion-list": {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 1,
    padding: "8px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "20px",
  },
  "& .suggestion-list li": {
    listStyle: "none",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
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
  { id: "expole", title: "Category" },
];
export default function Header() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const userAbout = useSelector((state) => state.auth.userAbout);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [tagName, setTagName] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const [avatarUrl, setAvatarUrl] = useState();
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logOut = useCallback(() => {
    try {
      Swal.fire({
        title: "Logout",
        text: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout());
        }
      });
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  useEffect(() => {
    dispatch(fetchUserAbout(currentUser?.id));
    if (userAbout?.avatar) {
      loadImage(userAbout?.avatar).then((url) => {
        setAvatarUrl(url);
      });
    }
    // console.log(userAbout);
  }, [currentUser?.id, dispatch, userAbout?.avatar]);
  function loadImage(link) {
    return fetch(`http://localhost:8080/file/review/${link}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
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
    setAnchorEl(null);
    navigate(`/AcountSetting/${currentUser.name}`);
  };
  const handleClickMyUpload = (todo) => {
    setAnchorEl(null);
    navigate(`/${currentUser.name}/EditUpload`);
  };
  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };
  const handleClickOder = (todo) => {
    setAnchorEl(null);
    // alert(encodeURIComponent(currentUser?.name));
    navigate(`/${encodeURIComponent(currentUser?.name)}/order`);
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    navigate(`/Search?tagName=${query}`);
  };

  const menuId = "account-menu";
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
    <>
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

            <form
              onSubmit={handleSearch}
              style={{
                borderRadius: "20px",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  name="search"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={tagName}
                  onChange={(event) => setTagName(event.target.value)}
                />
              </Search>
            </form>
            {/* <SearchResutlt tagName={tagName} /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{ height: "20%", margin: "auto 20px" }}
                onClick={checkUpload}
              >
                {" "}
                <FileUploadIcon />
                <Typography variant="caption">Upload</Typography>
              </Button>

              {currentUser && currentUser.name ? (
                <>
                  <Tooltip title="Account menu">
                    <IconButton
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                      backgroundColor={randomColor()}
                    >
                      {avatarUrl ? (
                        <Avatar src={avatarUrl}></Avatar>
                      ) : (
                        <Avatar>
                          {currentUser.name?.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      {/* <AccountCircle /> */}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id={menuId}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClickProfile}>
                      <Avatar src={avatarUrl}>
                        {userAbout?.name?.charAt(0).toUpperCase()}
                      </Avatar>{" "}
                      {userAbout?.name}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClickAcountSetting}>
                      <Settings fontSize="small" />
                      My account setting
                    </MenuItem>
                    <MenuItem onClick={handleClickMyUpload}>
                      <UploadFileIcon fontSize="small" /> My Upload
                    </MenuItem>
                    <MenuItem onClick={handleClickOder}>
                      <ShoppingCartCheckoutIcon fontSize="small" /> My Oder
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                      {" "}
                      <Logout fontSize="small" />
                      Log out
                    </MenuItem>
                  </Menu>
                  {/* {renderMenu} */}
                  {/* <Button sx={{ mr: "10px" }} onClick={logOut}>
              Log out
            </Button> */}
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{ mr: "10px" }}
                    href={"/login"}
                  >
                    Sign in
                  </Button>
                  <Button sx={{ mr: "10px" }} href={"/register"}>
                    Sign up
                  </Button>
                </>
              )}
            </Box>

            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
            </Box> */}
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
      </Box>
    </>
  );
}
