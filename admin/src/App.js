import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import GlobalStyles from "./shared/Global";
import Row from "./shared/Row";
import Col from "./shared/Col";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Reviews from "./pages/Reviews";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

function App() {
   const userLogin = useSelector((state) => state.user);
   const { userInfo } = userLogin;

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <Router>
            {userInfo && userInfo.isAdmin && <Header />}
            <Row wrap="nowrap">
               {userInfo && userInfo.isAdmin && (
                  <Col span="4" sm="3" md="4" lg="5" xl="6">
                     <Sidebar />
                  </Col>
               )}
               <Col grow="1" span="auto">
                  <Routes>
                     <Route path="/login" element={<Login />} />
                     <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/users" element={<Users />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/products" element={<Products />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/products/:id" element={<Products />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/categories" element={<Categories />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route
                           path="/categories/:id"
                           element={<Categories />}
                        />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/orders" element={<Orders />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/orders/:id" element={<Orders />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="/reviews" element={<Reviews />} />
                     </Route>
                     <Route element={<PrivateRoute />}>
                        <Route path="*" element={<NotFound />} />
                     </Route>
                  </Routes>
               </Col>
            </Row>
         </Router>
      </ThemeProvider>
   );
}

export default App;
