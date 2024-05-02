import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { contextApi } from "../Context/ApiContext";
import { useNavigate } from "react-router-dom";
import MenuSharpIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { Mycontext } from "../../components/App";

const ApiPostUpdate = ({ apidata }) => {
  //   const {postData} = useContext(ApiContext)
  // console.log(apidata);
  //  const{postData} = useContext(contextApi)
  const [showHam, setShowHam] = useState(true);

  const [showedit, setShowEdit] = useState(false);
  const { postData } = useContext(contextApi);
  const {
    showLogIn,
    setShowLogIn,
    createCommunity,
    setCreateCommunity,
    openPopular,
    setOpenPopular,
  } = useContext(Mycontext);
  const [userData, setUserData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likebtn, setLikeBtn] = useState();

  const toggleLike = () => {
    setIsLiked(true);
  };
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("UserInfo"));

  const navigatetoUpdatePost = (id, con, title) => {
    navigate(`/UpdatePost/${id}/${con}/${title}`);
  };
  const navigatetoCommentsPage = (id, iid) => {
    navigate(`/CommentsPage/${id}/${iid}`);
  };
  const navigatetoAuthordetail = (id, name) => {
    navigate(`/AuthorDetail/${id}/${name}`);
  };
  const PostApii = async () => {
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
      setPosts(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    PostApii();
  }, []);

  const [posts, setPosts] = useState([]);
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
      PostApii();
      console.log(result, "kkkk");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    upvoteApi();
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
      PostApii();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    downvoteApi();
  }, []);

  const deletePost = async (comId) => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post/${comId}`,
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
        PostApii();
      } else {
        console.log("Failed to delete comment. Status code:", responce.status);
      }

      console.log(result, "kkkkii");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          {!openPopular && (
            <div>
              {apidata &&
                apidata.map((item) => (
                  <div className="">
                    <div className="relative w-dvw hover:bg-gray-300 dark:hover:bg-gray-900 shadow-md 2xl:w-[48rem] mt-3 items-center justify-center pt-4 pl-10 pr-8  mb-4 bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:w-dvw md:-ml-[27rem] lg:-ml-12 -ml-[27rem] lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:-ml-28">
                      <div className="flex items-center">
                        <div className="">
                          <div className="flex w-[44rem] justify-between">
                            <div className="flex ">
                              {item.author.profileImage === null ? (
                                <p className="font-bold pl-2 pr-2  bg-gray-300 rounded-xl dark:bg-gray-500 dark:text-white">
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
                                className="font-semibold text-base ml-2 mr-2"
                                onClick={() =>
                                  navigatetoAuthordetail(
                                    item._id,
                                    item.author.name
                                  )
                                }
                              >
                                {item.author.name}
                              </h1>
                            </div>
                            {item.author.name === storedData.name ? (
                              <div className="sm:-pl-32 sm:mr-28 mr-64 2xl:-mr-1 lg:mr-60">
                                <DeleteOutlineIcon />
                              </div>
                            ) : (
                              <></>
                            )}
                          
                          </div>

                          <div className="text-gray-700 text-sm">
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
                        <div className="flex justify-end mr-0"></div>
                      </div>
                      <div>
                        <p
                          className="mb-2 dark:text-gray-400"
                        >
                          {item.content}
                        </p>
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
                          <ArrowUpwardOutlinedIcon
                            className={`hover:text-orange-500 h-1 w-1  ${
                              isLiked ? "text-blue-900" : "text-yellow-500"
                            }`}
                            onClick={() => {
                              upvoteApi(item._id), toggleLike();
                            }}
                          />

                          <div>{item.likeCount}</div>
                          <ArrowDownwardOutlinedIcon
                            className="hover:text-green-700 h-1 w-1"
                            onClick={() => downvoteApi(item._id)}
                          />
                        </div>
                        <div
                          onClick={() =>
                            navigatetoCommentsPage(item._id, item.author._id)
                          }
                        >
                          <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                          {item.commentCount}
                        </div>
                        <div>
                          <Tippy content="Update post" placement="bottom" className="text-[10px]">
                            {item.author.name === storedData.name ? (
                              <div className="">
                                <UpgradeIcon />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Tippy>
                        </div>
                      </div>
                    </div>

                    {showedit && (
                      // <ApiPostUpdate>
                      <div className="absolute top-72 right-[27rem] bg-white border border-solid border-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md">
                        <button
                          className="flex space-x-3 p-1 pl-2 pr-3 hover:bg-blue-100 w-[9rem]"
                          onClick={() => deletePost(item._id)}
                        >
                          <DeleteIcon />
                          <h1>Delete Post</h1>
                        </button>
                        <button
                          className="flex space-x-3 mt-2 p-1 pl-2 pr-3 hover:bg-blue-100 w-[9rem]"
                          onClick={(e) => {
                            console.log("not working", item);
                            e.stopPropagation();
                            navigatetoUpdatePost(
                              item._id,
                              item.title,
                              item.content
                            );
                          }}
                        >
                          <EditIcon />
                          <h1>Edit Post</h1>
                        </button>
                      </div>
                      // </ApiPostUpdate>
                    )}
                  </div>
                ))}
            </div>
          )}

          {openPopular && (
            <div>
              {apidata &&
                apidata
                  .filter((item) => item.likeCount >= 5)
                  .map((item) => (
                    <div className="">
                      <div className="w-dvw shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 -ml-[27rem] sm:-ml-[27rem] md:-ml-[27rem] sm:w-dvw  md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                        <div className="flex items-center">
                          <div
                            className="flex"
                            onClick={() =>
                              navigatetoAuthordetail(item._id, item.author.name)
                            }
                          >
                            {item.author.profileImage === null ? (
                              <p className="font-bold pl-2 pr-2  bg-gray-300 rounded-xl dark:bg-gray-500 dark:text-white">
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
                          <div className=" flex items-center justify-start">
                            <img
                              src={item.images}
                              alt=""
                              className="object-contain rounded w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                            />
                          </div>
                        </div>
                        <div className="flex mt-3 pb-5 space-x-4">
                          <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                            <ArrowUpwardOutlinedIcon
                              className="hover:text-orange-500 h-1 w-1"
                              onClick={() => {
                                upvoteApi(item._id);
                              }}
                            />
                            <div>{item.likeCount}</div>
                            <ArrowDownwardOutlinedIcon
                              className="hover:text-green-700 h-1 w-1"
                              onClick={() => downvoteApi(item._id)}
                            />
                          </div>
                          <div
                            onClick={() =>
                              navigatetoCommentsPage(item._id, item.author._id)
                            }
                          >
                            <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                            {item.commentCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPostUpdate;
