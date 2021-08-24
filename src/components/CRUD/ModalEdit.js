import { Button, Modal } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
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

export default function ModalEdit({ setChangeId }) {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { productToEdit, saveEditedProduct } = useContext(adminContext);
  const [editProduct, setEditProduct] = useState(productToEdit);
  useEffect(() => {
    setEditProduct(productToEdit);
  }, [productToEdit]);
  const handleInput = (e) => {
    let obj = {
      ...editProduct,
      [e.target.name]: e.target.value,
    };
    setEditProduct(obj);
  };
  const handleClick = () => {
    saveEditedProduct(editProduct);
    setChangeId(null);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Изменить товар
      </Button>
      {editProduct ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить товар</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={classes.main}>
              <div className={classes.divs}>
                <TextField
                  value={editProduct.title}
                  onChange={handleInput}
                  name="title"
                  id="standart-basic"
                  label="Название Автомобиля"
                />
                <TextField
                  value={editProduct.description}
                  onChange={handleInput}
                  name="description"
                  id="standart-basic"
                  label="Описание"
                />
                <TextField
                  value={editProduct.price}
                  onChange={handleInput}
                  name="price"
                  id="standart-basic"
                  label="Цена"
                />
                <TextField
                  value={editProduct.class}
                  onChange={handleInput}
                  name="class"
                  id="standart-basic"
                  label="Класс"
                />
                <TextField
                  value={editProduct.category}
                  onChange={handleInput}
                  name="category"
                  id="standart-basic"
                  label="Категория"
                />
                <TextField
                  value={editProduct.image}
                  onChange={handleInput}
                  name="image"
                  id="standart-basic"
                  label="Фото"
                />
                <TextField
                  value={editProduct.cardTitle}
                  onChange={handleInput}
                  name="cardTitle"
                  id="standart-basic"
                  label="Название для карточки"
                />
              </div>
            </div>
            <button onClick={() => handleClick()}>Save</button>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}
