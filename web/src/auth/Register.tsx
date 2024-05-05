import { useState, useEffect } from "react"
import validateJWT from "./JwtValidate"
import Error from "./Error"
import '../auth/stylesheets/register.css'
import { NavLink } from "react-router-dom"

export default function Register(){

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [haslo, setHaslo] = useState('')
    const [rHaslo, SetRHaslo] = useState('')
    const [taken, SetTaken] = useState(false)
    const [err, SetErr] = useState('')

    useEffect(() => {
        const verified = validateJWT().then((data) => {
            console.log(data)
        })

        checkLogin(login).then((result) =>  {
            console.log(result)
            SetTaken(result.taken)
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
    const divStyle = {
        backgroundColor: taken ? 'red' : 'blue',
        width: '20%'
    }

    return (
    <div id="registerBox">
        <NavLink to={'/'}>
            <h1 id="back"><svg height="150px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="150px" xmlns="http://www.w3.org/2000/svg">
  <polygon points="288,91.2 256.4,64 160,192 256.4,320 288,292.4 192.8,192 "/>
</svg></h1>
        </NavLink>
        
    <div id="registerMain"> 
        <h3>STWÓRZ KONTO</h3>
        <hr />
        <div id="register">  
           
            <form id="form" onSubmit={(e) => {
                e.preventDefault()
                if (haslo === rHaslo){
                    if(taken == false){
                        fetch('http://localhost:9000/register', {
                            method: "POST",
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'connection': 'keep-alive'
                            },
                            body: JSON.stringify({
                                login: login,
                                haslo: haslo,
                                email: email
                            })
                        })
                        .then(result => result.json())
                        .then(data => console.log(data))
                    }
                    else {
                        SetErr('Login zajęty')
                    }
                }
                else {
                    SetErr('Powtórzone hasło nie jest takie same')
                }
            


            }}> 
                
                {err ? <Error content={err}></Error> : <></>}
                <div className="formBox formBox1">
                <label className="formLabel" htmlFor="email">Email </label>
                <input className="formInput" id="email" type="email" required value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }}/><br />
                </div>
                <div className="formBox formBox1">
                <label className="formLabel" htmlFor="login">Login </label>
                <input className="formInput" id="login" type="text" required value={login} onChange={(e) => {
                    
                    setLogin(e.target.value)
                }}/><br />
                </div>
                <div className="formBox formBox1">
                <label className="formLabel" htmlFor="haslo">Haslo </label>
                <input className="formInput" id="haslo" type="password" required value={haslo} onChange={(e) => {
                    setHaslo(e.target.value)
                }}/><br />
                </div>
                <div className="formBox">
                <label className="formLabel" htmlFor="rHaslo">Powtórz haslo </label>
                <input className="formInput" id="rHaslo" type="password" required value={rHaslo} onChange={(e) => {
                    SetRHaslo(e.target.value)
                }}/> <br/>
                </div>
                <hr />
                {login.length > 3 ? <button type="submit">Zarejestruj </button> : <button><b>Zarejestruj</b></button>}
                <p id="mamKonto">Masz już konto? <NavLink to={'/login'}>zaloguj się!</NavLink></p>
                
            </form>
            

        

        </div>
    </div>   
    </div>
    )
}