import { createContext, useEffect, useState } from 'react'

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {
    const [allBooks, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const [inputValue, setInputValue] = useState('')
    console.log(inputValue)
    console.log('CONTEXT', page)
    const getAllBooks = async (page, pageSize) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageSize=${pageSize}`
            const response = await fetch(url)
            const result = await response.json()

            if (response.ok) {
                setBooks(result)
            } else {
                console.error(result.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const searchBooksByTitle = async (inputValue, page, pageSize) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/books/search/${inputValue}?page=${page}&pageSize=${pageSize}`
            const response = await fetch(url)
            const result = await response.json()

            if (response.ok) {
                setBooks({ books: result.books, totalPages: result.totalPages })
            } else {
                console.error(result.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (inputValue.trim().toLowerCase() !== '') {
            searchBooksByTitle(inputValue, page, pageSize)
        } else {
            getAllBooks(page, pageSize)
        }
    }

    useEffect(() => {
        if (inputValue.trim().toLowerCase() === '') {
            getAllBooks(page, pageSize)
        } else {
            searchBooksByTitle(inputValue, page, pageSize)
        }
    }, [page, pageSize, inputValue])

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
                setPageSize,
            }}
        >
            {children}
        </BookContext.Provider>
    )
}
