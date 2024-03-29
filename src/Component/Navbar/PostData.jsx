import React, { useEffect, useState } from "react";
import RocketSharpIcon from "@mui/icons-material/RocketSharp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesTwoToneIcon from "@mui/icons-material/NewReleasesTwoTone";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import HomeIcon from "@mui/icons-material/Home";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { NavLink } from "react-router-dom";
import data from "../../Component/Utils";

const PostData = () => {
  const [postData, setPostData] = useState();
  const [showMore, setShowMore] = useState(false);
  const [fetchingData, setFetchingData] = useState();
  // const fetchingData = props

  // --------------------------- API FOR POST ---------------------------------------------------------------------------
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
      setPostData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    PostApi();
  }, []);
  // ----------------------------------------------------------------------------------------------------------------

  // const toggle=()=>{
  //   setShowMore(!showMore)
  // }

  const searchData = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?search`,
        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setFetchingData(result.data);
      console.log("lo", result.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("data", data);
  // useEffect(() => {
  //   searchData();
  // }, []);
  function handleSearch() {
    searchData()
      .then((response) => {
        if (response) {
          setFetchingData(response.data);

          console.log("hanlde", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex border-r-2 pb-4">
      
      <div className=" mt-4 flex justify-between pl-12 pr-12 pt-3 pb-2 relative h-14  ">
        <div>
          <ul>
            <li className="bg-gray-200 space-x-2 w-60 pl-4 pb-1 mb-1 rounded-sm pt-2">
              <NavLink to="/">
                <HomeIcon /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/popular">
                <OutboundOutlinedIcon /> Popular
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex">
        {localStorage.getItem("token") && (
          <div className="flex space-x-6">
            <NavLink className="flex">
              <RocketSharpIcon className="mr-1" /> Best
            </NavLink>
            <NavLink className="flex">
              <LocalFireDepartmentIcon className="mr-1" /> Hot
            </NavLink>
            <NavLink className="flex">
              <NewReleasesTwoToneIcon className="mr-1" /> New
            </NavLink>
            <NavLink className="flex">
              <UploadIcon className="mr-1" /> Top
            </NavLink>
          </div>
        )}

        <div>
            {postData &&
              postData.map((item) => (
                <div className="">
                  <div className="shadow-md w-[41rem] mt-5  rounded-lg pt-4 pl-2 mb-8 ">
                    <div className="flex">
                      <div className="flex">
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
                        .{new Date().toLocaleDateString() - item.createdAt}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2">{item.content}</p>
                      <img src={item.images} alt="" className="rounded-xl" />
                    </div>
                    <div className="flex mt-3 pb-5 space-x-4">
                      <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm">
                        <ArrowUpwardOutlinedIcon className="hover:text-orange-500 h-1 w-1" />
                        <div>{item.likeCount}</div>
                        <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1" />
                      </div>
                      <div>
                        <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                        {item.commentCount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        

        <div className=" w-[20rem] bg-gray-50 rounded-2xl mt-3 ml-12">
          <h1 className="pt-7 pl-5 text-gray-500 text-base">
            POPULAR COMMUNITIES
          </h1>
          <div>
            {fetchingData && fetchingData((item) => <div></div>)}
            <button>{"Show More" ? "Show Less" : "Show More"}</button>
          </div>
        </div>
      
    </div>
  );
};

export default PostData;
