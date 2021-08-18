import React from "react";
import Navbar from "./components/NavbarComponents/Navbar";
import "./App.css";
import Home from "./components/NavbarComponents/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Services from "./components/NavbarComponents/pages/Services";
import Products from "./components/NavbarComponents/pages/Products";
import ContactUs from "./components/NavbarComponents/pages/ContactUs";
import SignUp from "./components/NavbarComponents/pages/SignUp";
import Marketing from "./components/NavbarComponents/pages/Marketing";
import Consulting from "./components/NavbarComponents/pages/Consulting";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/marketing" component={Marketing} />
        <Route path="/consulting" component={Consulting} />
      </Switch>
    </Router>
  );
}

export default App;
