import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleThemeMode = () => {
        setIsDarkMode((previousMode) => !previousMode)
    }

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
