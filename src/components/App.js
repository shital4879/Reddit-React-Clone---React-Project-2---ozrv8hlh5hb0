import Home from "../Pages/Home";
import "../styles/App.css";
import {Routes,Route,BrowserRouter} from "react-router-dom"

function App() {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>

  </div>;
}

export default App;
