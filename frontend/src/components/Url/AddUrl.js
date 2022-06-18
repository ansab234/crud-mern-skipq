import { Button, FormLabel, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const baseUrl = "http://localhost:5000/create"; 

const userinfo = JSON.parse(localStorage.getItem("token"));

const AddUrl = () => {
  const history = useNavigate();
  const [open, setOpen] = useState();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [url, setInputs] = useState("");

  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${userinfo.token}`,
    },
  };

  const sendRequest = async () => {
    if (url){
      console.log("Error:already have url")
    }
    await axios
      .post(
        `${baseUrl}`,
        {
          url: String(url),
        },
        config
      )
      .then((res) => res.data);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      setOpen(true);
    } else {
      e.preventDefault();
      // console.log(inputs);
      sendRequest().then(() => history("/urls"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={8}
      >
        <FormLabel>Add Url</FormLabel>
        <TextField
          value={url}
          onChange={(e) => setInputs(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Please Enter URL!
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

export default AddUrl;
