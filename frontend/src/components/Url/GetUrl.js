import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Card.css";
import DeleteUrl from "./DeleteUrl";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:5000"; // "http://localhost:5000";

const userinfo = JSON.parse(localStorage.getItem("token"));

const GetUrl = () => {
  const [urls, setUrl] = useState();
  const history = useNavigate();

  const config = {
    headers: {
      // "Content-type": "application/json",
      Authorization: `Bearer ${userinfo.token}`,
    },
  };

  useEffect(() => {
    axios.get(baseUrl, config).then((res) => {
      setUrl(res.data);
      console.log(res.data);
    });
  }, []);

  const addHandler = () => {
    history("/add");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    history("/");
    window.location.reload(); //automatically refresh browser
  };

  return (
    <div>
      <Typography
        sx={{ textAlign: "center", fontSize: "30px", fontStyle: "bold" }}
      >
        {/* Welcome: {userinfo.name} */}
      </Typography>

      <Button
        sx={{
          mr: "auto",
          ml: "auto",
          display: "block",
          fontSize: "15px",
          mt: "50px",
        }}
        variant="contained"
        size="small"
        color="primary"
        onClick={addHandler}
      >
        AddUrl
      </Button>
      <Typography
        sx={{
          textAlign: "end",
          mr: "30px",
          fontSize: "25px",
        }}
      >
        {userinfo.name}
      </Typography>
      <Button
        sx={{
          mr: "20px",
          ml: "auto",
          display: "block",
          fontSize: "15px",
        }}
        variant="outlined"
        size="small"
        color="primary"
        onClick={logoutHandler}
      >
        LogOut
      </Button>
      {urls &&
        urls.map((url, i) => (
          <ul key={i}>
            {console.log(url)}
            <DeleteUrl data={url} />
          </ul>
        ))}
    </div>
  );
};

export default GetUrl;
