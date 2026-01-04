
import './App.css'
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Contacts from './pages/Contacts';
import SearchBar from './components/SearchBar';
import Logo from '../src/assets/logo_grafica_pasquali.png';
import Carrello from '../src/assets/carrello.svg';
function App() {


  return (
    <>
      <BrowserRouter>
    <nav>
      <img id='logo' src={Logo}></img>
      <Link to='/home'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/contacts'>Contacts</Link>
      <Link to='/contacts'>Company</Link>
      <div>
        <SearchBar/>
      </div>
      <Link to='/cart'><img src={Carrello}></img></Link>
      
    </nav>
    <Routes>
        <Route path='/home' element={<App/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile/:userName' element={<Profile/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/contacts' element={<Contacts/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes> 




    </BrowserRouter>
    </>
  )
}

export default App
