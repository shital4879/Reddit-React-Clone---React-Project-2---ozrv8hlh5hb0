import React, { useContext, useState } from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { contextApi } from "../Context/ApiContext";
import { NavLink, useNavigate } from "react-router-dom";

const HomeNav = () => {
  const navigate = useNavigate();
  const { fetchingData, PostApi,openPopular,channelApi} = useContext(contextApi);
  const [opencommun, setOpenCommun] = useState(false);
  const [openRecents, setOpenRecents] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const navigatetoChannel = (id) => {
    navigate(`/ChannelPage/${id}`);
  };

  return (
    <div>
      <div className="">
        <div className="bg-white w-[21rem] lg:w-[17rem] 2xl:w-[21rem] mt-20 dark:bg-zinc-950 xl:-ml-4 invisible sm:invisible md:invisible lg:visible xl:visible 2xl:visible  border-gray-400 border rounded-sm dark:border-gray-900">
          <div className=" xl:w-[12rem] 2xl:w-[18rem] flex justify-between  pr-12 pt-3 pb-2 relative h-14 md:w-[10rem] dark:text-white  ">
            <ul>
              <li
                className={`mb-2 2xl:ml-8 hover:bg-gray-100 w-[17rem] pt-1 pb-1 pl-2 pr-5 z-0  2xl:w-[14rem] ml-5 rounded-lg xl:w-[10rem] lg:w-[8rem] dark:hover:bg-gray-800 dark:text-gray-200 
            }`}
              >
                <NavLink
                to="/Detail"
                >
                  <HomeRoundedIcon /> Home
                </NavLink>
              </li>
              <li
                className={`pl-2 ml-5 2xl:ml-8 hover:bg-gray-100 pt-1 pb-1  2xl:w-[14rem] rounded-lg lg:w-[8rem] xl:w-[10rem] dark:hover:bg-gray-800  
            }`}
              >
                <NavLink
                 to="/Detail"
                >
                  < OutboundRoundedIcon/> Popular
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="mt-14 border-t border-b pb-4 ml-5  mr-4 pt-2 dark:border-gray-800">
            <div className="flex dark:text-gray-500 justify-between tracking-widest font-extralight pl-4 pr-4 pt-2 pb-2 rounded-md text-gray-600 ml-2 mb-1 hover:bg-gray-100 dark:hover:bg-gray-800 ">
              <h1>RECENTS</h1>
              <KeyboardArrowDownOutlinedIcon
                className="dark:text-white"
                onClick={() => setOpenRecents(!openRecents)}
              />
            </div>
            {channelApi &&
              !openRecents &&
              channelApi.slice(0, 2).map((item) => (
                <div
                  className="flex space-x-3 space-y-3 dark:text-gray-400  ml-2 pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-zinc-950"
                  onClick={() => navigatetoChannel(item._id)}
                >
                  {item.image == null ? (
                    <p className="mt-2 font-bold pl-1 pr-1 text-sm h-5 dark:text-gray-900 bg-gray-300 rounded-2xl dark:hover:bg-gray-800">
                      {item.name.charAt(0).toUpperCase()}
                    </p>
                  ) : (
                    <img
                      src={item.image}
                      alt=""
                      className="h-6 w-6 rounded-3xl mt-2"
                    />
                  )}
                  <div>
                    <div
                      className="text-[16px] tracking-normal -mt-2"
                      onClick={() => navigatetoChannel(item._id)}
                    >
                      r/{item.name}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mr-4 pr-2 p-4  border-b pb-4 ml-4  pt-2 dark:bg-zinc-950  dark:text-white dark:border-gray-800">
            <div className="mt-2 tracking-widest">
              <h1 className="flex justify-between tracking-widest font-extralight text-gray-500 pl-4 pr-2 pt-2 pb-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-500">
                <h1>COMMUNITY </h1>
                <KeyboardArrowDownOutlinedIcon
                  className="dark:text-white"
                  onClick={() => {
                    setOpenCommun(!opencommun);
                  }}
                />
              </h1>
              {!opencommun && (
                <div className="">
                  {/* <h1
                className="tracking-tight  text-gray-700 dark:bg-zinc-950 dark:text-gray-400 pl-2 pr-4 pt-1 pb-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setCreateCommunity(!createCommunity)}
              >
                <AddOutlinedIcon /> Create a Community
              </h1> */}
                  {channelApi &&
                    channelApi.slice(0, 5).map((item) => (
                      <div
                        className="flex space-x-3 space-y-4  dark:text-gray-400 pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => navigatetoChannel(item._id)}
                      >
                        {item.image == null ? (
                          <p className="mt-2 font-bold pl-1 pr-1 text-sm h-5 dark:text-gray-900 bg-gray-300 rounded-2xl">
                            {item.name.charAt(0).toUpperCase()}
                          </p>
                        ) : (
                          <img
                            src={item.image}
                            alt=""
                            className="h-6 w-6 rounded-3xl mt-2"
                          />
                        )}
                        <div>
                          <div className="text-[16px] tracking-normal -mt-2">
                            r/{item.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
