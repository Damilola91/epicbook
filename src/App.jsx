import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import BookOfTheDay from './pages/BookOfTheDay/BookOfTheDay'
import BookDetails from './pages/BookDetails/BookDetails'
import { ProtectedRoutes } from './middlewares/ProtectedRoutes'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import HomeNavigation from './pages/HomeNavigation/HomeNavigation'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomeNavigation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />{' '}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/bookDay" element={<BookOfTheDay />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
