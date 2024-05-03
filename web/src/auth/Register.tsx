import { useState, useEffect } from "react"
import validateJWT from "./JwtValidate"

export default function Register(){

    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [haslo, setHaslo] = useState('')
    const [rHaslo, SetRHaslo] = useState('')

    useEffect(() => {
        validateJWT().then((data) => {
            console.log(data)
        })
    }, [])




    return (
        <>  
            <form onSubmit={(e) => {
                e.preventDefault()
                if (haslo === rHaslo){
            
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
                console.log("gowno")
            }
            
            }}>
                <label htmlFor="email">Email: </label><br />
                <input id="email" type="email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }}/><br />
                <label htmlFor="login">Login: </label><br />
                <input id="login" type="text" value={login} onChange={(e) => {
                    
                    setLogin(e.target.value)
                }}/><br />
                <label htmlFor="haslo">Haslo: </label><br />
                <input id="haslo" type="text" value={haslo} onChange={(e) => {
                    setHaslo(e.target.value)
                }}/><br />
                <label htmlFor="rHaslo">Powtórz haslo: </label><br />
                <input id="rHaslo" type="text" value={rHaslo} onChange={(e) => {
                    SetRHaslo(e.target.value)
                }}/> <br/>
                <button type="submit">Zarejestruj</button>
            </form>

        </>
    )
}