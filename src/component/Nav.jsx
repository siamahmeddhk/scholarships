import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo12 from '../assets/logo12.png';
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const Nav = () => {
  const { user, logOut } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err.message);
    }
  };

  const userRole = user?.role || 'user';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo12} alt="Site Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-indigo-700">ScholarNest</span>
        </Link>

        {/* Mobile menu icon */}
        <button
          className="md:hidden text-indigo-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-700 font-medium">Home</Link>
          <Link to="/all-scholarships" className="text-gray-700 hover:text-indigo-700 font-medium">All Scholarships</Link>
          {user && (
            <Link
              to={'/dashboard'}
              className="text-gray-700 hover:text-indigo-700 font-medium"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group cursor-pointer">
              <img
                src={user.photoURL || 'https://i.ibb.co/zS7xWzF/user.png'}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-indigo-600"
              />
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-white border shadow-lg rounded p-3 w-48 text-sm z-50">
                <p className="font-semibold truncate">{user.displayName || 'Anonymous'}</p>
                <p className="text-gray-500">{userRole}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white shadow-lg">
          <Link to="/" className="block text-gray-700 hover:text-indigo-700">Home</Link>
          <Link to="/all-scholarships" className="block text-gray-700 hover:text-indigo-700">All Scholarships</Link>
          {user && (
            <Link
              to={
                userRole === 'admin'
                  ? '/dashboard/admin'
                  : userRole === 'moderator'
                  ? '/dashboard/moderator'
                  : '/dashboard/user'
              }
              className="block text-gray-700 hover:text-indigo-700"
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="block text-indigo-700 font-semibold">Login</Link>
              <Link to="/register" className="block text-indigo-700 font-semibold">Register</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={user.photoURL || 'https://i.ibb.co/zS7xWzF/user.png'}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-indigo-600"
                />
                <div>
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm text-gray-500">{userRole}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="block text-red-600 mt-3 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
