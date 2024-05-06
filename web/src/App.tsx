import Login from "./auth/Login"
import Register from "./auth/Register"
import Main from "./Main/Main.tsx"
import Home from "./home/Home.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './app.css'
import ResetPassword from "./auth/Passwordreset.tsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}>
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
