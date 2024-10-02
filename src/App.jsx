import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import BookOfTheDay from './pages/BookOfTheDay/BookOfTheDay'
import BookDetails from './pages/BookDetails/BookDetails'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/bookDay" element={<BookOfTheDay />} />
                <Route path="/about" element={<About />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
