import React, { useState, useEffect, useContext, useReducer } from "react";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuSharpIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Mycontext } from "../../components/App";
import { ThemeContext } from "../Context/DarkTheme";
import { contextApi } from "../Context/ApiContext";
import NavDetail from "../Navbar/NavDetail";
import Popular from "../../Pages/Popular";
import ApiPostUpdate from "../data/ApiPostUpdate";
import Community from "./Community";

const Detail = () => {
  const params = useParams();
  const [sortBy, setSortBy] = useState("best");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const navigate = useNavigate();
  const {
    search,
    setSearch,
    fetchingData,
    setFetchingData,
    postData,
    setPostData,
    channelApi,
    setChannelApi,
  } = useContext(contextApi);
  const [showHam, setShowHam] = useState(false);
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const {
    showLogIn,
    setShowLogIn,
    createCommunity,
    setCreateCommunity,
    openPopular,
    setOpenPopular,
    // PostApi
  } = useContext(Mycontext);
  const [openSearch, setOpenSearch] = useState(false);
  // const [openPopular,setOpenPopular] = useState(fals;
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  // const [filter, setFilter] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [comming, setComming] = useState(false);
  const [inputCount, setInputCount] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [activeItem, setActiveItem] = useState("Best");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName);
  };

  const navigatetoAuthordetail = (id, name) => {
    navigate(`/AuthorDetail/${id}/${name}`);
  };

  const [userData, setUserData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likebtn, setLikeBtn] = useState();

  const toggleLike = () => {
    setIsLiked(true);
  };

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
      PostApi();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    downvoteApi();
  }, []);

  const navigatetoCommentsPage = (id, iid) => {
    navigate(`/CommentsPage/${id}/${iid}`);
  };

  const [products, setProducts] = useState([]);

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
      setPosts(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    PostApi();
  }, []);

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("Best");

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
        PostApi();
      } else {
        console.log("Failed to delete comment. Status code:", responce.status);
      }

      console.log(result, "kkkkii");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    deletePost();
  }, []);

  const [inputvalue, setInputValue] = useState();
  const [text, setText] = useState();

  const createCommunityapi = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", inputCount);
    // formData.append("description", "hii");

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/channel/",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,

            projectID: "ozrv8hlh5hb0",
            // "Content-Type": "multipart/form-data",
          },

          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server responded with a non-200 status code");
      }

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error("Failed to create community:", error);
    }
  };

  const navigatetoUpdatePost = (id, con, title) => {
    console.log("recieving data", id, con, title);
    navigate(`/UpdatePost/${id}/${con}/${title}`);
  };

  const navigatetoChannel = (id) => {
    navigate(`/ChannelPage/${id}`);
  };

  const storedData = JSON.parse(localStorage.getItem("UserInfo"));
  // console.log(storedData._id);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div>
        <div className="fixed bg-white z-50" >
          <NavDetail className="fixed"/>
        </div>

        <div className="">
      
          

          <div className="flex  pb-4 dark:bg-zinc-950  bg-gray-100">
            <div className="md:invisible invisible 2xl:visible xl:visible lg:visible sm:invisible">

            <Community className="flex xl:mr-36 "/>
            </div>
            <div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14 w-56 "></div>
            <div className="dark:bg-zinc-950 mt-12">
              <div>
                <div className="flex w-dvw border-gray-400 border  rounded-sm p-2 mt-8 bg-white dark:bg-black dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:-ml-[27rem] md:w-dvw lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:w-[48rem] 2xl:-ml-28 lg:-ml-12 -ml-[27rem]">
                  <img
                    src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
                    alt=""
                    className="w-9 h-9 mr-8 rounded-2xl "
                  />
                  {fetchingData &&
                    fetchingData.slice(0, 1).map((item) => (
                      <input
                        type="text"
                        value="Create Post"
                        className="border 2xl:w-[30rem] pl-3 w-[25rem] rounded-sm bg-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900 lg:w-[35rem] md:w-[40rem] sm:w-[30rem]"
                        onClick={() =>
                          // navigatetoAuthordetail(item._id, item.author.name)
                          navigate("/CreatePost")
                        }
                      />
                    ))}
                </div>

                {!openPopular && (
                  <div className="flex w-dvw space-x-6 mt-3 bg-white p-3 border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-400 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:-ml-[27rem] md:w-dvw lg:w-[35rem] lg:-ml-12 2xl:w-[48rem] xl:w-[40rem] xl:-ml-24 2xl:-ml-28 -ml-[27rem]">
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
                      // onClick={() => applyFilter("Hot")}
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
              </div>

              {/* <div>
                {!openPopular && (
                  <div>
                    {posts &&
                      posts.map((item) => (
                        <div className="">
                          <div className="w-dvw -ml-24 hover:bg-gray-300 dark:hover:bg-gray-900 shadow-md 2xl:w-[48rem] mt-3 items-center justify-center pt-4 pl-10 pr-8  mb-4 bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:w-dvw md:-ml-[27rem]  lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:-ml-28">
                            <div className="flex items-center">
                              <div className="">
                                <div className="flex w-[44rem] justify-between">
                                  <div className="flex ">
                                    {item.author.profileImage === null ? (
                                      <p className="font-bold pl-2 pr-2  bg-gray-300 rounded-xl dark:bg-gray-500 dark:text-white">
                                        {item.author.name
                                          .charAt(0)
                                          .toUpperCase()}
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
                                    <div
                                      onClick={() => setShowHam(!showHam)}
                                      className="relative"
                                    >
                                      <MoreHorizOutlinedIcon />
                                    </div>
                                  ) : (
                                    ""
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
                                onClick={() => {
                                  console.log("working", item);
                                  navigatetoUpdatePost(
                                    item._id,
                                    item.title,
                                    item.content
                                  );
                                }}
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
                              />
                            )}


                              </div>
                            </div>
                            <div className="flex mt-3 pb-5 space-x-4">
                              <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                                <ArrowUpwardOutlinedIcon
                                  className={`hover:text-orange-500 h-1 w-1  ${
                                    isLiked
                                      ? "text-blue-900"
                                      : "text-yellow-500"
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
                                  navigatetoCommentsPage(
                                    item._id,
                                    item.author._id
                                  )
                                }
                              >
                                <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                                {item.commentCount}
                              </div>
                            </div>
                          </div>

                          {showHam && (
                            <ApiPostUpdate>
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
                            </ApiPostUpdate>
                          )}
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
                            <div className="w-dvw -ml-24 shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-[27rem] md:-ml-[27rem] sm:w-dvw  md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                              <div className="flex items-center">
                                <div
                                  className="flex"
                                  onClick={() =>
                                    navigatetoAuthordetail(
                                      item._id,
                                      item.author.name
                                    )
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
                                    navigatetoCommentsPage(
                                      item._id,
                                      item.author._id
                                    )
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
              </div> */}

             <ApiPostUpdate apidata = {posts}/>


            </div>
            <div>
              <div className="mt-20 ml-12 mr-14 xl:ml-3 border-gray-400 border h-[6rem] w-[19rem] rounded-sm bg-white dark:bg-black dark:text-white dark:border-gray-900 invisible lg:invisible 2xl:visible xl:visible">
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
                    onClick={() => {
                      navigate("/premium");
                    }}
                    className="bg-orange-600 w-[17rem]  rounded-3xl space-x-2 pt-2 pb-2 font-semibold text-white text-sm"
                  >
                    Try now
                  </button>
                </div>
              </div>

              <div className="mt-8 ml-12 mr-14 xl:ml-3 border-gray-400 border h-[15rem] w-[19rem] rounded-sm bg-white  dark:bg-black dark:text-white dark:border-gray-900 invisible lg:invisible 2xl:visible xl:visible">
                <img
                  src="https://reddit-ten-mocha.vercel.app/home-banner.png"
                  alt=""
                />
                <img
                  src="	https://reddit-ten-mocha.vercel.app/snoo.png"
                  alt=""
                  className="h-16 -m-1 ml-3"
                />
                <p className="text-sm p-2 border-b border-gray-300 dark:border-gray-900">
                  Your personal Reddit frontpage. Come here to check in with
                  your favorite communities.
                </p>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => navigate(`/CreatePost`)}
                    className="bg-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-white text-sm"
                  >
                    Create Post
                  </button>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => setCreateCommunity(!createCommunity)}
                    className="border-blue-700 border text-blue-700 w-[17rem]  rounded-3xl space-x-2 pt-1 pb-1 font-semibold text-sm"
                  >
                    Create Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {createCommunity && (
          <div>
            {channelApi &&
              channelApi.slice(0, 1).map((item) => (
                <div className="bg-gray-700 bg-opacity-80 h-dvh size-full m-0 fixed top-0 left-0 w-dvw ">
                  {/* <NavDetail /> */}

                  <div className="flex justify-center items-center 2xl:mt-10 sm:mt-0 lg:mt-10 xl:mt-10 ">
                    <div className="bg-white relative 2xl:w-[36rem] 2xl:h-[36rem] rounded-md pt-4 pl-5 pr-5 dark:bg-zinc-950  border border-solid border-gray-600 sm:w-dvw sm:h-dvh md:w-dvw md:h-dvh lg:w-[36rem] lg:h-[36rem] xl:w-[36rem] xl:h-[36rem] h-dvh w-dvw">
                      <div className="flex justify-between  pb-2 text-lg border-b border-solid border-gray-400 dark:text-white">
                        <h1>Create a community</h1>
                        <h2
                          onClick={() => setCreateCommunity(!createCommunity)}
                          className="cursor-pointer"
                        >
                          X
                        </h2>
                      </div>

                      <form onSubmit={createCommunityapi}>
                        <div className="mt-5">
                          <h1 className="font-medium dark:text-white">Name</h1>
                          <p className="text-xs text-gray-500">
                            Community names including capitalization cannot be
                            changed.
                          </p>

                          <input
                            type="text"
                            minLength={3}
                            className="pl-4 mt-5 rounded-md h-10 2xl:w-[34rem] border border-solid border-red-600 sm:w-[40rem] md:w-[45rem] lg:w-[34rem] xl:w-[34rem] w-[26rem]"
                            value={inputCount}
                            onChange={(e) => setInputCount(e.target.value)}
                          />

                          {inputCount.length < 3 ? (
                            <h1 className="flex justify-between mt-4 text-xs pr-2">
                              <p className="text-red-600">
                                Please lengthen this text to 3 characters or
                                more (you are currently using 0 character).
                              </p>
                              <p className="dark:text-white">
                                {inputCount.length}
                              </p>
                            </h1>
                          ) : (
                            <h1 className="flex justify-between mt-4 text-xs pr-2">
                              <p className="dark:text-white">
                                Choose wisely. Once you pick a name, it can't be
                                changed.
                              </p>
                              <p className="dark:text-white">
                                {inputCount.length}
                              </p>
                            </h1>
                          )}

                          <div className="mt-8">
                            <h1 className="font-medium dark:text-white">
                              Community type
                            </h1>
                            <div className="flex mt-5 dark:text-white">
                              <input
                                type="radio"
                                name="input"
                                className="2xl:h-[15px] 2xl:w-[15px]"
                                checked
                              />
                              <h1 className="text-base ml-4 mr-4 -mt-1">
                                <LanguageSharpIcon className="mr-1" />
                                Public
                              </h1>
                              <p className="text-xs text-gray-500">
                                Anyone can view, post, and comment to this
                                community
                              </p>
                            </div>

                            <div className="flex mt-5 dark:text-white">
                              <input
                                type="radio"
                                name="input"
                                className="2xl:h-[15px] 2xl:w-[15px]"
                              />
                              <h1 className="text-base ml-4 mr-4 -mt-1">
                                <VisibilityOffIcon className="mr-1" />
                                Restricted
                              </h1>
                              <p className="text-xs text-gray-500 ">
                                Anyone can view, but only approved users can
                                contribute
                              </p>
                            </div>

                            <div className="flex mt-5 dark:text-white">
                              <input
                                type="radio"
                                name="input"
                                className="xl:2h-[15px] 2xl:w-[15px]"
                              />
                              <h1 className="text-base ml-4 mr-4 -mt-1">
                                <HttpsOutlinedIcon className="mr-1" />
                                Private
                              </h1>
                              <p className="text-xs text-gray-500 ">
                                Only approved users can view and submit to this
                                community
                              </p>
                            </div>
                          </div>

                          <div className="mt-10 flex space-x-3">
                            <input type="checkbox" className="w-4 h-4" />
                            <p className="flex">
                              <span className="mr-2 bg-red-600 text-base -mt-1 ">
                                NSFW
                              </span>
                              <p className="text-gray-500 ">
                                18+ year old community
                              </p>
                            </p>
                          </div>

                          <div className="flex justify-end  mt-9">
                            <button
                              onClick={() =>
                                setCreateCommunity(!createCommunity)
                              }
                              className="mr-4 border border-solid text-[12px] pl-3 pr-3 pt-1 pb-1 border-blue-700 rounded-2xl text-blue-700 font-medium cursor-pointer"
                            >
                              CANCEL
                            </button>
                            <button
                              className={`border-solid text-[12px] pl-3 pr-3 rounded-2xl font-medium cursor-pointer ${
                                inputCount.length < 3
                                  ? "bg-gray-300 text-gray-500 dark:bg-gray-900 dark:text-gray-800"
                                  : "text-white bg-blue-600"
                              }`}
                              disabled={inputCount.length < 3}
                              // onClick={createCommunityapi}
                              onClick={() => navigatetoChannel()}
                            >
                              Create Community
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
