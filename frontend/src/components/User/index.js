import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Signup from "./SignUp";
import Login from "./LogIn";
import { useNavigate } from "react-router-dom";

const SignInOutContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   if (!user) history("/");
  // }, [history]);

  const paperStyle = { width: 340, margin: "20px auto" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        sx={{ ml: "75px" }}
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Sign In" />

        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Paper>
  );
};

export default SignInOutContainer;
