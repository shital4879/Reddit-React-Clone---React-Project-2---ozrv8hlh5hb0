import React, { useContext } from 'react'
import PopData from "../Component/PopularData"
import Navbar from '../Component/Navbar/Navbar'
import PostData from '../Component/Navbar/PostData'
import PopularData from "../Component/PopularData"
import NavDetail from '../Component/Navbar/NavDetail'
import { ThemeContext } from '../Component/Context/DarkTheme'
import BeforeLogInNav from '../Component/Navbar/BeforeLogInNav'

const Popular = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div className={darkMode ? "dark" : ""}>
      {
        !sessionStorage.getItem("token") &&
      
      <BeforeLogInNav/>
}
{/* {
  sessionStorage.getItem("token") &&
  <NavDetail/>
} */}

      <PopularData/>

    </div>
  )
}

export default Popular
