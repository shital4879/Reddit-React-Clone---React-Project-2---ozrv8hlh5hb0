import React, { useState, useEffect, useContext, useReducer } from "react";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import HomeIcon from "@mui/icons-material/Home";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LoginIcon from "@mui/icons-material/Login";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import TrendingUpSharpIcon from "@mui/icons-material/TrendingUpSharp";
import { Mycontext } from "../components/App";

const reducer = (state, action) => {
  switch (action.type) {
    case "btn1":
      return { ...state, button1: !state, button1 };
      return state;
  }
};
const initialState = {
  button1: false,
};

const Detail = () => {
  const {
    showLogIn,
    setShowLogIn,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    dataChannel,
  } = useContext(Mycontext);
  console.log(dataChannel, "pppp");
  //   const [darkMode, setDarkMode] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  const fetchingData = location.state;
  console.log(fetchingData);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [postData, setPostData] = useState();
  const [showMore, setShowMore] = useState(false);
  const [channelData, setChannelData] = useState();
  const [openHome, setOpenHome] = useState(false);
  const [comming, setComming] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  // ------------------------------- API FOR SEARCH ------------------------------------------------------------------
//   const searchData = async () => {
//     try {
//       const responce = await fetch(
//         `https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name":"${search}"}`,
//         {
//           method: "GET",
//           headers: {
//             projectID: "ozrv8hlh5hb0",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const result = await responce.json();
//       setFetchingData(result.data);
//       // console.log("lo", result);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     searchData();
//   }, [search]);

  // --------------------------- API FOR POST ---------------------------------------------------------------------------
  const PostApi = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?limit=100`,
        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setPostData(result.data);
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    PostApi();
  }, []);
  // ----------------------------------------------------------------------------------------------------------------

  const toggle = () => {
    setShowMore(!showMore);
  };

  const signout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  //   ----------------------------- api for Channel-----------------------------------------------------------------------
  const ChannelDataApi = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/channel/`,
        {
          // method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            // "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setChannelData(result.data);
      console.log("lo", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ChannelDataApi();
  }, []);

  //   const toggleDarkMode = () => {
  //     setDarkMode(!darkMode);
  //   };

  return (
    <div className={darkMode?"dark":""}>
      <div>
        <div className="flex justify-between 2xl:pl-12  2xl:pr-12 xl:ml:8 ml-14 pt-2 pb-10 relative h-14 border-b dark:border-gray-800 dark:bg-zinc-950 ">
          <div className="">
            <div
              onClick={() => setOpenHome(!openHome)}
              className="flex mt-2 dark:text-white"
            >
              <MenuSharpIcon />
            </div>
            {openHome && (
              <div className="bg-gray-50 p-4 absolute mt-4 shadow-xl dark:bg-zinc-950 dark:text-white">
                <ul>
                  <li>
                    <NavLink
                      to="/premium"
                      className="active:bg-red-600 text-base"
                    >
                      <HomeIcon /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/popular"
                      className="active:bg-red-600 text-base"
                    >
                      <OutboundOutlinedIcon /> Popular
                    </NavLink>
                  </li>
                </ul>
                <div className="mt-2 tracking-widest">
                  <h1 className="tracking-widest font-extralight">
                    COMMUNITY{" "}
                    <KeyboardArrowDownOutlinedIcon className="dark:text-white" />
                  </h1>
                  <div className="xl:w-[16rem] bg-gray-100 m-4 lg:w-[14rem] overflow-y-scroll h-96">
                    <h1 className="tracking-tight pb-2 dark:bg-zinc-950 dark:text-white">
                      <AddSharpIcon /> Create a Community
                    </h1>
                    {dataChannel &&
                      dataChannel.map((item) => (
                        <div className="flex space-x-3 space-y-4 dark:bg-zinc-950 dark:text-white ">
                          <img
                            src={item.image}
                            alt=""
                            className="w-6 h-6 rounded-2xl mt-4"
                          />
                          <div>
                            <div className="text-[16px] tracking-normal">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex 2xl:-ml-44 2xl:w-12 xl:-ml-24 ml-5">
            <img src="/1.webp" alt="" className="h-9 w-9 mr-3" />
            <h2 className="text-3xl text-orange-500 font-bold invisible">reddit</h2>
          </div>

          <div className="bg-gray-200 w-[40rem] h-11 2xl:w-[40rem] xl:w-[35rem] xl:-ml-24 float-start space-x-2 pl-3 rounded-3xl pt-2 dark:bg-slate-900 ">
            <SearchIcon className="dark:text-slate-400" />
            <input
              type="search"
              name
              search
              placeholder="Search Reddit"
              className="bg-gray-200 text-lg border-none outline-none dark:bg-slate-900"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={(e) => {
                // handleSearch(),
                setOpenSearch(!openSearch);
              }}
              // ref={searchinput}
              // onBlur={hotelInputBlur}
              // onFocus={hotelInputFocus}
            />

            {openSearch && (
              <div className="w-[100%] mt-4 p-4 shadow-2xl z-50 overflow-auto h-[30rem] bg-white rounded-lg">
                <p className="mb-2 font-normal text-sm">
                  <TrendingUpSharpIcon /> TRENDING TODAY
                </p>
                {fetchingData.data &&
                  fetchingData.data
                    // .filter((item) => {
                    //   const lower = item.author.name.toLowerCase();

                    //   return lower.startsWith(search);
                    // })
                    .map((item) => (
                      <div
                        onClick={(e) => {
                          setSearch(item.author.name),
                            setOpenSearch(!openSearch);
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
                        <hr />
                      </div>
                    ))}
              </div>
            )}
          </div>

          {/* -----------------------------BEFORE LOGIN --------------------------------------------------------------------------------- */}

          {/* ---------------------------------AFTER LOGIN ------------------------------------------------------------------------ */}
          {localStorage.getItem("token") && (
            <div className="flex xl:mr-36">
                <div className="invisible">
              <div className="2xl:space-x-4 2xl:mr-3 mt-1 text-gray-600 xl:space-x-1 ">
                <AddSharpIcon />
              </div>
              <div
                className="flex 2xl:space-x-4 2xl:mr-5 mt-1 text-gray-600"
                onClick={() => setComming(!comming)}
              >
                <div

                // onClick={()=>{dispatch({type:"btn1"})}}
                >
                  <OutboundOutlinedIcon className="font-thin" />
                </div>
                <div>
                  <ChatOutlinedIcon />
                </div>

                <div>
                  <NotificationsNoneIcon />
                </div>
                <div>
                  <PodcastsIcon />
                </div>
                </div>

                {comming && (
                  <div className="flex justify-center items-center fixed">
                    <div className="-ml-96 mt-14">
                      <img
                        src="./coming.avif"
                        alt=""
                        className="w-[35rem] h-[30rem] rounded-2xl"
                      />
                    </div>
                  </div>
                )}
              </div>

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
                <div className="bg-white dark:bg-zinc-950 absolute w-56 pl-4 pt-3 top-2/4 mt-7 ml-10 right-14 space-y-2 shadow-md p-6 rounded-lg">
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
                      onClick={
                        //   setDarkMode(!darkMode)

                        toggleDarkMode
                        // ,setShowOptions(!showOptions)
                      }
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

        <div className="flex border-r-2 pb-4 dark:bg-zinc-950">
          <div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14  ">
            {localStorage.getItem("token") && <div className="2xl:w-60 xl:w-0"></div>}
          </div>
          <div className="dark:bg-zinc-950">
            {localStorage.getItem("token") && (
              <div>
                <div className="flex border-gray-400 border  rounded-sm p-2 mt-8 bg-white dark:bg-black dark:border-gray-900">
                  <img
                    src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                    alt=""
                    className="w-9 h-9 mr-8 rounded-2xl "
                  />
                  <input
                    type="text"
                    value="Create Post"
                    className="border w-[30rem] pl-3 rounded-sm bg-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900"
                  />
                </div>

                <div className="flex space-x-6 mt-8 bg-white p-3 border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900">
                  <NavLink className="flex">
                    <RocketSharpIcon className="mr-1" /> Best
                  </NavLink>
                  <NavLink className="flex">
                    <LocalFireDepartmentIcon className="mr-1" /> Hot
                  </NavLink>
                  <NavLink className="flex">
                    <NewReleasesTwoToneIcon className="mr-1" /> New
                  </NavLink>
                  <NavLink className="flex">
                    <UploadIcon className="mr-1" /> Top
                  </NavLink>
                </div>
              </div>
            )}

            <div>
              {postData &&
                postData.map((item) => (
                  <div className="">
                    <div className="shadow-md w-[48rem] mt-5 items-center justify-center pt-4 pl-14 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900">
                      <div className="flex items-center">
                        <div className="flex">
                          <img
                            src={item.author.profileImage}
                            alt=""
                            className="h-6 w-6 rounded-3xl"
                          />
                          <h1 className="font-semibold text-base ml-2 mr-2">
                            {item.author.name}
                          </h1>
                        </div>
                        <div className="text-gray-500 text-sm">
                          .{new Date().toLocaleDateString() - item.createdAt}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2">{item.content}</p>
                        <div className=" flex items-center justify-start">
                          <img src={item.images} alt="" className="rounded" />
                        </div>
                      </div>
                      <div className="flex mt-3 pb-5 space-x-4">
                        <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                          <ArrowUpwardOutlinedIcon className="hover:text-orange-500 h-1 w-1" />
                          <div>{item.likeCount}</div>
                          <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1" />
                        </div>
                        <div>
                          <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                          {item.commentCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {localStorage.getItem("token") && (
            <div>
              <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[6rem] w-[19rem] rounded-sm bg-white dark:bg-black dark:text-white dark:border-gray-900">
                <div className=" flex  p-2">
                  <div className="mr-3 mt-1  text-orange-500 ">
                    <SecurityIcon />
                  </div>
                  <p className="text-xs">
                    Reddit Premium <br />
                    The best Reddit experience
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      navigate("/premium");
                    }}
                    className="bg-orange-600 w-[17rem]  rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-white text-sm"
                  >
                    Try now
                  </button>
                </div>
              </div>

              <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[15rem] w-[19rem] rounded-sm bg-white  dark:bg-black dark:text-white dark:border-gray-900">
                <img
                  src="https://reddit-ten-mocha.vercel.app/home-banner.png"
                  alt=""
                />
                <img
                  src="	https://reddit-ten-mocha.vercel.app/snoo.png"
                  alt=""
                  className="h-16 -m-1 ml-3"
                />
                <p className="text-sm p-2 border-b border-gray-300 dark:border-gray-900">
                  Your personal Reddit frontpage. Come here to check in with
                  your favorite communities.
                </p>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => navigate(`/CreatePost`)}
                    className="bg-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-white text-sm"
                  >
                    Create Post
                  </button>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="border-blue-700 border text-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-sm">
                    Create Community
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
