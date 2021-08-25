import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { clientContext } from "../contexts/ClientContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "40px",
  },
  cartImage: {
    width: "250px",
  },
});

export default function ImgMediaCard({
  product,
  FavoriteComponent,
  handleFavoritesClick,
}) {
  const classes = useStyles();
  const { getProductDetail } = useContext(clientContext);

  return (
    <>
      <Card className={classes.root}>
        <Link to={`/product-detail/${product.id}`}>
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
        </Link>
        <CardActions
          className="shoping_box"
          style={{ cursor: "pointer" }}
          onClick={() => handleFavoritesClick(product)}
        >
          <FavoriteComponent />
        </CardActions>
      </Card>
    </>
  );
}
