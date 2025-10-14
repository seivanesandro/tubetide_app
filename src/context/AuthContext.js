import React, {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar se há um usuário no localStorage quando o componente montar
        const savedUser = localStorage.getItem(
            'tubetide_user'
        );

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error(
                    'Error parsing saved user data:',
                    error
                );
                localStorage.removeItem(
                    'tubetide_user'
                );
            }
        }

        setLoading(false);
    }, []);

    const login = userData => {
        setUser(userData);
        localStorage.setItem(
            'tubetide_user',
            JSON.stringify(userData)
        );
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('tubetide_user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);
