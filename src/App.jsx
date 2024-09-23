import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useState } from 'react'
import NavbarCustom from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import WelcomeSection from './components/WelcomeSection/WelcomeSection'
import MainSection from './components/MainSection/MainSection'

// Importare i dati dei libri
import fantasy from '../src/components/dataSource/books/fantasy.json'
import history from '../src/components/dataSource/books/history.json'
import romance from '../src/components/dataSource/books/romance.json'
import horror from '../src/components/dataSource/books/horror.json'
import scifi from '../src/components/dataSource/books/scifi.json'
import Swal from 'sweetalert2'

const App = () => {
    // Gestione dello stato dei libri centralizzata qui
    const allBooks = [...fantasy, ...history, ...romance, ...horror, ...scifi]
    const randomBooks = allBooks.sort(() => Math.random() - 0.5)
    const fantasy4 = fantasy
    const [books, setBooks] = useState(fantasy4)
    const [totalBooks] = useState(fantasy4)
    const [inputValue, setInputValue] = useState('')

    const sweetAlert = () => {
        Swal.fire('Welcome To My Page')
    }

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const filteredBook = () => {
        if (inputValue === '') {
            setBooks(totalBooks) // Ripristina tutti i libri
        } else {
            const filterBook = totalBooks.filter((book) =>
                book.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            setBooks(filterBook) // Filtra i libri
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        filteredBook()
    }

    return (
        <>
            <NavbarCustom
                inputValue={inputValue}
                onChangeInput={onChangeInput}
                handleSubmitForm={handleSubmitForm}
            />
            <WelcomeSection sweetAlert={sweetAlert} />
            <MainSection books={books} />
            <Footer />
        </>
    )
}

export default App
