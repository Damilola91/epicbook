import '@testing-library/jest-dom'
import BookCard from '../components/BookCard/BookCard'
import { render, fireEvent, screen } from '@testing-library/react'
import { CommentSelectedCardProvider } from '../components/contexts/CommentSelectedCard'
import { ThemeContextProvider } from '../components/contexts/ThemeContext'
import { MemoryRouter } from 'react-router-dom'
import { BookContextProvider } from '../components/contexts/BookContext'
import NavbarCustom from '../components/Navbar/Navbar'

describe('Test BookCard Component', () => {
    it('should render a card with his all props', () => {
        const { getByText, getByRole, queryByText } = render(
            <MemoryRouter>
                <CommentSelectedCardProvider>
                    <ThemeContextProvider>
                        <BookCard
                            img="123"
                            category="test"
                            title="title"
                            asin="asin"
                            price="000"
                        />
                    </ThemeContextProvider>
                </CommentSelectedCardProvider>
            </MemoryRouter>
        )

        const buttonElement = getByText('Details')
        expect(buttonElement).toBeInTheDocument()

        const imgElement = getByRole('img')
        expect(imgElement).toHaveAttribute('src', '123')

        const titleElement = getByText('title')
        expect(titleElement).toBeInTheDocument()

        const categoryElement = getByText('test')
        expect(categoryElement).toBeInTheDocument()

        const priceElement = getByText('000£') // Corretto il simbolo della valuta
        expect(priceElement).toBeInTheDocument()

        const asinElement = queryByText('asin')
        expect(asinElement).not.toBeInTheDocument()
    })

    it('should render a red border when the card is clicked and remove the red border if another card has clicked', () => {
        const { getByText } = render(
            <MemoryRouter>
                <CommentSelectedCardProvider>
                    <ThemeContextProvider>
                        <div>
                            <BookCard
                                img="123"
                                category="test"
                                title="title1"
                                asin="asin1"
                                price="000"
                            />
                            <BookCard
                                img="456"
                                category="test"
                                title="title2"
                                asin="asin2"
                                price="100"
                            />
                        </div>
                    </ThemeContextProvider>
                </CommentSelectedCardProvider>
            </MemoryRouter>
        )

        const firstCard = getByText('title1').closest('.custom')
        const secondCard = getByText('title2').closest('.custom')

        fireEvent.click(firstCard)
        expect(firstCard).toHaveClass('border-5 border-danger')

        fireEvent.click(secondCard)
        expect(firstCard).not.toHaveClass('border-5 border-danger')
        expect(secondCard).toHaveClass('border-5 border-danger')
    })

    it('should render BookCard in dark mode when isDarkMode is true', async () => {
        const { getByTestId, rerender } = render(
            <MemoryRouter>
                <CommentSelectedCardProvider>
                    <ThemeContextProvider value={{ isDarkMode: true }}>
                        <BookContextProvider>
                            <NavbarCustom />
                            <BookCard
                                img="123"
                                category="test"
                                title="Il Grande Gatsby"
                                asin="asin6"
                                price="000"
                            />
                        </BookContextProvider>
                    </ThemeContextProvider>
                </CommentSelectedCardProvider>
            </MemoryRouter>
        )
        const darkModeButton = screen.getByText('Dark Mode')

        const bookCardBody = getByTestId('book-card')
        expect(bookCardBody).toHaveClass('bg-light')
        expect(bookCardBody).toHaveClass('text-dark')

        rerender(
            <MemoryRouter>
                <CommentSelectedCardProvider>
                    <ThemeContextProvider value={{ isDarkMode: true }}>
                        <BookContextProvider>
                            <NavbarCustom />
                            <BookCard
                                img="123"
                                category="test"
                                title="Il Grande Gatsby"
                                asin="asin6"
                                price="000"
                            />
                        </BookContextProvider>
                    </ThemeContextProvider>
                </CommentSelectedCardProvider>
            </MemoryRouter>
        )

        fireEvent.click(darkModeButton)

        expect(bookCardBody).toHaveClass('bg-dark')
        expect(bookCardBody).toHaveClass('text-light')
    })
})
