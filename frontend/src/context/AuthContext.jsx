import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // INITIALIZE USER DIRECTLY
    const [user, setUser] = useState(() => {

        const storedUser =
            localStorage.getItem("chat-user");

        return storedUser
            ? JSON.parse(storedUser)
            : null;

    });


    // LOGIN
    const login = (userData) => {

        localStorage.setItem(
            "chat-user",
            JSON.stringify(userData)
        );

        setUser(userData);

    };


    // LOGOUT
    const logout = () => {

        localStorage.removeItem("chat-user");

        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};