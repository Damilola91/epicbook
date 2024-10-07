import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { ThemeContextProvider } from '../components/contexts/ThemeContext'
import NavbarCustom from '../components/Navbar/Navbar'
import { screen, render, fireEvent } from '@testing-library/react'
import { BookContextProvider } from '../components/contexts/BookContext'

describe('Test Navbar Component', () => {
    it('should render Navbar with default attribute and props', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <BookContextProvider>
                        <NavbarCustom />
                    </BookContextProvider>
                </ThemeContextProvider>
            </MemoryRouter>
        )

        const navElement = screen.getByTestId('nav')
        expect(navElement).toHaveAttribute('data-bs-theme', 'light')

        const buttonElement = screen.getByText('Dark Mode')
        fireEvent.click(buttonElement)
        expect(navElement).toHaveAttribute('data-bs-theme', 'dark')

        const lightModeButton = screen.getByText('Light Mode')
        expect(lightModeButton).toBeInTheDocument()
    })

    it('should contains navigation links', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <BookContextProvider>
                        <NavbarCustom />
                    </BookContextProvider>
                </ThemeContextProvider>
            </MemoryRouter>
        )

        const navlinksElement = screen.getAllByRole('link')
        expect(navlinksElement).toHaveLength(4)
        expect(navlinksElement[0]).toHaveTextContent('EpicBook')
        expect(navlinksElement[0]).toHaveAttribute('href', '/')

        expect(navlinksElement[1]).toHaveTextContent('Book of The Day')
        expect(navlinksElement[1]).toHaveAttribute('href', '/bookDay')

        expect(navlinksElement[2]).toHaveTextContent('About')
        expect(navlinksElement[2]).toHaveAttribute('href', '/about')

        expect(navlinksElement[3]).toHaveTextContent('Browse')
        expect(navlinksElement[3]).toHaveAttribute('href', '/browse')
    })

    it('should contain and handle input and search button', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <BookContextProvider>
                        <NavbarCustom />
                    </BookContextProvider>
                </ThemeContextProvider>
            </MemoryRouter>
        )

        const inputSearchElement = screen.getByPlaceholderText('Search Book')
        expect(inputSearchElement).toBeInTheDocument()
        expect(inputSearchElement).toHaveValue('')
        fireEvent.change(inputSearchElement, {
            target: {
                value: 'ciao',
            },
        })
        expect(inputSearchElement).toHaveValue('ciao')

        const buttonSearchElement = screen.getByText('Submit')
        expect(buttonSearchElement).toBeInTheDocument()
    })
})
