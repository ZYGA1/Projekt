import './navabar.css'
import Cart from "./Cart"


export default function Navbar() {

    return (
        <nav id="nav">
            <div id="navContent">
                <ul>
                    <li>
                        <h3>KATEGORIE</h3>
                    </li>
                    <li>
                        <h3>PRODUCENCI</h3>
                    </li>
                </ul>
                <input type="text" placeholder="Szukaj..."/>
                <ul>
                    <li>
                        <h3>MOJE <br /> KONTO</h3>
                    </li>
                    <li>
                        <Cart/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}