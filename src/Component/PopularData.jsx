import React, { useState, useEffect, useContext, useRef } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewAgendaSharpIcon from "@mui/icons-material/ViewAgendaSharp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { contextApi } from "./Context/ApiContext";
import { ThemeContext } from "./Context/DarkTheme";
import { Mycontext } from "../components/App";

const Pupular = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { showLogIn, setShowLogIn } = useContext(Mycontext);
  const { postData, setPostData, channelApi, setChannelApi } =
    useContext(contextApi);
  const { search, setSearch, fetchingData, setFetchingData } =
    useContext(contextApi);
  const [opendrop, setOpenDrop] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("card");

  const handleclickcard = (itemname) => {
    setActiveItem(itemname === activeItem ? null : itemname);
  };
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
  const [showMore, setShowMore] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const toggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="xl:flex lg:flex border-r-2 pb-4 bg-zinc-100">
        <div className="2xl:mt-16 xl:mt-16 lg:mt-16 mt-7 xl:w-[14rem] 2xl:w-[16rem] flex justify-between  pr-12 pt-3 pb-2 relative h-14 lg:w-[10rem] md:w-[10rem]  sm:invisible  md:invisible lg:visible xl:visible invisible">
          <div>
            <ul>
              <li className="pl-5 ml-5 mb-2 w-[15rem] hover:bg-gray-200 pt-1 pb-1  2xl:w-[13rem] rounded-lg lg:w-[8rem] xl:w-[12rem]">
                <NavLink to="/">
                  <HomeIcon /> Home
                </NavLink>
              </li>
              <li className="mb-2 bg-gray-200 w-[15rem] pt-1 pb-1 pl-5 pr-5 z-0  2xl:w-[13rem] ml-5 rounded-lg xl:w-[12rem] lg:w-[8rem]">
                <NavLink to="/popular">
                  <OutboundOutlinedIcon /> Popular
                </NavLink>
              </li>
            </ul>

            <div>
              <h1 className="flex justify-between tracking-widest font-extralight text-gray-500 pl-7 pr-2 pt-2 pb-2 rounded-md mt-6 dark:hover:bg-gray-800 dark:text-gray-500">
                <h1>COMMUNITY </h1>
              </h1>

              <h1
                className="tracking-tight  text-gray-700 ml-6 dark:bg-zinc-950 dark:text-gray-400 pl-5 pr-4 pt-1 pb-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => setShowLogIn(!showLogIn)}
              >
                <AddOutlinedIcon /> Create a Community
              </h1>
            </div>
          </div>

          {localStorage.getItem("token") && <div className="w-60"></div>}
        </div>
        <div className="">
          <div className="border-l border-solid border-gray-300 pt-10">
          <Tippy content="Change post view" className="text-[10px]" placement="bottom">
            <div
              className={`flex justify-center items-center 2xl:mt-5 xl:mt-8 lg:mt-8 relative -mt-12 2xl:ml-24  sm:-mt-24 sm:ml-14 ml-10 md:-mt-24 md:ml-14 xl:ml-14 text-gray-500 mb-3 hover:bg-gray-100 w-14 p-1 rounded-2xl ${
                activeItem === "compact" ? "mr-10" : ""
              }`}
              onClick={() => setOpenDrop(!opendrop)}
            >
              <ViewAgendaOutlinedIcon style={{fontSize:"20px"}}/>
              <KeyboardArrowDownOutlinedIcon style={{fontSize:"20px"}}/>
            </div>
</Tippy>
            <div className={`absolute `}>
              {opendrop && (
                <div
                  className={`bg-gray-50 w-36 space-y-2 rounded-lg shadow-xl 2xl:ml-24 lg:-ml-0 xl:ml-12 h-36 pt-3 ${
                    activeItem === "compact" ? "ml-12" : ""
                  }`}
                >
                  <p className="pl-4">View</p>
                  <div
                    className={`flex text-gray-800 space-x-3 p-2 pl-4 text-sm ${
                      activeItem === "card" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => {
                      setCardOpen(false),
                        handleclickcard("card"),
                        setOpenDrop(!opendrop);
                    }}
                  >
                    <ViewAgendaSharpIcon className="text-gray-500" style={{fontSize:"20px"}}/>
                    <p>Card</p>
                  </div>
                  <div
                    className={`flex text-gray-800 space-x-3 pl-4 p-2 text-sm ${
                      activeItem === "compact" ? "bg-gray-200 " : ""
                    }`}
                    onClick={() => {
                      setCardOpen(true),
                        handleclickcard("compact"),
                        setOpenDrop(!opendrop);
                    }}
                  >
                    <TableRowsIcon className="text-gray-500" style={{fontSize:"20px"}}/>
                    <p>Compact</p>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="md:mt-24 sm:mt-28 mt-28 lg:mt-10">
              {postData &&
                !cardOpen &&
                postData
                .filter(item => item.likeCount >= 10)
                .map((item) => (
                  <div className="flex justify-center items-center  ml-8 ">
                    <div className="hover:bg-gray-200 hover:rounded-2xl -ml-7  border-b mb-10 w-full sm:w-full 2xl:ml-8 -mt-28  lg:mb-10  xl:w-[49rem] xl:mt-2 lg:-mt-5 items-center justify-center pt-4 pl-7 pr-8  xl:mb-8 md:-mt-24  bg-white lg:w-[40rem] 2xl:mr-4 lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36 lg:-ml-8 xl:ml-0 2xl:-mt-3 border rounded-md border-gray-300">
                      <div className="flex items-center">
                        <div className="flex">
                          {item.author.profileImage === null ? (
                            <p className="font-bold pl-2 pr-2 dark:text-gray-300 bg-gray-300 rounded-xl">
                              {item.author.name.charAt(0).toUpperCase()}
                            </p>
                          ) : (
                            <img
                              src={item.author.profileImage}
                              alt=""
                              className="h-6 w-6 rounded-3xl"
                            />
                          )}
                          <h1 className="font-semibold text-base ml-2 mr-2">
                            {item.author.name}
                          </h1>
                        </div>
                        <div className="text-gray-500 text-sm">
                          .
                          {(
                            (new Date() - new Date(item.createdAt)) /
                            (1000 * 3600 * 24)
                          ).toFixed(0)}{" "}
                          days ago
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 w-[20rem] sm:w-[35rem] md:w-[40rem]  ">
                          {item.content}
                        </p>
                        <div className=" flex items-center justify-start ">
                          <div className="pb-4">
                            {item.images == "" ? (
                              <p className="ml-8"></p>
                            ) : (
                              <img
                                src={item.images}
                                alt=""
                                className="rounded-xl w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex mt-3 pb-2 space-x-4"
                        onClick={() => setShowLogIn(!showLogIn)}
                      >
                        <div className="bg-gray-200 pt-2 rounded-3xl flex space-x-2 p-1 text-sm ">
                          <ThumbUpOutlinedIcon style={{ fontSize: "18px" }} className="hover:text-orange-500 h-1 w-1" />
                          <div>{item.likeCount}</div>
                          <ThumbDownOutlinedIcon style={{ fontSize: "18px" }} className="hover:text-green-700 h-1 w-1 " />
                        </div>
                        <div className="mt-1 ml-5 w-14 pl-2 bg-gray-200 rounded-2xl p-1">
                          <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "18px" }} className="mr-2 text-sm " />
                          {item.commentCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="md:mt-20 pt-2 sm:mt-24 lg:-mt-2 xl:-mt-10 -mt-28 bg-zinc-100">
              {cardOpen &&
                postData
                .filter(item => item.likeCount >= 10)
                .map((item) => (
                  <div className="flex pb-4 mb-4 lg:mr-10 hover:bg-gray-200 hover:rounded-2xl border-b w-full sm:w-full 2xl:ml-12  lg:mb-10  xl:w-[45rem] 2xl:w-[49rem] xl:mt-2 lg:-mt-5 items-center pt-4 pl-7 pr-8  xl:mb-8   bg-white lg:w-[38rem] lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36 xl:mr-6 border border-gray-300 rounded-md">
                    <div className="pb-4">
                      {item.images == "" ? (
                        <p className="ml-8"></p>
                      ) : (
                        <div className="w-40 h-24 ">
                          <img
                            src={item.images}
                            alt=""
                            className="w-24 h-28 rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="-ml-10 mt-4">
                      <div className="flex">
                        {item.author.profileImage === null ? (
                          <p className="font-bold pl-2 pr-2 dark:text-gray-300 bg-gray-300 rounded-xl">
                            {item.author.name.charAt(0).toUpperCase()}
                          </p>
                        ) : (
                          <img
                            src={item.author.profileImage}
                            alt=""
                            className="h-6 w-6 rounded-3xl"
                          />
                        )}
                        <h1 className="font-semibold text-base ml-2 mr-2">
                          {item.author.name}
                        </h1>
                        .
                        {(
                          (new Date() - new Date(item.createdAt)) /
                          (1000 * 3600 * 24)
                        ).toFixed(0)}{" "}
                        days ago
                      </div>
                      <div>
                        <p className="mb-2  w-[18rem] sm:w-[30rem]  xl:w-[35rem] lg:w-[28rem] md:w-[37rem] 2xl:w-[39rem] mt-2">
                          {item.content}
                        </p>
                      </div>
                      <div
                        className="flex mt-3 pb-2 space-x-4"
                        onClick={() => setShowLogIn(!showLogIn)}
                      >
                        <div className="bg-gray-200 pt-2 rounded-3xl flex space-x-2 p-1 text-sm ">
                          <ThumbUpOutlinedIcon style={{ fontSize: "18px" }} className="hover:text-orange-500 h-1 w-1 " />
                          <div>{item.likeCount}</div>
                          <ThumbDownOutlinedIcon style={{ fontSize: "18px" }} className="hover:text-green-700 h-1 w-1 " />
                        </div>
                        <div className="mt-1 ml-5 w-14 pl-2 bg-gray-200 rounded-2xl p-1">
                          <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "18px" }} className="mr-2 text-sm " />
                          {item.commentCount}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {!sessionStorage.getItem("token") && (
          <div className="2xl:mt-20 xl:mt-20 lg:mt-20 xl:w-[19rem] 2xl:w-[17rem] lg:w-[15rem] bg-gray-50 rounded-2xl mt-9 2xl:ml-10 xl:ml-0 sm:invisible  md:invisible lg:visible xl:visible h-[43rem]">
            <h1 className="pt-7 pl-5 text-gray-600 text-base">
              POPULAR COMMUNITIES
            </h1>
            <div className="xl:w-[16rem] p-4 m-4 lg:w-[14rem]">
              {channelApi &&
                channelApi
                  .slice(0, showMore ? channelApi.length : 8)
                  .map((item) => (
                    <div className="hover:bg-gray-100 pl-2 pt-1 pb-1 flex space-x-3  mb-2">
                      {item.image == null ? (
                        <p className="mt-2 font-bold pl-2 pr-2 text-sm h-6 dark:text-gray-300 bg-gray-300 rounded-2xl">
                          {item.name.charAt(0).toUpperCase()}
                        </p>
                      ) : (
                        <img
                          src={item.image}
                          alt=""
                          className="h-6 w-6 rounded-3xl mt-2"
                        />
                      )}
                      <div>
                        <div className="text-[18px]">r/{item.name}</div>
                        <div className="text-xs text-gray-600">
                          {(
                            (new Date() - new Date(item.createdAt)) /
                            1000 /
                            3600 /
                            24
                          ).toFixed(0)}{" "}
                          days ago
                        </div>
                      </div>
                    </div>
                  ))}
              <button onClick={toggle}>
                {" "}
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Pupular;
