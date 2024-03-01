import React from "react";
import "./navbar.css";
import { Button,IconButton } from "@mui/material";
// import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Navbar = () => {
  return (
    <div>
      <div className="Navbar">
        <div className="nav-1">
          <img src="https://www.google.com/search?q=reddit+app+icon+png+for+react&tbm=isch&ved=2ahUKEwidnsWendKEAxWlq2MGHXQkC10Q2-cCegQIABAA&oq=reddit+app+icon+png+for+react&gs_lp=EgNpbWciHXJlZGRpdCBhcHAgaWNvbiBwbmcgZm9yIHJlYWN0SPkeUIADWPkYcAB4AJABAJgBwQGgAYMNqgEEMC4xMbgBA8gBAPgBAYoCC2d3cy13aXotaW1nwgIKEAAYgAQYigUYQ8ICBBAAGB6IBgE&sclient=img&ei=wVnhZd25IKXXjuMP9Mis6AU&bih=639&biw=1396&rlz=1C1FKPE_enIN980IN980#imgrc=b4xTYX1BV1oX9M" />
          <h2 className="logoName">reddit</h2>
        </div>
        <div className="nav-2">
        <SearchIcon/>
        <input type="search" name search className="nav-searchbar" placeholder="Search Reddit"/>
        </div>
        <div className="nav-3">
          <button variant="contained" className="nav-LogBtn">Log In</button>
          <MoreHorizIcon/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
