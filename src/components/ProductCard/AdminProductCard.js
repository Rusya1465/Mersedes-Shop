import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { clientContext } from "../contexts/ClientContext";
import { ShoppingCart } from "@material-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import { adminContext } from "../contexts/AdminContext";
import ModalEdit from "../CRUD/ModalEdit";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "40px",
  },
  cartImage: {
    width: "250px",
  },
});

export default function ImgMediaCard({ product }) {
  const { deleteProduct, getProductToEdit, productToEdit } =
    useContext(adminContext);
  const classes = useStyles();
  const { getProductDetail } = useContext(clientContext);
  const [changeId, setChangeId] = useState(null);
  const handleEditChange = (id) => {
    getProductToEdit(id);
    setChangeId(id);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.cardTitle}
            </Typography>
            <Typography size="small" color="textSecondary">
              от {product.price} Сом
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.cartImage}
            component="img"
            alt="Contemplative Reptile"
            image={product.image}
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardActions className="shoping_box">
          {changeId === product.id ? (
            <ModalEdit setChangeId={setChangeId} />
          ) : null}
          <button onClick={() => handleEditChange(product.id)}>Изменить</button>
          <button onClick={() => deleteProduct(product.id)}>Удалить</button>
        </CardActions>
      </Card>
    </>
  );
}
