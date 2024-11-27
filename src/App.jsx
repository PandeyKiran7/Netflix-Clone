import Home from "./Pages/Home/Home"
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {


  return (
    <>
      <h1>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/login" element = {<Login/>}/>
        </Routes>
      </h1>
    </>
  )
}

export default App
