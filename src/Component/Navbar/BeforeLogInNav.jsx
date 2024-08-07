import React, {
  Children,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import SignOut from "../SignIn/SignOut";
import PostData from "./PostData";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { IoCloseSharp } from "react-icons/io5";
import { Mycontext } from "../../components/App";
import { contextApi } from "../Context/ApiContext";
import { ThemeContext } from "../Context/DarkTheme";

const BeforeLogInNav = () => {
  const { showLogIn, setShowLogIn } = useContext(Mycontext);
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { search, setSearch, fetchingData, setFetchingData, postData } =
    useContext(contextApi);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showopt, setShowopt] = useState(false);
  const [showAppLink, setShowAppLink] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const searchinput = useRef();
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [signUpPage1, setSignUpPage1] = useState(false);
  const [signUpPage2, setSignUpPage2] = useState(false);
  const [showHam, setShowHam] = useState(false);
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
  const refsearch = useRef();
  const ref = useRef();
  function hotelInputFocus() {
    setHotelInputPopUp(true);
  }
  function hotelInputBlur() {
    setHotelInputPopUp(false);
  }

  // -------------------------------------------------------------------------------------------------------------

  // ----------------SIGN UP API ----------------------------------------------------------------------------
  const SignUpApi = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/user/signup`,
        {
          method: "POST",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signUpData.name,
            email: signUpData.email,
            password: signUpData.password,
            appType: "reddit",
          }),
        }
      );
      const result = await responce.json();
      console.log(result);
      if (result.status === "success") {
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            id: result.data.user_id,
            name: result.data.user.name,
            email: result.data.user.email,
          })
        );
        navigateDetail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (e) => {
    // e.preventDefault();
    let isValid = true;
    let validationError = {};
    if (signUpData.email === "" || signUpData.email === null) {
      isValid = false;
      validationError.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      isValid = false;
      validationError.email = "Invalid EmailId!";
    } else {
      setSignUpPage2(!signUpPage2);
    }
  };
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationError = {};
    if (signUpData.email === "" || signUpData.email === null) {
      isValid = false;
      validationError.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      isValid = false;
      validationError.email = "Invalid EmailId!";
    }
    if (signUpData.name === "" || signUpData.name === null) {
      isValid = false;
      validationError.name = "name is required!";
    }
    if (signUpData.password === "" || signUpData.password === null) {
      isValid = false;
      validationError.password = "password is required!";
    } else if (signUpData.password.length < 4) {
      isValid = false;
      validationError.password = "password should be atleast 4 character!";
    }
    setValidSign(isValid);
    setErrorSign(validationError);
    if (isValid) {
      SignUpApi();
    }
  };

  // ----------------------------------------------------------------------------------------------------------------------------

  // ------------------------------SIGN IN API---------------------------------------------------------------------------------
  const SignInData = async () => {
    console.log(registerData);
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/user/login`,
        {
          method: "POST",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
            appType: "reddit",
          }),
        }
      );
      const result = await responce.json();
      console.log(result);
      if (result.status === "success") {
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            id: result.data.user_id,
            name: result.data.user.name,
            email: result.data.user.email,
          })
        );
        localStorage.setItem("userName", result.data.user.name);
        navigateDetail();
      }
      if (result.status === "fail") {
        // console.log(result.message);
        setValid(false);
        setError((prev) => {
          return { ...prev, correction: result.message };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitSignIn = (e) => {
    console.log("Login Method calling.....");
    e.preventDefault();
    let isValid = true;
    let validationError = {};
    if (registerData.email === "" || registerData.email === null) {
      isValid = false;
      validationError.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      isValid = false;
      validationError.email = "Invalid EmailId!";
    }
    if (registerData.password === "" || registerData.password === null) {
      isValid = false;
      validationError.password = "password is required!";
    } else if (registerData.password.length < 4) {
      isValid = false;
      validationError.password = "password should be atleast 4 character!";
    }
    setValid(isValid);
    setError(validationError);
    if (isValid) {
      SignInData();
    }
  };
  // ----------------------------------------------------------------------------------------------------------------------

  const signout = () => {
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const navigateDetail = () => {
    navigate(`/Detail`);
  };

useEffect(()=>{
  function handleclickoutside(e){
    if(searchinput.current && !searchinput.current.contains(e.target) && refsearch.current && !refsearch.current.contains(e.target)){
       setOpenSearch(false);
       
    }
  }
  document.body.addEventListener("click",handleclickoutside)
  return ()=>{
    document.body.removeEventListener("click",handleclickoutside)}
})


  return (
    <div className="fixed bg-zinc-100 z-50 sm:-mt-16 -mt-8 lg:mt-0 w-dvw ">
      <div className=" flex justify-between pl-12 pt-2 pr-12 pb-10 relative h-14 border-b border-gray-200 xl:-ml-20">
        <div
          className="md:-ml-8 md:visible visible sm:visible lg:invisible xl:invisible 2xl:invisible mr-4 mt-1 lg:mr-10 -ml-10"
          onClick={() => setShowHam(!showHam)}
        >
          <MenuSharpIcon />
        </div>
        {showHam && (
          <div style={{scrollbarWidth:"thin",scrollbarColor:"transparent transparent",userSelect:"none"}} className="overflow-y-scroll overflow-x-hidden md:flex md:justify-between h-16 absolute top-14 md:-ml-12 z-10 shadow-xl md:pl-2 bg-white -ml-12 ">
            {!sessionStorage.getItem("token") && (
              <div >
                <ul>
                  <li className="bg-gray-400 mb-2 ">
                    <NavLink to="/" className="p-2 pt-4">
                      <HomeIcon /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/popular" className="p-2">
                      <OutboundOutlinedIcon /> Popular
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <Tippy content="Go to Reddit Home" className="mt-6 -ml-24 text-[10px]">
          <NavLink to="/">
            <div className="flex xl:mr-44 xl:-ml-8 lg:mr-36 lg:-ml-14 2xl:-ml-16">
              <img src="/logo.webp" alt="" className="h-9 w-9 mr-2 xl:ml-20" />
              <h2 className="text-3xl text-orange-500 font-bold sm:invisible md:visible lg:visible xl:visible invisible ">
                reddit
              </h2>
            </div>
          </NavLink>
        </Tippy>
        <div className="bg-gray-200 h-11 w-36 -ml-10 2xl:w-[45rem] 2xl:ml-0 sm:w-[22rem] lg:w-[34rem] xl:w-[40rem] xl:mr-24  float-start space-x-2 pl-3 rounded-3xl pt-2  md:w-[25rem] md:ml-20 md:-mr-36  lg:-ml-20 lg:mr-4 ">
          <div className="flex items-center">
            <SearchIcon className="dark:text-slate-400" />
            <input
              type="search"
              name
              search
              placeholder="Search Reddit"
              className="cursor-pointer bg-gray-200 text-[14px] 2xl:text-lg md:text-lg sm:text-lg lg:text-lg xl:text-lg border-none outline-none font-thin ml-2 w-24 rounded-3xl sm:w-[20rem] md:w-[22rem] lg:w-[30rem] xl:w-[34rem] 2xl:w-[45rem] "
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={(e) => {
                // handleSearch(),
                setOpenSearch(!openSearch);
              }}
              ref={searchinput}
              onBlur={hotelInputBlur}
              onFocus={hotelInputFocus}
            />
          </div>

          {openSearch && (
            <div
              ref={refsearch}
              className="w-[100%] mt-4  p-4 shadow-2xl z-50 overflow-auto h-[30rem] bg-white rounded-lg"
            >
              <p className="mb-2 font-normal text-sm">
                <TrendingUpSharpIcon /> TRENDING TODAY
              </p>
              {fetchingData &&
                fetchingData
                  .filter((item) => {
                    const lower = item.author.name.toLowerCase();

                    return lower.startsWith(search);
                  })
                  .map((item) => (
                    <div
                      onClick={(e) => {
                        // setSearch(item.author.name), setOpenSearch(!openSearch);
                        setShowLogIn(!showLogIn);
                      }}
                      style={{}}
                      className="cursor-pointer"
                    >
                      <div className="cursor-pointer text-base font-semibold pt-2">
                        {item.author.name}
                      </div>
                      <div className=" flex justify-between text-sm text-gray-600 space-x-7 mr-2 mt-1">
                        <div>{item.content}</div>

                        {item.images == "" ? (
                          <p className="ml-8"></p>
                        ) : (
                          <img
                            src={item.images}
                            alt=""
                            className="rounded-xl h-20 w-20"
                          />
                        )}
                      </div>
                      <div className="flex mt-3 pb-4 ">
                        {item.author.profileImage === null ? (
                          <p className="font-bold pl-2 pr-2 h-6 mr-2  bg-gray-300  rounded-xl dark:bg-gray-500 dark:text-white">
                            {item.author.name.charAt(0).toUpperCase()}
                          </p>
                        ) : (
                          <img
                            src={item.author.profileImage}
                            alt=""
                            className="h-6 w-6 rounded-3xl"
                          />
                        )}
                        <p className="flex text-sm text-gray-600 space-x-6 ml-2">
                          {item.author.name}
                        </p>
                      </div>
                      <hr />
                    </div>
                  ))}
            </div>
          )}
        </div>
        {/* <button onClick={toggleDarkMode}>dark</button> */}
        {/* -----------------------------BEFORE LOGIN --------------------------------------------------------------------------------- */}
        {!sessionStorage.getItem("token") && (
          <div className="flex space-x-4 2xl:ml-32 xl:-ml-10 lg:ml-7  ">
            <div>
              <Tippy content="Get app" className="text-[10px]">
                <div
                  className="flex items-center bg-gray-200 pl-3 pr-2 h-10 w-28  rounded-3xl pt-2 pb-2 md:invisible sm:invisible lg:visible xl:visible invisible"
                  onClick={() => {
                    setShowAppLink(!showAppLink);
                  }}
                >
                  <QrCodeScannerIcon className="h-4 w-4" />
                  <button className="text-sm font-semibold lg:text-sm xl:text-base xl:w-20">
                    Get app
                  </button>
                </div>
              </Tippy>
            </div>
            <Tippy content="Log in to Reddit" className="text-[10px]">
              <div
                onClick={() => setShowLogIn(!showLogIn)}
                className="hover:bg-orange-800 flex items-center  xl:w-24 lg:w-20 text-center bg-orange-600 h-10 2xl:w-20 justify-center rounded-3xl  pt-2 pb-2 md:invisible sm:invisible lg:visible xl:visible invisible"
              >
                <button
                  className="xl:text-base  pt-2 pb-2 font-semibold text-white text-sm md:text-xs md:invisible sm:invisible lg:visible xl:visible invisible"
                  onClick={() => setShowLogIn(!showLogIn)}
                >
                  Log In
                </button>
              </div>
            </Tippy>
            <div>
              <Tippy content="Open settings menu" className="text-[10px]">
                <div
                  className="pt-1 absolute cursor-pointer  sm:-ml-3 -ml-36 2xl:-ml-0   xl:ml-4 sm:mr-48  hover:bg-gray-200 p-1 hover:rounded-2xl"
                  onClick={() => setShowopt(!showopt)}
                >
                  <MoreHorizIcon />
                </div>
              </Tippy>
            </div>
            {showopt && (
              <span
                // className="absolute"
                className=" absolute top-6 m-6 sm:right-3 space-y-2 shadow-xl p-4 rounded-md bg-white cursor-pointer"
              >
                <h2
                  className="text-sm"
                  onClick={() => {
                    setShowLogIn(!showLogIn), setShowopt(false);
                  }}
                >
                  <LoginIcon className="mr-2 text-sm" /> Log In / Sing Up
                </h2>
                <h2
                  className="text-sm "
                  onClick={() => {
                    setShowAppLink(!showAppLink), setShowopt(false);
                  }}
                >
                  <QrCodeScannerIcon className="mr-2" /> Get App
                </h2>
              </span>
            )}
          </div>
        )}

        {/* ---------------------------------AFTER LOGIN ------------------------------------------------------------------------ */}
        {sessionStorage.getItem("token") && (
          <div>
            <div
              onClick={() => setShowOptions(!showOptions)}
              className="flex justify-between items-center border-solid h-10 border-gray-400 border rounded-md w-32 pl-2 pr-2"
            >
              <img
                className="h-6 w-6 rounded-lg"
                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                alt=""
              />
              <KeyboardArrowDownOutlinedIcon className="dark:text-white" />
            </div>
            {showOptions && (
              <div className="bg-white dark:bg-gray-800 absolute w-56 pl-4 pt-3 top-2/4 mt-7 ml-10 right-14 space-y-2 shadow-md p-6 rounded-lg">
                <div>
                  <div className="flex space-x-2 text-gray-400 text-lg">
                    <AccountCircleSharpIcon className="mr-2 mt-1 h-12 w-12" />
                    My Stuff
                  </div>
                  <div className="ml-10 mt-3 text-lg dark:text-white">
                    Online status
                    <input type="checkbox" id="check" className="ml-2" />
                    <label
                      for="check"
                      class="h-20 w-20 z-96 relative cursor-pointer bg-gray-500 rounded-2xl"
                    ></label>
                  </div>
                  <div className="ml-10 mt-3 text-lg dark:text-white">
                    Profile
                  </div>
                </div>
                <hr />
                <div>
                  <div className="flex space-x-2 text-gray-400 text-lg">
                    <VisibilitySharpIcon className="mr-2 mt-1 h-12 w-12" />
                    View Options
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className="ml-10 mt-3 text-lg w-18 dark:text-white"
                  >
                    Dark Mode
                    {/* <input type="checkbox" /> */}
                  </button>
                  <div
                    className="flex ml-10 mt-3 text-lg"
                    onClick={() => signout()}
                  >
                    <LogoutSharpIcon className="mr-2 mt-1 h-12 w-12 dark:text-white" />
                    <button className="dark:text-white">Sign Out</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------- */}
      {/* 
      {/* -------------------- OPEN APP LINK ----------------------------------------------------------------------------- */}
      {showAppLink && (
        <div className="bg-gray-700 bg-opacity-80 h-full m-0 fixed top-0 left-0 w-dvw flex justify-center items-center z-10">
          <div className="bg-white relative w-[30rem] h-[85%] rounded-md">
            <div className="flex m-5 justify-between">
              <h1 className="text-3xl font-bold">Get the Reddit app</h1>
              <button
                className="text-3xl p-2 rounded-md bg-gray-50"
                onClick={() => {
                  setShowAppLink(!showAppLink);
                }}
              >
                {" "}
                <IoCloseSharp />{" "}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="flex items-center w-[32%] justify-center  text-center font-medium">
                Scan this QR code to download the app now
              </p>
            </div>
            <div className="flex items-center justify-center text-center font-medium">
              <img
                className="h-[14rem] w-[14rem] flex items-center justify-center mt-2 text-center font-medium"
                src="https://reddit-ten-mocha.vercel.app/QRCode.png"
                alt=""
              />
            </div>
            <p className="flex items-center justify-center mt-4 text-center font-medium">
              Or check it out in the app stores
            </p>
            <div className="flex items-center justify-center mt-2 text-center font-medium space-x-2">
              <img
                className="w-[7rem]"
                src="https://www.redditstatic.com/shreddit/assets/google-play.svg
"
                alt=""
              />
              <img
                className="w-[6rem]"
                src="https://www.redditstatic.com/shreddit/assets/app-store.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------OPEN LOG IN FUN [POPUP]------------------------------------------------------------------- */}
      {showLogIn && (
        <div>
          {/* {postData &&
            postData.map((item) => ( */}
              <div>
                <div className="bg-gray-700 bg-opacity-80 h-full m-0 fixed top-0 left-0 w-dvw flex justify-center items-center z-10">
                  <div className="bg-white relative w-[30rem] h-[90%] rounded-md z-50 ">
                    <div className="flex justify-end mt-4 mr-4">
                      <button
                        className="text-2xl p-2 rounded-md bg-gray-50 flex"
                        onClick={() => {
                          setShowLogIn(!showLogIn);
                        }}
                      >
                        {" "}
                        <IoCloseSharp />{" "}
                      </button>
                    </div>
                    {!signUpPage1 && (
                      <form onSubmit={handleSubmitSignIn}>
                        <div>
                          <div className="ml-16  mr-16">
                            <h1 className=" text-2xl">Log in</h1>
                            <p className=" text-sm pt-1">
                              By continuing, you agree to our User Agreement and
                              acknowledge that you understand the Privacy
                              Policy.
                            </p>
                          </div>
                          <div>
                            <div className="pl-2 pr-1 ml-16 mt-8 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                              <img
                                src="https://styles.redditmedia.com/t5_3is08/styles/communityIcon_i0bub98epp4a1.png"
                                alt=""
                                className="w-4 h-4 rounded-xl"
                              />
                              <p className="text-sm text-red-600">
                                Continue with Google (Feature coming soon)
                              </p>
                              <img
                                src="/GLogo.png"
                                alt=""
                                className="w-4 h-4 rounded-xl"
                              />
                            </div>
                            <div className="pl-2 pr-7 ml-16 mt-4 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                              <img
                                className="w-5 h-5 rounded-xl"
                                src="/applelogo.png"
                                alt=""
                              />
                              <p className="text-sm text-red-600">
                                Continue with Apple (Feature Coming soon)
                              </p>
                            </div>

                            <div>
                              <div className="relative mt-10 ml-16 w-[21rem] h-[3rem]  rounded-md flex items-center border-solid border-gray-500 border-2">
                                <input
                                  type="text"
                                  placeholder="email"
                                  className="ml-4 text-xl outline-none border-none"
                                  value={registerData.email}
                                  onChange={(e) => {
                                    setRegisterData({
                                      ...registerData,
                                      email: e.target.value,
                                    });

                                    setError((prev) => {
                                      return { ...prev, email: "" };
                                    });
                                  }}
                                />
                                {valid ? (
                                  <></>
                                ) : (
                                  <span className="absolute top-11 text-red-600 text-sm">
                                    {error.email}
                                  </span>
                                )}
                              </div>
                              <div className="mt-10 ml-16 w-[21rem] h-[3rem] flex items-center rounded-md border-solid border-gray-500 border-2">
                                <input
                                  type="password"
                                  placeholder="password"
                                  className="ml-4 text-xl outline-none border-none"
                                  value={registerData.password}
                                  onChange={(e) => {
                                    setRegisterData({
                                      ...registerData,
                                      password: e.target.value,
                                    });
                                    setError((prev) => {
                                      return { ...prev, password: "" };
                                    });
                                  }}
                                />
                                {valid ? (
                                  <></>
                                ) : (
                                  <span className="absolute mt-16 text-red-600 text-sm">
                                    {error.password}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs ml-16 mt-3">
                            New to Reddit ?{" "}
                            <button
                              className="cursor-pointer text-blue-800 font-semibold"
                              onClick={() => setSignUpPage1(!signUpPage1)}
                            >
                              Sign Up.
                            </button>
                          </p>

                          <button
                            type="submit"
                            className="mt-14 pt-1  text-white cursor-pointer pb-8 text-xl bg-orange-600 h-[40px] rounded-2xl w-[21rem] ml-16 font-bold py-2 px-4 transition-all duration-300"
                            // onClick={() => navigateDetail(item._id)}
                            // disabled={registerData.email === "" && registerData.email === null}
                          >
                            Log In
                          </button>

                          {valid ? (
                            <></>
                          ) : (
                            <p className="absolute mt-4 ml-36 text-red-600 text-sm">
                              {error.correction}
                            </p>
                          )}
                        </div>
                      </form>
                    )}
                    {signUpPage1 && (
                      <div>
                        <div className="ml-16 mt-2 mr-16">
                          <h1 className=" text-2xl">Log in</h1>
                          <p className=" text-sm pt-1">
                            By continuing, you agree to our User Agreement and
                            acknowledge that you understand the Privacy Policy.
                          </p>
                        </div>
                        <div>
                          <div className="pl-2 pr-1 ml-16 mt-8 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                            <img
                              src="https://styles.redditmedia.com/t5_3is08/styles/communityIcon_i0bub98epp4a1.png"
                              alt=""
                              className="w-4 h-4 rounded-xl"
                            />
                            <p className="text-sm text-red-600">
                              Continue with Google (Feature coming soon)
                            </p>
                            <img
                              src="/GLogo.png"
                              alt=""
                              className="w-4 h-4 rounded-xl"
                            />
                          </div>
                          <div className="pl-2 pr-7 ml-16 mt-4 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                            <img
                              className="w-5 h-5 rounded-xl"
                              src="/applelogo.png"
                              alt=""
                            />
                            <p className="text-sm text-red-600">
                              Continue with Apple (Feature Coming soon)
                            </p>
                          </div>
                          <div>
                            <form onSubmit={handleSubmitSignUp}>
                              {!signUpPage2 && (
                                <div>
                                  <div className="relative mt-10 ml-16 w-[21rem] h-[3rem]  rounded-md flex items-center border-solid border-gray-500 border-2">
                                    <input
                                      type="email"
                                      className="ml-4 text-xl outline-none border-none"
                                      placeholder="email"
                                      value={signUpData.email}
                                      onChange={(e) => {
                                        setSignUpData({
                                          ...signUpData,
                                          email: e.target.value,
                                        });
                                        setErrorSign((prev) => {
                                          return { ...prev, email: "" };
                                        });
                                      }}
                                      // required
                                    />
                                    {validsign ? (
                                      <></>
                                    ) : (
                                      <span className="absolute top-11 text-red-600 text-sm">
                                        {errorsign.email}
                                      </span>
                                    )}
                                  </div>
                                  <br />
                                  <p className="text-xs ml-16 -mt-3">
                                    Already a Redditor ?{" "}
                                    <button
                                      className="cursor-pointer text-blue-700 font-semibold"
                                      onClick={() =>
                                        setSignUpPage1(!signUpPage1)
                                      }
                                    >
                                      Sign In.
                                    </button>
                                  </p>

                                  <button
                                    type="submit"
                                    className="mt-12 pt-1 text-white cursor-pointer pb-8 text-xl bg-orange-600 h-[40px] rounded-2xl w-[21rem] ml-16 font-bold py-2 px-4 transition-all duration-300"
                                    onClick={() =>
                                      // setSignUpPage2(!signUpPage2)
                                      handleEmail()
                                    }
                                  >
                                    Continue
                                  </button>
                                </div>
                              )}
                              {signUpPage2 && (
                                <div>
                                  <div
                                    className="absolute top-5 left-4"
                                    onClick={() => setSignUpPage2(!signUpPage2)}
                                  >
                                    <ArrowBackSharpIcon />
                                  </div>
                                  <div className="relative mt-10 ml-16 w-[21rem] h-[3rem]  rounded-md flex items-center border-solid border-gray-500 border-2">
                                    <input
                                      type="text"
                                      value={signUpData.name}
                                      placeholder="name"
                                      className="ml-4 text-xl outline-none border-none"
                                      onChange={(e) => {
                                        setSignUpData({
                                          ...signUpData,
                                          name: e.target.value,
                                        }),
                                          setErrorSign((prev) => {
                                            return {
                                              ...prev,
                                              name: "",
                                            };
                                          });
                                      }}
                                    />
                                    {validsign ? (
                                      <></>
                                    ) : (
                                      <span className="absolute mt-16 text-red-600 text-sm">
                                        {errorsign.name}
                                      </span>
                                    )}
                                  </div>
                                  <div className="relative mt-10 ml-16 w-[21rem] h-[3rem]  rounded-md flex items-center border-solid border-gray-500 border-2">
                                    <input
                                      type="password"
                                      value={signUpData.password}
                                      placeholder="password"
                                      className="ml-4 text-xl outline-none border-none"
                                      onChange={(e) => {
                                        setSignUpData({
                                          ...signUpData,
                                          password: e.target.value,
                                        }),
                                          setErrorSign((prev) => {
                                            return {
                                              ...prev,
                                              password: "",
                                            };
                                          });
                                      }}
                                    />

                                    {validsign ? (
                                      <></>
                                    ) : (
                                      <span className="absolute mt-16 text-red-600 text-sm">
                                        {errorsign.password}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="submit"
                                    className="mt-10 pt-1 text-white cursor-pointer pb-8 text-xl bg-orange-600 h-[40px] rounded-2xl w-[21rem] ml-16 font-bold py-2 px-4 transition-all duration-300"
                                    // onClick={() => setSignUpPage2(!signUpPage2)}
                                  >
                                    Sign Up
                                  </button>
                                </div>
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            {/* ))} */}
        </div>
      )}
    </div>
  );
};

export default BeforeLogInNav;
