import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { ThemeContext } from "../Context/DarkTheme";
import NavDetail from "../Navbar/NavDetail";
import HomeNav from "./HomeNav";

export default function Profile() {

    const navigate = useNavigate();
    const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [apiId, setApiId] = useState();
    const params = useParams();
  
   const storeddata = JSON.parse(localStorage.getItem("UserInfo"));
   console.log(storeddata,"k");
  
    function formatDate(dateString) {
      const date = new Date(dateString);
  
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year.toString()}`;
    }

  return (
    <div>
       <div className={darkMode ? "dark" : ""}>
        <div className="fixed bg-white z-50 ">
        <NavDetail />
        </div>
        <div className="flex  bg-gray-200 dark:bg-zinc-950 ">
        <div className="-pt-8 ">
        <HomeNav/>
        </div>
       
          <div className="mt-20 md:-ml-[19rem] sm:-ml-[19rem] -ml-[20rem] xl:ml-40">
            <div className="dark:bg-zinc-800 bg-white 2xl:w-[63rem] flex z-50 h-32 -ml-6 pt-6 pb-6  pl-20 sm:w-[100%] md:w-[100%] xl:w-[100%]">
                <p className="mt-1 h-20 w-20 mr-1 text-4xl bg-gray-300 rounded-full flex justify-center items-center font-bold">
                  {storeddata.name.charAt(0).toUpperCase()}
                </p>
             <div>
             <h2 className="-pt-1 dark:text-white 2xl:text-3xl 2xl:mt-2 2xl:ml-5 font-bold z-40 sm:text-xl text-black">
                {storeddata.name}
              </h2>
              <br/>
              <h2 className="-mt-6 dark:text-white 2xl:text-base 2xl:ml-5 font-semibold z-40 sm:text-xl text-gray-600">
                u/{storeddata.name}
              </h2>
             </div>
            </div>

          
            <div className="w-[20rem] 2xl:h-[30rem] lg:h-[30rem] sm:-ml-8 sm:w-[29rem] md:-ml-8 dark:bg-zinc-950 2xl:pt-8 2xl:pl-36 flex justify-around sm:flex-col-reverse md:flex-col-reverse lg:flex-row  flex-col-reverse pt-10 border-gray-400 border-0 ">
              <div className="2xl:-ml-20 2xl:pl-44 2xl:mr-40  2xl:mt-4 lg:mt-20 dark:text-white sm:flex sm:justify-center lg:block lg:ml-24 ml-44 -mr-44  sm:mr-20">
                <img
                  src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png"
                  alt=""
                  className="lg:h-44 lg:w-36 lg:-mb-14 mr-44"
                />
                <h2 className="2xl:text-2xl 2xl:w-80 lg:text-2xl lg:w-80 font-bold sm:mt-16 sm:text-2xl sm:w-32 mb-8 ml-4 w-28 text-black dark:text-white">
                  {storeddata.name} hasn't posted yet
                </h2>
              </div>
              <div className="sm:ml-44 sm:mb-20 sm:mt-10 md:ml-44 md:mb-20 md:mt-10 2xl:mr-14 2xl:-mt-0 xl:ml-[25rem] ">
                <div className="dark:dark:text-white 2xl:text-xl 2xl:mb-2 2xl:-ml-[29rem] sm:text-lg sm:-ml-40 lg:-ml-[29rem] xl:-ml-[29rem] pl-2">
                  About
                </div>
                <div className="2xl:h-[13rem] xl:h-[13rem] 2xl:w-[21rem] lg:h-[13rem] lg:w-[21rem] lg:-ml-[29rem] md:h-[13rem] dark:bg-zinc-800 2xl:p-5 rounded-xl shadow-2xl sm:w-dvw sm:p-4 sm:-ml-44 p-4 bg-white">
                  <h2 className="mt-10 text-xl dark:text-gray-400 ">
                    <PermIdentityOutlinedIcon />
                    <span> {storeddata.name}</span>
                  </h2>
                  <h2 className="mt-4 space-x-3 text-xl dark:text-gray-400 flex w-16">
                    <EmailOutlinedIcon className="2xl:mt-1 w-16" />
                    <span>{storeddata.email}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          </div>
    
      </div>
    </div>

  )
}
