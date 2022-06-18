import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const BaseUrl = "http://localhost:5000/"; // "http://localhost:5000/";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const history = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   if (user) history("/urls");
  // }, [history]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setOpen(true);
      return
    }
    console.log(name, email, password);

    // const userinfo = JSON.parse(localStorage.getItem("token"));

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          // "Authorization": `Bearer ${userinfo.token}`,

        },
      };
      const { data } = await axios.post(
        `${BaseUrl}register`,
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);

      localStorage.setItem("token", JSON.stringify(data));
      history("/urls");
      window.location.reload(); //automatically refresh browser
    } catch (error) {
      console.log("error:" + error);
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={submitHandler}>
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="standard"
            fullWidth
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="standard"
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="standard"
            fullWidth
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          <br />
          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onChange={(e) => e.preventDefault()}
            // onClick={submitHandler}
          >
            Sign up
          </Button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            There is an Error!
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default Signup;
