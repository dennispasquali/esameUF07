
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';


function App() {


  return (
    <>
     
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile/:userName' element={<Profile/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/contacts' element={<Contacts/>}></Route>
            <Route path='/home/productDetail/:id' element={<ProductDetail/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </BrowserRouter>

  
      
    </>
  )
}

export default App
