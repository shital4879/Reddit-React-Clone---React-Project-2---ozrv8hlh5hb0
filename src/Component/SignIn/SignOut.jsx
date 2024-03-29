import React from 'react'

const SignOut = () => {
    const signout=()=>{
        window.localStorage.removeItem("token")
    }
  return (
    <div>
      <button onClick={()=>signout}>Sign Out</button>
    </div>
  )
}

export default SignOut
