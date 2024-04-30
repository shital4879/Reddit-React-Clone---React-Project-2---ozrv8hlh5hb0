import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ApiContext, contextApi } from "../Component/Context/ApiContext";
import NavDetail from "../Component/Navbar/NavDetail";
import { ThemeContext } from "../Component/Context/DarkTheme";

const AuthorDetail = () => {
  const navigate = useNavigate();
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
      <NavDetail />

      <div className=" pb-36 2xl:flex xl:flex xl:justify-center lg:flex 2xl:justify-center lg:justify-center dark:bg-zinc-950 ">
        <div className="dark:bg-zinc-950">
          {postData &&
            postData
              .filter((item) => params.name === item.author.name)
              .map((item) => (
                <div  className="w-dvw shadow-md 2xl:w-[48rem] xl:mt-5 lg:mt-5 2xl:mt-5 md:mt-0  items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-0 sm:w-dvw md:ml-1 md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-1">
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
                      <img src={item.images} alt="" 
                       className="rounded w-[25rem] h-[20rem] 2xl:w-[45rem] 2xl:h-[25rem] sm:w-[35rem] sm:h-[25rem] md:w-[44rem] md:h-[30rem]"
                      />
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
              ))}
        </div>
        <div className="w-64 dark:bg-zinc-900 rounded-md h-80 mt-5 ml-5 shadow-lg  border-gray-400 border dark:border-gray-900">
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
                    <h1 className="text-[17px] font-semibold dark:text-white">Name</h1>
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
      <div></div>
    </div>
  );
};

export default AuthorDetail;
