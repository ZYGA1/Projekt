import { useEffect, useState } from "react"

interface Kategorie {
    id: number,
    login: string,
    haslo_hash: string,
    email: string,
    data_utworzenia: string
}

export default function Navbar(){
    const [kategorie , setKategorie] = useState<Kategorie[]>([])

    useEffect(() => {
        fetch('http://127.0.0.1:9000/api/users/all')
            .then(result => result.json())
            .then(data => setKategorie(data))
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <h1>{kategorie.length > 0 ? kategorie[0].id : "Loading"}</h1>
        </>
    )
}