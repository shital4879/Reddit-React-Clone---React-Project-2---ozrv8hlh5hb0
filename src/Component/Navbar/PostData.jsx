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
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {Mycontext} from "../../components/App"
import { contextApi } from "../Context/ApiContext";


const PostData = () => {
  const {darkMode,setDarkMode,toggleDarkMode} = useContext(Mycontext);
  const{showLogIn,setShowLogIn} = useContext(Mycontext)
  const{postData,setPostData,channelApi,setChannelApi} = useContext(contextApi)
  const navigate = useNavigate();
  
  // console.log(postData,"post");
  const [showMore, setShowMore] = useState(false);
  // const [fetchingData, setFetchingData] = useState();
  // const {showLogIn} = props
  // const fetchingData = props
  // console.log(showLogIn);

 
  // ----------------------------------------------------------------------------------------------------------------

  const toggle = () => {
    setShowMore(!showMore);
  };

  // const searchData = async () => {
  //   try {
  //     const responce = await fetch(
  //       `https://academics.newtonschool.co/api/v1/reddit/channel/`,
  //       {
  //         // method: "GET",
  //         headers: {
  //           projectID: "ozrv8hlh5hb0",
  //           // "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const result = await responce.json();
  //     setFetchingData(result.data);
  //     console.log("lo", result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   searchData();
  // }, []);
  // function handleSearch() {
  //   searchData()
  //     .then((response) => {
  //       if (response) {
  //         setFetchingData(response.data);

  //         console.log("hanlde", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }



const activelink = "bg-gray-500,text-red-400";
const normallink  = "";
const userdata = JSON.parse(localStorage.getItem("UserInfo"))

  return (
    <div 
    className={`${darkMode && "dark"}`}
    >
    <div className="xl:flex lg:flex border-r-2 pb-4">
    
      <div className=" mt-7 xl:w-[12rem] 2xl:w-[15rem] flex justify-between  pr-12 pt-3 pb-2 relative h-14 lg:w-[14rem] md:w-[10rem]  sm:invisible  md:invisible lg:invisible xl:visible invisible">
          <div >
            <ul >
              <li className="mb-2 bg-gray-200 w-[15rem] pt-1 pb-1 pl-5 pr-5 z-0 xl:w-[12rem] 2xl:w-[15rem]">
                <NavLink to="/" className={({isActive})=>isActive?activelink:normallink} >
                  <HomeIcon /> Home
                </NavLink>
              </li>
              <li className="pl-5">
                <NavLink to="/popular" className={({isActive})=>isActive?activelink:normallink}>
                  <OutboundOutlinedIcon /> Popular
                </NavLink>
              </li>
            </ul>
          </div>
        
        {localStorage.getItem("token") && <div className="w-60"></div>}
      </div>
      <div className="">
       
        <div className=" border-l pt-10">
          {postData &&
            postData.map((item) => (
              <div className="flex justify-center items-center">
                <div className="shadow-md w-full sm:w-full 2xl:ml-8 -mt-28  lg:mb-10 mb-32 xl:w-[49rem] xl:mt-2 lg:-mt-5 items-center justify-center pt-4 pl-7 pr-8  xl:mb-8 md:-mt-24  bg-white  rounded-xl  lg:w-[42rem] lg:h-auto md:w-full  sm:-mt-28 sm:h-auto sm:mb-36 lg:-ml-40 xl:ml-0">
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

        <div className=" xl:w-[19rem] bg-gray-50 rounded-2xl mt-9 2xl:ml-10 xl:ml-0 lg:w-[17rem] sm:invisible  md:invisible lg:visible xl:visible h-auto z-index-50">
          <h1 className="pt-7 pl-5 text-gray-600 text-base">
            POPULAR COMMUNITIES
          </h1>
          <div className="xl:w-[16rem] p-4 bg-gray-100 m-4 lg:w-[14rem]">
            {channelApi &&
              channelApi
                .slice(0, showMore ? channelApi.length : 8)
                .map((item) => (
                  <div className="flex space-x-3  mb-2">
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
     
    </div>
    </div>
  );
};

export default PostData;
