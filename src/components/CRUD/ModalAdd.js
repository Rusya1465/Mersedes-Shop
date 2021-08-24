import { Button, Modal } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
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

export default function ModalAdd() {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { createProduct } = useContext(adminContext);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    class: "",
    category: "",
    image: "",
    cardTitle: "",
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
      class: "",
      category: "",
      image: "",
      cardTitle: "",
      configuration: "base",
    });
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить товар
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить автомобиль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.main}>
            <div className={classes.divs}>
              <TextField
                value={newProduct.title}
                onChange={handleInput}
                name="title"
                id="standart-basic"
                label="Название Автомобиля"
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
                value={newProduct.class}
                onChange={handleInput}
                name="class"
                id="standart-basic"
                label="Класс"
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
                value={newProduct.cardTitle}
                onChange={handleInput}
                name="cardTitle"
                id="standart-basic"
                label="Название для карточки"
              />
            </div>
          </div>
          <div className={classes.buttonBlock}>
            <div>
              <button onClick={handleClick} className={classes.button}>
                Добавить товар
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
