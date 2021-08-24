import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientContext } from "../contexts/ClientContext";
import { makeStyles, TextField } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  divs: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  buttonBlock: {
    marginBottom: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "100px",
    padding: "10px",
    background: "black",
    color: "white",
  },
});

const ProductDetail = () => {
  const { productDetail, getProductDetail, createComment, comments } =
    useContext(clientContext);
  const { id } = useParams();
  const { currentUser } = useAuth();
  const classes = useStyles();
  useEffect(() => {
    getProductDetail(id);
  }, []);

  return (
    <>
      {productDetail ? (
        <div className="container">
          <div className="product-detail">
            <div className="detail-left">
              <img src={productDetail.image} />
            </div>
            <div className="detail-right">
              <h1>{productDetail.title}</h1>
              <ul>
                <li>
                  <div>Price:</div>
                  <div>{productDetail.price}</div>
                </li>
                <li>
                  <div>Category:</div>
                  <div>{productDetail.category}</div>
                </li>
                <li>
                  <div>Class:</div>
                  <div>{productDetail.class}</div>
                </li>
                <li>
                  <div>Configuration:</div>
                  <div>{productDetail.configuration}</div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p>{productDetail.description}</p>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default ProductDetail;
