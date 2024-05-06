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
import ApiPostUpdate from "../Detailing/ApiPostUpdate";
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
    // channelApidata
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
  const [posts, setPosts] = useState([]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName);
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


  const channelApidata = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/channel/`,

        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setChannelApi(result.data);
      // console.log("loll", result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    channelApidata();
  }, []);

  const createCommunityapi = async () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputCount);
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
      channelApidata();
      console.log(result);
    } catch (error) {
      console.error("Failed to create community:", error);
    }
  };


  const navigatetoChannel = (id) => {
    navigate(`/ChannelPage/${id}`);
  };


  const storedData = JSON.parse(localStorage.getItem("UserInfo"));
  // console.log(storedData._id);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div>
        <div className="fixed bg-white z-50">
          <NavDetail className="fixed" />
        </div>

        <div className="">
          <div className="flex  pb-4 dark:bg-zinc-950  bg-gray-100">
            <div className="md:invisible invisible 2xl:visible xl:visible lg:visible sm:invisible">
              <Community className="flex xl:mr-36 " />
            </div>
            <div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14 w-56 "></div>
            <div className="dark:bg-zinc-950 mt-12 ">
              <div className="2xl:-ml-4">
                <div className="flex w-dvw border-gray-400 border  rounded-sm p-2 mt-8 bg-white dark:bg-black dark:border-gray-900 sm:-ml-[27rem] sm:w-dvw md:-ml-[27rem] md:w-dvw lg:w-[35rem] xl:w-[40rem] xl:-ml-24 2xl:w-[48rem] lg:-ml-12 -ml-[27rem] 2xl:-ml-16">
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
                        className="border 2xl:w-[30rem]  pl-3 w-[25rem] rounded-sm bg-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900 lg:w-[35rem] md:w-[40rem] sm:w-[30rem]"
                        onClick={() =>
                          // navigatetoAuthordetail(item._id, item.author.name)
                          navigate("/CreatePost")
                        }
                      />
                    ))}
                </div>
              </div>


              <ApiPostUpdate apidata={posts} />
            </div>
            <div>
              <div className="mt-20 ml-12 mr-14 xl:ml-3 2xl:ml-8 border-gray-400 border h-[6rem] w-[19rem] rounded-sm bg-white dark:bg-black dark:text-white dark:border-gray-900 invisible lg:invisible 2xl:visible xl:visible">
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

              <div className="mt-8 ml-12 mr-14 xl:ml-3 2xl:ml-8 border-gray-400 border h-[15rem] w-[19rem] rounded-sm bg-white  dark:bg-black dark:text-white dark:border-gray-900 invisible lg:invisible 2xl:visible xl:visible">
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

                  <div className="flex justify-center items-center 2xl:mt-10 sm:mt-0 lg:mt-10 xl:mt-10  ">
                    <div className="bg-white relative 2xl:w-[36rem] 2xl:h-[36rem] rounded-md pt-4 pl-5 pr-5 dark:bg-zinc-950  border border-solid border-gray-600 sm:w-dvw sm:h-dvh md:w-dvw md:h-dvh lg:w-[36rem] lg:h-[36rem] xl:w-[36rem] xl:h-[36rem] h-dvh w-dvw mt-10">
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
                              onClick={() => {
                                createCommunityapi(),
                                  navigatetoChannel(item._id);
                              }}
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
