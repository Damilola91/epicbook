import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeContextProvider } from '../components/contexts/ThemeContext'
import { BookContextProvider } from '../components/contexts/BookContext'
import WelcomeSection from '../components/WelcomeSection/WelcomeSection'
import NavbarCustom from '../components/Navbar/Navbar'

const mockSweetAlert = jest.fn()

describe('Test WelcomeSection Component', () => {
    it('should render WelcomeSection component with his props, image and buttons', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <BookContextProvider>
                        <WelcomeSection sweetAlert={mockSweetAlert} />
                    </BookContextProvider>
                </ThemeContextProvider>
            </MemoryRouter>
        )

        const titleElement = screen.getByText('Libro Del Giorno')
        expect(titleElement).toBeInTheDocument()

        const bookImage = screen.getByAltText('imagine')
        expect(bookImage).toBeInTheDocument()

        const shopButtonElement = screen.getByText(/Acquista a:/i)
        expect(shopButtonElement).toBeInTheDocument()

        fireEvent.click(shopButtonElement)
        expect(mockSweetAlert).toHaveBeenCalledTimes(1)

        const detailsButtonElement = screen.getByText('Dettagli')
        expect(detailsButtonElement).toBeInTheDocument()
    })

    it('should switch to dark mode when isDarkMode is true', async () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider value={{ isDarkMode: true }}>
                    <BookContextProvider>
                        <NavbarCustom />
                        <WelcomeSection sweetAlert={mockSweetAlert} />
                    </BookContextProvider>
                </ThemeContextProvider>
            </MemoryRouter>
        )

        const welcomeSectionElement = screen
            .getByText('Libro Del Giorno')
            .closest('.text-center')
        expect(welcomeSectionElement).toHaveClass('bg-light')

        const darkModeButton = screen.getByText('Dark Mode')
        fireEvent.click(darkModeButton)

        expect(welcomeSectionElement).toHaveClass('bg-dark')
    })
})
