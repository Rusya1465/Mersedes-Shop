import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { JSON_API_CARS, JSON_API_COMMENTS } from "../../helpers/constans";

export const clientContext = React.createContext();

const INIT_STATE = {
  products: null,
  paginationPages: 1,
  productDetail: null,
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
    case "GET_PRODUCT_DETAIL":
      return { ...state, productDetail: action.payload };
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

  const saveFavoriteToLocal = (items) => {
    localStorage.setItem("favorite-cars", JSON.stringify(items));
  };

  useEffect(() => {
    const CarFavourites = JSON.parse(localStorage.getItem("favorite-cars"));

    setFavorites(CarFavourites);
  }, []);
  const [favorites, setFavorites] = useState([]);
  const addFavoriteCarContext = (car) => {
    const newFavoriteList = [...favorites, car];
    setFavorites(newFavoriteList);
    saveFavoriteToLocal(newFavoriteList);
  };
  const removeFavoriteCarContext = (car) => {
    const newFavoriteList = favorites.filter(
      (favorites) => favorites.id !== car.id
    );
    setFavorites(newFavoriteList);
    saveFavoriteToLocal(newFavoriteList);
  };

  async function getProductDetail(id) {
    const { data } = await axios(`${JSON_API_CARS}/${id}`);
    dispatch({
      type: "GET_PRODUCT_DETAIL",
      payload: data,
    });
  }
  const [allComments, setAllComments] = useState([]);
  const createComment = (newComment) => {
    const commentList = [...allComments, newComment];
    setAllComments(commentList);
    localStorage.setItem("home-comments", JSON.stringify(commentList));
  };
  useEffect(() => {
    const homeComments = JSON.parse(localStorage.getItem("home-comments"));

    setAllComments(homeComments);
  }, []);

  return (
    <clientContext.Provider
      value={{
        products: state.products,
        getProducts,
        paginationPages: state.paginationPages,
        addFavoriteCarContext,
        favorites,
        removeFavoriteCarContext,
        productDetail: state.productDetail,
        getProductDetail,
        createComment,
        allComments,
      }}
    >
      {children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
