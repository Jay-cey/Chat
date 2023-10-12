import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <nav className=" p-4 bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-white text-2xl">
          <Link to="/">
            BuggyChat
          </Link>
        </h2>
      </div>
        {
          user && <span className='text-orange-400'>Logged in as {user?.name}!</span>
        }
      <div className="flex items-center">
        {
          user && (<>
            <Link onClick={() => logoutUser()} to="/login" className="text-gray-300 hover:text-white mr-4">
            Logout
          </Link>
          </>)
        }

        {!user && (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white mr-4">
              Log in
            </Link>
            <Link to="/register" className="text-gray-300 hover:text-white">
              Register
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
