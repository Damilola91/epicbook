import { createContext, useEffect, useState } from 'react'

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {
    const [allBooks, setBooks] = useState()
    const [page, setPage] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const [inputValue, setInputValue] = useState('')

    const getBooks = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageSize=${pageSize}`
            )
            const result = await response.json()
            setBooks(result)
        } catch (error) {
            console.error(error.message)
        }
    }

    const filteredBook = () => {
        if (inputValue === '') {
            setBooks(allBooks)
        } else {
            const filteredBooks = allBooks.filter((book) =>
                book.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            setBooks(filteredBooks)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        filteredBook()
    }

    useEffect(() => {
        getBooks()
    }, [page, pageSize])

    return (
        <BookContext.Provider
            value={{
                allBooks,
                inputValue,
                handleInputChange,
                handleSubmitForm,
                page,
                setPage,
                pageSize,
                setpageSize,
            }}
        >
            {children}
        </BookContext.Provider>
    )
}
