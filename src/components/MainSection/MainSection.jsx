import { Col, Container, Row } from 'react-bootstrap'
import BookCard from '../BookCard/BookCard'
import { useContext } from 'react'
import { BookContext } from '../contexts/BookContext'
import { ThemeContext } from '../contexts/ThemeContext'
import '../MainSection/MainSection.css'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const MainSection = () => {
    const { allBooks: books, page, setPage } = useContext(BookContext)
    const { isDarkMode } = useContext(ThemeContext)
    console.log(books)

    return (
        <main
            className={isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
        >
            <Container fluid>
                <Row className="gy-3">
                    {books && books.books
                        ? books.books.map((book) => (
                              <BookCard
                                  key={book.asin}
                                  title={book.title}
                                  price={book.price.$numberDecimal}
                                  category={book.category}
                                  img={book.img}
                                  asin={book.asin}
                                  _id={book._id}
                              />
                          ))
                        : books.map((book) => (
                              <BookCard
                                  key={book.asin}
                                  title={book.title}
                                  price={book.price.$numberDecimal}
                                  category={book.category}
                                  img={book.img}
                                  asin={book.asin}
                                  _id={book._id}
                              />
                          ))}
                </Row>
                {books && books.books && (
                    <Row className="mt-4">
                        <Col>
                            <ResponsivePagination
                                current={page}
                                total={books.totalPages}
                                onPageChange={setPage}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    )
}

export default MainSection
