import { Navigate, Route, Routes } from "react-router-dom";
import * as routes from "./routes";
import OnlyLayout from "./components/Layouts/OnlyLayout";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import NonetLayout from "./components/Layouts/NoneLayout";
// import Header from "./components/Layouts/Header";
// // import Home from "./pages/Home";
// import Slider from "./components/Layouts/Main/Slider";
import "./App.css";
import { useSelector } from "react-redux";
function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Routes>
        {routes.publicRoutes.map((route, index) => {
          const Layout = route.layout ? OnlyLayout : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {routes.verifyRouter.map((route, index) => {
          const Layout = route.layout ? OnlyLayout : NonetLayout;
          const Page = route.component;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {routes.privateRoutes.map((routes, indexs) => {
          const Layout = routes.layout ? OnlyLayout : NonetLayout;
          const Page = routes.component;
          return (
            <Route
              path={routes.path}
              key={indexs}
              element={
                currentUser ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}
export default App;
