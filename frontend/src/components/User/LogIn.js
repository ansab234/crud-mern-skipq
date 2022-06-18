import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";


const BaseUrl = "http://localhost:5000/"; // "http://localhost:5000/";

const Login = ({ handleChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const history = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   if (user) history("/urls");
  // }, [history]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userinfo = JSON.parse(localStorage.getItem("token"));

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          // "Authorization": `Bearer ${userinfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BaseUrl}login`,
        { email, password },
        config
      );
      console.log(JSON.stringify(data));

      localStorage.setItem("token", JSON.stringify(data));

      history("/urls");
      window.location.reload(); //automatically refresh browser
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={submitHandler}>
          <TextField
            variant="standard"
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link>Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              There is an Error!
            </Alert>
          </Snackbar>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
