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

const ApiPostUpdate = ({ children }) => {
  //   const {postData} = useContext(ApiContext)
  // console.log(apidata);
//  const{postData} = useContext(contextApi)
  const [showHam, setShowHam] = useState(true);
  const { postData,PostApi } = useContext(contextApi);
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
  useEffect(() => {
    upvoteApi();
  }, []);

  return (
    <div>
      {/* <div>
        <div>
          {apidata &&
            apidata.map((item) => (
              <div className="">
                <div className="w-dvw -ml-24 shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
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
                              navigatetoAuthordetail(item._id, item.author.name)
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
                    <p
                      className="mb-2"
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
                        className={`hover:text-orange-500 h-1 w-1`}
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

                {!showHam && (
                  <div className="absolute top-72 right-[27rem] bg-white border border-solid border-gray-500 pl-4 pr-4 pt-2 pb-2 rounded-md">
                    <button
                      className="flex space-x-3 p-1 pl-2 pr-3 hover:bg-blue-100 w-[9rem]"
                      onClick={() => deletePost(item._id)}
                    >
                      <DeleteIcon />
                      <h1>Delete Post</h1>
                    </button>
                    <button className="flex space-x-3 mt-2 p-1 pl-2 pr-3 hover:bg-blue-100 w-[9rem]">
                      <EditIcon />
                      <h1
                        onClick={() => {
                          console.log("working", item);
                          navigatetoUpdatePost(
                            item._id,
                            item.title,
                            item.content
                          );
                        }}
                      >
                        Edit Post
                      </h1>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div> */}
      {
        children
      }
    </div>
  );
};

export default ApiPostUpdate;
