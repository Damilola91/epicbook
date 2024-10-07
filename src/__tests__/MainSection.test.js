import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MainSection from '../components/MainSection/MainSection'
import { MemoryRouter } from 'react-router-dom'
import { BookContext } from '../components/contexts/BookContext'
import { ThemeContext } from '../components/contexts/ThemeContext'
import { CommentSelectedCard } from '../components/contexts/CommentSelectedCard'

const mockBooks = [
    {
        asin: '123',
        title: 'Test Book 1',
        price: 20,
        category: 'Fiction',
        img: 'test_image_url',
    },
    {
        asin: '456',
        title: 'Test Book 2',
        price: 25,
        category: 'Non-Fiction',
        img: 'test_image_url_2',
    },
]

const mockThemeContextValue = {
    isDarkMode: false,
}

const mockCommentSelectedCardContextValue = {
    selectedCardAsin: null,
    setSelectedCardAsin: jest.fn(),
    toggleIsSelect: jest.fn(),
}

describe('MainSection component', () => {
    it('should not render AllComments if no card is selected at startup', () => {
        render(
            <MemoryRouter>
                <BookContext.Provider value={{ books: mockBooks }}>
                    <ThemeContext.Provider value={mockThemeContextValue}>
                        <CommentSelectedCard.Provider
                            value={mockCommentSelectedCardContextValue}
                        >
                            <MainSection />
                        </CommentSelectedCard.Provider>
                    </ThemeContext.Provider>
                </BookContext.Provider>
            </MemoryRouter>
        )

        const allCommentsElement = screen.queryByText(/comments for/i)
        expect(allCommentsElement).not.toBeInTheDocument()
    })

    it('should render cards inside MainSection', () => {
        render(
            <MemoryRouter>
                <BookContext.Provider value={{ books: mockBooks }}>
                    <ThemeContext.Provider value={mockThemeContextValue}>
                        <CommentSelectedCard.Provider
                            value={mockCommentSelectedCardContextValue}
                        >
                            <MainSection />
                        </CommentSelectedCard.Provider>
                    </ThemeContext.Provider>
                </BookContext.Provider>
            </MemoryRouter>
        )

        mockBooks.forEach((book) => {
            const bookTitleElement = screen.getByText(book.title)
            expect(bookTitleElement).toBeInTheDocument()
        })
    })
})
