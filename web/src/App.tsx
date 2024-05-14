import Login from "./auth/Login"
import Register from "./auth/Register"
import Main from "./Main/Main.tsx"
import Home from "./home/Home.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState, useEffect} from "react";
import './app.css'
import ResetPassword from "./auth/Passwordreset.tsx"
import validateJWT from "./auth/JwtValidate.ts";



function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    validateJWT().then((data) => {
      setLoggedIn(data.verified)
      });

    }, [loggedIn])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main logged={loggedIn}/>}>
            <Route path="/" element={<Home/>}></Route>
          </Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/resetHaslo" element={<ResetPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
