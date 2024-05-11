import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { contextApi } from "../Context/ApiContext";
import { useNavigate } from "react-router-dom";
import MenuSharpIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { Mycontext } from "../../components/App";
import LikeCompo from "./LikeCompo";
import DeletePost from "./DeletePost";

const ApiPostUpdate = () => {
  const [activeItem, setActiveItem] = useState("Best");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName);
  };
  const { postData } = useContext(contextApi);
  const {
    showLogIn,
    setShowLogIn,
    createCommunity,
    setCreateCommunity,
    openPopular,
    setOpenPopular,
  } = useContext(Mycontext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("Best");
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
      console.log(result.data, "api");
    } catch (error) {
      console.log(error);
    }
  };


  const LogInPostApii = async (token) => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setPosts(result.data);
      console.log(result.data, "api");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      LogInPostApii(localStorage.getItem("token"));
    }
    else{
      PostApii()
    }
  }, []);


  const applyFilter = (filter) => {
    let filteredPosts = [...posts];
    switch (filter) {
      case "Best":
        filteredPosts.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "Hot":
        filteredPosts = posts.filter(
          (item) => item.likeCount == item.likeCount
        );
        break;
      case "New":
        filteredPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Top":
        filteredPosts = posts.filter((item) => item.likeCount >= 7);
        break;
      default:
        break;
    }
    setPosts(filteredPosts);
    setFilter(filter);
  };
  


  return (
    <div>
      {!openPopular && (
        <div className="flex w-dvw sm:space-x-6 md:space-x-6 lg:space-x-6 xl:space-x-6 2xl:space-x-6 mt-3 bg-white p-3 border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-400 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:-ml-[27rem] md:w-dvw lg:w-[35rem] lg:-ml-12 2xl:w-[48rem] xl:w-[40rem] xl:-ml-24 -ml-[27rem] 2xl:-ml-20">
          <div
            value="Best"
            onClick={() => {
              applyFilter("Best"), handleItemClick("Best");
            }}
            className={`flex text-black cursor-pointer pl-2 pr-2 p-1 dark:text-gray-400 ${
              activeItem === "Best"
                ? "font-bold text-gray-600 bg-gray-200 rounded-lg dark:bg-slate-700 dark:text-white"
                : ""
            }`}
          >
            <RocketSharpIcon className="mr-1" /> Best
          </div>

          <div
            onClick={() => {
              applyFilter("Hot"), handleItemClick("Hot");
            }}
            className={`flex text-black cursor-pointer pl-2 pr-2 p-1 dark:text-gray-400 ${
              activeItem === "Hot"
                ? "font-bold text-gray-600 bg-gray-200 rounded-lg dark:bg-slate-700 dark:text-white"
                : ""
            }`}
            value="Hot"
          >
            <LocalFireDepartmentIcon className="mr-1" /> Hot
          </div>

          <div
            onClick={() => {
              applyFilter("New"), handleItemClick("New");
            }}
            className={`flex text-black cursor-pointer pl-2 pr-2 p-1 dark:text-gray-400 ${
              activeItem === "New"
                ? "font-bold text-gray-600 bg-gray-200 rounded-lg dark:bg-slate-700 dark:text-white"
                : ""
            }`}
            value="New"
          >
            <NewReleasesTwoToneIcon className="mr-1" /> New
          </div>
          <div
            value="Top"
            onClick={() => {
              applyFilter("Top"), handleItemClick("Top");
            }}
            className={`flex text-black cursor-pointer pl-2 pr-2 p-1 dark:text-gray-400 ${
              activeItem === "Top"
                ? "font-bold text-gray-600 bg-gray-200 rounded-lg dark:bg-slate-700 dark:text-white"
                : ""
            }`}
          >
            <UploadIcon className="mr-1" /> Top
          </div>
        </div>
      )}




      <div>
        <div>
          {!openPopular && (
            <div>
              {posts &&
                posts.map((item) => (
                  <div className="">
                    <div className="relative w-dvw hover:bg-gray-200 dark:hover:bg-gray-900 shadow-md 2xl:w-[48rem] mt-3 items-center justify-center pt-4 pl-10 pr-8  mb-4 bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:w-dvw md:-ml-[27rem] lg:-ml-12 -ml-[27rem] lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:-ml-20">
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
                              <div className="text-gray-500 mt-1 text-xs">
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
                            {item.author.name === storedData.name ? (
                              <div className="sm:-pl-32 sm:mr-28 mr-64 2xl:-mr-1 lg:mr-60 dark:text-gray-400 p-1 rounded-2xl hover:dark:bg-gray-800">
                                <DeletePost item={item} key={item._id} setPosts={setPosts}/>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end mr-0"></div>
                      </div>
                      <div>
                        <p className="mb-2 dark:text-gray-400">
                          {item.content}
                        </p>
                        <div className=" flex items-center justify-start">
                          {item.images == "" ? (
                            <p className="ml-8"></p>
                          ) : (
                            <img
                              src={item.images}
                              alt=""
                              className="object-fill rounded-xl w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                              // onClick={() => deletePost(item._id)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex mt-3 pb-5 space-x-4">
                       
                      <LikeCompo key={item._id} item={item} setPosts={setPosts}/>

                        <Tippy
                          content="Comments"
                          placement="bottom"
                          className="text-[10px]"
                        >
                          <div
                            className="bg-gray-300 pl-1 pr-1 rounded-xl  pb-1 dark:bg-zinc-900"
                            onClick={() =>
                              navigatetoCommentsPage(item._id, item.author._id)
                            }
                          >
                            <ChatBubbleOutlineOutlinedIcon
                              className="mr-1 "
                              style={{ fontSize: "18px" }}
                            />
                            {item.commentCount}
                          </div>
                        </Tippy>
                       
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {openPopular && (
            <div>
              {posts &&
                posts
                  .filter((item) => item.likeCount >= 5)
                  .map((item) => (
                    <div className="">
                      <div className="relative w-dvw hover:bg-gray-200 dark:hover:bg-gray-900 shadow-md 2xl:w-[48rem] mt-3 items-center justify-center pt-4 pl-10 pr-8  mb-4 bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:w-dvw md:-ml-[27rem] lg:-ml-12 -ml-[27rem] lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:-ml-20">
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
                                <div className="text-gray-500 mt-1 text-xs">
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
                              {item.author.name === storedData.name ? (
                                <div className="sm:-pl-32 sm:mr-28 mr-64 2xl:-mr-1 lg:mr-60">
                                  <DeletePost item={item} key={item._id} setPosts={setPosts}/>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end mr-0"></div>
                        </div>
                        <div>
                          <p className="mb-2 dark:text-gray-400">
                            {item.content}
                          </p>
                          <div className=" flex items-center justify-start">
                            {item.images == "" ? (
                              <p className="ml-8"></p>
                            ) : (
                              <img
                                src={item.images}
                                alt=""
                                className="object-fill rounded-xl w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                                // onClick={() => deletePost(item._id)}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex mt-3 pb-5 space-x-4">
                        <LikeCompo key={item._id} item={item} setPosts={setPosts}/>
                          <Tippy
                            content="Comments"
                            placement="bottom"
                            className="text-[10px]"
                          >
                            <div
                              className="bg-gray-300 pl-1 pr-1 rounded-xl  pb-1 dark:bg-zinc-900"
                              onClick={() =>
                                navigatetoCommentsPage(
                                  item._id,
                                  item.author._id
                                )
                              }
                            >
                              <ChatBubbleOutlineOutlinedIcon
                                className="mr-1 "
                                style={{ fontSize: "18px" }}
                              />
                              {item.commentCount}
                            </div>
                          </Tippy>
                          
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
