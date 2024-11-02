import Footer from '../../components/Footer/Footer'
import NavbarCustom from '../../components/Navbar/Navbar'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../components/contexts/BookContext'
import { APIKEY } from '../../constants'
import { ThemeContext } from '../../components/contexts/ThemeContext'
import { CommentSelectedCard } from '../../components/contexts/CommentSelectedCard'
import AllComments from '../../components/AllCommets/AllComments'
import '../BookDetails/BookDetails.css'

const BookDetails = () => {
    const { bookId } = useParams()
    const { allBooks: books } = useContext(BookContext)
    const selectedBook = books?.books?.find((book) => book._id === bookId)

    const { isDarkMode } = useContext(ThemeContext)
    const { selectedCardId, setSelectedCardId } =
        useContext(CommentSelectedCard)

    const [comments, setComments] = useState([])

    const ENDPOINTGET = `${import.meta.env.VITE_SERVER_BASE_URL}comments/book/${bookId}`

    const getRatings = async () => {
        if (!bookId) return
        try {
            const response = await fetch(ENDPOINTGET, {
                headers: {
                    Authorization: `Bearer ${APIKEY}`,
                },
            })
            if (response.ok) {
                const result = await response.json()
                setComments(result)
            } else {
                console.log('Error fetching comments:', response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRatings()
        setSelectedCardId(bookId)
    }, [bookId, setSelectedCardId])

    return (
        <>
            <NavbarCustom />
            <Container
                fluid
                className={`book-details-container ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
            >
                <Row className="justify-content-center">
                    {selectedBook ? (
                        <>
                            <Col sm={6} md={6} lg={5}>
                                <Card className="book-card shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={selectedBook.img}
                                        className="book-img"
                                    />
                                    <Card.Body>
                                        <Card.Title className="book-title">
                                            {selectedBook.title}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Category:</strong>{' '}
                                            {selectedBook.category}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong>{' '}
                                            {selectedBook.price.$numberDecimal}£
                                        </Card.Text>
                                        <Card.Text>
                                            {selectedBook.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} md={6} lg={4}>
                                <Card className="comments-card shadow-sm">
                                    <Card.Body>
                                        <h5 className="comments-title">
                                            Comments
                                        </h5>
                                        <div className="comments-section">
                                            {selectedCardId ? (
                                                <AllComments
                                                    _id={selectedCardId}
                                                    userId={selectedCardId}
                                                />
                                            ) : (
                                                <p className="no-comments">
                                                    No comments available
                                                </p>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (
                        <p>No book selected.</p>
                    )}
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default BookDetails
