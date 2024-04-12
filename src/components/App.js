import Home from "../Pages/Home";
import "../styles/App.css";
import {Routes,Route,BrowserRouter, json} from "react-router-dom"
import SignUp from "../Component/SignIn/SignUp";
import Popular from "../Pages/Popular"
import Primium from "../Pages/Primium";
import Detail from "../Pages/Detail"
import CreatePost from "../Pages/CreatePost";
import DarkTheme from "../Component/Context/DarkTheme";
import { createContext, useContext, useEffect, useState } from "react";
import ChannelPage from "../Pages/ChannelPage";
import {ThemeContext} from "../Component/Context/DarkTheme"
import ApiContext from "../Component/Context/ApiContext";
import AuthorDetail from "../Pages/AuthorDetail";

export const Mycontext = createContext();

function App() {
const [createCommunity,setCreateCommunity] = useState(false)
const[showLogIn, setShowLogIn] = useState(false);
const [openPopular,setOpenPopular] = useState(false);


  return <div>
    <DarkTheme>
      <ApiContext>
    <Mycontext.Provider value={{showLogIn,setShowLogIn,createCommunity,setCreateCommunity,openPopular,setOpenPopular}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/Popular" element={<Popular/>}></Route>
      <Route path="/premium" element={<Primium/>}></Route>
      <Route path="/Detail/:id" element={<Detail/>}></Route>
      <Route path="/CreatePost" element={<CreatePost/>}></Route>
      <Route path="/ChannelPage/:id" element={<ChannelPage/>}></Route>
      <Route path="/AuthorDetail/:id/:name" element={<AuthorDetail/>}></Route>
    </Routes> 
    </BrowserRouter>
    </Mycontext.Provider>
    </ApiContext>
    </DarkTheme>
  </div>;
}

export default App;
