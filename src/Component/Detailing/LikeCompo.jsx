import React, { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

const LikeCompo = ({ item,setPosts }) => {

const [disliked,setdisLiked] = useState(false);


    const PostApii = async () => {
        try {
          const responce = await fetch(
            `https://academics.newtonschool.co/api/v1/reddit/post?limit=100`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

const handledislike = (id) =>{
    downvoteApi(id)
    setdisLiked(true);

}
const handleupvote = (id) =>{
    upvoteApi(id);
    setdisLiked(false);
}



  return (
    <div>
      <div className="bg-gray-300 rounded-3xl flex justify-center items-center space-x-2 p-1 text-sm dark:bg-zinc-900">
        <ThumbUpOutlinedIcon
        
          className={`h-1 w-1`}
          onClick={() => {
            handleupvote(item._id);
          }}
          style={{ fontSize: "18px", color:item.isLiked ? "red" : ""}}
        />

        <div>{item.likeCount}</div>
        <ThumbDownOutlinedIcon
          // className="hover:text-green-700 h-1 w-1"
          onClick={() => handledislike(item._id)}
          style={{ fontSize: "18px", color:disliked ? "blue" : ""}}
        />
      </div>
    </div>
  );
};

export default LikeCompo;
