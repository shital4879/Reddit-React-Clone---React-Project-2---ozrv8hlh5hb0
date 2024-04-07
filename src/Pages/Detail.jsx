import React, { useState, useEffect, useContext } from "react";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
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
import { ThemeContext } from "../Component/Context/DarkTheme";
import { contextApi } from "../Component/Context/ApiContext";
import NavDetail from "../Component/Navbar/NavDetail";

const Detail = () => {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    fetchingData,
    setFetchingData,
    postData,
    setPostData,
    channelApi,
    setChannelApi,
  } = useContext(contextApi);
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  console.log(channelApi, "ml");
  const {
    showLogIn,
    setShowLogIn,
    createCommunity,
    setCreateCommunity,
    openPopular,
    setOpenPopular,
  } = useContext(Mycontext);
  const [openSearch, setOpenSearch] = useState(false);
  // const [openPopular,setOpenPopular] = useState(fals;
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [comming, setComming] = useState(false);
  const [inputCount, setInputCount] = useState("");
  const [openInput, setOpenInput] = useState(false);

  const navigatetoAuthordetail = (id) => {
    navigate(`/AuthorDetail/${id}`);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div>
        <NavDetail />

        <div className="flex xl:mr-36"></div>

        <div className="flex  pb-4 dark:bg-zinc-950">
          <div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14  ">
            {localStorage.getItem("token") && (
              <div className="2xl:w-60 xl:w-0"></div>
            )}
          </div>
          <div className="dark:bg-zinc-950">
            <div>
              <div className="flex w-dvw -ml-24 border-gray-400 border  rounded-sm p-2 mt-8 bg-white dark:bg-black dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:w-[48rem] 2xl:-ml-28">
                <img
                  src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                  alt=""
                  className="w-9 h-9 mr-8 rounded-2xl "
                />
                <input
                  type="text"
                  value="Create Post"
                  className="border 2xl:w-[30rem] pl-3 rounded-sm bg-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900 lg:w-[27rem]"
                />
              </div>

              <div className="flex w-dvw -ml-24 space-x-6 mt-8 bg-white p-3 border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw  lg:-ml-6 lg:w-[35rem] 2xl:w-[48rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                <div onChange={(e) => setFilter(e.target.value)}>
                  <NavLink className="flex" value="best">
                    <RocketSharpIcon className="mr-1" /> Best
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    className="flex"
                    value="hot"
                    onClick={(e) => setFilter(e.target.value)}
                  >
                    <LocalFireDepartmentIcon className="mr-1" /> Hot
                  </NavLink>
                </div>
                <NavLink
                  className="flex"
                  value="nnew"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <NewReleasesTwoToneIcon className="mr-1" /> New
                </NavLink>
                <NavLink
                  className="flex"
                  value="top"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <UploadIcon className="mr-1" /> Top
                </NavLink>
              </div>
            </div>

            <div>
              {!openPopular && (
                <div>
                  {postData &&
                    postData.map((item) => (
                      <div className="">
                        <div className="w-dvw -ml-24 shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                          <div className="flex items-center">
                            <div
                              className="flex"
                              onClick={() =>
                                navigatetoAuthordetail(item.author.name)
                              }
                            >
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
                              .
                              {(
                                (new Date() - new Date(item.createdAt)) /
                                1000 /
                                3600 /
                                24
                              ).toFixed(0)}{" "}
                              days ago
                            </div>
                          </div>
                          <div>
                            <p className="mb-2">{item.content}</p>
                            <div className=" flex items-center justify-start">
                              <img
                                src={item.images}
                                alt=""
                                className="rounded"
                              />
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
              )}

{/* ---------------------POPULAR---------------------- */}
              {openPopular && (
                <div>
                  {postData &&
                    postData
                      .filter((item) => item.likeCount >= 5)
                      .map((item) => (
                        <div className="">
                          <div className="w-dvw -ml-24 shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                            <div className="flex items-center">
                              <div
                                className="flex"
                                onClick={() =>
                                  navigatetoAuthordetail(item.author.name)
                                }
                              >
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
                                .
                                {(
                                  (new Date() - new Date(item.createdAt)) /
                                  1000 /
                                  3600 /
                                  24
                                ).toFixed(0)}{" "}
                                days ago
                              </div>
                            </div>
                            <div>
                              <p className="mb-2">{item.content}</p>
                              <div className=" flex items-center justify-start">
                                <img
                                  src={item.images}
                                  alt=""
                                  className="rounded"
                                />
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
              )}
            </div>
          </div>
          <div>
            <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[6rem] w-[19rem] rounded-sm bg-white dark:bg-black dark:text-white dark:border-gray-900 invisible lg:visible ">
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

            <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[15rem] w-[19rem] rounded-sm bg-white  dark:bg-black dark:text-white dark:border-gray-900 invisible lg:visible">
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
                Your personal Reddit frontpage. Come here to check in with your
                favorite communities.
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
                <button
                  onClick={() => setCreateCommunity(!createCommunity)}
                  className="border-blue-700 border text-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-sm"
                >
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createCommunity && (
        <>
          <div className="bg-gray-700 bg-opacity-80 h-dvh size-full m-0 fixed top-0 left-0 w-dvw ">
            {/* <NavDetail /> */}

            <div className="flex justify-center items-center 2xl:mt-10 sm:mt-0 lg:mt-10 xl:mt-10 ">
              <div className="bg-white relative 2xl:w-[36rem] 2xl:h-[36rem] rounded-md pt-4 pl-5 pr-5 dark:bg-zinc-950  border border-solid border-gray-600 sm:w-dvw sm:h-dvh md:w-dvw md:h-dvh lg:w-[36rem] lg:h-[36rem] xl:w-[36rem] xl:h-[36rem] h-dvh w-dvw">
                <div className="flex justify-between  pb-2 text-lg border-b border-solid border-gray-400 dark:text-white">
                  <h1>Create a community</h1>
                  <h2
                    onClick={() => setCreateCommunity(!createCommunity)}
                    className="cursor-pointer"
                  >
                    X
                  </h2>
                </div>

                <div className="mt-5">
                  <h1 className="font-medium dark:text-white">Name</h1>
                  <p className="text-xs text-gray-500">
                    Community names including capitalization cannot be changed.
                  </p>

                  <input
                    type="text"
                    minLength={3}
                    className="pl-4 mt-5 rounded-md h-10 2xl:w-[34rem] border border-solid border-red-600 sm:w-[40rem] md:w-[45rem] lg:w-[34rem] xl:w-[34rem] w-[26rem]"
                    value={inputCount}
                    onChange={(e) => setInputCount(e.target.value)}
                  />

                  {inputCount.length < 3 ? (
                    <h1 className="flex justify-between mt-4 text-xs pr-2">
                      <p className="text-red-600">
                        Please lengthen this text to 3 characters or more (you
                        are currently using 0 character).
                      </p>
                      <p className="dark:text-white">{inputCount.length}</p>
                    </h1>
                  ) : (
                    <h1 className="flex justify-between mt-4 text-xs pr-2">
                      <p className="dark:text-white">
                        Choose wisely. Once you pick a name, it can't be
                        changed.
                      </p>
                      <p className="dark:text-white">{inputCount.length}</p>
                    </h1>
                  )}

                  <div className="mt-8">
                    <h1 className="font-medium dark:text-white">
                      Community type
                    </h1>
                    <div className="flex mt-5 dark:text-white">
                      <input
                        type="radio"
                        name="input"
                        className="2xl:h-[15px] 2xl:w-[15px]"
                      />
                      <h1 className="text-base ml-4 mr-4 -mt-1">
                        <LanguageSharpIcon className="mr-1" />
                        Public
                      </h1>
                      <p className="text-xs text-gray-500">
                        Anyone can view, post, and comment to this community
                      </p>
                    </div>

                    <div className="flex mt-5 dark:text-white">
                      <input
                        type="radio"
                        name="input"
                        className="2xl:h-[15px] 2xl:w-[15px]"
                      />
                      <h1 className="text-base ml-4 mr-4 -mt-1">
                        <VisibilityOffIcon className="mr-1" />
                        Restricted
                      </h1>
                      <p className="text-xs text-gray-500 ">
                        Anyone can view, but only approved users can contribute
                      </p>
                    </div>

                    <div className="flex mt-5 dark:text-white">
                      <input
                        type="radio"
                        name="input"
                        className="xl:2h-[15px] 2xl:w-[15px]"
                      />
                      <h1 className="text-base ml-4 mr-4 -mt-1">
                        <HttpsOutlinedIcon className="mr-1" />
                        Private
                      </h1>
                      <p className="text-xs text-gray-500 ">
                        Only approved users can view and submit to this
                        community
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex space-x-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <p className="flex">
                      <span className="mr-2 bg-red-600 text-base -mt-1 ">
                        NSFW
                      </span>
                      <p className="text-gray-500 ">18+ year old community</p>
                    </p>
                  </div>

                  <div className="flex justify-end  mt-9">
                    <button className="mr-4 border border-solid text-[12px] pl-3 pr-3 pt-1 pb-1 border-blue-700 rounded-2xl text-blue-700 font-medium cursor-pointer">
                      CANCEL
                    </button>
                    <button
                      className={`border-solid text-[12px] pl-3 pr-3 rounded-2xl font-medium cursor-pointer ${
                        inputCount.length < 3
                          ? "bg-gray-300 text-gray-500 dark:bg-gray-900 dark:text-gray-800"
                          : "text-white bg-blue-600"
                      }`}
                      disabled={inputCount.length < 3}
                    >
                      Create Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;