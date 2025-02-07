import { useContext, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    axios.defaults.withCredentials = true;

    try {
      let data;
      if (isLogin) {
        const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
        data = response.data;
      } else {
        const response = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
        data = response.data;
      }

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md border border-gray-300">
        {/* Logo (Optional) */}
        <div className="flex justify-center mb-4">
          <img
            src="https://finexo.in/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ftb3xbyw3%2Fproduction%2Ff1ae2cc3f9fcdcb2fc581ec6960b60c656fb7a70-700x150.png%3Fw%3D700%26auto%3Dformat&w=640&q=75"
            alt="Logo"
            className="w-30 h-10 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>
        <p className="text-gray-500 text-center mt-1">
          {isLogin ? "Sign in to continue" : "Join us today!"}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right text-sm">
              <a href="/reset-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button with Loading Animation */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02] active:scale-95 flex justify-center items-center"
            disabled={loading} // Disable when loading
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Processing...
              </>
            ) : (
              isLogin ? "Sign In" : "Sign Up"
            )}
          </button>
        </form>

        {/* Switch Between Login & Signup */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
