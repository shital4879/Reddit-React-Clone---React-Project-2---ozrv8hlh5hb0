import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {ApiContext, contextApi} from '../Component/Context/ApiContext';
import NavDetail from '../Component/Navbar/NavDetail';
import { ThemeContext } from '../Component/Context/DarkTheme';

const AuthorDetail = () => {
    const {postData,channelApi} = useContext(contextApi)
    const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
const params = useParams();

const redditdata = async() =>{
    try{
        const responce = await fetch (`https://academics.newtonschool.co/api/v1/reddit/channel/64e46da516ffad905d724fb8/posts`,{
            method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        })
        const result = await responce.json();
        console.log(result,"kkkk");
    }
 catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  redditdata();
}, []);






  return (
    <div className={darkMode ? "dark" : ""}>
    <NavDetail/>

     <div className='flex'>
        <div>
{
    postData &&
    postData.filter((item)=>(
        item.author.name === params.id
    )).map((item)=>(
        <div className="" >
        <div className="shadow-md w-[48rem] mt-5 items-center justify-center pt-4 pl-14 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900">
          <div className="flex items-center">
            <div className="flex"  onClick={()=>navigatetoAuthordetail(item.author.name)}>
              <img
                src={item.author.profileImage}
                alt=""
                className="h-6 w-6 rounded-3xl"
              />
              <h1 className="font-semibold text-base ml-2 mr-2" >
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
    ))
}
     </div>
     <div>
        {
            channelApi && channelApi.filter((item)=>(
                item.owner.name === params.id
            )) .slice(0,1).map((item)=>(
                <div>

{item.name}
                </div>
            ))
        }
     </div>
     </div>
     <div>

     </div>
    </div>
  )
}

export default AuthorDetail
