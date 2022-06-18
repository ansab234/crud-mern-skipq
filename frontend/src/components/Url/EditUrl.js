import { Box, Button, FormLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const baseUrl = "http://localhost:5000"; // "http://localhost:5000";

const userinfo = JSON.parse(localStorage.getItem("token"));

const Edit = () => {
  const [url, setUrl] = useState("");

  const id = useParams().id;
  const history = useNavigate();
  const [open, setOpen] = useState(false);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userinfo.token}`,
    },
  };

  useEffect(() => {
    axios.get(`${baseUrl}/${id}`, config).then((res) => res.url);
  }, [id]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const sendRequest = async () => {
    await axios
      .put(
        `${baseUrl}/update/${id}`,
        {
          url: String(url),
        },
        config
      )
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    setOpen(true);
    e.preventDefault();
    sendRequest().then(() => history("/urls"));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
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
          marginTop={10}
        >
          <FormLabel>Url</FormLabel>
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            fullWidth
            required
            variant="outlined"
            name="name"
          />

          <Button variant="contained" type="submit">
            Update Url
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Updated Successfully!
            </Alert>
          </Snackbar>
        </Box>
      </form>
    </div>
  );
};

export default Edit;
