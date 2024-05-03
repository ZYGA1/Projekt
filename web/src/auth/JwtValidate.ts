import Cookies from "universal-cookie"

export default async function validateJWT(){
    const cookies = new Cookies()
    const token = cookies.get('jwt_token')
    
    try {
        const result  = await fetch('http://localhost:9000/verify', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'connection': 'keep-alive',
                'powered-by': 'ts',
                'Authorization': 'bearer ' + token
            },

        })
        const data = await result.json()
        return data
    }
    catch(err){
        console.log('[Error] Fetching error')
        return { 
            verified: false,
            Error: "Fetching Error"
        }
    }
}


