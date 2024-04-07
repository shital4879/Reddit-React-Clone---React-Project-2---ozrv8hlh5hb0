import React, { useState,useEffect, useContext } from 'react'

import { Button, IconButton } from "@mui/material";
// import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import TrendingUpSharpIcon from "@mui/icons-material/TrendingUpSharp";
import {Mycontext} from "../components/App"
import Navbar from "../Component/Navbar/Navbar"
import {ThemeContext} from "../Component/Context/DarkTheme"
import NavDetail from '../Component/Navbar/NavDetail';



const Primium = () => {
  const {darkMode, setDarkMode,toggleDarkMode} = useContext(ThemeContext) 
  const navigate = useNavigate();

  return (
    <div className={darkMode?"dark":""}>
    <div className='bg-cyan-900 w-dvw h-dvh'>
     <NavDetail/>

    <div className='ml-52 mt-32'>

        <h1 className='text-5xl font-bold text-white'>reddit premium</h1>
        <p className='mt-7 text-lg font-bold text-white'>Help support Reddit and get VIP treatment and exclusive access.</p>
        <div className='mt-3 space-x-3'>
            <button className="border-white-700 border text-white w-[17rem]  rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-sm">$5.99/Month</button>
            <button className="border-orange-600 border bg-orange-600 text-white w-[17rem]  rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-sm">$49.99/Month
            <button  className="border-white-700 border bg-white text-orange-600 rounded-3xl font-semibold text-sm ml-2 pl-2 pr-2" > Save 30%</button>
            </button>
        </div>
    </div >
    </div>
    </div>
  )
}

export default Primium
