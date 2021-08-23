import "../../../App.css";
import { makeStyles } from "@material-ui/core";
import { Filter } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { clientContext } from "../../contexts/ClientContext";
import Card from "../Card/Card";
import Filtration from "../Filtration";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles({
  divs: {
    display: "flex",
    flexWrap: "wrap",
  },
  titleTwo: {
    textAlign: "center",
  },
});

const Products = () => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1, getPage());
  const { getProducts, paginationPages, products } = useContext(clientContext);
  function getPage() {
    const search = new URLSearchParams(history.location.pathname);
    return search.get("_page");
  }

  useEffect(() => {
    getProducts(history);
  }, []);
  // console.log(getProducts);

  const handlePage = (e, page) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?_limit=4&${search.toString()}`);
    setPage(page);
    getProducts(history);
  };
  return (
    <div>
      <h2 className={classes.titleTwo}>Все товары</h2>
      <Filtration />
      <div className={classes.divs}>
        {products ? (
          products.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <h2>Товаров нет в наличии</h2>
        )}
      </div>
      <Pagination
        count={paginationPages}
        page={page}
        onChange={handlePage}
        size="large"
        className="pagination"
      />
    </div>
  );
};

export default Products;
