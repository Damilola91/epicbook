import { Container, Row } from 'react-bootstrap'
import BookCard from '../BookCard/BookCard'

const MainSection = ({ books }) => {
    return (
        <Container>
            <Row className="gy-2">
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
                                _id={book._id}
                            />
                        ))}
            </Row>
        </Container>
    )
}

export default MainSection
