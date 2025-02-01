import { useContext, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email , setEmail] = useState("") ; 
  const [name , setName] = useState("") ; 
  const [password , setPassword] = useState("") ; 
  const navigate = useNavigate();

  const {backendUrl , setIsLoggedIn , getUserData} = useContext(AppContext) ; 

  const onSubmitHandler = async (e) =>{
    try {
      e.preventDefault() ;
      axios.defaults.withCredentials = true ;  
      if (isLogin) {
          const {data} = await axios.post(`${backendUrl}/api/auth/login` , {email , password}) ; 
          if (data.success) {
            setIsLoggedIn(true) ;
            getUserData() ;
            navigate('/');
          }else{
            toast.error(data.message)
          }
      }else{
        const {data} = await axios.post(`${backendUrl}/api/auth/register` , {name , email , password}) ; 
        if (data.success) {
            setIsLoggedIn(true) ;
            getUserData() ;
            navigate('/');
        }else{
          toast.error(data.message) ;
        }
      }
    } catch (error) {
      toast.error(error.message) ;
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 sm:p-12 w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {isLogin ? "Welcome Back! 👋" : "Join Us Today! 🚀"}
        </h2>
        <p className="text-gray-500 text-center mt-1">
          {isLogin ? "Sign in to continue" : "Create an account to get started"}
        </p>

        {/* Form */}
        <form onSubmit={(e)=>onSubmitHandler(e)} className="mt-6 space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input onChange={(e) => {
                setName(e.target.value)
              }} type="text" placeholder="Your Name" className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }} type="email" placeholder="Email Address" className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
             onChange={(e)=>{
              setPassword(e.target.value) ;
            }}
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" 
              required 
            />
            <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right text-sm">
              <a href="/reset-password" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch Between Login & Signup */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={() => {
            

            
            setIsLogin(!isLogin)}} className="text-blue-500 font-semibold ml-1 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
