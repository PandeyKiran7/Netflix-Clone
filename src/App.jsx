import Home from "./Pages/Home/Home"
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Player from "./Pages/Player/Player";

function App() {


  return (
    <>
      <h1>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/player/:id" element = {<Player/>}/>
        </Routes>
      </h1>
    </>
  )
}

export default App
