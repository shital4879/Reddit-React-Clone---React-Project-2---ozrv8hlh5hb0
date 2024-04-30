import React from 'react'

const OpenPop = () => {
  return (
    <div>
      <div>
                  {posts &&
                    posts
                      .filter((item) => item.likeCount >= 5)
                      .map((item) => (
                        <div className="">
                          <div className="w-dvw -ml-24 shadow-md 2xl:w-[48rem] mt-5 items-center justify-center pt-4 pl-10 pr-8  mb-8  bg-white  border-gray-400 border  rounded-sm dark:bg-black dark:text-gray-200 dark:border-gray-900 sm:-ml-24 sm:w-dvw md:-ml-24 md:w-dvw  lg:-ml-6 lg:w-[35rem] xl:w-[40rem] xl:ml-16 2xl:-ml-28">
                            <div className="flex items-center">
                              <div
                                className="flex"
                                onClick={() =>
                                  navigatetoAuthordetail(
                                    item._id,
                                    item.author.name
                                  )
                                }
                              >
                                <img
                                  src={item.author.profileImage}
                                  alt=""
                                  className="h-6 w-6 rounded-3xl"
                                />
                                <h1 className="font-semibold text-base ml-2 mr-2">
                                  {item.author.name}
                                </h1>
                              </div>
                              <div className="text-gray-500 text-sm">
                                .
                                {(
                                  (new Date() - new Date(item.createdAt)) /
                                  1000 /
                                  3600 /
                                  24
                                ).toFixed(0)}{" "}
                                days ago
                              </div>
                            </div>
                            <div>
                              <p className="mb-2">{item.content}</p>
                              <div className=" flex items-center justify-start">
                                <img
                                  src={item.images}
                                  alt=""
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <div className="flex mt-3 pb-5 space-x-4">
                              <div className="bg-gray-200 rounded-3xl flex space-x-2 p-1 text-sm dark:bg-zinc-950">
                                <ArrowUpwardOutlinedIcon
                                  className="hover:text-orange-500 h-1 w-1"
                                  onClick={() => {
                                    item.likeCount + 1;
                                  }}
                                />
                                <div>{item.likeCount}</div>
                                <ArrowDownwardOutlinedIcon className="hover:text-green-700 h-1 w-1" />
                              </div>
                              <div
                                onClick={() =>
                                  navigatetoCommentsPage(
                                    item._id,
                                    item.author._id
                                  )
                                }
                              >
                                <ChatBubbleOutlineOutlinedIcon className="mr-2" />
                                {item.commentCount}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
    </div>
  )
}

export default OpenPop
