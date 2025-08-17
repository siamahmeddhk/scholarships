







import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo12 from "../assets/logo12.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const roleStyles = {
  admin: "bg-red-100 text-red-700",
  moderator: "bg-yellow-100 text-yellow-700",
  user: "bg-emerald-100 text-emerald-700",
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Nav = () => {
  const { user, logOut } = useAuthContext();
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const userName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "Anonymous");
  const userPhoto = user?.photoURL || null;
  const userRoleRaw = (user?.role || "user").toLowerCase();
  const userRole = capitalize(userRoleRaw);
  const roleClass = roleStyles[userRoleRaw] || roleStyles.user;

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo12} alt="Site Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-extrabold select-none">ScholarNest</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-semibold hover:text-amber-300 transition-colors">
              Home
            </Link>
            <Link
              to="/all-scholarships"
              className="font-semibold hover:text-amber-300 transition-colors"
            >
              All Scholarships
            </Link>
            <Link
              to="/work"
              className="font-semibold hover:text-amber-300 transition-colors"
            >
              How we works
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="font-semibold hover:text-amber-300 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!user ? (
              <div className="flex items-center space-x-5 ml-6">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-indigo-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative ml-6" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="w-9 h-9 rounded-full border-2 border-emerald-300 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border-2 border-emerald-300 bg-white text-indigo-700 flex items-center justify-center font-semibold shadow-sm select-none">
                      {getInitials(userName)}
                    </div>
                  )}
                  <span className="hidden sm:inline font-semibold select-none">
                    {userName}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn text-gray-700">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold truncate">{userName}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${roleClass}`}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user && (
              <img
                src={userPhoto || ""}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-emerald-300 mr-3 shadow-sm"
              />
            )}
            <button
              className="hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
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
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg p-5 space-y-3 animate-fadeIn text-gray-700">
          <Link
            to="/"
            className="block py-3 font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded px-4"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/all-scholarships"
            className="block py-3 font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded px-4"
            onClick={() => setMenuOpen(false)}
          >
            All Scholarships
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="block py-3 font-semibold hover:text-indigo-600 hover:bg-indigo-50 rounded px-4"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-3 text-center font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-3 text-center text-white font-semibold bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md"
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
                    className="w-12 h-12 rounded-full border-2 border-emerald-300 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-300 bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm select-none">
                    {getInitials(userName)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{userName}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${roleClass}`}
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
