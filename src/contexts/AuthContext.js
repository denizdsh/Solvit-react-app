import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const initialUserData = {
    _id: '',
    email: '',
    username: '',
    imageUrl: '',
    accessToken: ''
};

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('user', initialUserData)

    const login = (userData) => {
        setUser({ ...userData });
    }

    const logout = () => {
        setUser(initialUserData);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: Boolean(user.accessToken) }}>
            {children}
        </AuthContext.Provider>
    )
}