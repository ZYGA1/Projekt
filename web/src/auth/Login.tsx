import { useEffect, useState } from "react"

export default function Login(){

    const [login, setLogin] = useState('')
    const [passwd, setPasswd] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {

    }, [])

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()

                if (login.length > 1){
                    
                    fetch('http://localhost:9000/login', {
                        method: "POST",
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
                    .then(data => console.log(data))
                    .catch(err => console.log(err))
                }

                

            }}>
                <label>Hasło: </label><br/>
                <input 
                    type="text"
                    value={passwd}
                    onChange={(e) => {
                        setPasswd(e.target.value)
                    }}
                /><br />
                <label>Login: </label><br />
                <input 
                    type="text" 
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value)
                    }}
                /><br/>
                <button type="submit">Zaloguj</button>
            </form>        
        </>
    )
}