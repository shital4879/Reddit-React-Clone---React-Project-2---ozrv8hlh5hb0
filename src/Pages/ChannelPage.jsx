import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PhoneIcon from '@mui/icons-material/Phone';
import { ThemeContext } from "../Component/Context/DarkTheme";
import NavDetail from "../Component/Navbar/NavDetail";


const ChannelPage = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext)
  const [apiId, setApiId] = useState();
  const params = useParams();
  console.log(params.id);

  const channelApidata = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/channel/${params.id}`,
        {
          method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setApiId(result.data);
      // console.log("lol", result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    channelApidata();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year.toString()}`;
  }

  console.log(channelApidata, "jj");

  return (
    <div className={darkMode?"dark":""}>
      <div>
      <NavDetail />
      {apiId && (
        <div className="">
          <img src={apiId.owner.profileImage} alt="" className="w-dvw h-60" />
          {/* <div className=' -mt-44 bg-zinc-800 h-44 w-full z-40'> */}

          {/* <div className='mt-8'> */}

          <div className="flex  dark:bg-zinc-800 z-50 h-24 pt-6 bg-white ">
            <img
              src={apiId.image}
              alt=""
              className="2xl:h-14 2xl:w-14 lg:h-14 lg:w-14 2xl:ml-32 rounded-full 2xl:p-[2px] dark:bg-white z-40 sm:h-10 sm:w-10 sm:ml-20 sm:mr-3 "
            />
            <h2 className="dark:text-white 2xl:text-3xl 2xl:mt-2 2xl:ml-5 font-bold z-40 sm:text-xl text-black">
              {apiId.name}
            </h2>
          </div>

          {/* </div> */}
          <div className="w-full 2xl:h-[50rem] lg:h-[50rem] dark:bg-zinc-950 2xl:pt-8 2xl:pl-36 flex justify-around sm:flex-col-reverse md:flex-col-reverse lg:flex-row  flex-col-reverse pt-10 border-gray-400 border-0 bg-gray-200">
            <div className="2xl:-ml-24 2xl:pl-44 2xl:mt-20  lg:mt-20 dark:text-white sm:flex sm:justify-center lg:block lg:ml-24 ml-44 -mr-44 md:mr-60 sm:mr-60 ">
              <img src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" alt="" className="lg:h-44 lg:w-36 lg:-mb-14 mr-44"/>
              <h2 className="2xl:text-2xl 2xl:w-80 lg:text-2xl lg:w-80 font-bold sm:mt-16 sm:text-2xl sm:w-32 mb-8 ml-4 w-28 text-black">{apiId.name} hasn't posted yet</h2>
            </div>
            <div className="sm:ml-44 sm:mb-20 sm:mt-10 md:ml-44 md:mb-20 md:mt-10 2xl:mr-14">
              <div className="dark:dark:text-white 2xl:text-xl 2xl:mb-2 sm:text-lg sm:-ml-40 lg:-ml-56 pl-2 2xl:-ml-44">About</div>
              <div className="2xl:h-[24rem] 2xl:w-[21rem] lg:h-[24rem] lg:w-[21rem] dark:bg-zinc-800 2xl:p-5 rounded-xl shadow-2xl sm:w-dvw sm:p-4 sm:-ml-44 p-4 bg-white">
                <div className="text-xl dark:dark:text-white mb-12">
                  {apiId.description}
                </div>
                <h2 className="mt-10 text-xl dark:text-gray-400 ">
                  <PermIdentityOutlinedIcon />
                  <span> {apiId.owner.name}</span>
                </h2>
                <h2 className="mt-4 space-x-3 text-xl dark:text-gray-400 flex">
                  <EmailOutlinedIcon className="2xl:mt-1"/>
                  <span>{apiId.owner.email}</span>
                </h2>
                <h2  className="mt-4 space-x-3 text-xl dark:text-gray-400 flex">
                  <CreateOutlinedIcon className="mt-1"/>
                  <span>{formatDate(apiId.createdAt)}</span>
                </h2>
                <h2  className="mt-4 space-x-3 text-xl dark:text-gray-400 flex">
                  <PhoneIcon className="mt-1"/>
                  <span>{apiId.owner.phone}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ChannelPage;
