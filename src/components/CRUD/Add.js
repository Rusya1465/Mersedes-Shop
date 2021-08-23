import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState, useHistory } from "react";
import { Link } from "react-router-dom";
import { adminContext } from "../contexts/AdminContext";

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

const Add = () => {
  const { createProduct } = useContext(adminContext);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    class: "",
    category: "",
    image: "",
    configuration: "base",
  });

  function handleInput(e) {
    let obj = {
      ...newProduct,
      [e.target.name]: e.target.value,
    };
    setNewProduct(obj);
  }

  function handleClick() {
    createProduct(newProduct);
    setNewProduct({
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      image: "",
      countInStock: "",
    });
  }

  const classes = useStyles();
  return (
    <>
      <div className={classes.main}>
        <div className={classes.divs}>
          <TextField
            value={newProduct.title}
            onChange={handleInput}
            name="title"
            id="standart-basic"
            label="Название"
          />
          <TextField
            value={newProduct.description}
            onChange={handleInput}
            name="description"
            id="standart-basic"
            label="Описание"
          />
          <TextField
            value={newProduct.price}
            onChange={handleInput}
            name="price"
            id="standart-basic"
            label="Цена"
          />
          <TextField
            value={newProduct.author}
            onChange={handleInput}
            name="brand"
            id="standart-basic"
            label="Бренд"
          />
          <TextField
            value={newProduct.category}
            onChange={handleInput}
            name="category"
            id="standart-basic"
            label="Категория"
          />
          <TextField
            value={newProduct.image}
            onChange={handleInput}
            name="image"
            id="standart-basic"
            label="Фото"
          />
          <TextField
            value={newProduct.countInStock}
            onChange={handleInput}
            name="countInStock"
            id="standart-basic"
            label="Кол-во в наличии"
          />
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <div>
          <button onClick={handleClick} className={classes.button}>
            Добавить товар
          </button>
          <Link to="/">
            <button className={classes.button}>Вернутся на главную</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Add;
