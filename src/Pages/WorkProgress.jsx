import React from 'react'
import NavDetail from '../Component/Navbar/NavDetail'

const WorkProgress = () => {
  return (
    <div>
        <div className='fixed'>
            <NavDetail/>
        </div>
      
      <div className='flex justify-center items-center bg-slate-700 h-dvh'>
        <img src="/workprogress.png" alt="" />
      </div>
    </div>
  )
}

export default WorkProgress
