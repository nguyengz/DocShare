import Home from "~/pages/Home";
import Expole from "~/pages/Expole";
// import Product from "~/pages/Product";
// import Found404 from "~/pages/Found404";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import AboutUser from "~/pages/Auth/UserAbout";
import UploadFile from "~/pages/UploadFile";
import InfomationUpload from "~/pages/UploadFile";
import FileDetail from "~/pages/FileDetail";
import Verify from "~/pages/Auth/Verify";
import Profile from "~/pages/Auth/Profile";
// import ProductDetail from "~/pages/ProductDetail";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/expole", component: Expole, layout: "onlylayout" },

  { path: "/login", component: Login, layout: "onlylayout" },
  { path: "/register", component: Register, layout: "onlylayout" },

  { path: "/About/:userId", component: AboutUser, layout: "onlylayout" },

  { path: "/uploadfile", component: UploadFile, layout: "onlylayout" },
  {
    path: "/infomationUpload",
    component: InfomationUpload,
    layout: "onlylayout",
  },
  { path: "/fileDetail/:id", component: FileDetail, layout: "onlylayout" },
];

const privateRoutes = [
  { path: "/verify", component: Verify, layout: "nonetlayout" },
  { path: "/profile/:name", component: Profile, layout: "onlylayout" },
];

export { publicRoutes, privateRoutes };
