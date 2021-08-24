import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { clientContext } from "../contexts/ClientContext";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 270,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
  },
}));
const FilterProducts = () => {
  const classes = useStyles();
  const { getProducts } = useContext(clientContext);
  const history = useHistory();

  function fetchProducts(params, value) {
    let search = new URLSearchParams(history.location.search);
    search.set(params, value);
    let url = `${history.location.pathname}?${search.toString()}`;
    history.push(url);
    getProducts(history);
  }

  function reset() {
    history.push("/products-page");
    getProducts(history);
  }

  return (
    <Grid item md={3}>
      <Paper className={classes.paper}>
        <div>
          <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom>
              Price
            </Typography>
            <Slider
              defaultValue={1000000}
              aria-labelledby="discrete-slider"
              step={1000000}
              marks
              min={2000000}
              max={30000000}
              onChange={(e) =>
                fetchProducts("price_lte", e.target.ariaValueNow)
              }
            />
          </div>
        </div>
        <div>
          {/* <Grid>
            <FormControl component="fieldset">
              <FormLabel component="legend">Бренды</FormLabel>
              <RadioGroup
                onChange={(e) => fetchProducts("brand", e.target.value)}
                aria-label="brand"
                name="brand1"
              >
                <FormControlLabel
                  value="Adidas"
                  control={<Radio />}
                  label="Adidas"
                />
                <FormControlLabel
                  value="Nike"
                  control={<Radio />}
                  label="Nike"
                />
                <FormControlLabel
                  value="Reebok"
                  control={<Radio />}
                  label="Reebok"
                />
                <FormControlLabel
                  value="Lacoste"
                  control={<Radio />}
                  label="Lacoste"
                />
                <FormControlLabel
                  value="100000"
                  control={<Radio />}
                  label="100000"
                />
                <FormControlLabel
                  value="60000"
                  control={<Radio />}
                  label="60000"
                />
              </RadioGroup>
            </FormControl>
          </Grid> */}
        </div>
      </Paper>
    </Grid>
  );
};

export default FilterProducts;
