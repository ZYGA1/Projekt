import './styles/home.css'
import {useEffect, useState} from "react";

interface Products {
    id: number,
    nazwa: string,
    cena: number,
    opis: string
}

export default function Home(){
    const [data, setData] = useState<Products[]>([])

    const getAllProducts = async () => {
        const response = await fetch('http://localhost:9000/api/products/all')
        return response.json();
    }

    useEffect(()=>{
        getAllProducts().then(data => setData(data))
    }, [])

    return (
        <div className="home">
            <div className="home-container">
                <h1>Home</h1>

                {data.map((product: Products) => {
                return  <p>{product.nazwa}</p>
                })}
            </div>
        </div>
    )
}
