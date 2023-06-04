import { Route, Routes } from "react-router-dom";
import * as routes from "./routes";
import OnlyLayout from "./components/Layouts/OnlyLayout";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import NonetLayout from "./components/Layouts/NoneLayout";
// import Header from "./components/Layouts/Header";
// // import Home from "./pages/Home";
// import Slider from "./components/Layouts/Main/Slider";
function App() {
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
        {routes.privateRoutes.map((routes, indexs) => {
          const Layout = routes.layout ? NonetLayout : OnlyLayout;
          const Page = routes.component;
          return (
            <Route
              path={routes.path}
              key={indexs}
              element={
                   <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}
export default App;
