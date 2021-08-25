import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import "../../../App.css";
import { clientContext } from "../../contexts/ClientContext";
import RemoveFavorite from "../../Favorite/RemoveFavorite";
import FavouriteProductCard from "../../ProductCard/FavouriteProductCard";
const useStyles = makeStyles((theme) => ({
  divs: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

export default function Favourite() {
  const classes = useStyles();
  const { favorites, removeFavoriteCarContext } = useContext(clientContext);
  const removeFavoriteCar = (car) => {
    removeFavoriteCarContext(car);
  };
  return (
    <>
      <div className={classes.divs}>
        {favorites.map((car) => (
          <FavouriteProductCard
            handleFavoritesClick={removeFavoriteCar}
            FavoriteComponent={RemoveFavorite}
            key={car.id}
            car={car}
          />
        ))}
      </div>
    </>
  );
}
