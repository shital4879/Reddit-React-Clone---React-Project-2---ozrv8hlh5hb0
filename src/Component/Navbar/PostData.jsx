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


const PostData = () => {
  const {darkMode,setDarkMode,toggleDarkMode} = useContext(Mycontext);
  const{showLogIn,setShowLogIn} = useContext(Mycontext)
  const navigate = useNavigate();
  const [postData, setPostData] = useState();
  const [showMore, setShowMore] = useState(false);
  const [fetchingData, setFetchingData] = useState();
  // const {showLogIn} = props
  // const fetchingData = props
  console.log(showLogIn);

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

  const searchData = async () => {
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
      setFetchingData(result.data);
      console.log("lo", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchData();
  }, []);
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

  return (
    <div 
    // className={`${darkMode && "dark"}`}
    >
    <div className="xl:flex lg:flex border-r-2 pb-4">
    
      <div className=" mt-7 xl:w-[18rem] flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14 lg:w-[14rem] md:w-[10rem] sm:invisible  md:invisible lg:visible xl:visible invisible">
        {!localStorage.getItem("token") && (
          <div>
            <ul>
              <li>
                <NavLink to="/" className="active:bg-red-600 active:">
                  <HomeIcon /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/popular" className="active:bg-red-600">
                  <OutboundOutlinedIcon /> Popular
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {localStorage.getItem("token") && <div className="w-60"></div>}
      </div>
      <div className="">
        {localStorage.getItem("token") && (
          <div>
            <div className="flex border-gray-400 border  rounded-sm p-2 mt-8 bg-white dark:bg-black">
              <img
                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                alt=""
                className="w-9 h-9 mr-8 rounded-2xl "
              />
              
              <input
                type="text"
                value="Create Post"
                className="border w-[30rem] pl-3 rounded-sm bg-gray-100 "
              />
            </div>

            <div className="flex space-x-6 mt-8 bg-white p-3  rounded-sm dark:bg-gray-900">
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
              <NavLink>
              
              </NavLink>
            </div>
          </div>
        )}

        <div className=" border-l pt-10">
          {postData &&
            postData.map((item) => (
              <div className="">
                <div className="shadow-md w-[36rem] -mt-24 h-full mb-24 xl:w-[49rem] xl:ml-8 xl:mt-2 lg:-mt-5 items-center justify-center pt-4 pl-7 pr-8  xl:mb-8 md:-mb-2 md:-mt-24  bg-white  rounded-xl  lg:w-[42rem] lg:h-auto md:w-full md:h-[55rem] sm:-mt-24 sm:h-auto sm:mb-24">
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
                    <div className=" flex items-center justify-start ">
                      <img src={item.images} alt="" className="rounded w-[50rem] h-50rem "/>
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

      {!localStorage.getItem("token") && (
        <div className=" xl:w-[19rem] bg-gray-50 rounded-2xl mt-9 ml-10 lg:w-[17rem] sm:invisible  md:invisible lg:visible xl:visible">
          <h1 className="pt-7 pl-5 text-gray-600 text-base">
            POPULAR COMMUNITIES
          </h1>
          <div className="xl:w-[16rem] p-4 bg-gray-100 m-4 lg:w-[14rem]">
            {fetchingData &&
              fetchingData
                .slice(0, showMore ? fetchingData.length : 8)
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
                        {item.createdAt}
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
      {localStorage.getItem("token") && (
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
  );
};

export default PostData;
