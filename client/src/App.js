import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import GlobalStyles from "./shared/Global";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import ScrollTop from "./components/ScrollTop";
import PrivateRoute from "./PrivateRoute";
import Profile from "./pages/Profile";
import Policy from "./pages/Policy";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

const App = () => {
   const user = useSelector((state) => state.user);
   const { userInfo } = user;

   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <Router>
            <ScrollTop />
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/products/:id" element={<Products />} />
               <Route path="/products" element={<Products />} />
               <Route path="/search/:keyword" element={<Search />} />
               <Route path="/register" element={<Register />} />
               <Route
                  path="/login"
                  element={
                     userInfo ? <Navigate replace to="/profile" /> : <Login />
                  }
               />
               <Route path="/cart/:id" element={<Cart />} />
               <Route path="/cart" element={<Cart />} />
               <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
               </Route>
               <Route path="/order/:id" element={<Order />} />
               <Route path="/policy" element={<Policy />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
         </Router>
      </ThemeProvider>
   );
};

export default App;
