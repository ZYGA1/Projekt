import {Outlet} from "react-router-dom"
import Navbar from '../components/Navbar'
import {useEffect, useState} from "react";

interface IProps {
    logged: boolean
}

export default function Main(props: IProps) {

    const [logged, setLogged] = useState(false)

    useEffect(() => {
        setLogged(props.logged)
        if (logged) console.log(logged)
    }, [logged, props.logged])


    return (
        <>

            <Navbar></Navbar>
            <Outlet/>
        </>
    )
}