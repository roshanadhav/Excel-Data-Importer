import { useState, useContext } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, userData, logout } = useContext(AppContext);

  const logoutUser = async () => {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, { withCredentials: true });
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    logout();
  }


  const verifyEmail = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-verify-otp`, { withCredentials: true })
      const data = response.data
      if (data.success) {
        toast.success(data.message);
        navigate('/verify-email');
      } else {
        toast.error(data.message + '  login first');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50 right-0">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center p-4 sm:px-8 w-full">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://finexo.in/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ftb3xbyw3%2Fproduction%2Ff1ae2cc3f9fcdcb2fc581ec6960b60c656fb7a70-700x150.png%3Fw%3D700%26auto%3Dformat&w=640&q=75"
            alt="Logo"
            className="w-28 sm:w-32"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden mr-10 md:flex fixed right-70 items-center  gap-6 text-gray-800 font-large">
          <li className="hover:text-blue-600 transition-all">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-blue-600 transition-all">
            <a href="/about">About</a>
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button
              className="flex items-center gap-1 hover:text-blue-600 transition-all"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <ChevronDown size={16} />
            </button>
            {servicesOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-56 overflow-hidden">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/excel">Excel Handling</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/data-management">Data Management </a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/dashboard">Dashboard</a>
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-blue-600 transition-all">
            <a href="/contact">Contact</a>
          </li>
        </ul>

        {/* Login Button */}
        {
          isLoggedIn ? (
            <div className="relative">
              {/* Profile Icon */}
              <User
                className="text-gray-800 mt-2 mb-2 cursor-pointer"
                size={30}
                onClick={() => setShowProfilePopup(!showProfilePopup)}
              />

              {/* Popup */}
              {showProfilePopup && userData && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  <p className="text-lg font-semibold">{userData.name}</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                  <button onClick={() => logoutUser()} className="text-sm mt-3 text-gray-800 hover:text-red-500 transition duration-200 cursor-pointer font-medium bg-transparent border-none focus:outline-none">
                    Logout
                  </button>

                  {userData.isEmailVerified ? (
                    <p className="text-green-600 font-medium mt-2">Verified ✅</p>
                  ) : (
                    <button onClick={() => verifyEmail()} className="mt-2 ml-5 text-blue-600 font-medium hover:underline">
                      Verify Email
                    </button>
                  )}
                  <button
                onClick={() => navigate('/subscreption')}
                className="w-full py-1 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg transition-all duration-300 ease-in-out 
                  hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/50 hover:scale-105 animate-pulse"
              >
                Plans
              </button>
                </div>
              )}
              
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="mt-3 mb-3  ml-30 border border-gray-500 rounded-full px-10 py-1 text-gray-800 hover:bg-gray-100 transition-all"
            >
              Login
            </button>
          )
        }


        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col items-center p-6">
            <li className="py-2 w-full text-center hover:text-blue-600 transition-all">
              <a href="/">Home</a>
            </li>
            <li className="py-2 w-full text-center hover:text-blue-600 transition-all">
              <a href="/about">About</a>
            </li>

            {/* Services Dropdown */}
            <li className="py-2 w-full text-center">
              <button
                className="flex justify-center w-full items-center gap-1 hover:text-blue-600 transition-all"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </button>
              {servicesOpen && (
                <ul className="bg-gray-50 rounded-lg mt-2">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/excel-handling">Excel Handling</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/data-management">Data Management Dashboard</a>
                  </li>
                </ul>
              )}
            </li>

            <li className="py-2 w-full text-center hover:text-blue-600 transition-all">
              <a href="/contact">Contact</a>
            </li>
            <li>
              {
                isLoggedIn ? (
                  <div className="relative">
                    {/* Profile Icon */}
                    <User
                      className="text-gray-800 cursor-pointer"
                      size={24}
                      onClick={() => setShowProfilePopup(!showProfilePopup)}
                    />

                    {/* Popup */}
                    {showProfilePopup && (
                      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                        <p className="text-lg font-semibold">{userData.name}</p>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                        {userData.isVerified ? (
                          <p className="text-green-600 font-medium mt-2">Verified ✅</p>
                        ) : (
                          <button className="mt-2 text-blue-600 font-medium hover:underline">
                            Verify Email
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-4 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
                  >
                    Login
                  </button>
                )
              }

            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
