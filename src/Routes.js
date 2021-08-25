import React from "react";
import Navbar from "./components/NavbarComponents/Navbar";
import "./App.css";
import Home from "./components/NavbarComponents/pages/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Products from "./components/NavbarComponents/pages/Products";
import ContactUs from "./components/NavbarComponents/pages/ContactUs";
import Marketing from "./components/NavbarComponents/pages/Marketing";
import Consulting from "./components/NavbarComponents/pages/Consulting";
import AdminContextProvider from "./components/contexts/AdminContext";
import AdminPanel from "./components/CRUD/AdminPanel";
import AppSingUp from "./components/Auth/AppSingUp";
import AuthProvider from "./components/contexts/AuthContext";
import Login from "./components/NavbarComponents/pages/Login";
import Dashboard from "./components/NavbarComponents/pages/Dashboard";
import PrivateRoute from "./components/NavbarComponents/pages/PrivateRoute";
import ForgotPassword from "./components/NavbarComponents/pages/ForgotPassword";
import ClientContextProvider from "./components/contexts/ClientContext";
import Favourite from "./components/NavbarComponents/pages/Favourite";
import ProductDetail from "./components/ProductDetail/ProductDetail";

const Routes = () => {
  return (
    <AuthProvider>
      <ClientContextProvider>
        <AdminContextProvider>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/favourite" component={Favourite} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/contact-us" component={ContactUs} />
              <Route exact path="/sign-up" component={AppSingUp} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/product-detail/:id"
                component={ProductDetail}
              />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/marketing" component={Marketing} />
              <Route exact path="/consulting" component={Consulting} />
              <Route exact path="/crud" component={AdminPanel} />
            </Switch>
          </BrowserRouter>
        </AdminContextProvider>
      </ClientContextProvider>
    </AuthProvider>
  );
};

export default Routes;
