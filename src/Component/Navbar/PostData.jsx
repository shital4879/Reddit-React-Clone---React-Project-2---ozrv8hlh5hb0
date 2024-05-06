import React, { useContext, useEffect, useState } from "react";
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
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewAgendaSharpIcon from "@mui/icons-material/ViewAgendaSharp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Mycontext } from "../../components/App";
import { contextApi } from "../Context/ApiContext";
import Tippy from "@tippyjs/react";

const PostData = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(Mycontext);
  const { showLogIn, setShowLogIn } = useContext(Mycontext);
  const { postData, setPostData, channelApi, setChannelApi } =
    useContext(contextApi);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [opendrop, setOpenDrop] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("card");

  const handleclickcard = (itemname) => {
    setActiveItem(itemname === activeItem ? null : itemname);
  };
  console.log(postData);

  const toggle = () => {
    setShowMore(!showMore);
  };
  const userdata = JSON.parse(localStorage.getItem("UserInfo"));

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="xl:flex lg:flex border-r  pb-4  ">
        <div className="2xl:mt-16 sm:mt-16 lg:mt-16 mt-7 xl:w-[14rem] 2xl:w-[16rem] flex justify-between  pr-12 pt-3 pb-2 relative h-14 lg:w-[10rem] md:w-[10rem]  sm:invisible  md:invisible lg:visible xl:visible invisible">
          <div>
            <ul>
              <li className="mb-2 bg-gray-200 w-[15rem] pt-1 pb-1 pl-5 pr-5 z-0  2xl:w-[13rem] ml-5 rounded-lg xl:w-[12rem] lg:w-[8rem]">
                <NavLink to="/">
                  <HomeIcon /> Home
                </NavLink>
              </li>
              <li className="pl-5 ml-5 hover:bg-gray-200 pt-1 pb-1  2xl:w-[13rem] rounded-lg lg:w-[8rem] xl:w-[12rem]">
                <NavLink to="/popular">
                  <OutboundOutlinedIcon /> Popular
                </NavLink>
              </li>
            </ul>
          </div>

          {localStorage.getItem("token") && <div className="w-60"></div>}
        </div>
        <div className="">
          <div className="border-l border-solid border-gray-300 pt-10">
            <Tippy content="Change post view" className="text-[10px]" placement="bottom">
            <div
              className={` 2xl:mt-8 xl:mt-8 sm:-mt-24 lg:mt-8 -mt-10 md:-mt-24 relative  2xl:ml-24 sm:ml-14 ml-10 xl:-mt-5  md:ml-14 xl:ml-14 text-gray-500 mb-3 hover:bg-gray-100 w-14 p-1 rounded-2xl ${
                activeItem === "compact" ? "mr-10" : ""
              }`}
              onClick={() => setOpenDrop(!opendrop)}
            >
              <ViewAgendaOutlinedIcon />
              <KeyboardArrowDownOutlinedIcon />
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
                    <ViewAgendaSharpIcon className="text-gray-500" />
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
                    <TableRowsIcon className="text-gray-500" />
                    <p>Compact</p>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className="md:mt-24 sm:mt-28 mt-28 lg:mt-10">
              {postData &&
                !cardOpen &&
                postData.map((item) => (
                  <div className="flex justify-center items-center  ml-8 ">
                    <div className="hover:bg-gray-100 hover:rounded-2xl md:-ml-6 sm:-ml-6  border-b mb-10 w-full sm:w-full 2xl:ml-8 2xl:mr-8 -mt-28  lg:mb-10  xl:w-[49rem] xl:mt-2 lg:-mt-5 items-center justify-center pt-4 pl-7 pr-8  xl:mb-8 md:-mt-24  bg-white lg:w-[40rem] lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36 lg:-ml-8 lg:mr-8 xl:-ml-6 xl:-mr-7 2xl:-mt-3">
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
                          <ArrowUpwardOutlinedIcon className="hover:text-orange-500 h-1 w-1 text-gray-800" />
                          <div>{item.likeCount}</div>
                          <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1 text-gray-800 " />
                        </div>
                        <div className="mt-1 ml-5 w-14 pl-2 rounded-2xl p-1 bg-gray-200">
                          <ChatBubbleOutlineOutlinedIcon className="mr-2 text-sm " />
                          {item.commentCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="md:mt-20 pt-2 sm:mt-24 lg:-mt-2 xl:-mt-10 -mt-28 bg-white">
              {cardOpen &&
                postData.map((item) => (
                  <div className="flex pb-4 mb-4 lg:mr-10 hover:bg-gray-100 hover:rounded-2xl border-b w-full sm:w-full 2xl:ml-8 2xl:w-[50rem] lg:mb-10  xl:w-[45rem] xl:mt-2 lg:-mt-5 items-center pt-4 pl-7 pr-8  xl:mb-8   bg-white lg:w-[38rem] lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36  xl:mr-6">
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
                        <p className="mb-2 mt-2 2xl:w-[40rem] w-[18rem] sm:w-[30rem]  xl:w-[35rem] lg:w-[28rem] md:w-[37rem] ">
                          {item.content}
                        </p>
                      </div>
                      <div
                        className="flex mt-3 pb-2 space-x-4"
                        onClick={() => setShowLogIn(!showLogIn)}
                      >
                        <div className="bg-gray-200 pt-2 rounded-3xl flex space-x-2 p-1 text-sm ">
                          <ThumbUpIcon className="hover:text-orange-500 h-1 w-1 text-gray-600" />
                          <div>{item.likeCount}</div>
                          <ThumbDownIcon className="hover:text-green-700 h-1 w-1 text-gray-600 " />
                        </div>
                        <div className="mt-1 ml-5 w-14 pl-2 bg-gray-200 rounded-2xl p-1">
                          <ChatBubbleOutlineOutlinedIcon className="mr-2 text-sm " />
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

        <div className="2xl:mt-20 2xl:ml-10 2xl:w-[17rem] sm:mt-20 xl:w-[15rem] xl:ml-10 lg:-ml-8 bg-gray-50 rounded-xl mt-11  lg:w-[14rem] sm:invisible  md:invisible lg:visible xl:visible h-auto z-index-50">
          <h1 className="pt-7 pl-5 text-gray-600 text-base h-auto">
            POPULAR COMMUNITIES
          </h1>
          <div className="xl:w-[16rem] p-4 m-4 lg:w-[12rem] ">
            {channelApi &&
              channelApi
                .slice(0, showMore ? channelApi.length : 8)
                .map((item) => (
                  <div className="hover:bg-gray-100 pl-2 pt-1 pb-1 flex space-x-3  mb-2">
                    {item.image == null ? (
                      <p className="mt-2 font-bold h-8 items-center flex justify-center w-8 text-[15px] dark:text-gray-300 bg-gray-300 rounded-2xl">
                        {item.name.charAt(0).toUpperCase()}
                      </p>
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        className="h-8 w-8 rounded-3xl mt-2"
                      />
                    )}
                    <div>
                      <div className="text-[18px] text-sm mt-2">
                        r/{item.name}
                      </div>
                      <div className="text-xs text-gray-500">
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
            <button onClick={toggle} className="text-xs font-bold ">
              {" "}
              {showMore ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostData;
