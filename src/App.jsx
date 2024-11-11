import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import BookOfTheDay from './pages/BookOfTheDay/BookOfTheDay'
import BookDetails from './pages/BookDetails/BookDetails'
import ProtectedRoutes from './middlewares/ProtectedRoutes'
import Register from './pages/Register/Register'
import SuccessLoginPage from './pages/SuccessLoginGoogle/SuccessLoginGoogle'
import WrappedOrderForm from './components/WrapperOrderForm/WrapperOrderForm'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/success" element={<SuccessLoginPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/bookDay" element={<BookOfTheDay />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/order" element={<WrappedOrderForm />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
