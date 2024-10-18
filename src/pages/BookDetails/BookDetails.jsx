import Footer from '../../components/Footer/Footer'
import NavbarCustom from '../../components/Navbar/Navbar'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../components/contexts/BookContext'
import { APIKEY } from '../../constants'
import { ThemeContext } from '../../components/contexts/ThemeContext'
import { CommentSelectedCard } from '../../components/contexts/CommentSelectedCard' // Importa il contesto per i commenti
import AllComments from '../../components/AllCommets/AllComments' // Importa il componente AllComments
import '../BookDetails/BookDetails.css'

const BookDetails = () => {
    const { bookId } = useParams() // Prendi l'id del libro dai parametri dell'URL
    const { allBooks: books } = useContext(BookContext)
    const selectedBook = books?.books?.find((book) => book.asin === bookId)

    const { isDarkMode } = useContext(ThemeContext)
    const { selectedCardAsin, setSelectedCardAsin } =
        useContext(CommentSelectedCard) // Usa il contesto per la selezione del libro

    const [comments, setComments] = useState([])

    const ENDPOINTGET = `https://striveschool-api.herokuapp.com/api/books/${bookId}/comments/`

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

    // Usa l'effetto per ottenere i commenti del libro selezionato e impostare il selectedCardAsin
    useEffect(() => {
        getRatings()
        setSelectedCardAsin(bookId) // Imposta l'asin del libro selezionato
    }, [bookId, setSelectedCardAsin])

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
                                            {selectedCardAsin ? (
                                                <AllComments
                                                    asin={selectedCardAsin}
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
