import React, { useContext } from 'react';
import NavDetail from '../Component/Navbar/NavDetail'
import { ThemeContext } from '../Component/Context/DarkTheme';

const Inbox = () => {
    const { darkMode, setDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div>
       <div className={darkMode ? "dark" : ""}>
        <div className='fixed'>
            <NavDetail/>
        </div>
      
      <div className='flex justify-center items-center bg-slate-700 h-dvh dark:bg-slate-950'>
        <img src="/images.jpg" alt="" className='z-50'/>
      </div>
    </div>
    </div>
  )
}

export default Inbox
