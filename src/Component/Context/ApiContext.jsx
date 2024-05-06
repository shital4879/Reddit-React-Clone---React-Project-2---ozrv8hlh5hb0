import React, { createContext, useEffect, useState } from 'react'


export const contextApi = createContext();

const ApiContext = ({children}) => {

    const [search, setSearch] = useState("");
    const [fetchingData, setFetchingData] = useState();
    const [postData, setPostData] = useState();
    const [channelApi,setChannelApi] = useState();
    const [showHam, setShowHam] = useState(false);

// --------------SEARCH API ---------------------------------------------------------------------------------------------
  const searchData = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?search={"author.name":"${search}"}`,
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
      // console.log("lo", result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchData();
  }, [search]);


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
      // console.log(result.data,"post");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    PostApi();
  }, []);


// ------------------------------- CHANNEL API ------------------------------------------------------------------
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

  const storedData = JSON.parse(localStorage.getItem('UserInfo'));



  return (
    <div>
      <contextApi.Provider value={{searchData,search,setSearch,fetchingData,setFetchingData,postData,setPostData,channelApi,setChannelApi,PostApi,storedData,}}>
        {children}
      </contextApi.Provider>
    </div>
  )
}

export default ApiContext
