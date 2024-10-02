import Footer from '../../components/Footer/Footer'
import NavbarCustom from '../../components/Navbar/Navbar'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../components/contexts/BookContext'
import { APIKEY } from '../../constants'
import { ThemeContext } from '../../components/contexts/ThemeContext'

const BookDetails = () => {
    const { bookId } = useParams()
    const { books } = useContext(BookContext)
    const selectedBook = books.find((book) => book.asin === bookId)
    const [comments, setComments] = useState([])
    const { isDarkMode } = useContext(ThemeContext)

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

    useEffect(() => {
        getRatings()
    }, [bookId])

    return (
        <>
            <NavbarCustom />
            <Container
                fluid
                className={
                    isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'
                }
            >
                <Row>
                    {selectedBook ? (
                        <>
                            <Col sm={6} md={6} lg={6}>
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={selectedBook.img}
                                        className="h-75 w-100 object-fit-cover"
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {selectedBook.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {selectedBook.category}
                                        </Card.Text>
                                        <Card.Text>
                                            {selectedBook.price}£
                                        </Card.Text>
                                        <Card.Text>
                                            {selectedBook.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <div>
                                    <h1>Comments</h1>
                                    <div className="mt-1">
                                        {comments.length > 0 ? (
                                            comments.map((comment) => (
                                                <p key={comment._id}>
                                                    {comment.comment} - Rating:{' '}
                                                    {comment.rate}
                                                </p>
                                            ))
                                        ) : (
                                            <p>No comments available</p>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </>
                    ) : (
                        <p>Nessun libro selezionato.</p>
                    )}
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default BookDetails
