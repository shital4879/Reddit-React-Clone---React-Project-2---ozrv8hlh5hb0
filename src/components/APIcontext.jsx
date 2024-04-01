import React, { Children, createContext, useEffect, useState } from 'react'


export const contextApi = createContext();
export default function APIcontext() {

    const [dataChannel,setdataChannel] = useState();

    const searchData = async () => {
        try {
          const responce = await fetch(
            `https://academics.newtonschool.co/api/v1/reddit/channel/`,
            {
              // method: "GET",
              headers: {
                projectID: "ozrv8hlh5hb0",
                // "Content-Type": "application/json",
              },
            }
          );
          const result = await responce.json();
          setdataChannel(result.data);
          console.log("lo", result.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        searchData();
      }, []);

  return (
    <div>
      <contextApi.Provider value={{dataChannel}}>
        {Children}
      </contextApi.Provider>
    </div>
  )
}
