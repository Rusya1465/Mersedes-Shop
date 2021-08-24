import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { clientContext } from "../contexts/ClientContext";
import RemoveFavorite from "../Favorite/RemoveFavorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "40px",
  },
  cartImage: {
    width: "250px",
  },
});

export default function ImgMediaCard({ car, handleFavoritesClick }) {
  const classes = useStyles();
  const { getProductDetail } = useContext(clientContext);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {car.cardTitle}
            </Typography>
            <Typography size="small" color="textSecondary">
              от {car.price} Сом
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.cartImage}
            component="img"
            alt="Contemplative Reptile"
            image={car.image}
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardActions
          className="shoping_box"
          onClick={() => handleFavoritesClick(car)}
        >
          <RemoveFavorite />
        </CardActions>
      </Card>
    </>
  );
}
