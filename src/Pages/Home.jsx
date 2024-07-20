import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import PostData from '../Component/Navbar/PostData'
import BeforeLogInNav from '../Component/Navbar/BeforeLogInNav'

const Home = () => {
  return (
    <div>
      <div className=' bg-white'>

      <BeforeLogInNav />
      </div>
      <PostData/>
    </div>
  )
}

export default Home
