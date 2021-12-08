import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const initialUserData = {
    _id: '',
    email: '',
    imageUrl: '',
    accessToken: '',
    username: ''
};

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('user', initialUserData)

    const login = (userData) => {
        setUser({ ...userData, username: userData.email.split('@')[0] });
    }

    const logout = () => {
        setUser(initialUserData);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}