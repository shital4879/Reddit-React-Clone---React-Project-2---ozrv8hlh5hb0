import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ApiContext, contextApi } from "../Component/Context/ApiContext";
import NavDetail from "../Component/Navbar/NavDetail";
import { ThemeContext } from "../Component/Context/DarkTheme";

const AuthorDetail = () => {
  const { postData, channelApi, fetchingData } = useContext(contextApi);
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [followid, setFollowid] = useState(true);
  const [status, setStatus] = useState(false);
  const [redditdata, setRedditdata] = useState();

  const params = useParams();

  // const redditdata = async() =>{
  //     try{
  //         const responce = await fetch (`https://academics.newtonschool.co/api/v1/reddit/channel/:${params.id}/posts`,{
  //             method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //             projectID: "ozrv8hlh5hb0",
  //           },
  //           // "Content-Type": "application/json",
  //         })
  //         const result = await responce.json();
  //         console.log(result,"kkkk");
  //     }
  //  catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   redditdata();
  // }, []);

  const upvoteApi = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            projectID: "ozrv8hlh5hb0",
          },
          // "Content-Type": "application/json",
        }
      );

      const result = await responce.json();
      console.log(result, "kkkk");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    upvoteApi();
  }, []);

  // const subredditApi = async () =>{
  //   try{
  //     const responce = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${params.id}`,{
  //       method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //             projectID: "ozrv8hlh5hb0",
  //           },
  //     })
  //     const result = await responce.json();
  //     setRedditdata(result.data)
  //     console.log(result, "kkkk");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   subredditApi();
  // }, []);
  // console.log(subredditApi);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day},${year.toString()}`;
  }

  const [message, setMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const handleToggle = (name) => {
    setIsFollowing(prevState => !prevState);
    setMessage(
      // (<img src="/11p.png" alt="" className="text-black w-6 h-4"/>),
      isFollowing ? `👎 You unfollowed ${name}` :`👍 You followed ${name}`);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <NavDetail />

      <div className="flex justify-center dark:bg-zinc-950">
        <div>
          {postData &&
            postData
              .filter((item) => params.name === item.author.name)
              .map((item) => (
                <div className="shadow-md w-[48rem] mt-5 items-center justify-center pt-4 pl-14 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 ">
                  <div className="flex items-center">
                    <div
                      className="flex"
                      // onClick={() => navigatetoAuthordetail(item.author.name)}
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
                      <img src={item.images} alt="" className="rounded" />
                    </div>
                  </div>
                  <div className="flex mt-3 pb-5 space-x-4">
                    <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                      <ArrowUpwardOutlinedIcon
                        className="hover:text-orange-500 h-1 w-1"
                        onClick={() => upvoteApi}
                      />
                      <div>{item.likeCount}</div>
                      <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1" />
                    </div>
                    <div>
                      <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                      {item.commentCount}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="w-64 rounded-md h-80 mt-5 ml-5 shadow-lg  border-gray-400 border ">
          {fetchingData &&
            fetchingData
              .filter((item) => params.id === item._id)
              .map((item) => (
                <div>
                  <div className="h-20 bg-pink-500"></div>

                  {item.author.profileImage === null ? (
                    <img
                      src="/user.png"
                      alt=""
                      className="h-20 w-20 -mt-8 ml-4 p-1 bg-white"
                    />
                  ) : (
                    // <h1 > {(item.author.name).charA}</h1>:
                    <img
                      src={item.author.profileImage}
                      alt=""
                      className="h-20 w-20 -mt-8 ml-4 p-1 bg-white"
                    />
                  )}

                  {/* <img src={item.author.profileImage === "" ? : item.author.profileImage} alt="" className="h-20 w-20 -mt-8 ml-4 p-1 bg-white" /> */}
                  <div className="ml-4 text-sm mb-4">
                    <h1 className="text-[17px] font-semibold">Name</h1>
                    {item.author.name}
                  </div>
                  <div className="ml-4 text-sm">
                    <h1 className="text-[17px] font-semibold">Created on</h1>
                    {formatDate(item.createdAt)}
                  </div>

                 <div>
                 <button onClick={()=>{handleToggle(item.author.name)}} className="ml-4 mt-5 rounded-xl bg-pink-500 pl-4 pr-4 pt-1 pb-1 text-white">
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      <p className="bg-slate-800 pl-3 pr-3 h-7 text-white mt-20">
        {message} </p>
                 </div>
                </div>
              ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AuthorDetail;
