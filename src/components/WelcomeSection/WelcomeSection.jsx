import { useContext, useEffect, useState } from 'react'
import { BookContext } from '../contexts/BookContext'
import './WelcomeSection.css'
import { ThemeContext } from '../contexts/ThemeContext'

const WelcomeSection = ({ sweetAlert }) => {
    const { allBooks: books } = useContext(BookContext)
    const { isDarkMode } = useContext(ThemeContext)
    const [randomBook, setRandomBook] = useState(null)

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * books.books.length)
        console.log(randomIndex)
        setRandomBook(books.books[randomIndex])
    }, [])

    console.log(randomBook)

    return (
        <div
            className={` text-center py-5 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
        >
            <div className="container  pt-5 pb-5">
                <div className="row pt-5 pb-5">
                    <div className="col-lg-12 col-xl-12 ms-auto pb-5 pt-5">
                        <span
                            className={isDarkMode ? 'text-light' : 'text-dark'}
                        >
                            {randomBook?.category}
                        </span>
                        <h1
                            className={`display-3 fw-bold mb-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                        >
                            Libro Del Giorno
                        </h1>

                        <div className="custom-img">
                            <img src={randomBook?.img} alt="imagine" />
                        </div>

                        <p
                            className={`lead mb-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}
                        >
                            {randomBook?.title}
                        </p>

                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <button
                                onClick={sweetAlert}
                                className="btn btn-info text-white"
                            >
                                Acquista a: {randomBook?.price.$numberDecimal}£
                            </button>

                            <button className="btn btn-warning text-white">
                                Dettagli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSection
