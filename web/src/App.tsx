import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Login from "./auth/Login"


function App() {

  return (
    <>
      <Navbar/>
      <Login/>
    </>
  )
}

export default App
