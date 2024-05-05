import Login from "./auth/Login"
import Register from "./auth/Register"
import Navbar from "./components/Navbar"
import Home from "./home/Home"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import './app.css'
import ResetPassword from "./auth/Passwordreset"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/resetHaslo" element={<ResetPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
