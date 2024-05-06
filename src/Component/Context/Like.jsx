import React, { createContext, useContext, useEffect, useState } from 'react'
import { contextApi } from './ApiContext';
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";


export const likeContext = createContext();

const Like = ({children}) => {


      const upvoteApi = async (postId) => {
      useEffect(()=>{

        try {
          const responce = fetch(
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
    
          const result = responce.json();
          setLikeBtn(result.data)
          console.log(result, "kkkk");
        } catch (error) {
          console.log(error);
        }
    },[postId])
      };
    //   useEffect(() => {
    //     upvoteApi();
    //   },[postId])


  return (
    <div>

                <likeContext.Provider value={{upvoteApi}}>
                    {children}
                </likeContext.Provider>
              
    </div>
  )
}

export default Like
