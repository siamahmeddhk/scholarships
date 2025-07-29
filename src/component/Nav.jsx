import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo12 from "../assets/logo12.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const roleStyles = {
  admin: "bg-red-100 text-red-700",
  moderator: "bg-yellow-100 text-yellow-700",
  user: "bg-blue-100 text-blue-700",
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Nav = () => {
  const { user, logOut, loading } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err.message);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  // Fallbacks for user info
  const userName = user?.displayName || (user?.email ? user.email.split("@")[0] : "Anonymous");
  const userPhoto = user?.photoURL || null;
  const userRoleRaw = (user?.role || "user").toLowerCase(); // ALWAYS lowercase fallback
  const userRole = capitalize(userRoleRaw);
  const roleClass = roleStyles[userRoleRaw] || roleStyles.user;

  // Extract initials if no photo
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  if (loading) {
    return (
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 p-4 text-center shadow-md">
        <p className="text-gray-500 font-medium animate-pulse">Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo12} alt="Site Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent select-none">
              ScholarNest
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/all-scholarships"
              className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group"
            >
              All Scholarships
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            )}

            {!user ? (
              <div className="flex items-center space-x-5 ml-6">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative ml-6" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User menu"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="w-9 h-9 rounded-full border-2 border-indigo-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border-2 border-indigo-200 bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold shadow-sm select-none">
                      {getInitials(userName)}
                    </div>
                  )}
                  <span className="hidden sm:inline font-semibold text-gray-700 select-none">{userName}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform duration-300 ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{userName}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${roleClass} select-none`}
                      >
                        {userRole}
                      </span>
                    </div>
                 
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <img
                src={userPhoto}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-indigo-200 mr-3 shadow-sm"
              />
            )}
            <button
              className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg p-5 space-y-3 animate-fadeIn">
          <Link
            to="/"
            className="block py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded px-4 font-semibold transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/all-scholarships"
            className="block py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded px-4 font-semibold transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            All Scholarships
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="block py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded px-4 font-semibold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-3 text-center text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-3 text-center text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-3 px-4 py-2">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={userName}
                    className="w-12 h-12 rounded-full border-2 border-indigo-200 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-200 bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm select-none">
                    {getInitials(userName)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${roleClass} select-none`}
                  >
                    {userRole}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full py-3 text-left px-4 text-red-600 hover:bg-red-50 rounded transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;