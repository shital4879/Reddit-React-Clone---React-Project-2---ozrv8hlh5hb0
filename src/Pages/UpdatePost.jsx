
import React, { useContext, useEffect, useState } from "react";
import NavDetail from "../Component/Navbar/NavDetail";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { ThemeContext } from "../Component/Context/DarkTheme";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ApiContext, { contextApi } from "../Component/Context/ApiContext";

const UpdatePost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { fetchingData, PostApi } = useContext(contextApi);
    console.log(params.id);
    // console.log(params.img);
    const {channelApi} = useContext(contextApi) 
    const [mode, setMode] = useState(false);
    const [imagestate, setImageState] = useState(false);
    const [draftno, setDraftno] = useState(0);
    const [inputvalue, setInputValue] = useState(params.con);
    let maxnum = 100;
    const [community, setCommunity] = useState(false);
    const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [postImage,setPostImage] = useState("")
    const [text, setText] = useState(params.title);
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };
  
    const handleinputNum = (e) => {
      const value = e.target.value;
      if (value.length <= maxnum) {
        setInputValue(value);
      }
    };
  
    // const [signUpData, setSignUpData] = useState({
    //   postTitle: "",
    //   postContent: "",
    //   postImage: "",
    // })
  
  const createpostdata = async (e) =>{
  e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', inputvalue);
    formData.append('content', text);
    formData.append('images', postImage);
  
    try{
      const responce = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          projectID: "ozrv8hlh5hb0",
       
        },
        body : formData
      })
      const result = await responce.json()
      console.log(result);
      console.log(localStorage.getItem("token"));
  
      if(result.status === "success"){
        console.log(result.message);
        navigatedetailpage()
      }
      if(result.status === "fail"){
        console.log("fail");
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    createpostdata;
  }, []);
  
  const navigatedetailpage = () =>{
    navigate(-1)
  }

  const [activeItem, setActiveItem] = useState("post");
const handleItemClick = (itemName) => {
  setActiveItem(itemName === activeItem ? null : itemName);
};

  
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="fixed">

    <NavDetail />
      </div>

    {fetchingData &&
          fetchingData
            .filter((item) => params.id == item._id)

            .map((item) => (
           
    <form onSubmit={createpostdata}>
    <div className="bg-gray-300 h-dvh w-dvw flex pt-8 2xl:pl-40 pr-40 justify-between dark:bg-zinc-950 sm:pl-0 lg:pl-8 xl:pl-24">
      <div className="mt-14">
        <div className="flex justify-between border-solid border-white border-b 2xl:w-[50rem] pb-2 dark:text-white dark:border-gray-800 sm:w-[40rem] pr-2 sm:-mt-4 sm:pl-2 md:w-dvw lg:w-[38rem] xl:w-[45rem] w-dvw">
          <h1 className="text-lg">Create a post</h1>
          <div className="text-sm mt-1 text-blue-600 font-semibold dark:text-white">
            DRAFTS{" "}
           
            <button className="bg-gray-600 text-gray-200 pl-1 pr-1 dark:text-black dark:bg-zinc-500 rounded-sm">
              {draftno}
            </button>
          </div>
        </div>
        <div
          onClick={() => setCommunity(!community)}
          className="bg-white flex p-[7px] border bolrder-solid border-gray-400 w-72 mt-2 rounded text-gray-500 dark:bg-black dark:text-gray-400 dark:border-gray-900"
        >
          <PanoramaFishEyeIcon />
          <p className=" 2xl:mr-10 2xl:pl-2 ml-2 mr-12">
            {community ? "Choose a community" : "Search communities"}
          </p>
          <p>
            {community ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </p>
        </div>
        {community && (
          <div className=" 2xl:w-72 bg-white p-4 dark:bg-black sm:w-72 md:w-72 lg:w-72 w-44  z-10">
            <div className="border-b bolrder-solid border-gray-400 pb-5">
              <p className="text-xs text-gray-400">Your profile</p>

              <div></div>
            </div>

            <div className="flex justify-between mt-4 dark:bg-black">
              <h1 className="text-xs text-gray-400 pt-2">YOUR COMMUNITIES</h1>
              <button className="text-blue-800 font-bold text-xs p-2 hover:bg-gray-300 hover:rounded-2xl">
                Create New
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <video
                className="h-32 w-32"
                src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/content-missing-6023278-5017533.mp4"
                autoPlay
                loop
              ></video>
            </div>
            <p className="text-xs dark:text-gray-400 mt-6">
              No Community found ! Create one
            </p>
          </div>
        )}

        <div className="mt-4  border-solid border-gray-400 rounded border bg-white 2xl:h-[28rem] shadow-xl dark:bg-black dark:text-gray-400 dark:border-gray-900 sm:w-dvw lg:w-[38rem] xl:w-[45rem] w-dvw">
          <div className="flex  border-solid border-gray-300 border-b dark:border-gray-600">
            <div
             onClick={() => {setImageState(false),handleItemClick("post")}}
             className={`flex pt-2 pb-2 pl-20 pr-16 border-solid  dark:border-gray-900 sm:text-gray-500 ${activeItem === "post" ? " border-b-2 bg-blue-100 border-blue-700 dark:border-gray-200 dark:text-gray-300 dark:bg-gray-900":""}`}
            >
              <PostAddIcon />
              <p>Post</p>
            </div>
            <div
                onClick={() => {setImageState(true),handleItemClick("image")}}
                className={`
                flex pt-2  pb-2 pl-7 pr-10 border-solid  dark:border-gray-900 sm:text-gray-500 ${activeItem === "image" ? " border-b-2 bg-blue-100 border-blue-700 dark:border-gray-200 dark:text-gray-300 dark:bg-gray-900":""}`}
            >
              <ImageIcon />
              <p>Image & Video</p>
            </div>
          </div>

          <div className="flex justify-between m-4 border border-solid border-gray-400 h-10 rounded p-1 focus-visible:border focus-visible:border-solid focus-visible:border-blue-800 focus:bg-red-500 dark:border-gray-900">
            <input
              type="text"
              value={inputvalue}
            //   value={params.con}
            // defaultValue={params.con}
              placeholder="Title"
              onClick={handleinputNum}
              maxLength="100"
              onChange={(e) => setInputValue(e.target.value)}
              className="border-none outline-none text-base w-[45rem] dark:bg-black "
            />
            <p>
              {inputvalue.length}/{maxnum}
            </p>
          </div>

          <div className="flex  justify-between m-4 bg-gray-100 h-10 rounded p-1 dark:border-gray-900 dark:bg-black border border-solid ">
            <div className="flex ">
              {!mode ? (
                <>
                  <button className="font-bold text-xl hover:bg-zinc-300 rounded-md pl-2 pr-2 ml-4 ">
                    B
                  </button>
                  <button className="font-bold text-xl hover:bg-zinc-300 rounded-md pl-2 pr-2 ml-4  italic">
                    i
                  </button>
                  <button className="font-bold text-xl hover:bg-zinc-300 rounded-md pl-2 pr-2 ml-4 ">
                    <LinkIcon />
                  </button>
                </>
              ) : (
                <>
                  <p className="pl-2 mr-3">Markdown</p>
                  <HelpOutlineRoundedIcon className="h-2 w-2"/>
                </>
              )}
            </div>
            <div
              className="mr-10 text-blue-600 pl-5 pr-5 font-semibold text-sm hover:bg-gray-300 rounded-2xl pt-1 dark:text-white dark:hover:bg-gray-700"
              onClick={() => setMode(!mode)}
            >
              {!mode ? "Markdown Mode" : "Switch to Fancy Pants Editor"}
            </div>
          </div>
          {imagestate && (
            <div className="-mt-[16px] ml-4 mr-4 border border-solid border-gray-200 2xl:w-[43rem] h-[10rem] p-2 flex justify-center dark:border-gray-900 items-center text-center sm:w-[38rem] sm:mr-4 lg:w-[36rem] xl:w-[43rem] w-[26rem]">
              <p className="text-blue-600 mr-2 dark:text-gray-400">
                Drag and drop image or
              </p>
              <label htmlFor="forimg" className="text-blue-600 mr-4 border border-solid border-blue-600 pl-2 pr-2 rounded-2xl dark:text-gray-400 dark:border-gray-400">
                <input type="file" accept="postImage/*" onChange={(e)=>setPostImage(e.target.files[0])} id="forimg" style={{display:"none",visibility:"none"}}/>
                {/* <img src="" alt="" onChange={(e)=>setPostImage(e.target.value)} value={postImage}/> */}
                Upload
              </label>
            </div>
          )}

          {!imagestate && (
            <textarea
              required
              className="-mt-[16px] ml-4 mr-4 border border-solid border-gray-200 2xl:w-[43rem] h-[10rem] p-2 dark:border-gray-900 dark:bg-black sm:w-[38rem] sm:mr-4 md:w-[46rem] lg:w-[36rem] xl:w-[43rem] w-[26rem]"
              placeholder="Text(Optional)"
              // value={text}
            // defaultValue={params.title}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onClick={handleTextChange}
            ></textarea>
          )}

          <div className="flex justify-end mt-2">
            <button
              onClick={() => setDraftno(draftno + 1)}
              className={`border border-solid font-semibold text-sm  pl-3 p-1 pr-3 mr-4 rounded-3xl ${
                text.trim() === ""
                  ? "text-gray-400 border-gray-400 dark:text-gray-800 dark:bg-black dark:border-gray-900"
                  : "text-blue-800 border-blue-800 dark:text-gray-400 dark:border-gray-400"
              }`}
              disabled={text.trim() === ""}
            >
              SAVE DRAFT
            </button>
            <button
              className={`border border-solid font-semibold text-sm  pl-4 p-1 pr-4 mr-8 rounded-3xl ${
                text.trim() === ""
                  ? "bg-gray-400 border-gray-100 text-gray-500 dark:bg-gray-700 dark:border-gray-900"
                  : "bg-blue-800 text-white border-blue-800 dark:text-gray-700 dark:bg-gray-400 dark:border-none"
              }`}
              disabled={text.trim() === ""}
              // onClick={createpostdata}
              type="submit"
            >
              POST
            </button>
          </div>

          <div className="flex pl-4  mt-4 bg-gray-100 h-10 rounded p-1 dark:bg-black dark:text-gray-400  border-solid border-t border-b dark:border-gray-900 ">
            <input type="checkbox" />
            <p className="text-blue-500  ml-2 mt-1 dark:text-gray-400">
              Send me post reply notifications
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 invisible sm:invisible 2xl:visible lg:visible">
        <div className="flex ml-14 border-solid p-4 2xl:w-[23rem] 2xl:h-[18rem] border-gray-400 border rounded-md bg-white dark:bg-black dark:text-gray-400 dark:border-gray-900 md:w-[19rem]">
          <h1 className="flex space-x-4  md:w-[15rem]">
            <img src="/snooo.png" alt="" className="h-7 w-7" />
            <h3 className="text-lg font-semibold">Posting to Reddit</h3>
          </h1>

          <ol className="-ml-40 mt-8 list-decimal font-medium text-gray-800">
            <li className="border-b border-solid border-gray-40 p-1 border-t dark:text-white dark:border-gray-900 ">
              Remember the human
            </li>
            <li className="border-b border-solid border-gray-40 p-1 dark:text-white dark:border-gray-900 ">
              Behave like you would in real life
            </li>
            <li className="border-b border-solid border-gray-40 p-1 dark:text-white dark:border-gray-900 ">
              Look for the original source of content
            </li>
            <li className="border-b border-solid border-gray-40 p-1 dark:text-white dark:border-gray-900 ">
              Search for duplicates before posting
            </li>
            <li className="border-b border-solid border-gray-40 p-1 dark:text-white dark:border-gray-900 ">
              Read the community’s rules
            </li>
          </ol>
        </div>
        <p className=" 2xl:w-[21rem] text-sm p-2 lg:ml-12">
          Please be mindful of reddit's content policy and practice good
          reddiquette.
        </p>
      </div>
    </div>
    </form>
     ))}
  </div>
  )
}

export default UpdatePost
