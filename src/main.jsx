import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookContextProvider } from './components/contexts/BookContext.jsx'
import { ThemeContextProvider } from './components/contexts/ThemeContext.jsx'
import { CommentSelectedCardProvider } from './components/contexts/CommentSelectedCard.jsx'
import { CartContextProvider } from './components/contexts/CartContext.jsx'
import { LoginContextProvider } from './components/contexts/LoginContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LoginContextProvider>
            <CartContextProvider>
                <CommentSelectedCardProvider>
                    <ThemeContextProvider>
                        <BookContextProvider>
                            <App />
                        </BookContextProvider>
                    </ThemeContextProvider>
                </CommentSelectedCardProvider>
            </CartContextProvider>
        </LoginContextProvider>
    </StrictMode>
)
