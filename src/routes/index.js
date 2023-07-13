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
import FileListMore from "~/pages/FileDetail/FileList";
import AcountSetting from "~/pages/Auth/AcoutSetting";
import MyUpload from "~/pages/Auth/MyUpLoad";
import Search from "~/pages/Search";
import SearchResutlt from "~/pages/Search";
import SearchCatory from "~/pages/Search/SearchCatory";
import MyOrder from "~/pages/Auth/MyOder";
// import ProductDetail from "~/pages/ProductDetail";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/expole", component: Expole, layout: "onlylayout" },

  { path: "/login", component: Login, layout: "onlylayout" },
  { path: "/register", component: Register, layout: "onlylayout" },

  { path: "/About/:userId", component: AboutUser, layout: "onlylayout" },

  { path: "/fileDetail/:id", component: FileDetail, layout: "onlylayout" },
  // { path: "/filemore", component: FileListMore, layout: "onlylayout" },
  { path: "/Search", component: SearchResutlt, layout: "onlylayout" },
  {
    path: "/SearchCatory/:name",
    component: SearchCatory,
    layout: "onlylayout",
  },
];
const verifyRouter = [{ path: "/verify", component: Verify }];
const privateRoutes = [
  { path: "/profile/:name", component: Profile, layout: "onlylayout" },
  {
    path: "/AcountSetting/:name",
    component: AcountSetting,
    layout: "onlylayout",
  },
  { path: "/:name/EditUpload", component: MyUpload, layout: "onlylayout" },
  { path: "/:name/order", component: MyOrder, layout: "onlylayout" },
  { path: "/uploadfile", component: UploadFile, layout: "onlylayout" },
  {
    path: "/infomationUpload",
    component: InfomationUpload,
    layout: "onlylayout",
  },
];

export { publicRoutes, privateRoutes, verifyRouter };
