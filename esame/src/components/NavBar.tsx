import {Link,} from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from '../assets/logo_grafica_pasquali.png';
import Cart from '../assets/carrello.svg';
import style from '../ComponentStyle/NavBar.module.css'

//COMPONENTE DELLA NAVBAR CON LA RICERCA
const NavBar = () => {
    return (
            <nav className={style.nav}>
                <img src={Logo}></img>
                <Link to='/home'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/profile'>Profilo</Link>
                <Link to='/contacts'>Contatti</Link>
                <Link to='/company'>Azienda</Link>
                <div>
                    <SearchBar/>
                </div>
                <Link  to='/cart'><img className={style.cart} src={Cart}></img></Link>
            </nav>   
    )
}

export default NavBar