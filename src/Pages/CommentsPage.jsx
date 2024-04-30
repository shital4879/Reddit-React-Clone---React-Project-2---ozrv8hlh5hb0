import React, { useContext, useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { contextApi } from "../Component/Context/ApiContext";
import { useParams } from "react-router-dom";
import NavDetail from "../Component/Navbar/NavDetail";
import { ThemeContext } from "../Component/Context/DarkTheme";

const CommentsPage = () => {
  const params = useParams();
  const { fetchingData, PostApi,openPopular } = useContext(contextApi);
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

  const storedData = JSON.parse(localStorage.getItem("UserInfo"));

  return (
    <div className={darkMode ? "dark" : ""}>
      <NavDetail />
      <div className="dark:bg-zinc-950 bg-gray-300">
        {fetchingData &&
          fetchingData
            .filter((item) => params.id == item._id)

            .map((item) => (
              <div className=" ml-40 ">
                <div className="lg:flex lg:justify-center 2xl:flex 2xl:justify-center">
                  <div className="w-dvw -ml-40 shadow-md 2xl:w-[48rem]  items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900  sm:w-dvw md:w-dvw  lg:w-[45rem] xl:w-[48rem]  ">
                    <div className="flex items-center">
                      <div className="">
                        <div className="flex w-[44rem] justify-between">
                          <div className="flex ">
                          {item.author.profileImage === null ? (
                                    <p className="font-bold pl-2 pr-2  bg-gray-300 rounded-xl dark:text-white dark:bg-gray-800">
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

                              // onClick={() =>
                              //   navigatetoAuthordetail(item._id,item.author.name)
                              // }
                            >
                              {item.author.name}
                            </h1>
                          </div>
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
                      <div className="flex justify-end mr-0"></div>
                    </div>
                    <div>
                      <p className="mb-4 mt-4">{item.content}</p>
                      <div className=" flex items-center justify-start">
                        <img
                          src={item.images}
                          alt=""
                          className="rounded w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                        />
                      </div>
                    </div>
                    <div className="flex mt-3 pb-5 space-x-4">
                      <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                        <ArrowUpwardOutlinedIcon
                          className="hover:text-orange-500 h-1 w-1"
                          onClick={() => upvoteApi(item._id)}
                        />
                        <div>{item.likeCount}</div>
                        <ArrowDownwardOutlinedIcon
                          className="hover:text-green-700 h-1 w-1"
                          onClick={() => downvoteApi(item._id)}
                        />
                      </div>
                      <div>
                        <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                        {item.commentCount}
                      </div>
                    </div>
                    {/* <textarea name="" id="" cols="30" rows="10" className='w-[60rem] h-[20rem] border border-solid border-gray-500 ' value={commentdata} onChange={(e)=>setCommentData(e.target.value)} ></textarea> */}
                    <div className="">
                      <input
                        type="text"
                        placeholder="What are Your Thoughts ?"
                        value={commentdata}
                        onChange={(e) => setCommentData(e.target.value)}
                        className="w-dvw -ml-10 sm:ml-0 h-[10rem] border border-solid border-gray-500 pb-32 pl-3 sm:w-[35rem] md:w-[40rem] lg:w-[40rem] dark:text-white dark:bg-zinc-900"
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
                  <div className="bg-white mb-20 pb-20 border border-solid border-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out w-dvw  shadow-md 2xl:w-[48rem] sm:-ml-40 sm:w-dvw md:w-dvw  lg:w-[45rem] xl:w-[48rem]  dark:bg-black dark:text-gray-200 dark:border-gray-900  -ml-40">
                    {fetchcom &&
                      fetchcom.map((item) => (
                        <div className="flex justify-between pt-5 pb-5 border-b border-solid border-gray-300 dark:border-gray-800">
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
                            <div className="ml-8 text-base dark:text-gray-400">
                              {item.content}
                            </div>
                          </div>
                          {item.author_details.name === storedData.name ? (
                            <div
                              onClick={() => setShowHam(!showHam)}
                              className="relative"
                            >
                              <MoreHorizOutlinedIcon />

                              {showHam && (
                                <div className="absolute mt-2 right-1 bg-white border border-solid border-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md">
                                  <button
                                    className="flex space-x-3 p-1 pl-2 pr-3 hover:bg-blue-100 w-[9rem]"
                                    onClick={() => deleteComment(item._id)}
                                  >
                                    <DeleteIcon />
                                    <h1>Delete Post</h1>
                                  </button>
                                </div>
                              )}
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
        {/* </form> */}
      </div>
    </div>
  );
};

export default CommentsPage;
