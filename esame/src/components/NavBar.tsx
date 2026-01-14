import {Link,} from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from '../assets/logo_grafica_pasquali.png';
import Carrello from '../assets/carrello.svg';
import style from '../ComponentStyle/NavBar.module.css'


const NavBar = () => {
    return (
        
            <nav className={style.nav}>
                <img src={Logo}></img>
                <Link to='/home'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/contacts'>Contacts</Link>
                <Link to='/company'>Company</Link>
                <div>
                    <SearchBar/>
                </div>
                <Link to='/cart'><img src={Carrello}></img></Link>
            </nav>
             
     
        
    )
}

export default NavBar