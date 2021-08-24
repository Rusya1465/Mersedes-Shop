import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { JSON_API_CARS } from "../../helpers/constans";

export const clientContext = React.createContext();

const INIT_STATE = {
  products: null,
  paginationPages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "GET_CART":
      return { ...state, cartData: action.payload };
    default:
      return state;
  }
};

const ClientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async (history) => {
    const search = new URLSearchParams(window.location.search);
    search.set("_limit", 3);
    history
      ? history.push(`${history.location.pathname}?${search.toString()}`)
      : console.log(null);
    const res = await axios(`${JSON_API_CARS}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
  };

  const [favorites, setFavorites] = useState([]);
  const addFavoriteCarContext = (car) => {
    const newFavoriteList = [...favorites, car];
    setFavorites(newFavoriteList);
  };
  const removeFavoriteCarContext = (car) => {
    const newFavoriteList = favorites.filter(
      (favorites) => favorites.imdbID !== car.imdbID
    );
    setFavorites(newFavoriteList);
  };
  console.log(favorites);

  return (
    <clientContext.Provider
      value={{
        products: state.products,
        getProducts,
        paginationPages: state.paginationPages,
        addFavoriteCarContext,
        favorites,
        removeFavoriteCarContext
      }}
    >
      {children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
