import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import TodoImg from "../assets/Todo.png";

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar style={{ justifyContent: "center", padding: "3rem" }}>
        <img
          src={TodoImg}
          alt="ToDo-logo"
          style={{ width: "300px", height: "auto" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
