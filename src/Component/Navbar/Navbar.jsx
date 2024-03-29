import React, { Children, useEffect, useRef, useState } from "react";
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
import SignOut from "../SignIn/SignOut";
import LogIn from "../SignIn/LogIn";
import PostData from "./PostData";
// import logo from "../../../public/logo.png"

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showopt, setShowopt] = useState(false);
  const [showAppLink, setShowAppLink] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [fetchingData, setFetchingData] = useState();
  const [fetching, setFetching] = useState();
  const [showSignUp, setShowSignUp] = useState(false);
  const searchinput = useRef();
  const [hotelInputPopUp, setHotelInputPopUp] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(true);
  const [error, setError] = useState({});

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
      console.log("lo", result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchData();
  }, [search]);
  // function handleSearch() {
  //   searchData()
  //     .then((response) => {
  //       if (response) {
  //         setFetching(response.data);

  //         console.log("hanlde", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // -------------------------------------------------------------------------------------------------------------

  // ----------------SIGN UP API ----------------------------------------------------------------------------
  const SignUpData = async () => {
    console.log(registerData);
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
            name: registerData.name,
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SignUpData();
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
        setShowLogIn(false);
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            id: result.data._id,
            name: result.data.name,
            email: result.data.email,
          })
        );
      }
      if (result.status === "fail") {
        console.log(result.message);
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
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div  >
      {/* <button onClick={() => searchData()}>ki</button> */}
     
      <div className="flex justify-between pl-12 pr-12 pt-2 pb-10 relative h-14 border-b-2">
        <div className="flex">
          <img src="/1.webp" alt=""  className="h-9 w-9 mr-3"/>
          <h2 className="text-3xl text-orange-500 font-bold">reddit</h2>
        </div>
        <div className="bg-gray-200 h-11 w-[40rem] float-start space-x-2 pl-3 rounded-3xl pt-2 ">
          <SearchIcon />
          <input
            type="search"
            name
            search
            placeholder="Search Reddit"
            className="bg-gray-200 text-lg border-none outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onClick={(e) => {
              // handleSearch(),
               setOpenSearch(!openSearch)
            }}
            ref={searchinput}
            onBlur={hotelInputBlur}
            onFocus={hotelInputFocus}
          />

          {openSearch && (
            <div className="w-[100%] mt-4 p-4 shadow-2xl z-50 overflow-auto h-[30rem] bg-white rounded-lg">
              <p className="mb-2 font-normal text-sm">
                <TrendingUpSharpIcon /> TRENDING TODAY
              </p>
              {fetchingData &&
                fetchingData
                  // .filter((item) => {
                  //   const lower = item.author.name.toLowerCase();

                  //   return lower.startsWith(search);
                  // })
                  .map((item) => (
                    <div
                      onClick={(e) => {
                        setSearch(item.author.name), setOpenSearch(!openSearch);
                      }}
                    >
                      <div className="text-base font-semibold">
                        {item.author.name}
                      </div>
                      <div className="flex text-sm text-gray-400 space-x-7 mr-2 mt-1">
                        <div>{item.content}</div>
                        <img
                          src={item.images}
                          alt=""
                          className="w-16 h-14 mt-2 rounded-lg"
                        />
                      </div>
                      <div className="flex mt-3">
                        <img
                          src={item.author.profileImage}
                          alt=""
                          className="h-4 w-4"
                        />
                        <p className="flex text-sm text-gray-400 space-x-6">
                          {item.author.name}
                        </p>
                      </div>
                      <hr/>
                    </div>
                  ))}
            </div>
          )}
        </div>

        {/* -----------------------------BEFORE LOGIN --------------------------------------------------------------------------------- */}
        {!localStorage.getItem("token") && (
          <div className="flex space-x-7">
            <div>
              <div
                className="bg-gray-200 pl-3 pr-3 h-11 rounded-3xl space-x-2 pt-2 pb-2"
                onMouseOver={() => {
                  setShowApp(!showApp);
                }}
                onClick={() => {
                  setShowAppLink(!showAppLink);
                }}
              >
                <QrCodeScannerIcon />
                <button className="text-base">Get app</button>
              </div>
              <br />
              {showApp && (
                <button className="absolute top-3/4 mr-9 text-xs p-1 rounded-sm -tracking-tight bg-slate-800 text-white">
                  Get the Reddit app
                </button>
              )}
            </div>
            <div>
              <button
                className="bg-orange-600 pl-4 pr-4 h-11 rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-white text-sm"
                onMouseOver={() => {
                  setShow(!show);
                }}
                onClick={() => setShowLogIn(!showLogIn)}
                onMouseLeave={() => setShow(show)}
              >
                Log In
              </button>
              <br />
              {show && (
                <button className="absolute top-3/4 mr-9 text-xs p-1 rounded-sm -tracking-tight bg-slate-800 text-white">
                  Log in to Reddit
                </button>
              )}
            </div>
            <div>
              <div
                className="pt-1 relative"
                onClick={() => setShowopt(!showopt)}
              >
                <MoreHorizIcon />
              </div>
            </div>
            {showopt && (
              <span className="absolute top-2/4 m-6 right-14 space-y-2 shadow-xl p-4 rounded-md">
                <h2 className="text-sm" onClick={()=>{setShowLogIn(!showLogIn)}}>
                  <LoginIcon className="mr-2 text-sm" /> Log In / Sing Up
                </h2>
                <h2 className="text-sm">
                  <QrCodeScannerIcon className="mr-2" /> Get App
                </h2>
              </span>
            )}
          </div>
        )}

        {/* ---------------------------------AFTER LOGIN ------------------------------------------------------------------------ */}
        {localStorage.getItem("token") && (
          <div>
            <div
              onClick={() => setShowOptions(!showOptions)}
              className="flex justify-between items-center border-solid h-10 border-gray-400 border-2 rounded-md w-32 pl-2 pr-2"
            >
              <img
                className="h-6 w-6 rounded-lg"
                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                alt=""
              />
              <KeyboardArrowDownOutlinedIcon />
            </div>
            {showOptions && (
              <div className="absolute w-56 pl-4 pt-3 top-2/4 mt-6 ml-10 right-14 space-y-2 shadow-md p-6 rounded-lg">
                <div>
                  <div className="flex space-x-2 text-gray-400 text-lg">
                    <AccountCircleSharpIcon className="mr-2 mt-1 h-12 w-12" />
                    My Stuff
                  </div>
                  <div className="ml-10 mt-3 text-lg">
                    Online status
                    <input type="checkbox" id="check" className="ml-2" />
                    <label
                      for="check"
                      class="h-20 w-20 z-96 relative cursor-pointer bg-gray-500 rounded-2xl"
                    ></label>
                  </div>
                  <div className="ml-10 mt-3 text-lg">Profile</div>
                </div>
                <hr />
                <div>
                  <div className="flex space-x-2 text-gray-400 text-lg">
                    <VisibilitySharpIcon className="mr-2 mt-1 h-12 w-12" />
                    View Options
                  </div>
                  <div className="ml-10 mt-3 text-lg w-18">
                    Dark Mode
                    <input type="checkbox" />
                  </div>
                  <div
                    className="flex ml-10 mt-3 text-lg"
                    onClick={() => signout()}
                  >
                    <LogoutSharpIcon className="mr-2 mt-1 h-12 w-12" />
                    <button>Sign Out</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------- */}
{/* 
      <div className="border-t-2 mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14  border-r-2">
        <div>
          <ul>
            <li className="bg-gray-200 space-x-2 w-60 pl-4 pb-1 mb-1 rounded-sm pt-2">
              <NavLink to="/">
                <HomeIcon /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/popular">
                <OutboundOutlinedIcon /> Popular
              </NavLink>
            </li>
          </ul>
        </div> */}
        {/* <div> <PostData/></div> */}
        {/* <div> */}
          
        {/* </div> */}
      {/* </div> */}
      {/* -------------------- OPEN APP LINK ----------------------------------------------------------------------------- */}
      {showAppLink && <LogIn state={showAppLink} />}

      {/* ------------------------OPEN LOG IN FUN [POPUP]------------------------------------------------------------------- */}
      {showLogIn && (
        <form onSubmit={handleSubmitSignIn}>
          <div className="bg-gray-700 bg-opacity-80 h-dvh size-full m-0 fixed top-0 left-0 w-dvw flex justify-center items-center">
            <div className="bg-white relative w-[30rem] h-[85%] rounded-md">
              <div className="flex justify-end mt-4 mr-4">
                <button
                  className="text-2xl pl-2 pr-2 rounded-md bg-gray-400 flex"
                  onClick={() => {
                    setShowLogIn(!showLogIn);
                  }}
                >
                  {" "}
                  X{" "}
                </button>
              </div>
              <div className="ml-16 mt-8 mr-16">
                <h1 className=" text-2xl">Log in</h1>
                <p className=" text-sm pt-1">
                  By continuing, you agree to our User Agreement and acknowledge
                  that you understand the Privacy Policy.
                </p>
              </div>
              <div>
                <div className="pl-4 pr-3 ml-16 mt-8 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                  <img
                    src="https://styles.redditmedia.com/t5_3is08/styles/communityIcon_i0bub98epp4a1.png"
                    alt=""
                    className="w-4 h-4 rounded-xl"
                  />
                  <p className="text-sm text-red-600">
                    Continue with Google (Feature coming soon)
                  </p>
                  {/* <img className="w-4 h-4 z-10" src="https://www.google.com/search?sca_esv=fdae4f9b2d9875c9&sca_upv=1&rlz=1C1FKPE_enIN980IN980&sxsrf=ACQVn0_mVBbV0NZP0f2n9mocGqsmNXWSZQ:1711521421844&q=google+png&tbm=isch&chips=q:google+png,g_1:logo:n7Udw4Q-0Qs%3D&usg=AI4_-kRqTh3RyaHLLXH-erw_4lTU9XqXbw&sa=X&ved=2ahUKEwj3gf-S6pOFAxWia2wGHbqmANQQgIoDKAB6BAgNEA0&biw=1396&bih=639&dpr=1.38#imgrc=ss7cMp9Kx8k3fM" alt="" /> */}
                </div>
                <div className="pl-4 pr-3 ml-16 mt-4 mr-16 shadow-xl h-8 w-[21rem] rounded-xl bg-gray-200 flex justify-between items-center">
                  <img
                    className="w-4 h-4 rounded-xl"
                    src="../SignIn/logo"
                    alt=""
                  />
                  <p className="text-sm text-red-600">
                    Continue with Apple (Feature Coming soon)
                  </p>
                </div>

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
                    <span className="absolute bottom-[137px] text-red-600 text-sm">
                      {error.password}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs ml-16 mt-4">
                New to Reddit ?{" "}
                <butt onClick={() => setOpenSignUp(!openSignUp)}>Sign Up</butt>
              </p>

              <button
                type="submit"
                className="mt-5 pt-1 text-white cursor-pointer pb-8 text-xl bg-orange-600 h-[40px] rounded-2xl w-[21rem] ml-16 hover:bg-blue-700 font-bold py-2 px-4 transition-all duration-300"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ------------------ OPEN SIGNUP FUN [POPUP] ---------------------------------------------------------------------------- */}
      {openSignUp && (
        <form action="">
          <div>koooo</div>
        </form>
      )}
    </div>
  );
};

export default Navbar;
