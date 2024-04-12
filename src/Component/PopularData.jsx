import React, { useState ,useEffect, useContext} from 'react'
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HomeIcon from "@mui/icons-material/Home";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { NavLink } from "react-router-dom";
import { contextApi } from './Context/ApiContext';
import { ThemeContext } from './Context/DarkTheme';

const Pupular = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const{postData, setPostData,channelApi,setChannelApi} = useContext(contextApi);
    const [showMore, setShowMore] = useState(false);

      const toggle = () => {
        setShowMore(!showMore);
      };

    
  


  return (
    <div className={darkMode ? "dark" : ""}>
    <div className='flex dark:bg-black dark:text-gray-200'>

<div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14  ">
        <div>
          <ul>
            <li className="w-96  pb-1 pl-5 pr-5">
              <NavLink to="/">
                <HomeIcon /> Home
              </NavLink>
            </li>
            <li className="mb-2 mt-3 bg-gray-300 w-[15rem] pt-1 pb-1 pl-5 pr-5 ">
              <NavLink to="/popular">
                <OutboundOutlinedIcon /> Popular
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

       <div>
          {postData &&
            postData.filter((item) =>(
                item.likeCount > 4
            ))
              .map((item) => (
              <div className="">
                <div className="mt-5 shadow-md w-[41rem]  rounded-lg pt-4 pl-2 mb-8 dark:text-gray-200 dark:border-gray-900 dark:bg-black">
                    <div className="flex">
                  <div className="flex">
                    <img
                      src={item.author.profileImage}
                      alt=""
                      className="h-6 w-6 rounded-3xl"
                      />
                      <h1 className="font-semibold text-base ml-2 mr-2">{item.author.name}</h1>
                     
                  </div>
                  <div className="text-gray-500 text-sm">{((new Date() - new Date(item.createdAt))/1000/3600/24).toFixed(0)} days ago</div>
                </div>
                <div>
                    <p className="mb-2">{item.content}</p>
                    <img src={item.images} alt="" className="rounded-xl"/>
                </div>
                <div className="flex mt-3 pb-5 space-x-4">
                    <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950" >
                        <ArrowUpwardOutlinedIcon className="hover:text-orange-500 h-1 w-1"/> 
                        <div>{item.likeCount}</div>
                    <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1"/></div>
                    <div><ChatBubbleOutlineOutlinedIcon className="mr-2"/>{item.commentCount}</div>
                </div>
                </div>
              </div>
            ))}
        </div>

        <div>

       
        <div className=" w-[21rem] bg-gray-100 rounded-2xl mt-3 ml-12">
          <h1 className="pt-7 pl-5 text-gray-500 text-base">
            POPULAR COMMUNITIES
          </h1>
          <div className="w-[17rem] p-4 bg-gray-200 m-4">
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

         
        </div>

    </div>
    </div>
  )
}

export default Pupular
