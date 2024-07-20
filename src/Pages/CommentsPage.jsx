import React, { useContext, useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { BiMessage } from "react-icons/bi";
import { LuArrowBigUp } from "react-icons/lu";
import { LuArrowBigDown } from "react-icons/lu";
import { contextApi } from "../Component/Context/ApiContext";
import { useNavigate, useParams } from "react-router-dom";
import NavDetail from "../Component/Navbar/NavDetail";
import { ThemeContext } from "../Component/Context/DarkTheme";
import CommentApi from "../Component/data/CommentApi";
import HomeNav from "../Component/Detailing/HomeNav";
import DateFormatter from "../Component/Detailing/Time";

const CommentsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchingData, PostApi, openPopular, channelApi } =
    useContext(contextApi);
  const [openRecents, setOpenRecents] = useState(false);
  const [opencommun, setOpenCommun] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const [commentdata, setCommentData] = useState("");
  const [fetchcom, setFetchCom] = useState();
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const commentApi = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${params.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
          // "Content-Type": "application/json",
          body: JSON.stringify({
            content: commentdata,
          }),
        }
      );

      const result = await responce.json();
      fetchComment();

      console.log(result, "kkkk");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    commentApi();
  }, []);

  const fetchComment = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post/${params.id}/comments`,
        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );

      const result = await responce.json();
      setFetchCom(result.data);
      console.log(result.data, "comment");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);


  // const [posts, setPosts] = useState([]);
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
      // setLikeBtn(result.data);
      PostApi();
      console.log(result, "kkkk");
    } catch (error) {
      console.log(error);
    }
  };

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




 

  const deleteComment = async (comId) => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${comId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );

      // const result = await responce.json();
      if (responce.status === 204) {
        console.log("Comment deleted successfully");

        fetchComment();
      } else {
        console.log("Failed to delete comment. Status code:", responce.status);
      }
      console.log(result, "kkkkii");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    deleteComment();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day},${year.toString()}`;
  }

  const storedData = JSON.parse(localStorage.getItem("UserInfo"));

  const navigatetoChannel = (id) => {
    navigate(`/ChannelPage/${id}`);
  };

  const navigatetoAuthordetail = (id, name) => {
    navigate(`/AuthorDetail/${id}/${name}`);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="fixed z-50">
        <NavDetail />
      </div>
      <div className="dark:bg-zinc-950 bg-gray-200 flex">
        <div className="mt-1">
          <HomeNav />
        </div>
        <div className="mt-20">
          {fetchingData &&
            fetchingData
              .filter((item) => params.id == item._id)
              .map((item) => (
                <div className=" ml-40 2xl:ml-44 mt-1">
                  <div className="lg:flex lg:justify-center 2xl:flex 2xl:justify-center">
                    <div className="w-dvw sm:-ml-[31rem] -ml-[31rem]  md:-ml-[31rem] lg:-ml-36 xl:-ml-32 shadow-md 2xl:w-[48rem] items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900  sm:w-dvw md:w-dvw  lg:w-[45rem] xl:w-[48rem]  ">
                      <div className="flex items-center">
                        <div className="">
                          <div className="flex w-[44rem] justify-between">
                            <div className="flex "   onClick={() =>
                                  navigatetoAuthordetail(
                                    item._id,
                                    item.author.name
                                  )
                                }>
                              {item.author.profileImage === null ? (
                                <p className="cursor-pointer font-bold pl-2 pr-2  bg-gray-300 rounded-xl dark:text-white dark:bg-gray-800">
                                  {item.author.name.charAt(0).toUpperCase()}
                                </p>
                              ) : (
                                <img
                                  src={item.author.profileImage}
                                  alt=""
                                  className="h-6 w-6 rounded-3xl"
                                />
                              )}
                              <h1
                                className="cursor-pointer font-semibold text-base ml-2 mr-2"
                              >
                                {item.author.name}
                              </h1>
                              <div className="text-gray-500 mt-1 text-xs">
                              <DateFormatter createdAt={item.createdAt}/>
                          </div>
                            </div>

                          </div>

                        
                        </div>
                        <div className="flex justify-end mr-0"></div>
                      </div>
                      <div>
                        <p className="mb-4 mt-4">{item.content}</p>
                        <div className=" flex items-center justify-start">
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
                        <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                          <LuArrowBigUp
                          style={{fontSize:"18px"}}
                              className="cursor-pointer hover:text-orange-500 h-6 w-6 mr-1 "
                            onClick={() => upvoteApi(item._id)}
                          />
                          <div>{item.likeCount}</div>
                          <LuArrowBigDown
                          style={{fontSize:"18px"}}
                            className="cursor-pointer hover:text-green-700 h-6 w-6 ml-1"
                            onClick={() => downvoteApi(item._id)}
                          />
                        </div>
                        <div>
                        <div className="cursor-pointer pt-1 pb-1 flex items-center justify-center w-14 rounded-2xl bg-gray-200">
                          <BiMessage className="mr-2 mt-1 font-bold " style={{fontSize:"18px"}}/>
                          {item.commentCount}
                        </div>
                        </div>
                      </div>
                      {/* <textarea name="" id="" cols="30" rows="10" className='w-[60rem] h-[20rem] border border-solid border-gray-500 ' value={commentdata} onChange={(e)=>setCommentData(e.target.value)} ></textarea> */}
                      <div className="">
                        <input
                          type="text"
                          placeholder="What are Your Thoughts ?"
                          value={commentdata}
                          onChange={(e) => setCommentData(e.target.value)}
                          className="cursor-pointer w-dvw -ml-10 sm:ml-0 h-[10rem] border border-solid border-gray-500 pb-32 pl-3 sm:w-[35rem] md:w-[40rem] lg:w-[40rem] dark:text-white dark:bg-zinc-900"
                        />
                        <br />
                        <button
                          type="submit"
                          onClick={() => {
                            commentApi(), setCommentData("");
                          }}
                          disabled={commentdata.trim() === ""}
                          className={`pl-3 pr-3 pt-1 pb-1 mb-10 mt-4 rounded-xl font-medium ${
                            commentdata.trim() === ""
                              ? "bg-slate-200 text-gray-400 dark:bg-gray-900 dark:text-gray-700"
                              : "text-white bg-blue-500"
                          }`}
                        >
                          COMMENT
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className=" lg:flex lg:justify-center xl:flex xl:justify-center 2xl:flex 2xl:justify-center dark:text-gray-200 dark:border-gray-900 ">
                    <div className=" bg-white mb-20 pb-20 -ml-[31rem] border-solid  px-4 py-2 rounded-sm transition duration-300 ease-in-out w-dvw  border-gray-400 border shadow-md 2xl:w-[48rem] xl:-ml-32  sm:w-dvw md:w-dvw  lg:w-[45rem] xl:w-[48rem] md:-ml-[31rem] sm:-ml-[31rem] lg:-ml-36 dark:bg-black dark:text-gray-200 dark:border-gray-900">
                      {fetchcom &&
                        fetchcom.map((item) => (
                          <div className="flex justify-between pt-5 pb-5 border-b border-solid border-gray-300 dark:border-gray-800 ">
                            <div>
                              <div className="flex items-center">
                                <div className="w-6  h-6 space-x-2 mr-3 mt-1">
                                  {item.author_details.profileImage === null ? (
                                    <p className="font-bold pl-2 pr-2 bg-gray-300 rounded-xl dark:text-white dark:bg-gray-800">
                                      {item.author_details.name
                                        .trim()
                                        .charAt(0)
                                        .toUpperCase()}
                                    </p>
                                  ) : (
                                    <img
                                      src={item.author_details.profileImage}
                                      alt=""
                                      className="h-6 w-6 rounded-3xl"
                                    />
                                  )}
                                </div>
                                <div className="text-sm font-medium">
                                  {" "}
                                  {item.author_details.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 ml-4">
                                <DateFormatter createdAt={item.createdAt}/>
                                </div>
                              </div>
                              <div className="ml-8 text-base dark:text-gray-400">
                                {item.content}
                              </div>
                            </div>
                            {item.author_details.name === storedData.name ? (
                              <div className="relative">
                                <button
                                  className="flex text-sm p-1 pl-1 pr-1 mr-3 dark:hover:bg-gray-700 dark:text-gray-400 rounded-2xl text-gray-800 hover:bg-gray-500"
                                  onClick={() => deleteComment(item._id)}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className=" lg:invisible xl:visible 2xl:visible md:invisible sm:invisible invisible 2xl:mt-7 2xl:ml-11 xl:mt-6  xl:ml-10 lg:mt-20 lg:w-[13rem] 2xl:w-[15rem] w-64 dark:bg-zinc-950 rounded-md h-80  ml-5 bg-gray-200 ">
          {fetchingData &&
            fetchingData
              .filter((item) => params.id === item._id)
              .map((item) => (
                <div className="mt-14 border-gray-400 border dark:border-gray-900 bg-white pb-6 rounded-t-md dark:bg-black">
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
                  {/* 
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
                  </div> */}
                </div>
              ))}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default CommentsPage;
