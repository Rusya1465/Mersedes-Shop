import { makeStyles, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { clientContext } from "../contexts/ClientContext";
import Comments from "./Comments";
const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  divs: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
  },
  buttonBlock: {
    marginBottom: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "auto",
    padding: "10px",
    background: "black",
    color: "white",
    borderRadius: "10px",
  },
});

const HomeComments = () => {
  const { createComment, allComments } = useContext(clientContext);
  const { currentUser } = useAuth();
  const [checkUser, setCheckUser] = useState(false);
  useEffect(() => {
    currentUser ? setCheckUser(true) : setCheckUser(false);
  }, []);``
  const classes = useStyles();

  const [newComment, setNewComment] = useState({
    user: checkUser ? currentUser.email : "Anonym",
    comment: "",
  });
  function handleInput(e) {
    let obj = {
      ...newComment,
      [e.target.name]: e.target.value,
    };
    setNewComment(obj);
  }
  function handleClick() {
    createComment(newComment);
  }
  return (
    <div>
      <div className={classes.main}>
        <div className={classes.divs}>
          <h2>Комментарии</h2>
          {/* {allComments.map((comment) => (
            <Comments comment={comment} />
          ))} */}

          <TextField
            value={newComment.comment}
            onChange={handleInput}
            name="comment"
            id="standart-basic"
            label="Комментарий"
          />
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <div>
          <button onClick={handleClick} className={classes.button}>
            Комментировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeComments;
