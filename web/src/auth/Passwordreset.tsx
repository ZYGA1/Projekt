import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { NavLink, redirect, Navigate } from "react-router-dom"
import Error from "./Error"
import './stylesheets/passwordreset.css'



export default function ResetPassword() {

    const [login, setLogin] = useState('')
    const [haslo, setHaslo] = useState('')
    const [nHaslo, setNHaslo] = useState('')
    const [err, setErr] = useState('')
    const [validLogin, setValidLogin] = useState(false)
    const [res, setRes] = useState('')

    useEffect(() => {
        checkLogin(login).then((result) =>  {
            setValidLogin(result.taken)
        })
    }, [login])

    const checkLogin = async (login: string) => {
        const res = await fetch('http://localhost:9000/checklogin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login
            })
        })
        
        const data  = await res.json()
        return data
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
         e.preventDefault()
        if (validLogin == false){
            setErr('Zły login')
            return 0;
        }

        if (haslo.length < 8) {
            setErr('Hasło musi mieć 8 znaków')
            return 0
        }
 
        if (nHaslo.trim() != haslo.trim()) {
            console.log('GGG')
            setErr('Powtórzone hasło nie jest takie same')
            return 0;
        }

        setErr('')

        fetch('http://localhost:9000/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: haslo
            })
        })
        .then(result => result.json())
        .then((data: any) => {
            setRes(data.Error)
            setRes(data.message)
            
        })
    }

    

    const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
       setLogin(e.target.value)

    }    
   
    const handleHaslo = (e: ChangeEvent<HTMLInputElement>) => {
        setHaslo(e.target.value)
    }

    const handleNHaslo = (e: ChangeEvent<HTMLInputElement>) => {
        setNHaslo(e.target.value)
    }

    return (
        <div id="resetRoot">
                    <NavLink to={'/login'}>
            <h1 id="back"><svg height="150px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="150px" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="288,91.2 256.4,64 160,192 256.4,320 288,292.4 192.8,192 "/>
        </svg></h1>
        </NavLink>
            <div id="resetBox">
                <div id="reset">
                    <form id="form" onSubmit={handleSubmit}>
                        <h2 id="head">Resetuj hasło</h2>
                        <hr />
                        {err ? <Error content={err}></Error> : <></>}
                        <div className="formBox">
                        <label className="formLabel" htmlFor="">Login </label>
                        <input className="formInput" type="text" value={login} onChange={handleLogin} />
                        </div>
                        <div className="formBox">
                        <label className="formLabel" htmlFor="">Nowe hasło </label>
                        <input type="password" className="formInput" value={haslo} onChange={handleHaslo}/>
                        </div>
                        <div className="formBox">
                        <label className="formLabel" htmlFor="">Powtórz nowe hasło </label>
                        <input className="formInput" type="password" value={nHaslo} onChange={handleNHaslo} />
                        </div>
                        <hr />
                        <button>Resetuj hasło</button>
                        {res ? <p id="mamKonto">{res}</p>  : <p></p>}
                        {res ? <Navigate to='/login'></Navigate> : <></>}
                    </form>
                </div>
            </div>
        </div>
    )
}