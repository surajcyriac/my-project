import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Singleproduct from './pages/Singleproduct';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { tokenAuthContext } from './context/Authcontext';
import AdminDash from './pages/AdminDash';


const App = () => {
  const {isAuthorised,setisAuuthorise}=useContext(tokenAuthContext)
 


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/Register' element={<Auth insideRegister={true}/>}></Route>
      <Route path='/product' element={isAuthorised?<Product />:<Navigate to="/auth"/>} />
      <Route path='/profile' element={isAuthorised?<Profile />:<Navigate to="/auth"/>} />
      <Route path='/product/:id/item' element={isAuthorised?<Singleproduct />:<Navigate to="/auth"/>} />
      <Route path='/wishlist' element={isAuthorised?<Wishlist />:<Navigate to="/auth"/>} />
      <Route path='/cart' element={isAuthorised?<Cart />:<Navigate to="/auth"/>} />
      <Route path='/admindash' element={<AdminDash/>}></Route>





      
    </Routes>
  );
};

export default App;
