import Home from "../Pages/Home";
import "../styles/App.css";
import {Routes,Route,BrowserRouter, json} from "react-router-dom"
import SignUp from "../Component/SignIn/SignUp";
import Popular from "../Pages/Popular"
import Primium from "../Pages/Primium";
import Detail from "../Pages/Detail"
import CreatePost from "../Pages/CreatePost";

import { createContext, useEffect, useState } from "react";


export const Mycontext = createContext();

function App() {
const[showLogIn, setShowLogIn] = useState(false);
// const [darkMode, setDarkMode] = useState(getDarkMode);
const [dataChannel,setdataChannel] = useState();


const searchData = async () => {
    try {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/channel/`,
        {
          // method: "GET",
          headers: {
            projectID: "ozrv8hlh5hb0",
            // "Content-Type": "application/json",
          },
        }
      );
      const result = await responce.json();
      setdataChannel(result.data);
      console.log("lo", result.data);
    } catch (error) {
      console.log(error);
    }
  };


 







//   const getDarkMode = () =>{
//     if(darkMode===false){
      
//       return json.parse(localStorage.getItem("darkMode"))
//     }
//   }
// useEffect(()=>{
//  localStorage.setItem("darkMode",JSON.stringify(darkMode))
// },[darkMode])

  useEffect(() => {
    searchData();
  }, []);


// const toggleDarkMode = (e) => {
  // e.preventDefault();
//   setDarkMode(!darkMode);
// };
  return <div>
    {/* <APIcontext.Provider> */}
    <Mycontext.Provider value={{showLogIn,setShowLogIn,darkMode,setDarkMode,toggleDarkMode,dataChannel}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/Popular" element={<Popular/>}></Route>
      <Route path="/premium" element={<Primium/>}></Route>
      <Route path="/Detail" element={<Detail/>}></Route>
      <Route path="/CreatePost" element={<CreatePost/>}></Route>
    </Routes> 
    </BrowserRouter>
    </Mycontext.Provider>
    {/* </APIcontext.Provider> */}
  </div>;
}

export default App;
