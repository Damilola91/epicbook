import { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Funzione per effettuare il login
    const login = () => setIsLoggedIn(true)

    // Funzione per effettuare il logout
    const logout = () => setIsLoggedIn(false)

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}
