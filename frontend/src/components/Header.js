import React, { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState(3);
  
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#221" }}>
      <Toolbar>
        <NavLink to="/" style={{ color: "white" }}></NavLink>
        <Tabs
          sx={{ ml: "auto", mr: "100px" }}
          indicatorColor="primary"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          <Tab LinkComponent={NavLink} to="/urls" label="Urls" />
          <Tab LinkComponent={NavLink} to="add" label="Add Url" />
          <Tab LinkComponent={NavLink} to="update" label="Update Url" />
          <Tab LinkComponent={NavLink} to="/" label="SignIn" />
          <Button onClick={logoutHandler}>LogOut</Button>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
