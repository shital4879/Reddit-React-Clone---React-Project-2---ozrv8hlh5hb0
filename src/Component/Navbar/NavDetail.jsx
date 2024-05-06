import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import AddSharpIcon from "@mui/icons-material/MenuSharp";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import TrendingUpSharpIcon from "@mui/icons-material/LogoutSharp";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ThemeContext } from "../Context/DarkTheme";
import { contextApi } from "../Context/ApiContext";
import { Mycontext } from "../../components/App";
import { NavLink, useNavigate } from "react-router-dom";
import Community from "../Detailing/Community";
// import {Mycontext} from "../../components/App"

const NavDetail = () => {
  const navigate = useNavigate();
  const {createCommunity, setCreateCommunity,openHome, setOpenHome} = useContext(Mycontext)
  // const [openHome, setOpenHome] = useState(false);
  const [comming, setComming] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { showLogIn, setShowLogIn, dataChannel,openPopular,setOpenPopular,} = useContext(Mycontext);
  const [openSearch, setOpenSearch] = useState(false);
  const [initial, setInitial] = useState('');
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { search, setSearch, fetchingData, channelApi } =
    useContext(contextApi);
  const signout = () => {
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const navigatetoChannel = (id) => {
    navigate(`/ChannelPage/${id}`);
  };

  useEffect(() => {
    const name= sessionStorage.getItem('name');
    if (name) {
        const exInitial = name.charAt(0).toUpperCase();
        setInitial(exInitial);
    }
}, []);

const navigatetoAuthordetail = (id, name) => {
  navigate(`/AuthorDetail/${id}/${name}`);
};


const navigatetoWorkProgress = () =>{
  navigate(`/WorkProgress`);
}

const storedData = JSON.parse(localStorage.getItem('UserInfo'));
// console.log(storedData.name);

// console.log(sessionStorage.getItem());
  return (
    <div>
      <div className="flex justify-evenly pl-2 pt-2 pb-10 relative h-14 border-b dark:border-gray-800 dark:bg-zinc-950 bg-gray-100 sm:w-dvw  md-w-dvw">
        <div className="">
          <Tippy content="Open navigation" className="text-[10px]">
          <div
            onClick={() => {setOpenHome(!openHome),channelApi}}
            className="relative flex mt-2 dark:text-white cursor-pointer sm:pl-4 md:pl-4 visible 2xl:invisible md:visible sm:visible xl:invisible lg:invisible"
          >
            <MenuSharpIcon className="" />
          </div>
          </Tippy>
         
        </div>
        <div className="absolute -ml-[13rem] sm:-ml-[20rem] -mt-7 md:-ml-[30rem] lg:-ml-[42rem]">
          {openHome && (
            <Community onClick={()=>{setOpenHome(!openHome)}} className="z-50 md:-mt-10 "/>
          )}
          </div>
        <Tippy content="Go to Reddit Home" className="mt-6 ml-10 text-[10px]">
        <div className="flex 2xl:w-12 ml-5 2xl:mr-28 2xl:-ml-36 xl:-ml-64 lg:-ml-40" onClick={()=>navigate("/Detail")}>
          <img src="/logo.webp" alt="" className="h-9 w-9 mr-3" />
          <h2 className="text-3xl text-orange-500 font-bold invisible lg:visible">
            reddit
          </h2>
        </div>
        </Tippy>

        <div className="bg-gray-200 w-[13rem] h-11 2xl:ml-20 2xl:w-[45rem] xl:w-[35rem] -ml-10 float-start space-x-2 pl-3 rounded-3xl pt-2 dark:bg-slate-900 sm:-ml-4 sm:w-[20rem] sm:mr-2 md:-ml-4 md:w-[25rem] md:mr-2 ">
          <div className="flex items-center">
            <SearchIcon className="dark:text-slate-400" />
            <input
              type="search"
              name
              search
              placeholder="Search Reddit"
              className="bg-gray-200 text-lg border-none outline-none ml-2 dark:text-gray-200 dark:bg-slate-900 w-[100%] rounded-3xl sm:w-[100%] lg:w-[25rem]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={(e) => {
                setOpenSearch(!openSearch);
              }}
            />
          </div>
          {openSearch && (
            <div className="w-[100%] mt-4 p-4 shadow-2xl z-50 overflow-auto h-[30rem] bg-white rounded-lg dark:bg-slate-900 dark:text-gray-200">
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
                        setSearch(item.author.name), setOpenSearch(!openSearch),navigatetoAuthordetail(
                          item._id,
                          item.author.name
                        );
                      }}
                      className="mb-4 mt-4 "
                    >
                      <div className="text-base font-semibold">
                        {item.author.name}
                      </div>
                      <div className="flex text-sm text-gray-600 space-x-7 mr-2 mt-1 justify-between">
                        <div>{item.content}</div>
                        
                            {item.images == "" ? (
                              <p className="ml-8"></p>
                            ) : (
                              <img
                                src={item.images}
                                alt=""
                                className="rounded-xl w-20 h-20"/>
                            )}
                          
                      </div>
                      <div className="flex mt-3">
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
                        <p className="flex text-sm text-gray-600 space-x-6 mb-4">
                          {item.author.name}
                        </p>
                      </div>
                      <hr />
                    </div>
                  ))}
            </div>
          )}
        </div>

        <div className="flex   ">
          <div className="flex 2xl:mr-15 mt-2  text-gray-600  lg:-ml-10 lg:mr-28 -mr-12 pl-2" >
            <div className="lg:mr-6 flex">
            <div onClick={()=>navigate("/CreatePost")}>
              <Tippy content="Create Post" className="text-xs">
              <AddOutlinedIcon className="sm:mr-3  md:mr-3 md:ml-5 cursor-pointer "/>
            </Tippy>
            </div>
            {/* <div onClick={()=>setOpenPopular(!openPopular)}>
              <Tippy content="Popular" className="text-xs">
            <OutboundOutlinedIcon className="md:-mr-5 sm:-mr-5 cursor-pointer" />
            </Tippy>
            </div> */}
            </div>
            <div
              className="flex 2xl:space-x-4 2xl:mr-5  text-gray-600 invisible lg:visible lg:space-x-3 lg:mr-4 lg:-ml-3"
              
            >
              <div>
              <Tippy content="Open chat" className="text-xs">
                <ChatOutlinedIcon 
                className="cursor-pointer"
                onClick={()=>navigatetoWorkProgress()}
                />
                </Tippy>
              </div>

              <div>
              <Tippy content="Open inbox" className="text-xs">
                <NotificationsNoneIcon      className="cursor-pointer"
                onClick={()=>navigatetoWorkProgress()}/>
                </Tippy>
              </div>
              <div>
              <Tippy content="Advertise" className="text-xs">
                <PodcastsIcon        className="cursor-pointer"
                onClick={()=>navigatetoWorkProgress()}/>
                </Tippy>
              </div>
            </div>

            {comming && (
              <div className="flex justify-center items-center fixed">
                <div className="-ml-96 mt-14">
                  <img
                    src="/coming.avif"
                    alt=""
                    className="z-50 w-[35rem] h-[30rem] rounded-2xl"
                  />
                </div>
              </div>
            )}
          </div>
          <Tippy content="Open profile menu" className="text-xs">
          <div
            onClick={() => setShowOptions(!showOptions)}
            className="cursor-pointer flex justify-between items-center border-solid h-10 border-gray-400 border rounded-md 2xl:w-36 pl-2 pr-2 sm:mr-4 sm:w-24 md:mr-4 md:w-24 xl:-mr-24 lg:-mr-14 lg:-ml-10 2xl:-mr-4 mr-2 w-20"
          >
            <img
              className="h-6 w-6 rounded-lg"
              src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
              alt=""
            />
            <div>
            <p className="font-bold p-1 dark:text-gray-300 2xl:-ml-8 xl:ml-2 -ml- ">{storedData.name.charAt(0).toUpperCase()}</p>
            {/* <p className="flex">1 karma</p> */}
            </div>
            <KeyboardArrowDownOutlinedIcon className="dark:text-white" />
          </div>
          </Tippy>
          {showOptions && (
            <div className="z-50 bg-white dark:bg-zinc-950 dark:border-gray-700 dark:border absolute w-56 pl-4 pt-3 top-2/4 mt-7 ml-10 right-14 space-y-2 shadow-md p-6 rounded-lg sm:-mr-10 md:-mr-10 lg:ml-20" >
              {/* <div>
                <div className="flex space-x-2 text-gray-400 text-lg">
                  <AccountCircleSharpIcon className="mr-2 mt-1 h-12 w-12" />
                  My Stuff
                </div>
                <div className="ml-10 mt-3 text-lg dark:text-white">
                  Profile
                </div>
              </div> */}
              {/* <hr /> */}
              <div>
                <div className="flex space-x-2 text-gray-400 text-lg">
                  <VisibilitySharpIcon className="mr-2 mt-1 h-12 w-12" />
                  View Options
                </div>
                <button
                  onClick={()=>{toggleDarkMode(),setShowOptions(!showOptions)}}
                  className="ml-10 mt-3 text-lg w-18 dark:text-white"
                >
                  {
                    darkMode ? "Light Mode": "Dark Mode"
                  }
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
        {/* )} */}
      </div>
    </div>
  );
};

export default NavDetail;
