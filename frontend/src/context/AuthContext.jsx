import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider ({children}) {

    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
        ? JSON.parse(savedUser)
        : null;
    });

    useEffect(() => {
        localStorage.setItem(
            "user", 
            JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const updateSessionUser = (updates) => {
        setUser(prev => (prev ? { ...prev, ...updates } : prev));
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            login,
            logout,
            updateSessionUser,
        }}
            >
            {children}

        </AuthContext.Provider>
    );
}