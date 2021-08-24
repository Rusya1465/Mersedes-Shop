import React, { useContext } from "react";
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
  const classes = useStyles();
  const { getProductDetail } = useContext(clientContext);

  return (
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
          // height="140"
          image={product.image}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions className="shoping_box"></CardActions>
    </Card>
  );
}

// import Card from "react-bootstrap/Card";

// <Card style={{ width: "18rem" }}>
//   <Card.Img variant="top" src="holder.js/100px180" />
//   <Card.Body>
//     <Card.Title>Card Title</Card.Title>
//     <Card.Text>
//       Some quick example text to build on the card title and make up the bulk of
//       the card's content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card>;
