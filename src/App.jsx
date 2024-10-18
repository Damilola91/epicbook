import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import BookOfTheDay from './pages/BookOfTheDay/BookOfTheDay'
import BookDetails from './pages/BookDetails/BookDetails'
import Login from './pages/Login/Login'
import { useState } from 'react'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <HomePage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                />
                <Route path="/bookDay" element={<BookOfTheDay />} />
                <Route path="/about" element={<About />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
