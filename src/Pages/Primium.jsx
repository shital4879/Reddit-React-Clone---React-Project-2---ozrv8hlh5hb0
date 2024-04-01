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



const Primium = () => {
  const{showLogIn,setShowLogIn,darkMode,setDarkMode,toggleDarkMode} = useContext(Mycontext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showopt, setShowopt] = useState(false);
  const [showAppLink, setShowAppLink] = useState(false);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [fetchingData, setFetchingData] = useState();
  const [fetching, setFetching] = useState();
  const [showSignUp, setShowSignUp] = useState(false);
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showName, setShowName] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(true);
  const [error, setError] = useState({});
  const [validsign, setValidSign] = useState(true);
  const [errorsign, setErrorSign] = useState({});

  function hotelInputFocus() {
    setHotelInputPopUp(true);
  }
  function hotelInputBlur() {
    setHotelInputPopUp(false);
  }

  // --------------SEARCH API ---------------------------------------------------------------------------------------------
  const searchData = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name":"${search}"}`,
        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setFetchingData(result.data);
      // console.log("lo", result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchData();
  }, [search]);

  const signout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`${darkMode && "dark"}`}>
    <div className='bg-cyan-900 w-dvw h-dvh'>
     <Navbar/>

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
