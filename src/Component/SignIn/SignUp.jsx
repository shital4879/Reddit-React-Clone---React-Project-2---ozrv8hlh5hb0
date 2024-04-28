import React, { useState } from 'react'

const SignUp = () => {
    const[token,setToken] = useState(sessionStorage.getItem("token"))
   const[registerData,setRegisterData] = useState({
    name:"",
    email:"",
    password:""
   })
    const SignInData = async()=>{
        console.log(registerData);
        try{
            const responce = await fetch (`https://academics.newtonschool.co/api/v1/user/signup`,{
                method: "POST",
                headers: {projectID:"ozrv8hlh5hb0",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:registerData.name,
                email: registerData.email,
               password: registerData.password,
                appType: 'reddit'
            }),
            });
        const result = await responce.json();
        console.log(result);
    if(result.status === "success"){
        sessionStorage.setItem("token",result.token)
    }
}
    catch(error){
console.log(error);
    }
    }
  const handleSubmit=(e)=>{
e.preventDefault();
SignInData();
  }  

  return (
    <div className='m-96'>
       
        <form onSubmit={handleSubmit}>
            <input type="text" value={registerData.name} onChange={(e)=>{setRegisterData({...registerData,name:(e.target.value)})}} className='outline-dashed border-red-100'/>
     <input type="email" value={registerData.email} onChange={(e)=>setRegisterData({...registerData,email:(e.target.value)})} className='outline-dashed border-red-100' />
     <input type="password" value={registerData.password} onChange={(e)=>setRegisterData({...registerData,password:(e.target.value)})} className='outline-dashed border-red-100'  />
     <button type='submit'>submit</button>
     </form>
    </div>
  )
}

export default SignUp
