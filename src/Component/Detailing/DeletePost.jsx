import React, { useContext, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/DarkTheme";

const DeletePost = ({ item,setPosts}) => {
    const navigate = useNavigate()
    const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
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
  const[open,setOpen]= useState(false); 
  const navigatetoUpdatePost = (id, con, title) => {
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("con",con);
    sessionStorage.setItem("title",title);
    navigate(`/UpdatePost`);
    console.log(id,con,title,"da");
  };
  
  
  
  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="absolute right-4 hover:bg-gray-300 hover:dark:bg-gray-800 rounded-xl  ">
        <div onClick={()=>{setOpen(!open)}} className="">
            <MoreHorizOutlinedIcon style={{fontSize: "22px" }}/>
        </div>
        {
            open && 
        <div className="bg-white absolute right-6 w-36 pb-2 border rounded-lg z-50 shadow-lg dark:bg-zinc-950 dark:border-gray-800">
      <div className=" flex mt-2 pl-2 pr-2 pt-1  hover:bg-zinc-300 dark:hover:bg-zinc-800" onClick={() => deletePost(item._id)}>
        <DeleteOutlineIcon style={{ fontSize: "22px" }}  />
        <h1 className="ml-2">Delete Post</h1>
      </div>
      <div
        onClick={(e) => {
            console.log("not working", item);
          
            navigatetoUpdatePost(item._id,item.content,item.title);
          }}
          className="mt-2 flex  pl-2 pr-2 pb-1  hover:bg-zinc-300 dark:hover:bg-zinc-800"
      >
      <UpgradeIcon style={{ fontSize: "22px" }} />
      <h1 className="ml-2">Update Post</h1>
      </div>
      </div>
}
    </div>
    </div>
  );
};

export default DeletePost;
