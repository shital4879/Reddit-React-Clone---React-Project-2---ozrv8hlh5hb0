import Home from "../Pages/Home";
import "../styles/App.css";
import {Routes,Route,BrowserRouter, json} from "react-router-dom"
import SignUp from "../Component/SignIn/SignUp";
import Popular from "../Pages/Popular"
import Primium from "../Pages/Primium";
import Detail from "../Component/Detailing/Detail"
import CreatePost from "../Pages/CreatePost";
import DarkTheme from "../Component/Context/DarkTheme";
import { createContext, useContext, useEffect, useState } from "react";
import ChannelPage from "../Pages/ChannelPage";
import {ThemeContext} from "../Component/Context/DarkTheme"
import ApiContext from "../Component/Context/ApiContext";
import AuthorDetail from "../Pages/AuthorDetail";
import CommentsPage from "../Pages/CommentsPage";
import Like from "../Component/Context/Like";
import UpdatePost from "../Pages/UpdatePost";
import OpenPop from "../Component/Navbar/OpenPop";
import WorkProgress from "../Pages/WorkProgress";

export const Mycontext = createContext();

function App() {
const [createCommunity,setCreateCommunity] = useState(false)
const[showLogIn, setShowLogIn] = useState(false);
const [openPopular,setOpenPopular] = useState(false);
const [openHome, setOpenHome] = useState(false);

  return <div>
    <DarkTheme>
      <ApiContext>
    <Mycontext.Provider value={{showLogIn,setShowLogIn,createCommunity,setCreateCommunity,openPopular,setOpenPopular,openHome, setOpenHome}}>
    <Like>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/Popular" element={<Popular/>}></Route>
      <Route path="/premium" element={<Primium/>}></Route>
      <Route path="/Detail" element={<Detail/>}></Route>
      <Route path="/CreatePost" element={<CreatePost/>}></Route>
      <Route path="/ChannelPage/:id" element={<ChannelPage/>}></Route>
      <Route path="/AuthorDetail/:id/:name" element={<AuthorDetail/>}></Route>
      <Route path="/CommentsPage/:id/:iid" element={<CommentsPage/>}></Route>
      <Route path="/UpdatePost/:id/:con/:title" element={<UpdatePost/>}></Route>
      <Route path="/OpenPop" element={<OpenPop/>}></Route>
      <Route path="/WorkProgress" element={<WorkProgress/>}></Route>
    </Routes> 
    </BrowserRouter>
    </Like>
    </Mycontext.Provider>
    </ApiContext>
    </DarkTheme>
  </div>;
}

export default App;
