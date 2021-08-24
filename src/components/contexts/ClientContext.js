import axios from "axios";
import React, { useReducer } from "react";
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
    search.set("_limit", 6);
    history
      ? history.push(`${history.location.pathname}?${search.toString()}`)
      : console.log(null);
    const res = await axios(`${JSON_API_CARS}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: res,
    });
  };

  // function addAndDeleteProductInCart(product) {
  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   if (!cart) {
  //     cart = {
  //       products: [],
  //       totalPrice: 0,
  //     };
  //   }
  //   let newProduct = {
  //     product: product,
  //     count: 1,
  //     subPrice: 0,
  //   };

  //   newProduct.subPrice = calcSubPrice(newProduct);
  //   let newCart = cart.products.filter(
  //     (item) => item.product.id === product.id
  //   );
  //   if (newCart.length > 0) {
  //     cart.products = cart.products.filter(
  //       (item) => item.product.id !== product.id
  //     );
  //   } else {
  //     cart.products.push(newProduct);
  //   }
  //   cart.totalPrice = calcTotalPrice(cart.products);
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   dispatch({
  //     type: "ADD_AND_DELETE_PRODUCT_IN_CART",
  //     payload: cart.products.length,
  //   });
  // }

  // function checkProductInCart(id) {
  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   if (!cart) {
  //     cart = {
  //       products: [],
  //       totalPrice: 0,
  //     };
  //   }

  //   let newCart = cart.products.filter((item) => item.product.id === id);
  //   return newCart.length > 0 ? true : false;
  // }

  // function getCart() {
  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   if (!cart) {
  //     cart = [];
  //   }
  //   dispatch({
  //     type: "GET_CART",
  //     payload: cart.products,
  //   });
  // }

  // function changeCountProduct(count, id) {
  //   let cart = JSON.parse(localStorage.getItem("cart"));
  //   cart.products = cart.products.map((item) => {
  //     if (item.product.id === id) {
  //       item.count = count;
  //       item.subPrice = calcSubPrice(item);
  //     }
  //     return item;
  //   });
  //   cart.totalPrice = calcTotalPrice(cart.products);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   getCart();
  // }

  // function makeOrder() {
  //   localStorage.setItem("cart", null);
  //   dispatch({
  //     type: "MAKE_ORDER",
  //     payload: null,
  //   });
  // }

  return (
    <clientContext.Provider
      value={{
        products: state.products,
        getProducts,
        // getCart,
        // checkProductInCart,
        // productsCountInCart: state.productsCountInCart,
        // cartData: state.cartData,
        // changeCountProduct,
        // makeOrder,
        // addAndDeleteProductInCart,
        paginationPages: state.paginationPages,
      }}
    >
      {children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
