import "../../../App.css";
import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { clientContext } from "../../contexts/ClientContext";
import ProductCard from "../../ProductCard/ProductCard";
import { Pagination } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";
import AdminProductCard from "../../ProductCard/AdminProductCard";
import { alpha, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import FilterProducts from "../../FilterProducts/FilterProducts";
import AddFavorite from "../../Favorite/AddFavorite";

const useStyles = makeStyles((theme) => ({
  divs: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  titleTwo: {
    textAlign: "center",
  },
  pagination_divs: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Products = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState(getSearchVal() || "");
  const [page, setPage] = useState(1, getPage());
  const { getProducts, paginationPages, products, addFavoriteCarContext } =
    useContext(clientContext);
  function getPage() {
    const search = new URLSearchParams(history.location.pathname);
    return search.get("_page");
  }
  const [checkAdmin, setCheckAdmin] = useState(false);
  useEffect(() => {
    getProducts(history);
    currentUser && currentUser.email === "rustam@gmail.com"
      ? setCheckAdmin(true)
      : setCheckAdmin(false);
  }, []);
  const handleValue = (e) => {
    const search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    setSearchVal(e.target.value);
    getProducts(history);
  };
  let search = new URLSearchParams(history.location.search);
  const [searchWord, setSearchWord] = useState(search.get("q") || "");
  function handleSearchInput(params, value) {
    setSearchWord(value);
    search.set(params, value);
    search.set("_page", 1);
    let url = `${history.location.pathname}?${search.toString()}`;
  }
  function getSearchVal() {
    const search = new URLSearchParams(history.location.search);

    return search.get("q");
  }
  useEffect(() => {
    getProducts(history);
  }, [searchWord]);

  const handlePage = (e, page) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?_limit=4&${search.toString()}`);
    setPage(page);
    getProducts(history);
  };

  const addFavoriteCar = (car) => {
    addFavoriteCarContext(car);
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => handleSearchInput("q", e.target.value)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          name="searchValue"
          inputProps={{ "aria-label": "search" }}
          value={searchVal}
          onChange={handleValue}
        />
      </div>
      <div>
        <FilterProducts />
      </div>
      <div className={classes.divs}>
        {checkAdmin ? (
          products ? (
            products.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))
          ) : (
            <h2>Товаров нет в наличии</h2>
          )
        ) : products ? (
          products.map((product) => (
            <ProductCard
              handleFavoritesClick={addFavoriteCar}
              FavoriteComponent={AddFavorite}
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <h2>Товаров нет в наличии</h2>
        )}
      </div>
      <div className={classes.pagination_divs}>
        <Pagination
          count={paginationPages}
          page={page}
          onChange={handlePage}
          size="large"
          className="pagination"
        />
      </div>
    </div>
  );
};

export default Products;
