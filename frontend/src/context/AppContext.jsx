import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    // Load initial state from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || null
    );

    // Function to get user data from backend
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });

            if (data.success) {
                const user = {
                    name: data.name,
                    email: data.email,
                    isEmailVerified: data.isveriFied,
                };
                setUserData(user);
                setIsLoggedIn(true);

                // Save in localStorage
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", "true");
            } else {
                toast.error(data.message);
                logout();
            }
        } catch (error) {
            toast.error(error.message);
            logout();
        }
    };

    // Function to logout and clear storage
    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
    };

    // Auto-fetch user data on page load if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            getUserData();
        }
    }, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        logout,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
