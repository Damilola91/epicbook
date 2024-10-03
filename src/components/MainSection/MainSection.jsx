import { Col, Container, Row } from 'react-bootstrap'
import BookCard from '../BookCard/BookCard'
import { useContext, useEffect } from 'react'
import { BookContext } from '../contexts/BookContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { CommentSelectedCard } from '../contexts/CommentSelectedCard'
import AllComments from '../AllCommets/AllComments'
import '../MainSection/MainSection.css'

const MainSection = () => {
    const { books } = useContext(BookContext)
    const { isDarkMode } = useContext(ThemeContext)
    const { selectedCardAsin, setSelectedCardAsin, toggleIsSelect } =
        useContext(CommentSelectedCard)

    useEffect(() => {
        setSelectedCardAsin(null)
    }, [])

    return (
        <main
            className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
        >
            <Container fluid>
                <Row className="gy-3">
                    <Col sm={6} md={6}>
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
                    </Col>

                    <Col sm={6} md={6}>
                        <h3>
                            <strong>Comments</strong>
                        </h3>

                        {selectedCardAsin && (
                            <AllComments asin={selectedCardAsin} />
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default MainSection
