import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(proprs) => {
        return currentUser ? (
          <Component {...proprs} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
