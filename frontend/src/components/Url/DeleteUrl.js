import React from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import "../../Card.css";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000/delete/" // "http://localhost:5000/delete/"
const userinfo = JSON.parse(localStorage.getItem("token"));

const DeleteUrl = (props) => {
  const { _id, url } = props.data;
  const history = useNavigate();

  const config = {
    headers: {
      // "Content-type": "application/json",
      Authorization: `Bearer ${userinfo.token}`,
    },
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${baseUrl}${_id}`,config)
      .then((res) => res.data)
      .then(() => history("/urls"));
      window.location.reload(); //automatically refresh browser

  };

 
  return (
    <Card className="card">
      <Typography sx={{ ml: "10px" }}>{url}
          <span>
        <Button
          LinkComponent={Link}
          to={`/${_id}`}

          sx={{ ml: "500px" }}
          variant="contained"
          size="small"
          color="primary"
        >
          Edit
        </Button>
        <Button
          sx={{ ml: "20px" }}
          variant="contained"
          size="small"
          onClick={deleteHandler}
          color="error"
        >
          Delete
        </Button>
        </span>
        </Typography>
    </Card>
  );
};

export default DeleteUrl;
