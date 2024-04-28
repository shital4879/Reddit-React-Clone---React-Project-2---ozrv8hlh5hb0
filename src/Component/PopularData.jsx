import React, { useState ,useEffect, useContext, useRef} from 'react'
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SecurityIcon from "@mui/icons-material/MoreHoriz";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { contextApi } from './Context/ApiContext';
import { ThemeContext } from './Context/DarkTheme';
import { Mycontext } from '../components/App';

const Pupular = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const{showLogIn,setShowLogIn} = useContext(Mycontext);
    const{postData, setPostData,channelApi,setChannelApi} = useContext(contextApi);
    const{search,setSearch,fetchingData,setFetchingData} = useContext(contextApi)

    const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showopt, setShowopt] = useState(false);
  const [showAppLink, setShowAppLink] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  
  const searchinput = useRef()
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
    const [showHam,setShowHam] = useState(false);

      const toggle = () => {
        setShowMore(!showMore);
      };

    
  


  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="xl:flex lg:flex border-r-2 pb-4">
    
    <div className=" mt-7 xl:w-[12rem] 2xl:w-[15rem] flex justify-between  pr-12 pt-3 pb-2 relative h-14 lg:w-[14rem] md:w-[10rem]  sm:invisible  md:invisible lg:invisible xl:visible invisible">
   
        <div >
          <ul >
              <li className="pl-5">
                <NavLink to="/"  >
                  <HomeIcon /> Home
                </NavLink>
              </li>
              <li  className="mb-2 bg-gray-200 w-[15rem] pt-1 pb-1 pl-5 pr-5 z-0 xl:w-[12rem] 2xl:w-[15rem]">
                <NavLink to="/popular">
                  <OutboundOutlinedIcon /> Popular
                </NavLink>
              </li>
            </ul>
        </div>
    
    </div>
    <div className="">

      <div className=" border-l pt-10">
        {postData &&
          postData.filter((item)=>(
            item.likeCount >= 10
          ))
          
          .map((item) => (
            <div className="flex justify-center items-center">
              <div className="shadow-md w-full xl:ml-0 sm:w-full 2xl:ml-8 -mt-28 lg:-ml-36 lg:mb-10 mb-32 xl:w-[49rem] xl:mt-2 lg:-mt-5 items-center justify-center pt-4 pl-7 pr-8  xl:mb-8 md:-mt-24  bg-white  rounded-xl  lg:w-[42rem] lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36">
                <div className="flex items-center">
                  <div className="flex">
                  {item.author.profileImage === null ? (
                                    <p className="font-bold pl-2 pr-2 dark:text-gray-300 bg-gray-300 rounded-xl">
                                      {userdata.name.charAt(0).toUpperCase()}
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
                    {((new Date() - new Date(item.createdAt))/(1000*3600*24)).toFixed(0)} days
                  </div>
                </div>
                <div>
                  <p className="mb-2 w-[20rem] sm:w-[35rem] md:w-[40rem]  ">{item.content}</p>
                  <div className=" flex items-center justify-start ">
                    <img src={item.images} alt="" className="rounded w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"/>
                  </div>
                </div>
                <div className="flex mt-3 pb-5 space-x-4" onClick={()=>setShowLogIn(!showLogIn)}>
                  <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm">
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

    {!sessionStorage.getItem("token") && (
      <div className=" xl:w-[19rem] bg-gray-50 rounded-2xl mt-9 2xl:ml-10 xl:ml-0 lg:w-[17rem] sm:invisible  md:invisible lg:visible xl:visible h-[43rem]">
        <h1 className="pt-7 pl-5 text-gray-600 text-base">
          POPULAR COMMUNITIES
        </h1>
        <div className="xl:w-[16rem] p-4 bg-gray-100 m-4 lg:w-[14rem]">
          {channelApi &&
            channelApi
              .slice(0, showMore ? channelApi.length : 8)
              .map((item) => (
                <div className="flex space-x-3 ">
                  <img
                    src={item.image}
                    alt=""
                    className="w-8 h-8 rounded-2xl mb-6 mt-3"
                  />
                  <div>
                    <div className="text-[18px]">{item.name}</div>
                    <div className="text-xs text-gray-600">
                      {((new Date() - new Date(item.createdAt))/1000/3600/24).toFixed(0)} days ago
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
    {sessionStorage.getItem("token") && (
      <div>
      <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[6rem] w-[19rem] rounded-sm bg-white ">
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
          onClick={()=>{navigate("/premium")}}
          className="bg-orange-600 w-[17rem]  rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-white text-sm">
            
            Try now
          </button>
        </div>
      </div>

      <div className="mt-8 ml-12 mr-14 border-gray-400 border h-[15rem] w-[19rem] rounded-sm bg-white">
        <img src="https://reddit-ten-mocha.vercel.app/home-banner.png" alt="" />
        <img src="	https://reddit-ten-mocha.vercel.app/snoo.png" alt="" className="h-16 -m-1 ml-3"/>
        <p className="text-sm p-2 border-b border-gray-300">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
        <div className="flex justify-center mt-3">
          <button 
          onClick={()=>navigate(`CreatePost`)}
          className="bg-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-white text-sm">
           Create Post
          </button>
        </div>
        <div className="flex justify-center mt-3">
          <button className="border-blue-700 border text-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-sm">
           Create Community
          </button>
        </div>
        <hr/>
      </div>
      </div>
    )}
  </div>

     
    </div>
  )
}

export default Pupular
