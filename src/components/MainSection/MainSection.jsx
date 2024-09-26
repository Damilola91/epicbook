import { Container, Row } from 'react-bootstrap'
import BookCard from '../BookCard/BookCard'
import { useContext } from 'react'
import { BookContext } from '../contexts/BookContext'
import { ThemeContext } from '../contexts/ThemeContext'

const MainSection = () => {
    const { books } = useContext(BookContext)
    const { isDarkMode } = useContext(ThemeContext)

    return (
        <main
            className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
        >
            <Container>
                <Row className="gy-3">
                    {books &&
                        books
                            .slice(0, 20)
                            .map((book) => (
                                <BookCard
                                    key={book.asin}
                                    title={book.title}
                                    price={book.price}
                                    category={book.category}
                                    img={book.img}
                                    asin={book.asin}
                                />
                            ))}
                </Row>
            </Container>
        </main>
    )
}

export default MainSection
