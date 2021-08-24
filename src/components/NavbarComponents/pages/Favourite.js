import React, { useContext } from "react";
import "../../../App.css";
import { clientContext } from "../../contexts/ClientContext";
import RemoveFavorite from "../../Favorite/RemoveFavorite";
import FavouriteProductCard from "../../ProductCard/FavouriteProductCard";

export default function Favourite() {
  const { favorites, removeFavoriteCarContext } = useContext(clientContext);
  const removeFavoriteCar = (car) => {
    removeFavoriteCarContext();
  };
  return (
    <>
      {favorites.map((car) => {
        <FavouriteProductCard
          handleFavoritesClick={removeFavoriteCar}
          FavoriteComponent={RemoveFavorite}
          key={car.id}
          car={car}
        />;
      })}
    </>
  );
}
