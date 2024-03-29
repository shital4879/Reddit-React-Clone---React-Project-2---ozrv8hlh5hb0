import Home from "../Pages/Home";
import "../styles/App.css";
import {Routes,Route,BrowserRouter} from "react-router-dom"
import SignUp from "../Component/SignIn/SignUp";
import Popular from "../Pages/Popular"

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/Popular" element={<Popular/>}></Route>
    </Routes> 
    </BrowserRouter>
 
  </div>;
}

export default App;
