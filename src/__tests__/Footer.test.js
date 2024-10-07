import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer/Footer'
import { ThemeContext } from '../components/contexts/ThemeContext'
import { navLinks } from '../components/dataSource/navData'

describe('Footer component', () => {
    it('should render correctly in light mode', () => {
        const themeContextValue = { isDarkMode: false }

        render(
            <ThemeContext.Provider value={themeContextValue}>
                <Footer />
            </ThemeContext.Provider>
        )

        const footerElement = screen.getByTestId('footer')
        expect(footerElement).toHaveClass('bg-light', 'text-dark')

        expect(screen.getByTestId('footer-title')).toHaveTextContent(
            'Book Store'
        )

        navLinks.forEach((link, index) => {
            expect(screen.getByTestId(`nav-link-${index}`)).toHaveTextContent(
                link.text
            )
        })

        expect(screen.getByTitle('Twitter')).toBeInTheDocument()
        expect(screen.getByTitle('Tiktok')).toBeInTheDocument()
        expect(screen.getByTitle('Instagram')).toBeInTheDocument()
    })

    it('should render correctly in dark mode', () => {
        const themeContextValue = { isDarkMode: true }

        render(
            <ThemeContext.Provider value={themeContextValue}>
                <Footer />
            </ThemeContext.Provider>
        )

        const footerElement = screen.getByTestId('footer')
        expect(footerElement).toHaveClass('bg-dark', 'text-light')

        expect(screen.getByTestId('footer-title')).toHaveTextContent(
            'Book Store'
        )

        navLinks.forEach((link, index) => {
            expect(screen.getByTestId(`nav-link-${index}`)).toHaveTextContent(
                link.text
            )
        })

        expect(screen.getByTitle('Twitter')).toBeInTheDocument()
        expect(screen.getByTitle('Tiktok')).toBeInTheDocument()
        expect(screen.getByTitle('Instagram')).toBeInTheDocument()
    })
})
