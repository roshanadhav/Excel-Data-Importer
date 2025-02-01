import {createContext, useState} from 'react' ; 
import axios from 'axios' ;
import { toast } from "react-toastify";

export const AppContext = createContext()  ; 


export const AppContextProvider  = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL ; 
    const [isLoggedIn , setIsLoggedIn] = useState(false) ; 
    const [userData , setUserData] = useState(null) ; 
    const getUserData = async() =>{
       try {

         const {data} = await axios.get('/api/user/data') ; 
         
         data.success ? setUserData({
            name : data.name , 
            email : data.email , 
            isEmailVerified : data.isveriFied 
         }) : toast.error(data.message) ;
       } catch (error) {
        toast.error(error.message) ;
       }
    }
    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData ,
        

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}