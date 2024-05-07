import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ApiContext, contextApi } from "../Component/Context/ApiContext";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeIcon from "@mui/icons-material/AddOutlined";
import OutboundOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavDetail from "../Component/Navbar/NavDetail";
import { ThemeContext } from "../Component/Context/DarkTheme";
import { likeContext } from "../Component/Context/Like";
import Community from "../Component/Detailing/Community";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Mycontext } from "../components/App";
import HomeNav from "../Component/Detailing/HomeNav";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const { postData, channelApi, fetchingData, PostApi } =
    useContext(contextApi);
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { createCommunity, setCreateCommunity, openPopular, setOpenPopular } =
    useContext(Mycontext);
  const [openRecents, setOpenRecents] = useState(false);
  const [opencommun, setOpenCommun] = useState(false);
  // const {upvoteApi} = useContext(likeContext)
  const [followid, setFollowid] = useState(true);
  const [status, setStatus] = useState(false);
  const [redditdata, setRedditdata] = useState();

  const params = useParams();
  const upvoteApi = async (postId) => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "ozrv8hlh5hb0",
          },
          // "Content-Type": "application/json",
        }
      );

      const result = await responce.json();
      PostApi();

      console.log(result, "kkkk");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // upvoteApi();
  }, []);

  const downvoteApi = async (postId) => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "ozrv8hlh5hb0",
          },
          // "Content-Type": "application/json",
        }
      );

      const result = await responce.json();
      PostApi();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // downvoteApi();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day},${year.toString()}`;
  }

  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const handleToggle = (name) => {
    setIsFollowing((prevState) => !prevState);
    setMessage(
      // (<img src="/11p.png" alt="" className="text-black w-6 h-4"/>),
      isFollowing ? `👎 You unfollowed ${name}` : `👍 You followed ${name}`
    );
  };

  const navigatetoCommentsPage = (id, iid) => {
    navigate(`/CommentsPage/${id}/${iid}`);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="fixed bg-white z-50 dark:bg-zinc-950 " >
        <NavDetail />
      </div>
      <div className="flex dark:bg-zinc-950 bg-gray-100">
        <HomeNav />
        <div className="2xl:ml-14 pb-36 sm:-ml-[21rem] 2xl:flex md:-ml-[21rem] lg:-ml-[5rem] -ml-[21rem] xl:-ml-[2rem] xl:flex xl:justify-center lg:flex 2xl:justify-center lg:justify-center dark:bg-zinc-950 bg-gray-100">
          <div className="dark:bg-zinc-950">
            {postData &&
              postData
                .filter((item) => params.name === item.author.name)
                .map((item) => (
                  <div className="2xl:mt-20 lg:pt-8 xl:mt-20 md:pt-20 sm:pt-20 pt-20 lg:ml-24 lg:mt-20 w-dvw shadow-md 2xl:w-[48rem] items-center justify-center  pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-0 sm:w-dvw md:w-dvw  lg:-pl-6 lg:w-[30rem] xl:w-[40rem]  xl:ml-16 2xl:-ml-1 2xl:pt-8">
                    <div className="flex items-center">
                      <div
                        className="flex"
                        // onClick={() => navigatetoAuthordetail(item.author.name)}
                      >
                        {item.author.profileImage === null ? (
                          <p className="font-bold pl-2 pr-2 dark:text-gray-300 dark:bg-gray-700 bg-gray-300 rounded-xl">
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
                          1000 /
                          3600 /
                          24
                        ).toFixed(0)}{" "}
                        days ago
                      </div>
                    </div>
                    <div>
                      <p className="mb-2">{item.content}</p>
                      <div className=" flex items-center justify-start pr-4">
                        {item.images == "" ? (
                          <p className="ml-8"></p>
                        ) : (
                          <img
                            src={item.images}
                            alt=""
                            className="rounded-xl w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                            // onClick={() => deletePost(item._id)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex mt-3 pb-5 space-x-4">
                      <div className="bg-gray-200 rounded-3xl flex justify-center items-center space-x-2 p-1 text-sm dark:bg-zinc-950">
                        <ThumbUpOutlinedIcon
                        style={{fontSize:"18px"}}
                          className="hover:text-orange-500 h-1 w-1"
                          onClick={() => upvoteApi(item._id)}
                        />
                        <div>{item.likeCount}</div>
                        <ThumbDownOutlinedIcon
                        style={{fontSize:"18px"}}
                          className="hover:text-green-700 h-1 w-1"
                          onClick={() => downvoteApi(item._id)}
                        />
                      </div>
                      <div
                            className="flex justify-center items-center bg-gray-300 pl-1 pr-1 rounded-xl pt-1 pb-1 dark:bg-zinc-950"
                            onClick={() =>
                              navigatetoCommentsPage(item._id, item.author._id)
                            }
                          >
                            <ChatBubbleOutlineOutlinedIcon className="mr-1 mt-1"  style={{fontSize:"18px"}}/>
                            {item.commentCount}
                          </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="2xl:mt-20 2xl:ml-10 xl:mt-20 xl:ml-14 lg:mt-20 lg:w-[13rem] 2xl:w-[15rem] w-64 dark:bg-zinc-900 rounded-md h-80 mt-5 ml-5 shadow-lg  border-gray-400 border dark:border-gray-900">
            {fetchingData &&
              fetchingData
                .filter((item) => params.id === item._id)
                .map((item) => (
                  <div>
                    <div className="h-20 bg-pink-500 rounded-t-md"></div>

                    <div className="h-16 w-14 mb-2 -mt-4 ml-3 dark:bg-black bg-white border flex justify-center text-center items-center dark:border-gray-700">
                      {item.author.profileImage === null ? (
                        <p className="font-bold text-xl h-8 w-8  bg-gray-300 dark:bg-gray-800 rounded-2xl dark:text-white">
                          {item.author.name.charAt(0).toUpperCase()}
                        </p>
                      ) : (
                        <img
                          src={item.author.profileImage}
                          alt=""
                          className=" p-[2px] h-16 w-14"
                        />
                      )}
                    </div>
                    {/* <img src={item.author.profileImage === "" ? : item.author.profileImage} alt="" className="h-20 w-20 -mt-8 ml-4 p-1 bg-white" /> */}
                    <div className="ml-4 text-sm mb-4 dark:text-white">
                      <h1 className="text-[17px] font-semibold dark:text-white">
                        Name
                      </h1>
                      {item.author.name}
                    </div>
                    <div className="ml-4 text-sm dark:text-white">
                      <h1 className="text-[17px] font-semibold ">Created on</h1>
                      {formatDate(item.createdAt)}
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          handleToggle(item.author.name);
                        }}
                        className="ml-4 mt-5 rounded-xl bg-pink-500 pl-4 pr-4 pt-1 pb-1 text-white"
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                      <p className="bg-slate-700 pl-3 pr-3  rounded-md text-white mt-20">
                        {message}{" "}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
