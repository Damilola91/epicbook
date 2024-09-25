import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookContextProvider } from './components/contexts/BookContext.jsx'
import { ThemeContextProvider } from './components/contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeContextProvider>
            <BookContextProvider>
                <App />
            </BookContextProvider>
        </ThemeContextProvider>
    </StrictMode>
)
