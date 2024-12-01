import Home from "./Pages/Home/Home"
import {Routes,Route, useNavigate} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Player from "./Pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./Firebase";

function App() {

  const navigate = useNavigate();
    useEffect(() => {
      onAuthStateChanged(auth, async(user) => {
if (user) {
  alert("Logged In");
  navigate("/");
} else {
  alert("Logged out");
  navigate("/login");
}
      });
    },[]);

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
