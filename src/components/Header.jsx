import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // User icon for profile
import { IoIosLogOut } from 'react-icons/io';  // Log out icon

function Header() {
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear();
    navigate("/")
  }




  
  return (
    <header className="bg-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Branding */}
        <Link to="/" className="text-4xl font-bold">
          Word<span className='text-2xl font-semibold'>Craft</span>
        </Link>

       

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4 text-lg font-semibold">
          
        <Link to="/cart" className="text-teal-100   hover:text-white">
            Cart
          </Link>

          {/* wishlist Link */}
          <Link to="/wishlist" className="text-teal-100 hover:text-white">
            Wishlist
          </Link>

          {/* User Profile Link */}
          <Link to={"/profile"} className="text-teal-100 hover:text-white ms-5">
            <FaUserCircle className="text-4xl" />
          </Link>

          {/* Logout Button */}
          <button className="bg-teal-500 hover:bg-teal-700 text-white p-2 rounded-lg flex items-center" onClick={logout}>
            <IoIosLogOut className="mr-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
