import { useEffect, useState } from "react"
import validateJWT from '../auth/JwtValidate'
import Error from "./Error"
import './stylesheets/register.css'
import { NavLink } from "react-router-dom"


export default function Login(){


    const [login, setLogin] = useState('')
    const [passwd, setPasswd] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {

    }, [])

    return (
        <div id="registerBox">  
        <NavLink to={'/'}>
            <h1 id="back"><svg height="150px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="150px" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="288,91.2 256.4,64 160,192 256.4,320 288,292.4 192.8,192 "/>
        </svg></h1>
        </NavLink>
            <div id="registerMain">
            <h3>ZALOGUJ</h3>
            <hr />
            <div id="register">
            
            <form id="form" onSubmit={(e) => {
                e.preventDefault()

                if (login.length > 0){
                    
                    fetch('http://localhost:9000/login', {
                        method: "POST",
                        credentials: 'include',
                        headers:{
                            'Content-Type': 'application/json',
                            'connection': 'keep-alive',
                            'powered-by': 'ts'
                        },
                        body: JSON.stringify({
                            data:{
                                login: login,
                                haslo_hash: passwd
                            }
                        }),                        
                    })
                    .then(result => result.json())
                    .then((data) => {console.log(data)
                        setError(data.Error)
                    })
                    .catch(err => console.log(err))
                }
                else {
                    setError('Podaj login i hasło')
                }

            }}>
                {error ? <Error content={error}></Error> : <></>}
                <div className="formBox formBox1">
                <label className="formLabel">Login </label><br/>
                <input 
                    className="formInput"
                    type="text"
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value)
                    }}
                /><br />
                </div>
                <div className="formBox formBox1">
                <label className="formLabel">Hasło </label><br />
                <input 
                    className="formInput"
                    type="password" 
                    value={passwd}
                    onChange={(e) => {
                        setPasswd(e.target.value)
                    }}
                /><br/>
                </div>
                <hr />
                <button type="submit"><b>Zaloguj</b></button>
                <p id="mamKonto">Nie masz konta? <NavLink to={'/register'}>zarejestruj się!</NavLink></p>
                <p id="mamKonto">Nie pamiętasz hasła? <NavLink to={'/resetHaslo'}>zresetuj hasło!</NavLink></p>
            </form>  
            </div>  
            </div>    
        </div>
    )
}