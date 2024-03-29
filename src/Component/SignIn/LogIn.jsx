import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LogIn = (props) => {
    // const showAppLink = props;
    const navigate = useNavigate();
    
  return (
    <div>
      <div className="bg-gray-700 bg-opacity-80 h-dvh size-full m-0 fixed top-0 left-0 w-dvw flex justify-center items-center">
          <div className="bg-white relative w-[30rem] h-[75%] rounded-md">
            <div className="flex m-5 justify-between">
              <h1 className="text-3xl font-bold">Get the Reddit app</h1>
              <button
                className="text-3xl p-3 rounded-md bg-gray-100"
                onClick={() => {
                //   setShowAppLink(!showAppLink);
                navigate("/");
                }}
              >
                {" "}
                X{" "}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="flex items-center w-[32%] justify-center  text-center font-medium">
                Scan this QR code to download the app now
              </p>
            </div>
            <div className="flex items-center justify-center text-center font-medium">
              <img
                className="h-[14rem] w-[14rem] flex items-center justify-center mt-2 text-center font-medium"
                src="https://reddit-ten-mocha.vercel.app/QRCode.png"
                alt=""
              />
            </div>
            <p className="flex items-center justify-center mt-4 text-center font-medium">
              Or check it out in the app stores
            </p>
            <div className="flex items-center justify-center mt-2 text-center font-medium space-x-2">
              <img
                className="w-[7rem]"
                src="https://www.redditstatic.com/shreddit/assets/google-play.svg
"
                alt=""
              />
              <img
                className="w-[6rem]"
                src="https://www.redditstatic.com/shreddit/assets/app-store.svg"
                alt=""
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default LogIn
